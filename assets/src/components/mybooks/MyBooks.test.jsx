import React from 'react';
import { waitForElement } from '@testing-library/react';
import { getMyBooks, getWaitlistBooks } from '../../services/BookService';
import { someBookWithACopyFromMe } from '../../../test/booksHelper';
import { renderWithRouter as render } from '../../../test/renderWithRouter';
import MyBooks from './MyBooks';

jest.mock('../../services/BookService');

describe('My Books', () => {
  const books = [someBookWithACopyFromMe()];

  test('makes an api call and displays the books that were returned', async () => {
    getMyBooks.mockResolvedValueOnce({ results: books });
    getWaitlistBooks.mockResolvedValueOnce({ results: books });

    const { getAllByTestId } = render(<MyBooks />);

    await waitForElement(() => getAllByTestId('book-list-container'));

    expect(getMyBooks).toHaveBeenCalledTimes(1);
    expect(getWaitlistBooks).toHaveBeenCalledTimes(1);

    expect(getAllByTestId('book-container')).toHaveLength(2);
  });
});
