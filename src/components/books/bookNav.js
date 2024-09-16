import "../../css/books.css";
import { useState, useContext } from 'react';
import { AuthContext } from "../../context/authProvider";
import { useNavigate } from "react-router-dom";

export const BooksNav = ({ name }) => {

  const [dropdown, setDropdown] = useState('Search by');

  const { searchbook } = useContext(AuthContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const submit = (props) => {
    props.preventDefault();
    console.log("called");
    searchbook(search);
    navigate('/dashboard/books/search');
  }

  return (
    <div className="booknav" >
      <nav
        class="navbar navbar-expand-lg navbar-light  "
      // style={{ backgroundColor: "white",boxShadow: '0 0 11px rgba(33,33,33,.2)' }}
      >
        <div class="container-fluid">
          {/* <a class="navbar-brand" href="#">
            {name}
          </a> */}
          {name == 'Books' ? <>
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
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                {/* <li class="nav-item dropdown ">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {dropdown}
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a class="dropdown-item" href="#" onClick={() => {
                        setDropdown('Title');
                      }}>
                        Title
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onClick={() => {
                        setDropdown('Author');
                      }}>
                        Author
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onClick={() => {
                        setDropdown('Isbn');
                      }}>
                        Isbn
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onClick={() => {
                        setDropdown('Category');
                      }}>
                        Category
                      </a>
                    </li>
                  </ul>
                </li> */}
              </ul>
              <form class="d-flex" onSubmit={submit}>
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <button class="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div></> : null}
        </div>
      </nav>
    </div>
  );
};
