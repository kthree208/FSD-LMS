import "./App.css";
import { HomePage } from "./screens/homepage";
import LoginCard from "./screens/login";
import SignupCard from "./screens/signup";
import { Dashboard } from "./screens/dashboard";
import { Books } from "./screens/books";
import { Issued } from "./screens/issued";
import { Returned } from "./screens/returned";
import { BookDetail } from "./screens/bookdetail";
import { SearchBook } from "./components/books/searchBook";
import { RequestBook } from "./screens/requestBook";
import { AddBook } from "./screens/admin/addbook";
import { RequestedBooks } from "./screens/admin/requestedbooks";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/authProvider";
import { useContext } from "react";
import { AuthProvider } from "./context/authProvider";
import { ToastProvider } from 'react-toast-notifications';
import { UpdateBook } from './screens/admin/updateBook';

function App() {
  const { role } = useContext(AuthContext);
  return (
    <div className="App"> 
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />}>
                <Route path="/login" element={<LoginCard />} />
                <Route path="/signup" element={<SignupCard />} />
              </Route>
                <>
                  <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="/dashboard" element={<Navigate replace to='/dashboard/books' />} />
                    <Route path="request-book" element={<RequestBook />} />
                    <Route path="books" element={<Books />} />
                    <Route path="books/book-details" element={<BookDetail />} />
                    <Route path="books/search" element={<SearchBook />} />
                    <Route path="issued" element={<Issued />} />
                    <Route path="returned" element={<Returned />} />
                  </Route>
                </>
                  
                {role === 'admin' ?
                <>
                 <Route path="/dashboard" element={<Dashboard />}>
                  <><Route path="/dashboard" element={<Navigate replace to='/dashboard/books' />} />
                  <Route path="add-book" element={<AddBook />} />
                  <Route path="requested-books" element={<RequestedBooks />} /></>
                  <Route path="update-book" element={<UpdateBook/>} />
                 </Route>
               </>
                   :
                   < Route path='*' element={<Navigate replace to='/login' />} />
                 }
          </Routes>
        </Router>      
    </div >
  );
}

function App2(){
  return(
    <AuthProvider>
        <ToastProvider placement="bottom-right" autoDismiss={true}><App /></ToastProvider>
    </AuthProvider>
  )
}

export default App2;
