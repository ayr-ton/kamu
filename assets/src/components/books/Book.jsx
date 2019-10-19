import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import BookDetail from './detail/BookDetail';
import WaitlistIndicator from './WaitlistIndicator';
import {
  joinWaitlist, borrowBook, returnBook, leaveWaitlist,
} from '../../services/BookService';
import {
  BORROW_BOOK_ACTION, RETURN_BOOK_ACTION, JOIN_WAITLIST_BOOK_ACTION, LEAVE_WAITLIST_BOOK_ACTION,
} from '../../utils/constants';
import { BookPropType } from '../../utils/propTypes';
import { isWaitlistFeatureActive } from '../../utils/toggles';
import UserContext from '../UserContext';

import './Book.css';

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zDepth: 1,
      book: props.book,
      open: false,
    };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.actionButtons = this.actionButtons.bind(this);
    this.performAction = this.performAction.bind(this);
    this.changeOpenStatus = this.changeOpenStatus.bind(this);
  }

  onMouseOver() { return this.setState({ zDepth: 5 }); }

  onMouseOut() { this.setState({ zDepth: 1 }); }

  performAction(action, eventCategory) {
    const { book, library } = this.props;
    return action(book).then((response) => {
      this.setState({ book: response });
      this.context.updateUser();
      window.ga('send', 'event', eventCategory, book.title, library);
    });
  }

  actionButtons(color = 'secondary') {
    const { action } = this.state.book;
    if (!action) return null;
    switch (action.type) {
      case BORROW_BOOK_ACTION:
        return <Button color={color} onClick={() => this.performAction(borrowBook, 'Borrow')}>Borrow</Button>;
      case RETURN_BOOK_ACTION:
        return <Button color={color} onClick={() => this.performAction(returnBook, 'Return')}>Return</Button>;
      case JOIN_WAITLIST_BOOK_ACTION:
        return isWaitlistFeatureActive()
          && <Button color={color} onClick={() => this.performAction(joinWaitlist, 'JoinWaitlist')}>Join the waitlist</Button>;
      case LEAVE_WAITLIST_BOOK_ACTION:
        return isWaitlistFeatureActive()
          && <Button color={color} onClick={() => this.performAction(leaveWaitlist, 'LeaveWaitlist')}>Leave the waitlist</Button>;
      default:
        return null;
    }
  }

  changeOpenStatus() {
    const currentlyOpened = this.state.open;
    this.setState({ open: !currentlyOpened }, this.trackAnalytics);
  }

  trackAnalytics() {
    if (this.state.open) {
      window.ga('send', 'event', 'Show Detail', this.props.book.title, this.props.library);
    }
  }

  render() {
    const { book } = this.state;
    const isOnUsersWaitlist = book.waitlist_added_date != null;

    let contentDetail;

    if (this.state.open) {
      contentDetail = (
        <BookDetail
          open={this.state.open}
          book={book}
          changeOpenStatus={this.changeOpenStatus}
          actionButtons={this.actionButtons}
        />
      );
    }

    const bookCover = {
      backgroundImage: `url('${book.image_url}')`,
    };

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
        <div role="button" className="book-info" onClick={this.changeOpenStatus} onKeyPress={this.changeOpenStatus} tabIndex={0}>
          <div className="book-cover" style={bookCover}>
            <div className="book-cover-overlay" />
          </div>

          <div className="book-details">
            <h1 className="book-title">{book.title}</h1>
            <h2 className="book-author">{book.author}</h2>
          </div>
        </div>

        <div className="book-actions">
          {this.actionButtons()}
        </div>

        {isOnUsersWaitlist && <WaitlistIndicator addedDate={book.waitlist_added_date} />}
        {contentDetail}
      </Paper>
    );
  }
}

Book.contextType = UserContext;

Book.propTypes = {
  book: BookPropType.isRequired,
  library: PropTypes.string,
};

Book.defaultProps = {
  library: '',
};
