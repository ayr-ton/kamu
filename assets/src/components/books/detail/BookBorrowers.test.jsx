import React from 'react';
import { shallow } from 'enzyme';
import Avatar from '@material-ui/core/Avatar';

import BookBorrowers from './BookBorrowers';
import { someBookWithNoAvailableCopies, someBookWithAvailableCopies } from '../../../../test/booksHelper';

const shallowBookBorrowers = ({ copies }) => shallow(<BookBorrowers copies={copies} />);

describe('BookBorrowers', () => {
  let testDefaultProps;

  beforeEach(() => {
    testDefaultProps = {
      copies: someBookWithNoAvailableCopies().copies,
    };
  });

  it('does not render anything if copies is empty', () => {
    testDefaultProps.copies = [];
    const bookDetail = shallowBookBorrowers({ ...testDefaultProps });

    expect(
      bookDetail.find('.modal-book__borrowed-informations'),
    ).toHaveLength(0);
  });

  it('does not render anything if there are only available copies', () => {
    testDefaultProps.copies = someBookWithAvailableCopies().copies;
    const bookDetail = shallowBookBorrowers({ ...testDefaultProps });

    expect(
      bookDetail.find('.modal-book__borrowed-informations'),
    ).toHaveLength(0);
  });

  it('renders information about who are the people who have a borrowed copy', () => {
    const bookDetail = shallowBookBorrowers({ ...testDefaultProps });

    expect(
      bookDetail.find('.modal-book__borrowed-informations').find(Avatar),
    ).toHaveLength(1);
  });

  it('renders information about how long a person is with a book if borrow_date is in the copy data', () => {
    const bookDetail = shallowBookBorrowers({ ...testDefaultProps });

    expect(
      bookDetail.find('.modal-book__borrowed-elapsed-time'),
    ).toHaveLength(1);
  });

  it('does not render information about how long a person is with a book if no borrow_date is informed', () => {
    const copiesWithNoBorrowDate = testDefaultProps.copies.map((copy) => ({
      ...copy,
      borrow_date: null,
    }));

    const bookDetail = shallowBookBorrowers({ copies: copiesWithNoBorrowDate });

    expect(
      bookDetail.find('.modal-book__borrowed-elapsed-time'),
    ).toHaveLength(0);
  });
});
