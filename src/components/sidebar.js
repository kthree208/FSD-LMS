import "../css/sidebar.css";
import { useContext } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import samanthaImg from "../assets/samantha.png";
import { AuthContext } from "../context/authProvider";

export const Sidebar = () => {
  const { getIssueBooks, issue, role, token, setRole, setToken, userName, userEmail} = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = async() => {
    await sessionStorage.removeItem('token');
    await sessionStorage.removeItem('role');
    setToken('');
    setRole('');
  }
  return (
    <>
      <div className="wrapperS">
        <div className="sidebar">
          <div className="userCard" >
            <img src={samanthaImg}  alt="samantha" />
            <p className='userName'>{userName}</p>
            <p className='userEmail'>{userEmail}</p>
          </div>
          {role == 'user' ?
            <ul>
              <li>
                <NavLink
                  to="books"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  <span className="item">Books</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="issued"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  <span className="item">Issued</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="returned"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  <span className="item">Returned</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="request-book"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  <span className="item">Request Book</span>
                </NavLink>
              </li>
              <li className="logout">
                <NavLink
                  to="/"
                  onClick={logout}
                // className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <span className="item">Logout</span>
                </NavLink>
              </li>
            </ul>
            : role == 'admin' ?
            <ul>
              <li>
                <NavLink
                  to="books"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  <span className="item">Books</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="add-book"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  <span className="item">Add Book</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="requested-books"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  <span className="item">Requested Books</span>
                </NavLink>
              </li>
              <li className="logout">
                <NavLink
                  to="/"
                  onClick={logout}
                // className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <span className="item">Logout</span>
                </NavLink>
              </li>
            </ul>
            :
            <>
            {navigate('/login')}
            </>
          }
        </div>
      </div>
    </>
  );
};

{/* <div className='profileDetails'>
        <div className='profileImageDiv'>
          <img src={samanthaImg} alt="samantha" />
          <p className='notifications'>4</p>
        </div>
        <p className='userName'>Samantha</p>
        <p className='userEmail'>samantha@email.com</p>
      </div>  */}