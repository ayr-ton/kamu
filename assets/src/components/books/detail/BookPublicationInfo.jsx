import React from 'react';
import { BookPropType } from '../../../utils/propTypes';

const renderProperty = (property, label, styleClass) => property && (
  <div className={styleClass}>
    <div className="modal-book__detail-label">{label}</div>
    <div className="modal-book__detail-value">{property}</div>
  </div>
);

const BookPublicationInfo = ({ book }) => {
  const publisherName = renderProperty(book.publisher, 'Publisher', 'modal-book__publisher-name');
  const publicationDate = renderProperty(book.publication_date, 'Publication date', 'modal-book__publication-date');
  const numberOfPages = renderProperty(book.number_of_pages, 'Pages', 'modal-book__number-of-pages');

  if (publisherName || publicationDate || numberOfPages) {
    return (
      <div className="modal-book__publisher-wrapper">
        {publisherName}
        {publicationDate}
        {numberOfPages}
      </div>
    );
  }

  return null;
};

BookPublicationInfo.propTypes = {
  book: BookPropType.isRequired,
};

export default BookPublicationInfo;
