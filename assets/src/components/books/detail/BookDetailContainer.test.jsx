import React from 'react';
import { fireEvent, waitForElement, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRouter as render } from '../../../../test/renderWithRouter';

import { BookDetailContainer } from './BookDetailContainer';

import { someBook } from '../../../../test/booksHelper';
import { getBook } from '../../../services/BookService';

jest.mock('../../../services/BookService');

describe('BookDetailContainer', () => {
  const book = someBook();

  test('makes an api call to fetch book and displays the book that was returned', async () => {
    getBook.mockResolvedValue(book);

    const { getByTestId, getByText } = render(<BookDetailContainer librarySlug="sp" bookId="123" history={{}} />);

    await waitForElement(() => getByTestId('book-detail-wrapper'));

    expect(getBook).toHaveBeenCalledWith('sp', '123');
    expect(getByText(book.title)).toBeVisible();
  });

  test('shows a loading indicator while loading the book', async () => {
    getBook.mockResolvedValue(book);

    const { getByTestId } = render(<BookDetailContainer librarySlug="sp" bookId="123" history={{}} />);

    expect(getByTestId('loading-indicator')).toBeVisible();
    await waitForElementToBeRemoved(() => getByTestId('loading-indicator'));
  });

  it('redirects to the library when dialog is closed', () => {
    getBook.mockResolvedValue(book);
    const history = { push: jest.fn() };
    const { getByTestId } = render(<BookDetailContainer librarySlug="sp" bookId="123" history={history} />);
    const closeButton = getByTestId('modal-close-button');

    fireEvent.click(closeButton);

    expect(history.push).toHaveBeenCalledWith('/libraries/sp');
  });

  // TODO: test for when book is not found
});
