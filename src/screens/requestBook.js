import { BooksNav } from "../components/books/bookNav";
import "../css/requestBook.css";
import { AuthContext } from "../context/authProvider";
import { useContext, useState,useEffect } from "react";
import { useToasts } from 'react-toast-notifications';

export const RequestBook = () => {
  const { requestbook, requestStatus, getStatus } = useContext(AuthContext)

  const [names, setNames] = useState('');
  const [author, setAuthor] = useState('');
  const { addToast } = useToasts();

  useEffect(() => {
    getStatus();
  })

  const handleReq = async (props) => {
    props.preventDefault();
    if (names == '' || author == '') addToast('Please fill all the details', { appearance: 'warning' });
    else {
      requestbook(names, author)
      addToast('Book requested successfully', { appearance: 'success' });
    }
  }

  const list = requestStatus.map((val, index) =>
    <>
      <tr>
        <th scope="row">{index+ 1}</th>
        <td>{val.BookName}</td>
        <td>{val.author}</td>
        <td>{val.status}</td>
      </tr>

    </>
  )

  return (
    <>
      <div className="edges">
        <BooksNav name="Request Book" />
        <div className="main">
          <h1 class="issuedBookHeading"> Request Books </h1>
          <div className='form'>
            <form onSubmit={handleReq}>
              <div class="row g-3 align-items-center">
                <div class="col-auto">
                  <label for="bookName" class="col-form-label bookLabel">
                    Book Name
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="text"
                    id="bookName"
                    class="form-control"
                    aria-describedby="passwordHelpInline"
                    onChange={(e) => setNames(e.target.value)}
                    value={names}
                  />
                </div>
                <div class="row g-3 align-items-center">
                  <div class="col-auto">
                    <label for="authorName" class="col-form-label bookLabel">
                      Author's Name
                    </label>
                  </div>
                  <div class="col-auto">
                    <input
                      type="text"
                      id="authorName"
                      class="form-control"
                      aria-describedby="passwordHelpInline"
                      onChange={(e) => setAuthor(e.target.value)}
                      value={author}
                    />

                  </div>
                </div>
                {/* <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="isbn" class="col-form-label">ISBN No.</label>
  </div>
  <div class="col-auto">
    <input type="password" id="isbn" class="form-control" aria-describedby="passwordHelpInline" />
  </div>
  </div> */}
              </div>
              <button type="submit" class="submitBtn btn btn-lg ">
                Submit
              </button>
            </form>
            <img className='reqbook' src={require('../assets/71856df1b47df85aa1fefb6953f06696.jpg')} />
            
          </div>
          <br/>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Book Name</th>
                <th scope="col">Author</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {list}
            </tbody>
          </table>

        </div>
      </div>

    </>
  );
};
