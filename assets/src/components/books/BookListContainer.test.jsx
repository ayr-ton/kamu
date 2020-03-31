import React from 'react';
import {
  act, fireEvent, render, waitForElement, waitForElementToBeRemoved,
} from '@testing-library/react';
import { wait } from '@testing-library/dom';
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

  test('makes an api call and displays the books that were returned', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });

    const { getAllByTestId } = render(<BookListContainer source={bookSource} noBooksMessage="" history={{}} />);

    await waitForElement(() => getAllByTestId('book-list-container'));

    expect(bookSource).toHaveBeenCalledTimes(1);
    expect(getAllByTestId('book-container')).toHaveLength(1);
  });

  test('shows a loading indicator while loading the books', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });

    const { getByTestId } = render(<BookListContainer source={bookSource} noBooksMessage="" history={{}} />);

    expect(getByTestId('loading-indicator')).toBeDefined();
    await waitForElementToBeRemoved(() => getByTestId('loading-indicator'));
  });

  test('shows a message when the book list is empty', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: [] });
    const expectedMessage = "You don't have any books";

    const { getByTestId } = render(<BookListContainer
      source={bookSource}
      noBooksMessage={expectedMessage}
      history={{}}
    />);

    const noBooksComponent = await waitForElement(() => getByTestId('no-books-message'));

    expect(noBooksComponent.textContent).toEqual(expectedMessage);
  });

  test('redirects to the book detail in library when clicking book', async () => {
    const history = { push: jest.fn() };
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });
    const { findByText } = render(<BookListContainer source={bookSource} noBooksMessage="" history={history} />);

    fireEvent.click(await findByText(books[0].title));

    expect(history.push).toHaveBeenCalledWith(bookUrl(books[0], books[0].library));
  });

  it('updates the action button in book card after returning book', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });
    performAction.mockResolvedValue(someBookWithAvailableCopies());

    const { findByText } = render(<BookListContainer source={bookSource} noBooksMessage="" history={{}} />);

    fireEvent.click(await findByText('Return'));
    expect(await findByText('Borrow')).toBeVisible();
  });

  it('updates the user context after book action', async () => {
    const bookSource = jest.fn().mockResolvedValueOnce({ results: books });
    performAction.mockResolvedValue(someBookWithAvailableCopies());
    const updateUser = jest.fn();

    const { findByText } = render(
      <UserContext.Provider value={{ updateUser }}>
        <BookListContainer source={bookSource} noBooksMessage="" history={{}} />
      </UserContext.Provider>,
    );

    await act(async () => {
      fireEvent.click(await findByText('Return'));
      await wait(() => expect(updateUser).toHaveBeenCalled());
    });
  });
});
