import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import '../../../../css/ModalBook.css';
import Clear from '@material-ui/icons/Clear';
import BookBorrowers from './BookBorrowers';
import BookPublicationInfo from './BookPublicationInfo';
import { BookPropType } from '../../../utils/propTypes';

export default class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.changeOpenStatus = this.props.changeOpenStatus.bind(this);
    this.actionButtons = this.props.actionButtons.bind(this);
  }

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
      <a
        href={`https://www.goodreads.com/search?q=${this.props.book.isbn}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on GoodReads
      </a>
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
    const { book } = this.props;

    const actions = [
      <IconButton onClick={this.changeOpenStatus} key="clear" className="modal-book__close">
        <Clear />
      </IconButton>,
    ];

    return (
      <Dialog
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
              {book.image_url && <img src={book.image_url} alt="Book cover" className="modal-book__image" />}

              <div className="modal-book__actions-buttons">
                {this.actionButtons()}
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
  book: BookPropType.isRequired,
  open: PropTypes.bool.isRequired,
};
