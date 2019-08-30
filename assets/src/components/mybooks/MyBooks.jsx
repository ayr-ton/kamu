import React from 'react';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { getMyBooks, getWaitlistBooks } from '../../services/BookService';
import BookListLoader from '../books/BookListLoader';
import { isWaitlistFeatureActive } from '../../utils/toggles';

const MyBooks = () => (
  <div className="my-books" data-testid="my-books-wrapper">
    <Paper elevation={10} className="page-title">
      <Icon className="fa fa-book-reader" />
      My books
    </Paper>

    <section>
      <h1 className="section-title">Borrowed with me</h1>

      <BookListLoader
        source={getMyBooks}
        noBooksMessage="You don't have any borrowed books yet."
      />
    </section>

    {isWaitlistFeatureActive() && (
      <section>
        <h1 className="section-title">On my wait list</h1>

        <BookListLoader
          source={getWaitlistBooks}
          noBooksMessage="You don't have any books on your wait list yet."
        />
      </section>
    )}
  </div>
);

export default MyBooks;
