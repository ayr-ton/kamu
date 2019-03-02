import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import BookModel from '../models/Book';

function BookList(props) {
  return (
    <div className="book-list">
      {props.books.map((book) => (<Book key={book.id} book={book} library={props.library} />))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.instanceOf(BookModel)).isRequired,
  library: PropTypes.string,
};

BookList.defaultProps = {
  library: '',
};

export default BookList;
