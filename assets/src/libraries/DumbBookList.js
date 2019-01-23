import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function DumbBookList(props) {
  return (
    <div className="book-list">
      {props.books.map(book => (<Book key={book.id} book={book} />))}
    </div>
  );
}

DumbBookList.propTypes = {
  books: PropTypes.array.isRequired
}

DumbBookList.defaultProps = {
  books: []
};

export default DumbBookList;
