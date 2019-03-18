import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import parse from 'url-parse';
import BookDetail from './detail/BookDetail';
import { borrowCopy, returnBook, joinWaitlist } from '../../services/BookService';
import BookModel from '../../models/Book';
import { BORROW_BOOK_ACTION, RETURN_BOOK_ACTION, JOIN_WAITLIST_BOOK_ACTION } from '../../utils/constants';

const isWaitlistFeatureActive = () => {
  const { query } = parse(window.location.href, true);
  return 'waitlist' in query && query.waitlist === 'active';
};

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zDepth: 1,
      action: props.book.action,
      open: false,
    };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.actionButtons = this.actionButtons.bind(this);
    this.borrow = this.borrow.bind(this);
    this.return = this.return.bind(this);
    this.waitlist = this.waitlist.bind(this);
    this.changeOpenStatus = this.changeOpenStatus.bind(this);
  }

  onMouseOver() { return this.setState({ zDepth: 5 }); }

  onMouseOut() { this.setState({ zDepth: 1 }); }

  borrow() {
    borrowCopy(this.props.book).then((response) => {
      this.setState({ action: response.action });
      window.ga('send', 'event', 'Borrow', this.props.book.title, this.props.library);
    });
  }

  return() {
    returnBook(this.props.book).then((response) => {
      this.setState({ action: response.action });
      window.ga('send', 'event', 'Return', this.props.book.title, this.props.library);
    });
  }

  waitlist() {
    joinWaitlist(this.props.library, this.props.book).then((response) => {
      this.setState({ action: response.action });
      window.ga('send', 'event', 'JoinWaitlist', this.props.book.title, this.props.library);
    });
  }

  actionButtons() {
    if (!this.state.action) return null;
    switch (this.state.action.type) {
      case BORROW_BOOK_ACTION:
        return <Button className="btn-borrow" onClick={this.borrow}>Borrow</Button>;
      case RETURN_BOOK_ACTION:
        return <Button className="btn-return" onClick={this.return}>Return</Button>;
      case JOIN_WAITLIST_BOOK_ACTION:
        return isWaitlistFeatureActive()
          ? <Button className="btn-waitlist" onClick={this.waitlist}>Join the waitlist</Button>
          : null;
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
    const { book } = this.props;
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
        {contentDetail}
      </Paper>
    );
  }
}

Book.propTypes = {
  book: PropTypes.instanceOf(BookModel).isRequired,
  library: PropTypes.string,
};

Book.defaultProps = {
  library: '',
};
