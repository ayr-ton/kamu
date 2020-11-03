import React from 'react';
import { render } from '@testing-library/react';

import BookBorrowers from './BookBorrowers';
import { someBookWithNoAvailableCopies, someBookWithAvailableCopies } from '../../../../test/booksHelper';

describe('BookBorrowers', () => {
  let testDefaultProps;

  beforeEach(() => {
    testDefaultProps = {
      copies: someBookWithNoAvailableCopies().copies,
    };
  });

  it('does not render anything if copies is empty', () => {
    testDefaultProps.copies = [];
    const bookBorrowers = render(<BookBorrowers copies={testDefaultProps.copies} />);

    expect(bookBorrowers.queryByText('Borrowed')).not.toBeInTheDocument();
  });

  it('does not render anything if there are only available copies', () => {
    testDefaultProps.copies = someBookWithAvailableCopies().copies;
    const bookBorrowers = render(<BookBorrowers copies={testDefaultProps.copies} />);
    expect(bookBorrowers.queryByText('Borrowed')).not.toBeInTheDocument();
  });

  it('renders information about who are the people who have a borrowed copy', () => {
    const bookBorrowers = render(<BookBorrowers copies={testDefaultProps.copies} />);
    expect(bookBorrowers.getByText('Borrowed')).toBeInTheDocument();
    expect(bookBorrowers.getByText('2 years ago')).toBeInTheDocument();
    expect(bookBorrowers.getByText('Some User')).toBeInTheDocument();
    // TODO how can we check if Avatar is being rendered?
  });

  it('renders information about how long a person is with a book if borrow_date is in the copy data', () => {
    const bookBorrowers = render(<BookBorrowers copies={testDefaultProps.copies} />);
    expect(bookBorrowers.getByText('Borrowed', { exact: true })).toBeInTheDocument();
    expect(bookBorrowers.getByText('2 years ago', { exact: true })).toBeInTheDocument();
  });

  it('does not render information about how long a person is with a book if no borrow_date is informed', () => {
    const copiesWithNoBorrowDate = testDefaultProps.copies.map((copy) => ({
      ...copy,
      borrow_date: null,
    }));

    const bookBorrowers = render(<BookBorrowers copies={copiesWithNoBorrowDate} />);
    expect(bookBorrowers.queryByText('Borrowed', { exact: true })).not.toBeInTheDocument();
    expect(bookBorrowers.queryByText('2 years ago', { exact: true })).not.toBeInTheDocument();
  });
});
