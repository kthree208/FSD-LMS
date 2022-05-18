import { Outlet } from "react-router-dom"
import { Navbar } from "../components/navbar"
import LoginCard from "./login"
import '../css/homepage.css';

export const HomePage = () => {

    const smoothScroll= () => {
        document.querySelector('.section2').scrollIntoView({ 
            behavior: 'smooth' 
          });
      }

    return (
        <>
            <div className="bg">
                <Navbar />
                <Outlet />
                <div class="wall">
                    <div class="heroHeading">
                        <h3 class="heroHeadingH3"> Efficient | Easy | Effortless</h3>
                        <h1 class="heroHeadingH1">Library Management System</h1><br />
                        <button onClick={smoothScroll} class="heroHeadingButton" style={{ "vertical-align": "middle" }}><span>See More</span></button>
                    </div>
                </div>

                <div class="section2" >
                    <div class="flex-container">
                        <div>Find the most trending books featured in our catalogue</div>
                        <div>More than 5000+ books with an ever increasing collection</div>
                        <div>With this website on your fingertips get all updates instantly</div>
                    </div>
                </div>

                <div class="section3" >
                    <div class="flex-container">
                        <div>Made By : Keerat Kaur</div>
                        <div>Chitkara University, HP</div>
                        <div>Roll No. : 1911985059</div>
                    </div>
                </div>

            </div>


        </>
    )
}