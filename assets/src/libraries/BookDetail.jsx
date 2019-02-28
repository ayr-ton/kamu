import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import '../../css/ModalBook.css';
import moment from 'moment';
import Clear from '@material-ui/icons/Clear';
import Book from '../models/Book';

export default class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.changeOpenStatus = this.props.changeOpenStatus.bind(this);
    this.actionButtons = this.props.actionButtons.bind(this);
  }

  render() {
    const { book } = this.props;
    const copiesAvailable = book.getCountBookCopiesAvailable();

    const styles = {
      largeIcon: {
        width: 40,
        height: 40,
      },
      large: {
        padding: 0,
      },
    };

    const actions = [
      <IconButton iconStyle={styles.largeIcon} style={styles.large} onClick={this.changeOpenStatus} key="clear">
        <Clear />
      </IconButton>,
    ];

    const borrowers = [];
    let headerDisplayed = false;
    let borrowedTimeAgo;

    for (const copy of book.copies) {
      if (copy.user) {
        if (copy.borrow_date) {
          borrowedTimeAgo = (
            <div className="modal-book__borrowed-elapsed-time">
              <span className="borrowed-elapsed-time__label">Borrowed</span>
              <span className="borrowed-elapsed-time__value">{moment(copy.borrow_date).fromNow()}</span>
            </div>
          );
        }

        if (!headerDisplayed) {
          headerDisplayed = true;
          borrowers.push(<div key="borrowed-title" className="modal-book__borrowed-with-label">Borrowed with:</div>);
        }

        borrowers.push(
          <div key={copy.user.username} className="modal-book__borrowed-with">
            <div className="modal-book__borrowed-with-wrapper">
              <div className="modal-book__borrowed-person">
                <Avatar src={copy.user.image_url} />
                <span>{copy.user.name}</span>
              </div>

              {borrowedTimeAgo}
            </div>
          </div>,
        );
      }
    }

    let imageUrl;
    let publisherWrapper;
    let publisherName;
    let publicationDate;
    let numberOfPages;
    let bookDescription;
    let goodReadsLink;

    if (book.image_url) imageUrl = <img src={book.image_url} alt="Book cover" className="modal-book__image" />;

    if (book.description) bookDescription = <div className="modal-book__description">{book.description}</div>;

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

    if (book.isbn) {
      const goodReadsIsbnUrl = `https://www.goodreads.com/search?q=${book.isbn}`;
      goodReadsLink = <a href={goodReadsIsbnUrl} target="_blank" rel="noopener noreferrer">View on GoodReads</a>;
    }

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
              {imageUrl}

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
                    {copiesAvailable}
                    {' '}
of
                    {' '}
                    {book.copies.length}
                  </div>
                </div>

                {publisherWrapper}

              </div>

              <div className="modal-book__description-wrapper">
                {bookDescription}

                <div className="modal-book__goodreads">
                  {goodReadsLink}
                </div>
              </div>

              <div className="modal-book__status">
                <div className="modal-book__borrowed-informations">
                  {borrowers}
                </div>
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
