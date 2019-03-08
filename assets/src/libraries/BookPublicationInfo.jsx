import React from 'react';

const renderProperty = (property, label, styleClass) => {
  if (property) {
    return (
      <div className={styleClass}>
        <div className="modal-book__detail-label">{label}</div>
        <div className="modal-book__detail-value">{property}</div>
      </div>
    );
  }
  return null;
};

const BookPublicationInfo = ({ book }) => {
  let publisherWrapper;
  const publisherName = renderProperty(book.publisher, 'Publisher', 'modal-book__publisher-name');
  const publicationDate = renderProperty(book.publication_date, 'Publication date', 'modal-book__publication-date');
  const numberOfPages = renderProperty(book.number_of_pages, 'Pages', 'modal-book__number-of-pages');

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
