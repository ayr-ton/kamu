import React from 'react';
import { shallow } from 'enzyme';
import Dialog from '@material-ui/core/Dialog';

import BookDetail from './BookDetail';
import { someBook, someBookWithAvailableCopies, someBookWithNoAvailableCopies } from '../../test/booksHelper';
import BookBorrowers from './BookBorrowers';

const shallowBookDetail = (props) => shallow(<BookDetail {...props} />);
const book = someBook();
const testDefaultProps = {
  book,
  changeOpenStatus: jest.fn(),
  actionButtons: jest.fn(),
  open: true,
};

describe('Book Detail', () => {
  it('renders closed Dialog if open is set to false', () => {
    const bookDetail = shallowBookDetail({ ...testDefaultProps, open: false });
    expect(bookDetail.find(Dialog).props().open).toBeFalsy();
  });

  it('render open Dialog if open is set to true', () => {
    const bookDetail = shallowBookDetail({ ...testDefaultProps });
    expect(bookDetail.find(Dialog).props().open).toBeTruthy();
  });

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

  it('renders components returned by actionButtons prop function', () => {
    testDefaultProps.actionButtons.mockReturnValue(<div>mocked action buttons</div>);
    const bookDetail = shallowBookDetail({ ...testDefaultProps });
    expect(
      bookDetail.find('.modal-book__image-box div.modal-book__actions-buttons').text(),
    ).toEqual('mocked action buttons');
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

  it('renders \'0 of 1\' when no copies out of 1 are available', () => {
    testDefaultProps.book = someBookWithNoAvailableCopies();

    const bookDetail = shallowBookDetail({ ...testDefaultProps });

    expect(
      bookDetail.find('.modal-book__available-wrapper div.modal-book__detail-value').text(),
    ).toEqual('0 of 1');
  });

  it('renders information about publication if this information is present', () => {
    const bookDetail = shallowBookDetail({ ...testDefaultProps });

    expect(
      bookDetail.find('.modal-book__publisher-name div.modal-book__detail-value').text(),
    ).toEqual('Addison-Wesley Professional');
    expect(
      bookDetail.find('.modal-book__publication-date div.modal-book__detail-value').text(),
    ).toEqual('2003-05-17');
    expect(
      bookDetail.find('.modal-book__number-of-pages div.modal-book__detail-value').text(),
    ).toEqual('220');
  });

  it('does not render information about publication if this info is missing', () => {
    testDefaultProps.book.number_of_pages = null;
    testDefaultProps.book.publication_date = null;
    testDefaultProps.book.publisher = null;
    const bookDetail = shallowBookDetail({ ...testDefaultProps });

    expect(
      bookDetail.find('.modal-book__publisher-wrapper'),
    ).toHaveLength(0);
  });

  it('renders description and goodreads link', () => {
    const bookDetail = shallowBookDetail({ ...testDefaultProps });

    expect(
      bookDetail.find('.modal-book__description').text(),
    ).toEqual('Lorem ipsum...');
    expect(
      bookDetail.find('.modal-book__goodreads a').props().href,
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
});
