import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Book from './Book';
import {
  someBook,
  someBookWithAvailableCopies,
  someBookWithACopyFromMe,
  someBookThatCanBeAddedToWaitlist,
  someBookThatIsInMyWaitlist,
} from '../../../test/booksHelper';

import { BORROW_BOOK_ACTION, OPEN_BOOK_ACTION } from '../../utils/constants';

jest.mock('../../services/BookService');

const onAction = jest.fn();
const renderComponent = (book) => render(<Book book={book} onAction={onAction} />);

describe('Book', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should contain the book cover image', () => {
    const book = someBook();

    const { getByRole } = renderComponent(book);

    expect(getByRole('img')).toHaveAttribute('src', book.image_url);
  });

  it('should propagate open book action when clicking book title', () => {
    const book = someBook();
    const { getByText } = renderComponent(book);

    userEvent.click(getByText(book.title));

    expect(onAction).toHaveBeenCalledWith(OPEN_BOOK_ACTION);
  });

  it('should propagate button action when clicking action button', () => {
    const book = someBookWithAvailableCopies();
    const { getByText } = renderComponent(book);

    userEvent.click(getByText('Borrow'));

    expect(onAction).toHaveBeenCalledWith(BORROW_BOOK_ACTION);
  });

  it('has a waitlist indicator when book is on users waitlist', async () => {
    const book = someBookThatIsInMyWaitlist();
    const { getByTestId, getByText } = renderComponent(book);

    expect(getByTestId('waitlist-indicator')).toBeDefined();
    expect(getByText(/Sep 1, 2019/)).toBeDefined();
  });

  it('doest not have a waitlist indicator when book is not on users waitlist', async () => {
    const booksNotOnWaitlist = [
      someBookWithACopyFromMe(),
      someBookWithAvailableCopies(),
      someBookThatCanBeAddedToWaitlist(),
    ];

    booksNotOnWaitlist.forEach((book) => {
      const { queryByTestId } = renderComponent(book);
      expect(queryByTestId('waitlist-indicator')).toBeNull();
    });
  });
});
