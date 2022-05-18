import '../css/books.css';
import '../css/issued.css';
import { AuthContext } from '../context/authProvider';
import { useEffect, useContext, useState } from 'react';
export const Issued = () => {

    const { getIssueBooks, setIssue, issue, returnBooks, deleteIssue } = useContext(AuthContext);

    useEffect(async () => {
        await getIssueBooks();
    })

    const returnbtn = async (book) => {
        await deleteIssue(book.Name);
        var list = [...issue];
        var index = issue.indexOf(book);
        console.log(`clicked on ${book.Name}`);
        if (index !== -1) {
            list.splice(index, 1);
            setIssue(list);
        }
        // await returnBooks(book);
    }
    // const issueList = issue.map((book, index) =>
    //     <tr key={book._id}>
    //         <th scope="row" >{index + 1}</th>
    //         <td>{book.isbn}</td>
    //         <td>{book.Name}</td>
    //         <td>{book.author}</td>
    //         <td>{book.IssuedOn}</td>
    //         <td>{book.returnDate}</td>
    //         <td> <img src={book.image} /></td>
    //         <td><button onClick={() => returnbtn(book)} className='btn btn-success'>Return</button></td>

    //     </tr>)

    return (
        <>
            <div className="edges">
                <div className='main' style={{ boxShadow: '0 0 11px rgba(33,33,33,.2)' }}>
                    {/* {issue.length == 0 ? <img src={require('../css/no-data.png')} style={{ width: '500px', height: '500px' }} /> : <>
                    <table class="table table-hover t-edit">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ISBN</th>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">Issued date</th>
                                <th scope="col">Return date</th>
                                <th scope="col">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {issueList}
                        </tbody>
                    </table></>} */}
                    <h1 class= "issuedBookHeading"> Issued Books </h1>
                    {issue.length == 0 ? <img src={require('../css/no-data.png')} style={{ width: '500px', height: '500px' }} /> :
                        <div className='row'>
                            {issue.map((book, index) =>
                                <div class="bookDiv">
                                    <div class="book">
                                        <div class="back"  style={{ backgroundImage: `url(${book.image})`, backgroundSize: 'cover' }}></div>
                                        <div class="page6">
                                            <br></br>
                                            <h5>Issue Date : <br></br> {book.IssuedOn} </h5>
                                            <h5>Return Date : <br></br> {book.returnDate} </h5>
                                            <button class="returnButton btn" onClick={() => returnbtn(book)}>Return Book</button>
                                        </div>
                                        <div class="page5"></div>
                                        <div class="page4"></div>
                                        <div class="page3"></div>
                                        <div class="page2"></div>
                                        <div class="page1"></div>
                                        <div class="front"  style={{ backgroundImage: `url(${book.image})`, backgroundSize: 'cover' }}></div>
                                    </div>
                                </div>
                            )}

                            {/* {issue.map((book, index) =>
                                <div class="card" style={{ width: '10rem' }}>
                                    <h1>f</h1>
                                    <img src={book.image} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{book.Name}</h5>
                                        <p class="card-text">
                                            <ul>
                                                <li>{book.isbn}</li>
                                                <li>{book.Name}</li>
                                                <li>{book.author}</li>
                                                <li>{book.IssuedOn}</li>
                                                <li>{book.returnDate}</li>
                                            </ul>
                                        </p>

                                    </div>
                                </div>
                            )
                            } */}

                        </div>
                    }
                </div>
            </div>
        </>
    );
}


// <div className='newcard'>
                                // <div class="booking-card" style={{ backgroundImage: `url(${book.image})`, backgroundSize: 'contain' }}>

                                //     <div class="book-container">
                                //         <div class="content">
                                //             <button class="btn" onClick={() => returnbtn(book)}>Réserver</button>
                                //         </div>
                                //     </div>
                                //     <div class="informations-container">
                                //         <h2 class="title">{book.Name}</h2>
                                //         <p class="sub-title">{book.author}</p>
                                //         <p class="price"><svg class="icon" style={{ width: "24px;height:24px" }} viewBox="0 0 24 24">
                                //             <path fill="currentColor" d="M3,6H21V18H3V6M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M7,8A2,2 0 0,1 5,10V14A2,2 0 0,1 7,16H17A2,2 0 0,1 19,14V10A2,2 0 0,1 17,8H7Z" />
                                //         </svg>De 0 à 15 €</p>
                                //         <div class="more-information">
                                //             <div class="info-and-date-container">
                                //                 <div class="box info">
                                //                     <svg class="icon" style={{ width: "24px;height:24px" }} viewBox="0 0 24 24">
                                //                         <path fill="currentColor" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
                                //                     </svg>
                                //                     <p>{book.IssuedOn}</p>
                                //                 </div>
                                //                 <div class="box date">
                                //                     <svg class="icon" style={{ width: "24px;height:24px" }} viewBox="0 0 24 24">
                                //                         <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
                                //                     </svg>
                                //                     <p>{book.returnDate}</p>
                                //                 </div>
                                //             </div>
                                //             <p class="disclaimer">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi eveniet perferendis culpa. Expedita architecto nesciunt, rem distinctio</p>
                                //         </div>
                                //     </div>
                                // </div>
                                // // </div>