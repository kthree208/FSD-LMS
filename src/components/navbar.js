import LoginCard from "../screens/login";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import '../css/navbar.css';
// import { Button } from "@chakra-ui/react";

export const Navbar = () => {
  const [loginActive, setLoginActive] = useState(false);
  const [signinActive, setSignActive] = useState(false);

  const navigate = useNavigate();

  const loginfn = () => {
    setSignActive(false);
    loginActive ? navigate('/') : navigate('/login');
    setLoginActive(!loginActive);
  }
  const signinfn = () => {
    setLoginActive(false);
    signinActive ? navigate('/') : navigate('/signup');
    setSignActive(!signinActive);
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg  " style={{"zIndex": 5}}>
        <div class="container-fluid">
          {/* <a class="navbar-brand" href="#">
            Navbar
          </a> */}
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <div class="logo"></div>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item btn ms-2 mx-2 navbarBtn" onClick={loginfn}>Login</li>
              <li class="nav-item btn ms-2 mx-2 navbarBtn" onClick={signinfn}>Signup</li>
            </ul>
            {/* edits */}
          </div>
        </div>
      </nav>
    </>
  );
};
