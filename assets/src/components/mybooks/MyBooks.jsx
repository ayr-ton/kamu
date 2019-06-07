import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { getMyBooks } from '../../services/BookService';
import BookList from '../books/BookList';

const MyBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      setBooks((await getMyBooks()).results);
    }

    fetchBooks();
  }, []);

  return (
    <React.Fragment>
      <Paper elevation={10} className="page-title">
        <Icon className="fa fa-book-reader" />
        My books
      </Paper>
      <BookList books={books} />
    </React.Fragment>
  );
};

export default MyBooks;
