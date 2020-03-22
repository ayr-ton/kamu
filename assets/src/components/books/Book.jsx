import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { withRouter } from 'react-router';

import BookActionButton from './BookActionButton';
import WaitlistIndicator from './WaitlistIndicator';
import { BookPropType } from '../../utils/propTypes';
import UserContext from '../UserContext';

import './Book.css';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zDepth: 1,
      book: props.book,
    };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.openBookDetails = this.openBookDetails.bind(this);
  }

  onMouseOver() { return this.setState({ zDepth: 5 }); }

  onMouseOut() { this.setState({ zDepth: 1 }); }

  openBookDetails() {
    this.props.history.push(`/libraries/${this.props.library}/book/${this.props.book.id}`);
  }

  render() {
    const { book } = this.state;
    const isOnUsersWaitlist = book.waitlist_added_date != null;

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
          <div role="button" className="book-info" onClick={this.openBookDetails} onKeyPress={this.openBookDetails} tabIndex={0}>
            <div className="book-cover" style={bookCover}>
              <div className="book-cover-overlay" />
            </div>

            <div className="book-details">
              <h1 className="book-title">{book.title}</h1>
              <h2 className="book-author">{book.author}</h2>
            </div>
          </div>

          <div className="book-actions" data-testid="book-actions">
            <BookActionButton book={book} library={this.props.library} />
          </div>

          {isOnUsersWaitlist && <WaitlistIndicator addedDate={book.waitlist_added_date} />}
        </Paper>
      </React.Fragment>
    );
  }
}

Book.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  book: BookPropType.isRequired,
  library: PropTypes.string,
};

Book.defaultProps = {
  library: '',
};

export { Book };
export default withRouter(Book);
