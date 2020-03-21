import React from 'react';
import {
  render,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import BookDetailLoader from './BookDetailLoader';

import { someBook } from '../../../../test/booksHelper';
import { getBook } from '../../../services/BookService';

jest.mock('../../../services/BookService');

describe('BookDetailLoader', () => {
  const book = someBook();

  test('makes an api call to fetch book and displays the book that was returned', async () => {
    getBook.mockResolvedValue(book);

    const { getByTestId, getByText } = render(<BookDetailLoader librarySlug="sp" bookId="123" />);

    await waitForElement(() => getByTestId('book-detail-wrapper'));

    expect(getBook).toHaveBeenCalledWith('sp', '123');
    expect(getByText(book.title)).toBeVisible();
  });

  test('shows a loading indicator while loading the book', async () => {
    getBook.mockResolvedValue(book);

    const { getByTestId } = render(<BookDetailLoader librarySlug="sp" bookId="123" />);

    expect(getByTestId('loading-indicator')).toBeVisible();
    await waitForElementToBeRemoved(() => getByTestId('loading-indicator'));
  });

  // TODO: test for when book is not found
});
