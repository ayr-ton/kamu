import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';

import BookActionButton from './BookActionButton';
import WaitlistIndicator from './WaitlistIndicator';
import { BookPropType } from '../../utils/propTypes';
import { OPEN_BOOK_ACTION } from '../../utils/constants';

import './Book.css';

function Book({ book, onAction }) {
  const [isHighlighted, setIsHighlighted] = React.useState(false);
  const isOnUsersWaitlist = book.waitlist_added_date != null;

  const bookCover = {
    backgroundImage: `url('${book.image_url}')`,
  };

  const openDetail = () => onAction(OPEN_BOOK_ACTION);

  return (
    <Paper
      className="book"
      data-testid="book-container"
      elevation={isHighlighted ? 5 : 1}
      onMouseEnter={() => setIsHighlighted(true)}
      onFocus={() => setIsHighlighted(true)}
      onMouseLeave={() => setIsHighlighted(false)}
      onBlur={() => setIsHighlighted(false)}
    >
      <div role="button" className="book-info" onClick={openDetail} onKeyPress={openDetail} tabIndex={0}>
        <div className="book-cover" style={bookCover} data-testid="book-cover">
          <div className="book-cover-overlay" />
        </div>

        <div className="book-details">
          <h1 className="book-title">{book.title}</h1>
          <h2 className="book-author">{book.author}</h2>
        </div>
      </div>

      <div className="book-actions" data-testid="book-actions">
        <BookActionButton action={book.action.type} onClick={onAction} />
      </div>

      {isOnUsersWaitlist && <WaitlistIndicator addedDate={book.waitlist_added_date} />}
    </Paper>
  );
}

Book.propTypes = {
  book: BookPropType.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default Book;
