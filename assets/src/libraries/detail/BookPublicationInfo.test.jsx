import React from 'react';
import { shallow } from 'enzyme';

import BookPublicationInfo from './BookPublicationInfo';
import { someBook } from '../../../test/booksHelper';

const shallowBookPublicationInfo = (props) => shallow(<BookPublicationInfo {...props} />);

describe('BookPublicationInfo', () => {
  let testDefaultProps;

  beforeEach(() => {
    testDefaultProps = {
      book: someBook(),
    };
  });

  it('renders information about publication if this information is present', () => {
    const bookDetail = shallowBookPublicationInfo({ ...testDefaultProps });

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
    const bookDetail = shallowBookPublicationInfo({ ...testDefaultProps });

    expect(
      bookDetail.find('.modal-book__publisher-wrapper'),
    ).toHaveLength(0);
  });
});
