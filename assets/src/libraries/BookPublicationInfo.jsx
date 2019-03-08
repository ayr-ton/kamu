import React from 'react';

const BookPublicationInfo = ({ book }) => {
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
};

export default BookPublicationInfo;
