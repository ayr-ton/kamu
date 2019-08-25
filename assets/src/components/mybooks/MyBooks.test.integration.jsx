import React from 'react';
import {
  render,
  waitForElement,
} from '@testing-library/react';

import MyBooks from './MyBooks';
import fetchFromAPI from '../../services/helpers';

import { someBookWithACopyFromMe } from '../../../test/booksHelper';

jest.mock('../../services/helpers');

describe('MyBooks', () => {
  test('makes an api call and display the books that were returned', async () => {
    const books = [someBookWithACopyFromMe()];
    fetchFromAPI.mockReturnValue({ results: books });

    const { getAllByTestId, getByText } = render(<MyBooks />);

    expect(getByText('My books')).toBeDefined();

    await waitForElement(() => getAllByTestId('book-list-container'));

    expect(fetchFromAPI).toHaveBeenCalledTimes(2);
    expect(fetchFromAPI).toHaveBeenCalledWith('/profile/books');
    expect(fetchFromAPI).toHaveBeenCalledWith('/profile/waitlist');

    expect(getAllByTestId('book-container')).toHaveLength(2);
  });
});
