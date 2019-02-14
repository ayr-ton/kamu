import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function BookList(props) {
  return (
    <div className="book-list">
      {props.books.map(book => (<Book key={book.id} book={book} />))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.array.isRequired
}

BookList.defaultProps = {
  books: []
};

export default BookList;
