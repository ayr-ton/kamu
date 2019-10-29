import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  Paper,
  Button,
  DialogActions,
  Icon,
  DialogTitle,
} from '@material-ui/core';
import moment from 'moment';

import BookDetail from './detail/BookDetail';
import WaitlistIndicator from './WaitlistIndicator';
import {
  joinWaitlist, borrowBook, returnBook, leaveWaitlist, checkWaitlist,
} from '../../services/BookService';
import {
  BORROW_BOOK_ACTION,
  RETURN_BOOK_ACTION,
  JOIN_WAITLIST_BOOK_ACTION,
  LEAVE_WAITLIST_BOOK_ACTION,
  OTHERS_ARE_WAITING_STATUS,
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
      confirmationOpen: false,
    };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.actionButtons = this.actionButtons.bind(this);
    this.performAction = this.performAction.bind(this);
    this.changeOpenStatus = this.changeOpenStatus.bind(this);
    this.borrow = this.borrow.bind(this);
  }

  onMouseOver() { return this.setState({ zDepth: 5 }); }

  onMouseOut() { this.setState({ zDepth: 1 }); }

  performAction(action, eventCategory) {
    const { book, library } = this.props;
    return action(book).then((response) => {
      this.setState({ book: response, confirmationOpen: false });
      this.context.updateUser();
      window.ga('send', 'event', eventCategory, book.title, library);
    });
  }

  async borrow() {
    if (!isWaitlistFeatureActive()) return this.performAction(borrowBook, 'Borrow');

    const { book } = this.props;
    const { status } = await checkWaitlist(book);
    if (status !== OTHERS_ARE_WAITING_STATUS) {
      return this.performAction(borrowBook, 'Borrow');
    }

    return this.setState({ confirmationOpen: true });
  }

  actionButtons(color = 'secondary') {
    const { action } = this.state.book;
    if (!action) return null;
    switch (action.type) {
      case BORROW_BOOK_ACTION:
        return <Button color={color} onClick={() => this.borrow()}>Borrow</Button>;
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
      <React.Fragment>
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

          <div className="book-actions" data-testid="book-actions">
            {this.actionButtons()}
          </div>

          {isOnUsersWaitlist && <WaitlistIndicator addedDate={book.waitlist_added_date} />}
          {contentDetail}
        </Paper>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          open={this.state.confirmationOpen}
        >
          <DialogTitle className="confirmation-title">
            <Icon className="fa fa-clock" />
          </DialogTitle>
          <DialogContent className="confirmation-content">
            <p>
              There are other users who are waiting for this particular book.
               You might want to check with them before borrowing it.
            </p>

            <p data-testid="waitlist-users">
              {'Users on the wait list: '}
              <strong>
                {book.waitlist_items.sort(((oneItem, anotherItem) => (
                  moment(oneItem.added_date).diff(anotherItem.added_date)
                ))).map((item) => (
                  (item.user.name && item.user.name.trim() !== '' && item.user.name) || item.user.username
                )).join(', ')}
              </strong>
            </p>

            <p>Do you wish to proceed and borrow this book?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ confirmationOpen: false })}>
              Cancel
            </Button>
            <Button color="primary" onClick={() => this.performAction(borrowBook, 'Borrow')}>
              Confirm and Borrow
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
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
