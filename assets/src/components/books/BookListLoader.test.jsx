import React from 'react';
import {
  render,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import BookListLoader from './BookListLoader';

import { someBookWithACopyFromMe } from '../../../test/booksHelper';

describe('BookListLoader', () => {
  const books = [someBookWithACopyFromMe()];

  test('makes an api call and displays the books that were returned', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });

    const { getAllByTestId, unmount } = render(<BookListLoader source={bookSource} noBooksMessage="" />);

    await waitForElement(() => getAllByTestId('book-list-container'));

    expect(bookSource).toHaveBeenCalledTimes(1);

    expect(getAllByTestId('book-container')).toHaveLength(1);
    unmount();
  });

  test('shows a loading indicator while loading the books', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });

    const { getByTestId, unmount } = render(<BookListLoader source={bookSource} noBooksMessage="" />);

    expect(getByTestId('loading-indicator')).toBeDefined();

    await waitForElementToBeRemoved(() => getByTestId('loading-indicator'));
    unmount();
  });

  test('shows a message when the book list is empty', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: [] });
    const expectedMessage = "You don't have any books";

    const { getByTestId, unmount } = render(<BookListLoader
      source={bookSource}
      noBooksMessage={expectedMessage}
    />);

    const noBooksComponent = await waitForElement(() => getByTestId('no-books-message'));

    expect(noBooksComponent.textContent).toEqual(expectedMessage);
    unmount();
  });
});
