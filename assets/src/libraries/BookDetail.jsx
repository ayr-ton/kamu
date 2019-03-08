import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import '../../css/ModalBook.css';
import Clear from '@material-ui/icons/Clear';
import Book from '../models/Book';
import BookBorrowers from './BookBorrowers';

const styles = {
  largeIcon: {
    width: 40,
    height: 40,
  },
  large: {
    padding: 0,
  },
};

export default class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.changeOpenStatus = this.props.changeOpenStatus.bind(this);
    this.actionButtons = this.props.actionButtons.bind(this);
  }

  renderPublisherInformation() {
    const { book } = this.props;
    let publisherWrapper;
    let publisherName;
    let publicationDate;
    let numberOfPages;

    if (book.publisher) {
      publisherName = (
        <div className="modal-book__publisher-name">
          <div className="modal-book__detail-label">Publisher</div>
          <div className="modal-book__detail-value">{book.publisher}</div>
        </div>
      );
    }

    if (book.publication_date) {
      publicationDate = (
        <div className="modal-book__publication-date">
          <div className="modal-book__detail-label">Publication date</div>
          <div className="modal-book__detail-value">{book.publication_date}</div>
        </div>
      );
    }

    if (book.number_of_pages) {
      numberOfPages = (
        <div className="modal-book__number-of-pages">
          <div className="modal-book__detail-label">Pages</div>
          <div className="modal-book__detail-value">{book.number_of_pages}</div>
        </div>
      );
    }

    if (publisherName || publicationDate || numberOfPages) {
      publisherWrapper = (
        <div className="modal-book__publisher-wrapper">
          {publisherName}
          {publicationDate}
          {numberOfPages}
        </div>
      );
    }

    return publisherWrapper;
  }

  renderGoodReadsLink() {
    let goodReadsLink;
    if (this.props.book.isbn) {
      const href = `https://www.goodreads.com/search?q=${this.props.book.isbn}`;
      goodReadsLink = <a href={href} target="_blank" rel="noopener noreferrer">View on GoodReads</a>;
    }
    return goodReadsLink;
  }

  render() {
    const { book } = this.props;

    const actions = [
      <IconButton iconStyle={styles.largeIcon} style={styles.large} onClick={this.changeOpenStatus} key="clear">
        <Clear />
      </IconButton>,
    ];

    return (
      <Dialog
        modal={false}
        open={this.props.open}
        onClose={this.changeOpenStatus}
        maxWidth="md"
      >
        <DialogActions>
          {actions}
        </DialogActions>

        <DialogContent className="modal-container">
          <div className="modal-book">
            <div className="modal-book__image-box">
              {book.image_url ? <img src={book.image_url} alt="Book cover" className="modal-book__image" /> : null}

              <div className="modal-book__actions-buttons">
                {this.actionButtons()}
              </div>
            </div>

            <div className="modal-book__details">
              <div className="modal-book__title">{book.title}</div>
              <div className="modal-book__author">{book.author}</div>

              <div className="modal-book__details-container">
                <div className="modal-book__available-wrapper">
                  <div className="modal-book__detail-label">Availability</div>
                  <div className="modal-book__detail-value">
                    {book.getCountBookCopiesAvailable()}
                    {' '}
of
                    {' '}
                    {book.copies.length}
                  </div>
                </div>

                {this.renderPublisherInformation()}

              </div>

              <div className="modal-book__description-wrapper">
                {book.description ? <div className="modal-book__description">{book.description}</div> : null}

                <div className="modal-book__goodreads">
                  {this.renderGoodReadsLink()}
                </div>
              </div>

              <div className="modal-book__status">
                <BookBorrowers copies={this.props.book.copies} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

BookDetail.propTypes = {
  changeOpenStatus: PropTypes.func.isRequired,
  actionButtons: PropTypes.func.isRequired,
  book: PropTypes.instanceOf(Book).isRequired,
  open: PropTypes.bool.isRequired,
};
