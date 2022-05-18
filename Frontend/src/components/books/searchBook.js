import { AuthContext } from "../../context/authProvider";
import { useContext } from "react";
import { Card } from "../card";
import { BooksNav } from "./bookNav";
import '../../css/books.css';

export const SearchBook = () => {
    const { results } = useContext(AuthContext);

    const searchList = results.map((book) =>

        <Card data={book}
        />)
    return (
        <>
            <div className="edges">
                <div className='main'  style={{ boxShadow: '0 0 11px rgba(33,33,33,.2)' }}>
                <BooksNav name="Books" />
                    { results.length == 0 ? <h2 style={{ margin : '20px' }}>No Results Found </h2> :
                        <div className="row">{searchList}</div>
                    }
                </div>
            </div>
        </>
    )
}