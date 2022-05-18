import { BooksNav } from "../components/books/bookNav";

export const NotReturned=()=>{
    return(
        <div className="edges">
        <BooksNav name="Not Returned" />
        <div className="main">
            <img src={require('../css/no-data.png')} style={{width:'500px',height:'500px'}}/>
            </div>
        </div>
    )
}