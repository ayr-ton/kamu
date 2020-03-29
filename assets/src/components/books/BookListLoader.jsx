import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BookList from './BookList';
import LoadingIndicator from '../LoadingIndicator';
import performAction from '../../utils/bookAction';

const BookListLoader = (props) => {
  const [books, setBooks] = useState(null);

  const onAction = (action, book) => performAction(action, book).then((updatedBook) => setBooks(
    books.map((it) => (it.id === updatedBook.id ? updatedBook : it)),
  ));

  useEffect(() => {
    props.source().then((data) => {
      setBooks(data.results);
    });
  }, []);

  if (books == null) return <LoadingIndicator />;
  if (books.length === 0) {
    return (
      <p data-testid="no-books-message" className="no-books-message">
        {props.noBooksMessage}
      </p>
    );
  }
  return <BookList books={books} onAction={onAction} />;
};

BookListLoader.propTypes = {
  source: PropTypes.func.isRequired,
  noBooksMessage: PropTypes.string.isRequired,
};

export default BookListLoader;
