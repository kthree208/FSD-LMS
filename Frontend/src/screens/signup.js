import '../css/signup.css';
import { useState,useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { AuthContext } from '../context/authProvider';
import axios from '../api/axios';
import { useToasts } from 'react-toast-notifications';

const SIGNUP_URL = '/signup';

export default function SignupCard() {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { addToast } = useToasts();


  const handeleSubmit = async (props) => {
    props.preventDefault();
    try {
      const response = await axios.post(SIGNUP_URL, JSON.stringify({ name, email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false
        });
      console.log("user created");
      console.log(response.data);
      addToast('succesful', { appearance: 'success' });
      response.data.token == true ? navigate('/dashboard/books'):navigate('/');
    }
    catch (e) {
      addToast(e.response.data,{ appearance: 'error' });
      console.log(e);
    }
  }

  return (
    <><div id="triangle-ups"></div>
      <div className="wrapper">
        <form onSubmit={handeleSubmit}>
        <div class ='signupHeading'>... Jump On Board</div>
          <div className="field">
          
            <input type="text"
              htmlFor='name'
              autoComplete='off'
              onChange={(e) => setName(e.target.value)}
              value={name}
              required />
            <label htmlFor='name' >Name</label>
          </div>
          <div className="field">
            <input type="email"
              htmlFor='email'
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required />
            <label htmlFor='email'>Email Address</label>
          </div>
          <div className="field">
            <input type="password"
              htmlFor='password'
              autoComplete='off'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required />
            <label htmlFor='password'>Password</label>
          </div>
          <div className="content">
            {/* <div className="checkbox">
              <input type="checkbox" id="remember-me" />
              <label for="remember-me">Remember me</label>
            </div>
            <div className="pass-link"><a href="#">Forgot password?</a></div> */}
            <div className="signup-link">Already a member? <Link to='/login'>Login now</Link></div>
          </div>
          <div className="field">
            <input type="submit" value="Signup" />
          </div>
          
        </form>
      </div>
    </>
  );
}