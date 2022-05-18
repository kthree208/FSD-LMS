const mongoose = require('mongoose');
const express = require('express');
const Fine = mongoose.model('Fine');
const Books = mongoose.model('Books');
const IssuedBooks = mongoose.model('IssuedBooks');
const ReturnedBooks = mongoose.model('ReturnedBooks');
const RequestedBooks = mongoose.model('RequestedBooks');
const jwt = require('jsonwebtoken');
const requireAuth = require('./requireAuth');

const route = express.Router();
route.use(requireAuth);
route.get('/getfine',async(req,res)=>{

    const data = await Fine.find({userId:req.user._id});
    
    res.send(data);
})

//returns the current date
const getDate = () => {
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = `${day}-${month}-${year}`;
    return date;
}


//function to check fine on each returned book
const checkFine = (book) => {
    let fine = 0;
    const rn_arr = book.returnedOn.split('-');
    const due_arr = book.dueDate.split('-');

    const rnDate = new Date(rn_arr[2], rn_arr[1] - 1, rn_arr[0]);   //Date(yyyy,mm,dd), months start from 0 in JS so subtract 1
    const dueDate = new Date(due_arr[2], due_arr[1] - 1, due_arr[0]);

    if (rnDate > dueDate) {
        const Difference_In_Time = rnDate.getTime() - dueDate.getTime();
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        fine = (Difference_In_Days * 5);
    }
    return fine;

}

route.post('/updatefine',async(req,res)=>{
    const{updatefine} = req.body;
    if(!updatefine)return res.send("something went wrong");
    try{
        const datas = await Fine.find({userId:req.user._id});
         let fined = parseInt(datas[0].fine)+updatefine;
        // console.log(fines);
         const data = await Fine.updateOne(
            {userId:req.user._id},
            {$set:{fine:fined}
        }
        ) 
        res.send(data);
    }
    catch(e){
        console.log(e);
    }
})

route.get('/getissuebooks',async(req,res)=>{
    try{
    const data =await IssuedBooks.find({userId:req.user._id})
    res.send(data);
    }
    catch(e){
        console.log(e);
    }
})

route.post('/issued-books',async(req,res)=>{
    const{Name,author,isbn,IssuedOn,returnDate,image} = req.body;
    console.log(req.body);
    if(!Name || !author || !isbn || !IssuedOn || !returnDate)return res.send("something went wrong");

    try{
        const value =await IssuedBooks.find({userId:req.user._id,isbn : isbn});
        console.log(value) ;
        if(value.length==0) {
        const book = new IssuedBooks({Name,author,isbn,IssuedOn,returnDate,image ,userId:req.user._id});
        await book.save();
        const books = await Books.find({isbn:isbn});
        const copy = parseInt(books[0].copies)-1;
        await Books.updateOne(
            {isbn:isbn},
            {$set:{copies:copy}}
        )
        console.log("created");
        res.send(book);
        }
        else{
            res.send("book already issued");
        }
    }
    catch(e){
        console.log(e);
    }
})

route.get('/getreturnbooks',async(req,res)=>{
    try{
    const data = await ReturnedBooks.find({userId:req.user._id})
    res.send(data);
    }
    catch(e){
        console.log(e);
    }
})
// route.post('/returned-books',async(req,res)=>{
//     const{Name,author,isbn,issuedOn,returnedOn,image} = req.body;
//     if(!Name || !author || !isbn|| !issuedOn || !returnedOn)return res.send("something went wrong");

//     try{
//         const book = new ReturnedBooks({Name,author,isbn,issuedOn,returnedOn,userId:req.user._id,image});
//         await book.save();
//         // const books = await Books.find({isbn:isbn});
//         // const copy = parseInt(books[0].copies)+1;
//         // await Books.updateOne(
//         //     {isbn:isbn},
//         //     {$set:{copies:copy}}
//         // )
//         console.log("idk");
//         res.send(book);
      
//     }
//     catch(e){
//         console.log(e);
//     }
// })
route.get('/search/:key',async(req,res)=>{
    const query = req.params.field;
    console.log(req.params.key);
    console.log(query);
    let data = await Books.find({
        "$or":[
            {category:{$regex:req.params.key, $options : "i"},
            $expr: { $lt: [0.7, {$rand: {} } ] }}
        ]
    }).limit(10)
    res.send(data);
})
route.get('/searchs/:key',async(req,res)=>{
    const query = req.params.field;
    console.log(req.params.key);
    console.log(query);
    let data = await Books.find({
        "$or":[
            {name:{$regex:req.params.key, $options : "i"}}
        ]
    })
    console.log(data);
    res.send(data);
})

