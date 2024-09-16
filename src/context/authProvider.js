import React, { createContext, useState, useReducer } from "react";
import axios from "../api/axios";

export const AuthContext = createContext({});

const getdate = () => {
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = `${day}/${month}/${year}`;
    return date;
}
const returndate = () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);
    var dd = targetDate.getDate();
    var mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
    var yyyy = targetDate.getFullYear();

    var dateString = `${dd}/${mm}/${yyyy}`;
    return dateString
}

export const AuthProvider = ({ children }) => {

    // const token = localStorage.getItem('token');
    // const role = localStorage.getItem('role');
    const [issue, setIssue] = useState([]);
    const [Fantasy, setFantasy] = useState([]);
    const [Fiction, setFiction] = useState([]);
    const [Romance, setRomance] = useState([]);
    const [Childrens, setChildrens] = useState([]);
    const [Nonfiction, setNonfiction] = useState([]);
    const [returned, setReturned] = useState([]);
    const [results, setResults] = useState([]);
    const [requested,setRequested] = useState([]);
    const [token,setToken] = useState('');
    const [role,setRole] = useState('');
    const [userName,setUserName] = useState() ;
    const [userEmail,setUserEmail] = useState() ;
    const [requestStatus , setRequestStatus] = useState([]);
    const [fine,setFine] = useState(0);


    const getIssueBooks = async () => {
        try {
            const response = await axios.get('/getissuebooks',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setIssue(response.data);
        }
        catch (e) {
            console.log(e.response);
        }
    }

    const getBooks = async (id) => {
        try {
            const response = await axios.get(`/search/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                }

            );
            console.log(response.data);
            //   dispatch({type:'get_books',payload:response.data})

            if (id === 'Fantasy') {
                setFantasy(response.data);
            }
            else if (id === 'Fiction' && id != 'Historical Fiction') {
                setFiction(response.data);
            }
            else if (id === 'Romance') {
                setRomance(response.data);
            }
            else if (id === 'Childrens') {
                setChildrens(response.data);
            }
            else if (id === 'Nonfiction') {
                setNonfiction(response.data);
            }

        }
        catch (e) {
            console.log(e.response);
        }
    }

    const issueBooks = async (Book) => {
        try {
            await axios.post('/issued-books', JSON.stringify({ Name: Book.name, author: Book.author, isbn: Book.isbn, IssuedOn: getdate(), returnDate: returndate(), image: Book.image }),
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

        }
        catch (e) {
            console.log(e.response);
        }
    }

    // const returnBooks = async (Book) => {
    //     try {
    //         await axios.post('/returned-books', JSON.stringify({ Name: Book.Name, author: Book.author, isbn: Book.isbn, issuedOn: Book.IssuedOn, returnedOn: getdate(), image: Book.image }),
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             })
    //     }
    //     catch (e) {
    //         console.log(e.data);
    //         console.log(e);
    //     }
    // }

    const getReturnBooks = async () => {
        try {
            const response = await axios.get('/getreturnbooks',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            setReturned(response.data);

        }
        catch (e) {
            console.log(e.response);
        }
    }

    const deleteIssue = async (isbn) => {
        try {
            await axios.post(`/delete-issue/`, JSON.stringify({ isbn }),
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        }
        catch (e) {
            console.log(e.response);
        }
    }

    const requestbook = async (bookName, author) => {
        console.log(bookName, author);
        try {
            await axios.post('/request', JSON.stringify({ bookName, author }), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    }
    const searchbook = async (id) => {
        try {
            const response = await axios.get(`/searchs/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setResults(response.data);
            console.log(response.data);
        }
        catch (e) {
            console.log(e);
        }
    }
    const addbook=async(book)=>{
        try{
            await axios.post('/addbook',JSON.stringify({image:book.image,name:book.name,isbn:book.isbn,author:book.author,category:book.category,book_depository_stars:book.book_depository_stars}),{
                headers:{
                    Authorization:`Bearer ${token}`}  
            })
        }
        catch(e){
            console.log(e);
        }
    }
    const getRequestedBooks = async ()=>{
        try{
            const response = await axios.get('/getrequest',{
                headers:{
                    Authorization:`Bearer ${token}`}
            })
            setRequested(response.data)
        }
        catch(e){
            console.log(e);
        }
    }

    const deletereq=async(book)=>{
        try{
            await axios.post('/deletereq',JSON.stringify({name:book.name}),{
                headers:{
                    Authorization:`Bearer ${token}`}  
            })
        }
        catch(e){
            console.log(e);
        }
    }
    const deleteBook=async(isbn)=>{
        try{
            const response = await axios.post('/deletebook',JSON.stringify({isbn}),{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(response.data);
            return response.data ;
        }
        catch(e){
            console.log(e);
        }
    }


    const updateStatus = async(key,option)=>{
        try{
            const response = await axios.post(`/updatestatus/${key}/${option}`,JSON.stringify({key}),{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
        }
        catch(e){
            console.log(e.response.data);
        }
    }

    const getStatus = async()=>{
        try{
            const response = await axios.get('/requestedBooks-status',
            {
                headers:{
                Authorization:`Bearer ${token}`}
              })
            setRequestStatus(response.data);
        }
        catch(e){
            console.log(e.response);
        }
    }
    
    const UpdateBook=async(Book)=>{
        try{
            const response = await axios.post(`/updateBook`,JSON.stringify(Book),{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
        }
        catch(e){
            console.log(e);
        }
    }

    const getFine=async()=>{
        try{
            const response = await axios.get('/getfine',{
                headers:{
                    Authorization:`Bearer ${token}`}  
            })
            setFine(response.data[0].fine);
            console.log(response.data[0].fine);
        }
        catch(e){
            console.log(e.response.data);
        }
    }

    return (
        <AuthContext.Provider value={{
            userEmail,setUserEmail,userName, setUserName ,requestStatus ,
            token,setToken,setRole,deleteBook, getRequestedBooks, getStatus,
            deletereq, requested, getIssueBooks, setIssue,addbook, getFine , fine,
            issue, Fantasy, Romance, Fiction, Childrens, Nonfiction, 
            getBooks, issueBooks, getReturnBooks, returned, 
            deleteIssue, requestbook, results, searchbook, role ,updateStatus,UpdateBook
        }}>{children}</AuthContext.Provider>
    )
}