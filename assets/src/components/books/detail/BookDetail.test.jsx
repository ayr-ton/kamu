import React from 'react';
import { shallow } from 'enzyme';
import { Link } from '@material-ui/core';
import { fireEvent, render } from '@testing-library/react';

import { BookDetail } from './BookDetail';
import { someBook, someBookWithAvailableCopies, someBookWithNoAvailableCopies } from '../../../../test/booksHelper';
import BookBorrowers from './BookBorrowers';
import BookPublicationInfo from './BookPublicationInfo';

const shallowBookDetail = (props) => shallow(<BookDetail history={{}} {...props} />);
const book = someBook();
const testDefaultProps = {
  book,
  actionButtons: jest.fn(),
  librarySlug: 'sp',
};

describe('Book Detail', () => {
  it('redirects to the library when dialog is closed', () => {
    const history = { push: jest.fn() };
    const { getByTestId } = render(<BookDetail history={history} {...testDefaultProps} />);
    const closeButton = getByTestId('modal-close-button');

    fireEvent.click(closeButton);

    expect(history.push).toHaveBeenCalledWith('/libraries/sp');
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
});
