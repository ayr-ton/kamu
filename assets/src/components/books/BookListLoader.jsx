import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BookList from './BookList';
import LoadingIndicator from '../LoadingIndicator';

const BookListLoader = (props) => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    props.source().then((data) => {
      setBooks(data.results);
    });
  }, []);

  if (books == null) return <LoadingIndicator data-testid="loading-indicator" />;
  if (books.length === 0) return <p data-testid="no-books-message">{props.noBooksMessage}</p>;
  return <BookList books={books} />;
};

BookListLoader.propTypes = {
  source: PropTypes.func.isRequired,
  noBooksMessage: PropTypes.string.isRequired,
};

export default BookListLoader;
