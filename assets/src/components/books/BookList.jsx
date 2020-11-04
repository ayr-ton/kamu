import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import { BookPropType } from '../../utils/propTypes';

import './BookList.css';

function BookList({ books, onAction }) {
  return (
    <div className="book-list" data-testid="book-list-container">
      {books.map((book) => (
        <Book
          key={book.id}
          book={book}
          onAction={(action) => onAction(action, book)}
        />
      ))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(BookPropType).isRequired,
  onAction: PropTypes.func.isRequired,
};

export default React.memo(BookList);
