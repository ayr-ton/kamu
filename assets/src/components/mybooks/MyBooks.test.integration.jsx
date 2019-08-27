import React from 'react';
import {
  render,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import MyBooks from './MyBooks';
import { getMyBooks, getWaitlistBooks } from '../../services/BookService';

import { someBookWithACopyFromMe } from '../../../test/booksHelper';

jest.mock('../../services/BookService');
jest.mock('../../utils/toggles', () => ({
  isWaitlistFeatureActive: () => true,
}));

describe('MyBooks', () => {
  const books = [someBookWithACopyFromMe()];

  test('makes an api call and displays the books that were returned', async () => {
    getMyBooks.mockResolvedValueOnce({ results: books });
    getWaitlistBooks.mockResolvedValueOnce({ results: books });

    const { getAllByTestId, getByText, unmount } = render(<MyBooks />);

    expect(getByText('My books')).toBeDefined();

    await waitForElement(() => getAllByTestId('book-list-container'));

    expect(getMyBooks).toHaveBeenCalledTimes(1);
    expect(getWaitlistBooks).toHaveBeenCalledTimes(1);

    expect(getAllByTestId('book-container')).toHaveLength(2);
    unmount();
  });

  test('shows a loading indicator while loading borrowed books', async () => {
    getMyBooks.mockResolvedValueOnce({ results: books });
    getWaitlistBooks.mockResolvedValueOnce({ results: books });

    const { getByTestId, unmount } = render(<MyBooks />);

    expect(getByTestId('loading-indicator-borrowed')).toBeDefined();

    await waitForElementToBeRemoved(() => getByTestId('loading-indicator-borrowed'));
    unmount();
  });

  test('shows a loading indicator while loading wait list books', async () => {
    getMyBooks.mockResolvedValueOnce({ results: books });
    getWaitlistBooks.mockResolvedValueOnce({ results: books });

    const { getByTestId, unmount } = render(<MyBooks />);

    expect(getByTestId('loading-indicator-wait-list')).toBeDefined();

    await waitForElementToBeRemoved(() => getByTestId('loading-indicator-wait-list'));
    unmount();
  });
});
