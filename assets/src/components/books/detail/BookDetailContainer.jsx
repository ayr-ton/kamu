import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../LoadingIndicator';
import BookDetail from './BookDetail';
import { getBook } from '../../../services/BookService';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import { withRouter } from 'react-router';

// TODO: analytics

const BookDetailContainer = (props) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBook(props.librarySlug, props.bookId).then(setBook);
  }, []);

  function close() {
    props.history.push(`/libraries/${props.librarySlug}`);
  }

  return (
    <Dialog
      onClose={close}
      maxWidth="md"
      data-testid="book-detail-wrapper"
      open
    >
      <DialogActions>
        <IconButton onClick={close} key="clear" className="modal-book__close" data-testid="modal-close-button">
          <Clear />
        </IconButton>
      </DialogActions>

      <DialogContent className="modal-container">
        {book && <BookDetail
          book={book}
          librarySlug={props.librarySlug}
        />}
        {(book == null) && <LoadingIndicator />}
      </DialogContent>
    </Dialog>
  );
};

BookDetailContainer.propTypes = {
  librarySlug: PropTypes.string.isRequired,
  bookId: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export { BookDetailContainer };
export default withRouter(BookDetailContainer);
