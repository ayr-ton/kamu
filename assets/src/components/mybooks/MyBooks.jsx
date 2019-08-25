import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { getMyBooks, getWaitlistBooks } from '../../services/BookService';
import BookList from '../books/BookList';

const MyBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [waitlistBooks, setWaitlistBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      setBorrowedBooks((await getMyBooks()).results);
      setWaitlistBooks((await getWaitlistBooks()).results);
    }

    fetchBooks();
  }, []);

  return (
    <div className="my-books" data-testid="my-books-wrapper">
      <Paper elevation={10} className="page-title">
        <Icon className="fa fa-book-reader" />
        My books
      </Paper>

      <section>
        <h1 className="section-title">Borrowed with me</h1>
        <BookList books={borrowedBooks} />
      </section>

      <section>
        <h1 className="section-title">On my wishlist</h1>
        <BookList books={waitlistBooks} />
      </section>
    </div>
  );
};

export default MyBooks;
