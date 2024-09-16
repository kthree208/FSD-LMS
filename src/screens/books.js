import '../css/books.css';
import { BooksNav } from '../components/books/bookNav';
import { CardsPanel } from '../components/books/cardsPanel';
import { AuthContext } from '../context/authProvider';
import { useContext, useEffect, useState } from 'react';

export const Books = () => {
    const { Fantasy, Romance, Fiction, Childrens, Nonfiction, getBooks } = useContext(AuthContext);

    useEffect(async () => {
        await getBooks('Fantasy');
        await getBooks('Fiction');
        await getBooks('Romance');
        await getBooks('Childrens');
        await getBooks('Nonfiction');
        return () => {
            console.log("loaded");
        }
    }, [])

    return (
        <><div className="edges">
            <div className='main' style={{ boxShadow: '0 0 11px rgba(33,33,33,.2)' }}>
                <BooksNav name="Books" />
                <CardsPanel data={Fantasy} />
                <CardsPanel data={Romance} />
                <CardsPanel data={Fiction} />
                <CardsPanel data={Nonfiction} />
                <CardsPanel data={Childrens} />
            </div>
        </div>
        </>
    )
}