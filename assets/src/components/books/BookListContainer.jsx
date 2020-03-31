import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import BookList from './BookList';
import LoadingIndicator from '../LoadingIndicator';
import performAction from '../../utils/bookAction';
import { OPEN_BOOK_ACTION } from '../../utils/constants';
import UserContext from '../UserContext';
import { bookUrl } from '../../utils/urls';

const BookListContainer = (props) => {
  const [books, setBooks] = useState(null);
  const context = useContext(UserContext);

  const onAction = (action, book) => {
    if (action === OPEN_BOOK_ACTION) {
      props.history.push(bookUrl(book, book.library));
      return;
    }

    performAction(action, book).then((updatedBook) => {
      setBooks(
        books.map((it) => (it.id === updatedBook.id ? updatedBook : it)),
      );
      context.updateUser();
    });
  };

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

BookListContainer.propTypes = {
  source: PropTypes.func.isRequired,
  noBooksMessage: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export { BookListContainer };
export default withRouter(BookListContainer);
