import '../css/books.css';
import { AuthContext } from "../context/authProvider";
import { useContext, useEffect } from "react";

export const Returned = () => {
    const { getReturnBooks, returned, getFine, fine } = useContext(AuthContext);

    const checkDate = (book) => {
        const rn_arr = book.returnedOn.split('-');
        const due_arr = book.dueDate.split('-');

        const rnDate = new Date(rn_arr[2], rn_arr[1] - 1, rn_arr[0]);       //Date(yyyy,mm,dd), months start from 0 in JS so subtract 1
        const dueDate = new Date(due_arr[2], due_arr[1] - 1, due_arr[0]);

        if (rnDate > dueDate)
            return true;

        return false;
    }

    useEffect(async () => {
        getFine();
        await getReturnBooks();
    })

    const returnList = returned.map((book, index) =>
        <tr key={book._id}>
            <th scope="row" >{index + 1}</th>
            {/* <td>{book.isbn}</td> */}
            <td style={{ width: '131.44px', height: '190.48px' }}> <img src={book.image}/></td>
            <td>{book.Name}</td>
            <td>{book.author}</td>
            <td>{book.IssuedOn}</td>
            <td>{book.dueDate}</td>
            <td className={checkDate(book) ? '' : ''}>{book.returnedOn}</td>
            <td><button type="button" className={"btn btn-sm " + (book.fine === 0 ? "btn-secondary disabled" : "btn-danger")}>Rs. {book.fine}</button></td>

        </tr>)

    return (
        <><div className="edges">
            <div className='main' style={{ boxShadow: '0 0 11px rgba(33,33,33,.2)' }}>
            <h1 class= "issuedBookHeading"> Returned Books </h1>
                {returned.length == 0 ? <img src={require('../css/no-data.png')} style={{ width: '500px', height: '500px' }} /> : <>
                    <table class="table table-hover t-edit ">
                        <thead style={{fontWeight:'900', fontSize:'1.1rem', textAlign:'center' }}>
                            <tr>
                                <th scope="col">#</th>
                                {/* <th scope="col">ISBN</th> */}
                                <th scope="col">Cover</th>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">Issue date</th>
                                <th scope="col">Due date</th>
                                <th scope="col">Returned On</th>
                                <th scope="col">Fine</th>
                                {/* <th scope="col" >Cover</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {returnList}
                        </tbody>
                    </table></>}
                   
            </div>
        </div>
        </>
    );
}