import React from 'react';
import { shallow } from 'enzyme';
import { Link } from '@material-ui/core';
import { render, fireEvent } from '@testing-library/react';
import { someBook, someBookWithAvailableCopies, someBookWithNoAvailableCopies } from '../../../../test/booksHelper';
import BookBorrowers from './BookBorrowers';
import BookPublicationInfo from './BookPublicationInfo';
import BookDetail from './BookDetail';
import {
  BORROW_BOOK_ACTION,
  REPORT_BOOK_FOUND,
  REPORT_BOOK_MISSING,
} from '../../../utils/constants';

const shallowBookDetail = (props) => shallow(<BookDetail {...props} />);
const book = someBook();
const onAction = jest.fn();
const testDefaultProps = {
  book,
  onAction,
};

describe('Book Detail', () => {
  it('renders img with book cover if book\'s image_url is informed', () => {
    const bookDetail = shallowBookDetail({ ...testDefaultProps });
    expect(bookDetail.find('img.modal-book__image').props().src).toEqual(
      'http://books.google.com.br/books/content?id=gFgnde_vwMAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    );
  });

  it('does not render img with book cover if book\'s image_url is not informed', () => {
    testDefaultProps.book.image_url = null;
    const bookDetail = shallowBookDetail({ ...testDefaultProps });
    expect(bookDetail.find('img.modal-book__image')).toHaveLength(0);
  });

  it('renders book title and author', () => {
    const bookDetail = shallowBookDetail({ ...testDefaultProps });
    expect(
      bookDetail.find('.modal-book__details div.modal-book__title').text(),
    ).toEqual('Test Driven Development');
    expect(
      bookDetail.find('.modal-book__details div.modal-book__author').text(),
    ).toEqual('Kent Beck');
  });

  it('renders \'1 of 1\' when 1 out of 1 copies are available', () => {
    testDefaultProps.book = someBookWithAvailableCopies();

    const bookDetail = shallowBookDetail({ ...testDefaultProps });

    expect(
      bookDetail.find('.modal-book__available-wrapper div.modal-book__detail-value').text(),
    ).toEqual('1 of 1');
  });

  it('renders info showing that there are 0 available copies', () => {
    testDefaultProps.book = someBookWithNoAvailableCopies();

    const bookDetail = shallowBookDetail({ ...testDefaultProps });

    expect(
      bookDetail.find('.modal-book__available-wrapper div.modal-book__detail-value').text(),
    ).toEqual('0 of 1');
  });

  it('renders BookPublicationInfo component', () => {
    const bookDetail = shallowBookDetail({ ...testDefaultProps });

    expect(
      bookDetail.find('.modal-book__details-container').find(BookPublicationInfo),
    ).toHaveLength(1);
    expect(
      bookDetail.find('.modal-book__details-container').find(BookPublicationInfo).props().book,
    ).toEqual(testDefaultProps.book);
  });

  it('renders description and goodreads link', () => {
    const bookDetail = shallowBookDetail({ ...testDefaultProps });

    expect(
      bookDetail.find('.modal-book__description').text(),
    ).toEqual('Lorem ipsum...');
    expect(
      bookDetail.find('.modal-book__goodreads').find(Link).props().href,
    ).toEqual('https://www.goodreads.com/search?q=9780321146533');
  });

  it('renders BookBorrowers component', () => {
    testDefaultProps.book = someBookWithNoAvailableCopies();
    const bookDetail = shallowBookDetail({ ...testDefaultProps });

    expect(
      bookDetail.find('.modal-book__status').find(BookBorrowers),
    ).toHaveLength(1);
    expect(
      bookDetail.find('.modal-book__status').find(BookBorrowers).props().copies,
    ).toEqual(testDefaultProps.book.copies);
  });

  it('should propagate button action when clicking action button', () => {
    const { getByText } = render(<BookDetail book={book} onAction={onAction} />);

    fireEvent.click(getByText('Borrow'));

    expect(onAction).toHaveBeenCalledWith(BORROW_BOOK_ACTION);
  });

  it('should propagate report book missing action when clicking on missing button', () => {
    const bookDetail = render(<BookDetail book={book} onAction={onAction} />);

    bookDetail.getByText('Missing').click();

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

    bookDetail.getByText('Found').click();

    expect(onAction).toHaveBeenCalledWith(REPORT_BOOK_FOUND);
  });
});
