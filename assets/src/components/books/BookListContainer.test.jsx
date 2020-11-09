import React from 'react';
import {
  act, render, waitFor, waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { someBookWithACopyFromMe, someBookWithAvailableCopies } from '../../../test/booksHelper';
import { BookListContainer } from './BookListContainer';
import performAction from '../../utils/bookAction';
import UserContext from '../UserContext';
import { bookUrl } from '../../utils/urls';

jest.mock('../../utils/bookAction');

describe('Book list container', () => {
  const books = [{
    ...someBookWithACopyFromMe(),
    library: 'library',
  }];
  let history;

  beforeEach(() => {
    history = { push: jest.fn() };
  });

  test('makes an api call and displays the books that were returned', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });

    const { getAllByTestId, findAllByTestId } = render(<BookListContainer source={bookSource} noBooksMessage="" history={history} />);

    await findAllByTestId('book-list-container');

    expect(bookSource).toHaveBeenCalledTimes(1);
    expect(getAllByTestId('book-container')).toHaveLength(1);
  });

  test('shows a loading indicator while loading the books', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });

    const { getByTestId } = render(<BookListContainer source={bookSource} noBooksMessage="" history={history} />);

    expect(getByTestId('loading-indicator')).toBeDefined();
    await waitForElementToBeRemoved(() => getByTestId('loading-indicator'));
  });

  test('shows a message when the book list is empty', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: [] });
    const expectedMessage = "You don't have any books";

    const { findByTestId } = render(<BookListContainer
      source={bookSource}
      noBooksMessage={expectedMessage}
      history={history}
    />);

    const noBooksComponent = await findByTestId('no-books-message');

    expect(noBooksComponent.textContent).toEqual(expectedMessage);
  });

  test('redirects to the book detail in library when clicking book', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });
    const { findByText } = render(<BookListContainer source={bookSource} noBooksMessage="" history={history} />);

    userEvent.click(await findByText(books[0].title));

    expect(history.push).toHaveBeenCalledWith(bookUrl(books[0], books[0].library));
  });

  it('updates the action button in book card after returning book', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });
    performAction.mockResolvedValue({ ...someBookWithAvailableCopies(), id: books[0].id });

    const { findByText } = render(<BookListContainer source={bookSource} noBooksMessage="" history={history} />);

    userEvent.click(await findByText('Return'));
    expect(await findByText('Borrow')).toBeVisible();
  });

  it('updates the user context after book action', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });
    performAction.mockResolvedValue({ ...someBookWithAvailableCopies(), id: books[0].id });
    const updateUser = jest.fn();

    const { findByText } = render(
      <UserContext.Provider value={{ updateUser }}>
        <BookListContainer source={bookSource} noBooksMessage="" history={history} />
      </UserContext.Provider>,
    );

    await act(async () => {
      userEvent.click(await findByText('Return'));
      await waitFor(() => expect(updateUser).toHaveBeenCalled());
    });
  });
});