route.post('/delete-issue',async(req,res)=>{
    const {isbn} = req.body;
    if(!isbn) res.send("invalid book");
    console.log(isbn);
    try{
        console.log("searching..");
        const book = await IssuedBooks.findOneAndDelete({Name:isbn,userId:req.user._id});
        const newbook = new ReturnedBooks({Name:book.Name,author:book.author,isbn:book.isbn,IssuedOn:book.IssuedOn, dueDate:book.returnDate, returnedOn : getDate() ,userId:req.user._id, image:book.image});
        await newbook.save();
        res.send("dlee");
        
        //update returned book fine
        const BookFine = checkFine(newbook);
        await ReturnedBooks.updateOne(
            { isbn: newbook.isbn, userId: req.user._id },
            { $set: { fine: BookFine } }
        )
        const returnedBooks = await ReturnedBooks.find({ isbn: book.isbn, userId: req.user._id });

        //updating user fine
        const userData = await Fine.find({ userId: req.user._id });
        let new_fine = parseInt(userData[0].fine) + returnedBooks[0].fine;
        console.log("updated user fine =" + new_fine);

        const data = await Fine.updateOne(
            { userId: req.user._id },
            {
                $set: { fine: new_fine }
            }
        )
    }
    catch(e){
        console.log(e);
    }

})

route.post('/request',async(req,res)=>{
    const{bookName,author} = req.body;
    if(!bookName||!author)res.send("wrong info");
   console.log(req.user.name);
    try{
        const request = new RequestedBooks({ BookName:bookName,author,username:req.user.name})
        console.log(request);
        await request.save();
        res.send("done");
    }
    catch(e){
        console.log(e);
    }
})

route.get('/getrequest',async(req,res)=>{
    try{
        const response = await RequestedBooks.find({});
        res.send(response);
    }
    catch(e){
        console.log(e);
    }
})

// route.post('/deletereq',async(req,res)=>{
//     const {bookName} = req.body;
//     console.log(bookName);
//     if(!bookName)res.send("invalid book");
//     try{
//         await RequestedBooks.findOneAndDelete({bookName:bookName});
//         res.send("done");
//     }
//     catch(e){
//         console.log(e);
//     }
// })

route.post('/addbook',async(req,res)=>{
    const{image,name,author,book_depository_stars,isbn,category,copies} = req.body;
    if(!image || !name || !author || !book_depository_stars || !isbn || !category ||!copies) res.send("invalid");
    try{
        const BOOK = await new Books({image,name,author,book_depository_stars,isbn,category,copies});
        await BOOK.save();
        res.send("created done");
    }
    catch(e){
        console.log(e);
    }
})

route.post('/deletebook',async(req,res)=>{
    const{isbn} = req.body;
    if(!isbn) return res.send("invalid isbn");
    try{
        const isIssued = await IssuedBooks.findOne({isbn});
        if(isIssued === null) {
            const book = await Books.findOneAndDelete({isbn});
            res.send("Books deleted successfully")
        }
        else{
            res.send("Book is currently issued");
        }
        // console.log("check");
        
    }
    catch(e){
        console.log(e);
    }
})

route.get('/requestedBooks-status',async(req,res)=>{
    try{
        const requests = await RequestedBooks.find({userId:req.user._id});
        console.log(requests);
        res.send(requests);
    }
    catch(e){
        console.log(e);
    }
})

route.post('/updatestatus/:key/:option',async(req,res)=>{
    console.log(req.body);
    const option = req.params.option;
    if(option==='rejected'){
    try{
        await RequestedBooks.findOneAndUpdate({_id:req.params.key},{status:"Rejected"} )
    }
    catch(e){
        console.log(e);
    }}
    else{
        try{
            await RequestedBooks.findOneAndUpdate({_id:req.params.key},{status:"Approved"} )
        }
        catch(e){
            console.log(e);
        }
    }
})

route.post('/updateBook',async(req,res)=>{
    console.log(req.body);
    if(!req.body)return res.send("invalid updates");
    try{
       const response= await Books.findOneAndUpdate({_id:req.body._id},{image:req.body.image,name:req.body.name,author:req.body.author,book_depository_stars:req.body.book_depository_stars,isbn:req.body.isbn,category:req.body.category,copies:req.body.copies},{new:true})
        console.log(response);
    }
    catch(e){
        console.log(e);
    }
})

module.exports = route;