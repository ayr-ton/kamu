import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../LoadingIndicator';
import BookDetail from './BookDetail';
import { getBook } from '../../../services/BookService';

const BookDetailLoader = (props) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBook(props.librarySlug, props.bookId).then(setBook);
  }, []);

  if (book == null) return <LoadingIndicator />;
  return (
    <BookDetail
      actionButtons={() => {}}
      book={book}
      changeOpenStatus={() => {}}
      open
    />
  );
};

BookDetailLoader.propTypes = {
  librarySlug: PropTypes.string.isRequired,
  bookId: PropTypes.string.isRequired,
};

export default BookDetailLoader;
