import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/sidebar"
export const Home=()=>{
    return(
        <>
        <Sidebar/>
        <Outlet />
        </>
    )
}