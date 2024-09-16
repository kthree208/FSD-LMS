import '../css/login.css'
import { useState,useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { AuthContext } from '../context/authProvider';
import axios from '../api/axios';
import wallpaper from "../assets/wallpaper.jpg";
import { useToasts } from 'react-toast-notifications';

const LOGIN_URL = '/signin';


export default function LoginCard() {
  
  const navigate = useNavigate();
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');


  // const {setRole} = useContext(AuthContext);
  const { addToast } = useToasts();

  const {setToken,setRole,token, setUserName, setUserEmail} = useContext(AuthContext);

  const handleSubmit= async (props)=>{
    props.preventDefault();
    try{
      const response = await axios.post(LOGIN_URL,JSON.stringify({email,password}));
      console.log(response.data);
    
    // setToken(response.data.token);
    // setRole(response.data.user.role)

    sessionStorage.setItem('token',response.data.token);
    sessionStorage.setItem('role',response.data.user.role);
    
    setToken(response.data.token);
    setRole(response.data.user.role);
    setUserName(response.data.user.name);
    setUserEmail(response.data.user.email);
    setEmail('');
    setPassword('');
    console.log(response.data);
    
      
    response.data.user.role=='user'?navigate('/dashboard'):navigate('/dashboard');
    addToast('succesful', { appearance: 'success' });
    }
    catch(e){
      addToast(e.response.data,{ appearance: 'error' });
      console.log(e.response.data);
    }
  }

  return (
    <>
    <div id="triangle-up"></div>
    <div className="wrapper">
      
      <form onSubmit={handleSubmit}>
      <div class ='signupHeading'>... Let<br/>The Adventure<br/> Begin</div>
        <div className="field">
          <input 
          type="email"
          htmlFor='email'
          autoComplete='off'
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          required />
          <label htmlFor='email'>Email Address</label>
        </div>
        <div className="field">
          <input type="password"
          htmlFor='password'
          autoComplete='off'
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          required 
          />
          <label htmlFor='password'>Password</label>
        </div>
        <div className="content">
          {/* <div className="checkbox">
            <input type="checkbox" id="remember-me" />
            <label for="remember-me">Remember me</label>
          </div>
          <div className="pass-link"><a href="#">Forgot password?</a></div> */}
          <div className="signup-link">Not a member?  <Link to='/signup'>Signup now</Link></div>
        </div>
        <div className="field">
          <input type="submit" value="Login" />
        </div>
       
        
      </form>
    </div>
     
     
     
     
     {/* <div class="main">

<div class="container">
    <div class="booking-content">
        <div class="booking-image">
            <img class="booking-img" src={wallpaper} alt="Booking Image"/>
        </div>
        <div class="booking-form">
            <form id="booking-form">
                <h2>Booking place for your dinner!</h2>
                <div class="form-group form-input">
                    <input type="text" name="name" id="name" value="" required/>
                    <label for="name" class="form-label">Your name</label>
                </div>
                <div class="form-group form-input">
                    <input type="number" name="phone" id="phone" value="" required />
                    <label for="phone" class="form-label">Your phone number</label>
                </div>
                <div class="form-group">
                    <div class="select-list">
                        <select name="time" id="time" required>
                            <option value="">Time</option>
                            <option value="6pm">6:00 PM</option>
                            <option value="7pm">7:00 PM</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <div class="select-list">
                        <select name="food" id="food" required>
                            <option value="">Food</option>
                            <option value="seasonalfish">Seasonal steamed fish</option>
                            <option value="assortedmushrooms">Assorted mushrooms</option>
                        </select>
                    </div>
                </div>
                <div class="form-radio">
                    <label class="label-radio"> Select Your Dining Space</label>
                    <div class="radio-item-list">
                        <span class="radio-item">
                            <input type="radio" name="number_people" value="2" id="number_people_2" />
                            <label for="number_people_2">2</label>
                        </span>
                        <span class="radio-item active">
                            <input type="radio" name="number_people" value="4" id="number_people_4" checked="checked" />
                            <label for="number_people_4">4</label>
                        </span>
                        <span class="radio-item">
                            <input type="radio" name="number_people" value="6" id="number_people_6" />
                            <label for="number_people_6">6</label>
                        </span>
                        <span class="radio-item">
                            <input type="radio" name="number_people" value="8" id="number_people_8" />
                            <label for="number_people_8">8</label>
                        </span>
                        <span class="radio-item">
                            <input type="radio" name="number_people" value="10" id="number_people_10" />
                            <label for="number_people_10">10</label>
                        </span>
                    </div>
                </div>

                <div class="form-submit">
                    <input type="submit" value="Book now" class="submit" id="submit" name="submit" />
                    <a href="#" class="vertify-booking">Verify your booking info from your phone</a>
                </div>
            </form>
        </div>
    </div>
</div>

</div> */}

    </>
  );
}