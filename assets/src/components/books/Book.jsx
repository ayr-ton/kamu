import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';

import BookActionButton from './BookActionButton';
import WaitlistIndicator from './WaitlistIndicator';
import { BookPropType } from '../../utils/propTypes';

import './Book.css';
import { OPEN_BOOK_ACTION } from '../../utils/constants';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zDepth: 1,
    };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseOver() { return this.setState({ zDepth: 5 }); }

  onMouseOut() { this.setState({ zDepth: 1 }); }

  render() {
    const { book } = this.props;
    const isOnUsersWaitlist = book.waitlist_added_date != null;

    const bookCover = {
      backgroundImage: `url('${book.image_url}')`,
    };

    const openDetail = () => this.props.onAction(OPEN_BOOK_ACTION);

    return (
      <Paper
        className="book"
        data-testid="book-container"
        elevation={this.state.zDepth}
        onMouseOver={this.onMouseOver}
        onFocus={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onBlur={this.onMouseOut}
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
          <BookActionButton action={book.action.type} onClick={this.props.onAction} />
        </div>

        {isOnUsersWaitlist && <WaitlistIndicator addedDate={book.waitlist_added_date} />}
      </Paper>
    );
  }
}

Book.propTypes = {
  book: BookPropType.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default Book;
