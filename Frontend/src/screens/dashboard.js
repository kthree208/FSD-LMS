import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/sidebar"
import { AuthContext } from '../context/authProvider';
import axios from '../api/axios';
import { useContext, useEffect,useState } from 'react';

export const Dashboard = () => {
    const {token,getBooks, setToken,setRole} = useContext(AuthContext);
    
    // useEffect(async()=>{
        
    //     await getBooks('Fantasy');
    //     await getBooks('Fiction');
    //     await getBooks('Romance');
    //     await getBooks('Childrens');
    //     await getBooks('Nonfiction');
    //     return()=>{
    //         console.log("loaded");
    //     }
        
    // },[])

    setTimeout(()=>{
                        setToken(sessionStorage.getItem('token'));
                        setRole(sessionStorage.getItem('role')); } ,10);
            
    // useEffect(()=>{
    //             // getFine();
    //             // getIssueBooks();
    //             // getReturnBooks();
                
                
    //             setTimeout(()=>{
    //                 setToken(sessionStorage.getItem('token'));
    //                 setRole(sessionStorage.getItem('role'));
                    
    //               },10);
    //         },[])

    return(
        <div>

        <Sidebar />
        <Outlet />
        </div>
    )
}