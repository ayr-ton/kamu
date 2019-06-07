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

    const { getAllByTestId, getByTestId, getByText } = render(<MyBooks />);

    expect(getByText('My books')).toBeDefined();

    await waitForElement(() => getByTestId('book-list-container'));

    expect(fetchFromAPI).toHaveBeenCalledTimes(1);
    expect(fetchFromAPI).toHaveBeenCalledWith('/profile/books');

    expect(getAllByTestId('book-container')).toHaveLength(1);
  });
});
