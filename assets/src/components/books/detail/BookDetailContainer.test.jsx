import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BookDetailContainer from './BookDetailContainer';

import { someBook } from '../../../../test/booksHelper';
import { getBook } from '../../../services/BookService';
import { BORROW_BOOK_ACTION, CLOSE_BOOK_ACTION } from '../../../utils/constants';

jest.mock('../../../services/BookService');

describe('BookDetailContainer', () => {
  const book = someBook();
  const renderComponent = ({ onAction = jest.fn() } = {}) => render(
    <BookDetailContainer librarySlug="sp" bookId="123" history={{}} onAction={onAction} />,
  );

  test('makes an api call to fetch book and displays the book that was returned', async () => {
    getBook.mockResolvedValue(book);

    const { findByTestId, getByText } = renderComponent();

    await findByTestId('book-detail-wrapper');

    expect(getBook).toHaveBeenCalledWith('sp', '123');
    expect(getByText(book.title)).toBeVisible();
  });

  test('shows a loading indicator while loading the book', async () => {
    getBook.mockResolvedValue(book);

    const { getByTestId } = renderComponent();

    expect(getByTestId('loading-indicator')).toBeVisible();
    await waitForElementToBeRemoved(() => getByTestId('loading-indicator'));
  });

  it('should propagate close action when dialog is closed', async () => {
    getBook.mockResolvedValue(book);
    const onAction = jest.fn();
    const { findByTestId } = renderComponent({ onAction });
    const closeButton = await findByTestId('modal-close-button');

    userEvent.click(closeButton);

    expect(onAction).toHaveBeenCalledWith(CLOSE_BOOK_ACTION, expect.anything());
  });

  it('should propagate button action when clicking action button', async () => {
    getBook.mockResolvedValue(book);
    const onAction = jest.fn().mockResolvedValue(book);
    const { findByText } = renderComponent({ onAction });

    userEvent.click(await findByText('Borrow'));

    expect(onAction).toHaveBeenCalledWith(BORROW_BOOK_ACTION, book);
  });

  test('shows an error message when book is not found', async () => {
    getBook.mockRejectedValue(new Error('Not Found'));

    const { getByTestId, findByText } = renderComponent();

    await waitForElementToBeRemoved(() => getByTestId('loading-indicator'));
    expect(await findByText(/could not find the book/i)).toBeVisible();
  });

  test('shows an error message when book fails loading', async () => {
    getBook.mockRejectedValue(new Error('Internal Server Error'));

    const { getByTestId, findByText } = renderComponent();

    await waitForElementToBeRemoved(() => getByTestId('loading-indicator'));
    expect(await findByText(/could not load the book/i)).toBeVisible();
  });
});
