import React from 'react';
import {
  fireEvent,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { renderWithRouter as render } from '../../../test/renderWithRouter';
import { someBookWithACopyFromMe, someBookWithAvailableCopies } from '../../../test/booksHelper';
import BookListLoader from './BookListLoader';
import performAction from '../../utils/bookAction';

jest.mock('../../utils/bookAction');

describe('BookListLoader', () => {
  const books = [someBookWithACopyFromMe()];

  test('makes an api call and displays the books that were returned', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });

    const { getAllByTestId } = render(<BookListLoader source={bookSource} noBooksMessage="" />);

    await waitForElement(() => getAllByTestId('book-list-container'));

    expect(bookSource).toHaveBeenCalledTimes(1);

    expect(getAllByTestId('book-container')).toHaveLength(1);
  });

  test('shows a loading indicator while loading the books', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });

    const { getByTestId } = render(<BookListLoader source={bookSource} noBooksMessage="" />);

    expect(getByTestId('loading-indicator')).toBeDefined();

    await waitForElementToBeRemoved(() => getByTestId('loading-indicator'));
  });

  test('shows a message when the book list is empty', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: [] });
    const expectedMessage = "You don't have any books";

    const { getByTestId } = render(<BookListLoader
      source={bookSource}
      noBooksMessage={expectedMessage}
    />);

    const noBooksComponent = await waitForElement(() => getByTestId('no-books-message'));

    expect(noBooksComponent.textContent).toEqual(expectedMessage);
  });

  it('updates the action button in book card after returning book', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });
    performAction.mockResolvedValue(someBookWithAvailableCopies());

    const { findByText } = render(<BookListLoader source={bookSource} noBooksMessage="" />);

    fireEvent.click(await findByText('Return'));
    expect(await findByText('Borrow')).toBeVisible();
  });
});
