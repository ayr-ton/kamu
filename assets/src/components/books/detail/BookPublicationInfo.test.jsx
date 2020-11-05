import React from 'react';
import { render } from '@testing-library/react';
import BookPublicationInfo from './BookPublicationInfo';
import { someBook } from '../../../../test/booksHelper';

describe('BookPublicationInfo', () => {
  it('renders information about publication if this information is present', () => {
    const bookDetail = render(<BookPublicationInfo book={someBook()} />);

    expect(bookDetail.getByText('Addison-Wesley Professional')).toBeInTheDocument();
    expect(bookDetail.getByText('2003-05-17')).toBeInTheDocument();
    expect(bookDetail.getByText('220')).toBeInTheDocument();
  });

  it('does not render information about publication if this info is missing', () => {
    const book = someBook();
    book.number_of_pages = null;
    book.publication_date = null;
    book.publisher = null;
    const bookDetail = render(<BookPublicationInfo book={book} />);

    expect(bookDetail.queryByText('Addison-Wesley Professional')).not.toBeInTheDocument();
    expect(bookDetail.queryByText('2003-05-17')).not.toBeInTheDocument();
    expect(bookDetail.queryByText('220')).not.toBeInTheDocument();
  });
});
