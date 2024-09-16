import '../../css/admin/addbook.css'
import { BooksNav } from '../../components/books/bookNav';
import { useContext, useEffect, useState } from 'react';
// import { Book } from '@material-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authProvider';
import { useToasts } from 'react-toast-notifications';

export const UpdateBook=()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const[book,setBook] = useState({name:'',author:'',isbn:'',category:'',book_depository_stars:'',image:'',_id:'',copies:''});
    const {addbook,UpdateBook,updateStatus} = useContext(AuthContext);
    const { addToast } = useToasts();

    useEffect(()=>{
        if(location.state!=null)
       
        setBook({name:location.state.name,author:location.state.author,isbn:location.state.isbn,category:location.state.category,book_depository_stars:location.state.book_depository_stars,image:location.state.image,_id:location.state._id,copies:location.state.copies});
         console.log(location.state);
    },[])
    
    const formsubmit=(props)=>{
        console.log(book);
        UpdateBook(book);
        updateStatus(book._id,'approved')
        addToast('Book updated succesfully', { appearance: 'success' });
        setBook('');
        navigate('/dashboard/books')
    }

    return(
        <>
        <div className="edges">
        <BooksNav name="Add Book" />
        <div className='main' style={{boxShadow: '0 0 11px rgba(33,33,33,.2)'}}>
        <h1 class= "issuedBookHeading addBookHeading"> Update Book Details </h1>
        <div class="container">
    <div class="title">Book details</div>
    <div class="content">
      <form onSubmit={formsubmit}>
        <div class="user-details">
          <div class="input-box">
            <span class="details">Book Name</span>
            <input type="text"  
            autoComplete='off'
            onChange={(e)=>setBook({...book,name:e.target.value})}
            value={book.name}
            required />
          </div>
          <div class="input-box">
            <span class="details">Author</span>
            <input type="text"
            autoComplete='off'
            onChange={(e)=>setBook({...book,author:e.target.value})}
            value={book.author}
              required />
          </div>
          <div class="input-box">
            <span class="details">Isbn</span>
            <input type="text" 
            autoComplete='off'
            onChange={(e)=>setBook({...book,isbn:e.target.value})}
            value={book.isbn}
             required />
          </div>
          <div class="input-box">
            <span class="details">Category</span>
            <input type="text" 
            autoComplete='off'
            onChange={(e)=>setBook({...book,category:e.target.value})}
            value={book.category}
             required />
          </div>
          <div class="input-box">
            <span class="details">Rating</span>
            <input type="text"
            autoComplete='off'
            onChange={(e)=>setBook({...book,book_depository_stars:e.target.value})}
            value={book.book_depository_stars}
              required />
          </div>
          <div class="input-box">
            <span class="details">Book Image</span>
            <input type="text" 
            autoComplete='off'
            onChange={(e)=>setBook({...book,image:e.target.value})}
            value={book.image}
             required />
          </div>
          {/* <div class="input-box">
            <span class="details">Copies</span>
            <input type="text" 
            autoComplete='off'
            onChange={(e)=>setBook({...book,copies:e.target.value})}
            value={book.copies}
             required />
          </div> */}
        </div>
               
        <div class="button">
        <button type="submit" class="submitBtn btn btn-lg ">
              Submit
            </button>
        </div>
      </form>
      
  </div>
</div>
</div>
</div>

        </>
    )
}