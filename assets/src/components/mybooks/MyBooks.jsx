import React from 'react';
import PropTypes from 'prop-types';
import { getMyBooks, getWaitlistBooks } from '../../services/BookService';
import useDocumentTitle from '../../utils/useDocumentTitle';
import BookListLoader from '../books/BookListLoader';

import './MyBooks.css';

const MyBooks = () => {
  useDocumentTitle('My books');

  return (
    <div className="my-books" data-testid="my-books-wrapper">
      <PageSection title="Borrowed with me">
        <BookListLoader
          source={getMyBooks}
          noBooksMessage="To borrow a book, click &ldquo;Borrow&rdquo; on a book that is available in the library."
        />
      </PageSection>

      <PageSection title="On my wait list">
        <BookListLoader
          source={getWaitlistBooks}
          noBooksMessage="To add a book to your wait list, click &ldquo;Join the waitlist&rdquo; on a book that is not available."
        />
      </PageSection>
    </div>
  );
};

const PageSection = ({ title, children }) => (
  <section>
    <h1 className="section-title">{title}</h1>
    {children}
  </section>
);

PageSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default MyBooks;
