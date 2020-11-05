import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookList from './BookList';
import { someBook } from '../../../test/booksHelper';
import { OPEN_BOOK_ACTION } from '../../utils/constants';

describe('Book list', () => {
  it('should render the list of books', () => {
    const books = [
      { ...someBook(), id: 1, title: 'Book 1' },
      { ...someBook(), id: 2, title: 'Another book' },
    ];

    const { getByText } = render(<BookList books={books} onAction={jest.fn()} />);

    expect(getByText('Book 1')).toBeInTheDocument();
    expect(getByText('Another book')).toBeInTheDocument();
  });

  it('should propagate the book action when it occurs', async () => {
    const books = [someBook()];
    const onAction = jest.fn();

    const { getByText } = render(<BookList books={books} onAction={onAction} />);
    await userEvent.click(getByText(books[0].title));

    expect(onAction).toHaveBeenCalledWith(OPEN_BOOK_ACTION, books[0]);
  });
});
