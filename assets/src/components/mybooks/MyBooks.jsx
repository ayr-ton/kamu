import React from 'react';
import { getMyBooks, getWaitlistBooks } from '../../services/BookService';
import BookListLoader from '../books/BookListLoader';
import { isWaitlistFeatureActive } from '../../utils/toggles';

const MyBooks = () => (
  <div className="my-books" data-testid="my-books-wrapper">
    <section>
      <h1 className="section-title">Borrowed with me</h1>

      <BookListLoader
        source={getMyBooks}
        noBooksMessage="To borrow a book, click &ldquo;Borrow&rdquo; on a book that is available in the library."
      />
    </section>

    {isWaitlistFeatureActive() && (
      <section>
        <h1 className="section-title">On my wait list</h1>

        <BookListLoader
          source={getWaitlistBooks}
          noBooksMessage="To add a book to your wait list, click &ldquo;Join the waitlist&rdquo; on a book that is not available."
        />
      </section>
    )}
  </div>
);

export default MyBooks;
