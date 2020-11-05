import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { someBook, someBookWithAvailableCopies, someBookWithNoAvailableCopies } from '../../../../test/booksHelper';
import BookDetail from './BookDetail';
import {
  BORROW_BOOK_ACTION,
  REPORT_BOOK_FOUND,
  REPORT_BOOK_MISSING,
} from '../../../utils/constants';

const book = someBook();
const onAction = jest.fn();

describe('Book Detail', () => {
  it('renders img with book cover if book\'s image_url is informed', () => {
    const bookDetail = render(<BookDetail book={book} onAction={onAction} />);

    const bookCover = bookDetail.getByAltText('Book cover');
    expect(bookCover).toBeInTheDocument();
    expect(bookCover.closest('img'))
      .toHaveAttribute('src', 'http://books.google.com.br/books/content?id=gFgnde_vwMAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api');
  });

  it('does not render  book\'s cover image when image_url is not informed', () => {
    book.image_url = null;
    const bookDetail = render(<BookDetail book={book} onAction={onAction} />);
    expect(bookDetail.queryByAltText('Book cover')).not.toBeInTheDocument();
  });

  it('renders book title and author', () => {
    const bookDetail = render(<BookDetail book={book} onAction={onAction} />);

    expect(bookDetail.getByText('Test Driven Development')).toBeInTheDocument();
    expect(bookDetail.getByText('Kent Beck')).toBeInTheDocument();
  });

  it('renders \'1 of 1\' when 1 out of 1 copies are available', () => {
    const bookWithAvailableCopies = someBookWithAvailableCopies();
    const bookDetail = render(<BookDetail book={bookWithAvailableCopies} onAction={onAction} />);

    expect(bookDetail.getByText('1 of 1', { exact: true })).toBeInTheDocument();
  });

  it('renders BookPublicationInfo component', () => {
    const bookDetail = render(<BookDetail book={book} onAction={onAction} />);

    expect(bookDetail.getByText('Publisher')).toBeInTheDocument();
    expect(bookDetail.getByText('Addison-Wesley Professional', { exact: true })).toBeInTheDocument();

    expect(bookDetail.getByText('Publication date', { exact: true })).toBeInTheDocument();
    expect(bookDetail.getByText('2003-05-17', { exact: true })).toBeInTheDocument();

    expect(bookDetail.getByText('Pages')).toBeInTheDocument();
    expect(bookDetail.getByText('220')).toBeInTheDocument();
  });

  it('renders description and goodreads link', () => {
    const bookDetail = render(<BookDetail book={book} onAction={onAction} />);

    expect(bookDetail.getByText('Lorem ipsum...', { exact: true })).toBeInTheDocument();

    const viewOnGoodReadsLink = bookDetail.getByText('View on GoodReads', { exact: true });
    expect(viewOnGoodReadsLink.closest('a'))
      .toHaveAttribute('href', 'https://www.goodreads.com/search?q=9780321146533');
  });

  it('renders BookBorrowers component', () => {
    const bookWithNoAvailableCopies = someBookWithNoAvailableCopies();

    const bookDetail = render(<BookDetail book={bookWithNoAvailableCopies} onAction={onAction} />);

    expect(bookDetail.getByText('Borrowed')).toBeInTheDocument();
    expect(bookDetail.getByText('2 years ago')).toBeInTheDocument();
    expect(bookDetail.getByText('Some User')).toBeInTheDocument();
  });

  it('should propagate button action when clicking on borrow button', () => {
    const { getByText } = render(<BookDetail book={book} onAction={onAction} />);

    fireEvent.click(getByText('Borrow'));

    expect(onAction).toHaveBeenCalledWith(BORROW_BOOK_ACTION);
  });

  it('should propagate report book missing action when clicking on missing button', () => {
    const bookDetail = render(<BookDetail book={book} onAction={onAction} />);

    bookDetail.getByText('Report Missing').click();

    expect(onAction).toHaveBeenCalledWith(REPORT_BOOK_MISSING);
  });

  it('should propagate report book found action when clicking on found button', () => {
    const bookWithMissingCopy = someBook(
      [{
        id: 1,
        user: null,
        missing: true,
      }],
    );
    const bookDetail = render(<BookDetail book={bookWithMissingCopy} onAction={onAction} />);

    bookDetail.getByText('Report Found').click();

    expect(onAction).toHaveBeenCalledWith(REPORT_BOOK_FOUND);
  });
});
