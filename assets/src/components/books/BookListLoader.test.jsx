import React from 'react';
import {
  act, fireEvent, waitForElement, waitForElementToBeRemoved,
} from '@testing-library/react';
import { wait } from '@testing-library/dom';
import { renderWithRouter as render } from '../../../test/renderWithRouter';
import { someBookWithACopyFromMe, someBookWithAvailableCopies } from '../../../test/booksHelper';
import BookListLoader from './BookListLoader';
import performAction from '../../utils/bookAction';
import UserContext from '../UserContext';

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

  it('updates the user context after book action', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });
    performAction.mockResolvedValue(someBookWithAvailableCopies());
    const updateUser = jest.fn();

    const { findByText } = render(
      <UserContext.Provider value={{ updateUser }}>
        <BookListLoader source={bookSource} noBooksMessage="" />
      </UserContext.Provider>,
    );

    await act(async () => {
      fireEvent.click(await findByText('Return'));
      await wait(() => expect(updateUser).toHaveBeenCalled());
    });
  });
});
