import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import BookBorrowers from './BookBorrowers';
import BookPublicationInfo from './BookPublicationInfo';
import BookActionButton from '../BookActionButton';
import { BookPropType } from '../../../utils/propTypes';

import './BookDetail.css';

class BookDetail extends Component {
  renderAvailability() {
    const { copies } = this.props.book;
    const availableCopies = copies.filter((book) => !book.user).length;
    const totalCopies = copies.length;
    return (
      <div className="modal-book__available-wrapper">
        <div className="modal-book__detail-label">Availability</div>
        <div className="modal-book__detail-value">
          {`${availableCopies} of ${totalCopies}`}
        </div>
      </div>
    );
  }

  renderGoodReadsLink() {
    return this.props.book.isbn && (
      <Link
        href={`https://www.goodreads.com/search?q=${this.props.book.isbn}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on GoodReads
      </Link>
    );
  }

  renderDescription() {
    return (
      <div className="modal-book__description-wrapper">
        {this.props.book.description && <div className="modal-book__description">{this.props.book.description}</div>}

        <div className="modal-book__goodreads">
          {this.renderGoodReadsLink()}
        </div>
      </div>
    );
  }

  render() {
    const { book, librarySlug } = this.props;
    return (
      <div className="modal-book">
        <div className="modal-book__image-box">
          {book.image_url && <img src={book.image_url} alt="Book cover" className="modal-book__image" />}

          <div className="modal-book__actions-buttons">
            <BookActionButton book={book} library={librarySlug} color="primary" />
          </div>
        </div>

        <div className="modal-book__details">
          <div className="modal-book__title">{book.title}</div>
          <div className="modal-book__author">{book.author}</div>

          <div className="modal-book__details-container">
            {this.renderAvailability()}
            <BookPublicationInfo book={book} />
          </div>

          {this.renderDescription()}

          <div className="modal-book__status">
            <BookBorrowers copies={book.copies} />
          </div>
        </div>
      </div>
    );
  }
}

BookDetail.propTypes = {
  librarySlug: PropTypes.string.isRequired,
  book: BookPropType.isRequired,
};

export default BookDetail;
