import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { getMyBooks, getWaitlistBooks } from '../../services/BookService';
import BookList from '../books/BookList';
import LoadingIndicator from '../LoadingIndicator';
import { isWaitlistFeatureActive } from '../../utils/toggles';

const MyBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState(null);
  const [waitlistBooks, setWaitlistBooks] = useState(null);

  useEffect(() => {
    getMyBooks().then((data) => {
      setBorrowedBooks(data.results);
    });

    getWaitlistBooks().then((data) => {
      setWaitlistBooks(data.results);
    });
  }, []);

  return (
    <div className="my-books">
      <Paper elevation={10} className="page-title">
        <Icon className="fa fa-book-reader" />
        My books
      </Paper>

      <section>
        <h1 className="section-title">Borrowed with me</h1>

        {borrowedBooks == null ? (
          <LoadingIndicator data-testid="loading-indicator-borrowed" />
        ) : (
          <BookList books={borrowedBooks} />
        )}
      </section>

      {isWaitlistFeatureActive() && (
        <section>
          <h1 className="section-title">On my wait list</h1>

          {waitlistBooks == null ? (
            <LoadingIndicator data-testid="loading-indicator-wait-list" />
          ) : (
            <BookList books={waitlistBooks} />
          )}
        </section>
      )}
    </div>
  );
};

export default MyBooks;
