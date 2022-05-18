import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BooksNav } from "../components/books/bookNav"
import { AuthContext } from "../context/authProvider";
import '../css/booksdetails.css';
import { useToasts } from 'react-toast-notifications';
import axios from "../api/axios";
import { toast } from "@chakra-ui/react";

export const BookDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { issueBooks, issue, token, role, getIssueBooks, deleteBook } = useContext(AuthContext);
    const [btnValue, setBtnValue] = useState('Issue Book');
    const [btnColor, setBtnColor] = useState('buy--btn');
    const { addToast } = useToasts();
    const [copies, setCopies] = useState(true);

    useEffect(async () => {
        await getIssueBooks();

        const response = await axios.get(`/search/isbn/${location.state.data.isbn}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data[0].copies);
        if (response.data[0].copies < 1) {
            setBtnValue('Not available');
            setBtnColor('btn-secondary disabled');
        }
        else {
            let flag = 0;

            issue.every(book => {
                if (book.isbn == location.state.data.isbn) {
                    flag = 1;
                    return false;
                }
                return true
            })
            if (flag == 1) {
                setBtnColor('btn--change');
                setBtnValue('Issued');
            }
            else {
                setBtnValue("Issue Book")
            }
        }

    }, [])

    // else if (issue.length === 5) {
    //     setBtnValue("Max Out");
    //     toast.error("Issue limit reached", { duration: 5000 });
    // }

    const btnHandle = () => {

        if (btnValue == 'Issued') {
            addToast('Book is already issued', { appearance: 'error' });
        }
        if (btnValue == 'Not available') addToast('Book is not available at this moment try after sometime', { appearance: 'error' })

        else {
            issueBooks(location.state.data);
            setBtnValue('Issued');
            setBtnColor('btn--change');
        }

    }

    const deletebtn = async (isbn) => {
        const response = await deleteBook(isbn);
        navigate('/dashboard/books');
        console.log(response);
        if (response === "Book is currently issued")
            addToast(response, { appearance: 'error' });
        else addToast(response, { appearance: 'success' });

    }
    return (
        <>
            <div className="edges">
                <BooksNav name='Book details' />
                <div className="main ">
                    {/* <h1>Book name</h1>
        <h1>Book details</h1> */}
                    <section class="product ">
                        <div class="photo-main">
                            <img class='photo' src={location.state.data.image} />
                        </div>
                        <div class="product__info">
                            <div class="title">
                                <h1>{location.state.data.name}</h1>
                                <span>{location.state.data.author}</span>

                            </div>


                            <div class="description">
                                {/* <h3>Details</h3> */}
                                {/* <ul>
                                    <li>Language    -   english</li>
                                    <li>Publisher   -   None</li>
                                    <li>ISBN        -   {location.state.data.isbn}</li>
                                    <li>Rating      -   {location.state.data.book_depository_stars}</li>
                                    <li>category    -   {location.state.data.category}</li>
                                </ul> */}
                                <table class=' table table-borderless'>
                                    <tr> <th>Pages   </th>     <td>{location.state.data.pages}</td></tr>
                                    <tr> <th>Rating   </th>    <td>{location.state.data.book_depository_stars}</td></tr>
                                    <tr> <th>Category  </th>    <td>{location.state.data.category}</td></tr>
                                    <tr><th>Language</th>    <td>English</td></tr>
                                    <tr> <th>Copies</th>    <td>{location.state.data.copies}</td></tr>
                                </table>
                            </div>
                            {role === 'user' ?
                                <button onClick={btnHandle} class={(btnValue == 'Not available' ? "btn btn-secondary disabled" : btnColor)}>{btnValue}</button>
                                : <>

                                    <button onClick={() => deletebtn(location.state.data.isbn)} class='buy--btn '>Delete Book</button>
                                    <button onClick={() => navigate('/dashboard/update-book', { state: location.state.data })} class='buy--btn me-12 ms-4'>Update Book</button>
                                </>}
                        </div>
                    </section>

                </div>
            </div>
        </>
    )
}































// import { useContext, useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { BooksNav } from "../components/books/bookNav"
// import { CardNew } from "../components/cardNew";
// import { AuthContext } from "../context/authProvider";
// import '../css/booksdetails.css';
// import '../css/cardNew.css'
// import axios from "../api/axios";

// export const BookDetail = () => {
//     const location = useLocation();
//     const { issueBooks, issue } = useContext(AuthContext);
//     const [btnValue, setBtnValue] = useState('Issue Book');
//     const [btnColor, setBtnColor] = useState('buy--btn');

//     const btnHandle = () => {
//         issueBooks(location.state);
//         setBtnValue('Issued');
//         setBtnColor('btn--change');
//     }

//     return (
//         <>
//             <div className="edges">
//                 <BooksNav name='Book details' />
//                 <div className="main">
//                     {/* <h1>Book name</h1>
//                          <h1>Book details</h1> */}

//                     <section class="product">
//                         <div class="photo-main">
//                             <img class='photo' src={location.state.image} />
//                         </div>
//                         <div class="product__info">
//                             <div class="title">
//                                 <h1>{location.state.name}</h1>
//                                 <span>{location.state.author}</span>
//                             </div>


//                             <div class="description">
//                                 <h3>Details</h3>
//                                 <ul>
//                                     <li>Language    -   english</li>
//                                     <li>Publisher   -   None</li>
//                                     <li>ISBN        -   {location.state.isbn}</li>
//                                     <li>Rating      -   {location.state.book_depository_stars}</li>
//                                     <li>category    -   {location.state.category}</li>
//                                 </ul>
//                             </div>
//                             <button onClick={btnHandle} class={(btnValue == 'Not AVailable' ? 'btn btn-secondary disabled' : btnColor)}>{btnValue}</button>


//                         </div>
//                     </section>

//                     {/* <div class="container">
//                         <div class="mobile-layout">
//                             <div class="book-cover">
//                                 <img class="book-top" src={location.state.image} alt="book-top" />
//                                 <img class="book-side" src="https://raw.githubusercontent.com/atomic-variable/images-repo/e37f432405904a280858e5437ce1960753bc78a3/book-side.svg" alt="book-side" />
//                             </div>
//                             <div class="preface">
//                                 <div class="content">
//                                     <div class="header">
//                                         <div class="title">{location.state.name}</div>
//                                         <div class="icon">
//                                             <i class="fas fa-chevron-down"></i>
//                                         </div>
//                                     </div>
//                                     <div class="author">{location.state.author}</div> */}
//                                     {/* <div class="body">
//                                         <p>
//                                             also known as The Diary of Anne Frank, is a book of the writings from the Dutch-language diary kept by Anne Frank while she was in hiding for two years with her family during the Nazi occupation of the Netherlands
//                                         </p>
//                                         <p>
//                                             Anne calls her diary "Kitty", so almost all of the letters are written to Kitty.
//                                         </p>
//                                     </div> */}
//                                 {/* </div>
//                             </div>
//                         </div>
//                     </div > */}
//                 </div >
//             </div >
//             <hr />
//             {/* <CardNew/> */}

//         </>
//     )
// }