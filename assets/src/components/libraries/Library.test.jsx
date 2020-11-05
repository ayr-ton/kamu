import React from 'react';
import {
  act, fireEvent, waitFor, within,
} from '@testing-library/react';
import {
  borrowBook, checkWaitlist, getBook, getBooksByPage,
} from '../../services/BookService';
import LibraryContainer, { Library } from './Library';
import { setRegion } from '../../services/UserPreferences';
import { mockGetBooksByPageResponse } from '../../../test/mockBookService';
import { renderWithRouter as render } from '../../../test/renderWithRouter';
import {
  someAvailableBookThatOthersAreInWaitlist,
  someBook,
  someBookWithACopyFromMe,
  someBookWithAvailableCopies,
} from '../../../test/booksHelper';
import {
  FIRST_ON_WAITLIST_STATUS,
  NO_WAITLIST_STATUS,
  OTHERS_ARE_WAITING_STATUS,
} from '../../utils/constants';
import UserContext from '../UserContext';

jest.mock('../../services/BookService');
jest.mock('../../services/UserPreferences');

const history = { push: jest.fn(), replace: jest.fn(), location: { search: '' } };

describe('Library', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    getBooksByPage.mockResolvedValue(mockGetBooksByPageResponse);
    window.ga = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('fetches the books with the search term when location has a query parameter', () => {
    history.location.search = '?q=test+search';
    render(<Library history={history} slug="bh" />);

    expect(getBooksByPage).toHaveBeenCalledWith('bh', 1, 'test search');
  });

  it('shows the search term in the search bar when location has a query parameter', () => {
    history.location.search = '?q=test+search';
    const { getByPlaceholderText } = render(<Library history={history} slug="bh" />);
    expect(getByPlaceholderText(/search/i)).toHaveValue('test search');
  });

  it('keeps the previous query params in the url even when search is updated', async () => {
    history.location.search = '?toggle=active';
    const { getByPlaceholderText } = render(<Library history={history} slug="bh" />);

    await fireEvent.change(getByPlaceholderText(/search/i), { target: { value: 'test search' } });

    expect(history.replace).toHaveBeenCalledWith({ search: 'toggle=active&q=test+search' });
    history.location.search = '';
  });

  it('removes the search query from the url when search field is cleared', async () => {
    history.location.search = '?q=test+search';
    const { getByPlaceholderText } = render(<Library history={history} slug="bh" />);

    await fireEvent.change(getByPlaceholderText(/search/i), { target: { value: '' } });

    expect(history.replace).toHaveBeenCalledWith({ search: '' });
  });

  it('sets the library in the users preferences when books are loaded', async () => {
    const { getAllByTestId } = render(<Library history={history} slug="bh" />);
    await waitFor(() => getAllByTestId('book-container'));

    expect(setRegion).toHaveBeenCalledWith('bh');
  });

  it('does not set the library in the users preferences when books fail to load', async () => {
    getBooksByPage.mockRejectedValue(new Error());
    render(<Library history={history} slug="bh" />);
    await waitFor(() => expect(setRegion).not.toHaveBeenCalled());
  });

  it('shows an error message when loading books fails', async () => {
    getBooksByPage.mockRejectedValue(new Error());
    const { findByTestId } = render(<Library history={history} slug="bh" />);

    expect(await findByTestId('error-message')).toBeVisible();
  });

  it('does not fetch the books again when the library slug passed via props does not change', () => {
    const { rerender } = render(<Library history={history} slug="bh" />);

    rerender(<Library history={history} slug="bh" />);

    expect(getBooksByPage).toHaveBeenCalledTimes(1);
  });

  it('fetches the first page of books for that library and renders it', async () => {
    const book = someBook();
    getBooksByPage.mockResolvedValue({ ...mockGetBooksByPageResponse, results: [book] });
    const { findByText } = render(<LibraryContainer slug="bh" />);

    expect(await findByText(book.title)).toBeInTheDocument();
  });

  it('loads the book detail modal when clicking on a book', async () => {
    const book = someBook();
    getBooksByPage.mockResolvedValue({ ...mockGetBooksByPageResponse, results: [book] });
    getBook.mockResolvedValueOnce(book);
    const { findByText, findByTestId } = render(<LibraryContainer slug="bh" />);

    await act(async () => {
      await fireEvent.click(await findByText(book.title));
      expect(await findByTestId('book-detail-wrapper')).toBeInTheDocument();
    });
  });

  it('closes the book detail modal when clicking on modal close button', async () => {
    const book = someBook();
    getBooksByPage.mockResolvedValue({ ...mockGetBooksByPageResponse, results: [book] });
    getBook.mockResolvedValueOnce(book);
    const { findByText, findByTestId, queryByTestId } = render(<LibraryContainer slug="bh" />);

    await act(async () => {
      fireEvent.click(await findByText(book.title));
      await findByTestId('book-detail-wrapper');
      fireEvent.click(queryByTestId('modal-close-button'));
      expect(queryByTestId('book-detail-wrapper')).toBeNull();
    });
  });

  describe('Book actions', () => {
    const book = someBookWithAvailableCopies();

    beforeEach(() => {
      getBooksByPage.mockResolvedValueOnce({ ...mockGetBooksByPageResponse, results: [book] });
      borrowBook.mockResolvedValueOnce({ ...someBookWithACopyFromMe(), id: book.id });
      checkWaitlist.mockResolvedValue({ status: NO_WAITLIST_STATUS });
    });

    it('updates the action button in book card after borrowing book from library', async () => {
      const { findByText } = render(<LibraryContainer slug="bh" />);

      fireEvent.click(await findByText('Borrow'));
      expect(await findByText('Return')).toBeVisible();
    });

    it('updates the action buttons after borrowing book from book detail', async () => {
      getBook.mockResolvedValueOnce(book);
      const { findByText, getAllByText, findByTestId } = render(<LibraryContainer slug="bh" />);

      fireEvent.click(await findByText(book.title));
      const bookDetail = await findByTestId('book-detail');

      fireEvent.click(within(bookDetail).getByText('Borrow'));
      await waitFor(() => expect(getAllByText('Return')).toHaveLength(2));
    });

    it('updates the user context after book action', async () => {
      const updateUser = jest.fn();
      const { findByText } = render(
        <UserContext.Provider value={{ updateUser }}>
          <LibraryContainer slug="bh" />
        </UserContext.Provider>,
      );

      fireEvent.click(await findByText('Borrow'));
      await waitFor(() => {
        expect(updateUser).toHaveBeenCalled();
      });
    });

    it('if there is no one on the waitlist, user can borrow it with no further confirmation', async () => {
      checkWaitlist.mockResolvedValue({ status: NO_WAITLIST_STATUS });

      const { getByText, findByTestId } = render(<LibraryContainer slug="bh" />);
      await findByTestId('book-container');
      const button = getByText('Borrow');
      fireEvent.click(button);

      await waitFor(() => {
        expect(checkWaitlist).toHaveBeenCalledWith(book);
        expect(borrowBook).toHaveBeenCalledWith(book);
        expect(getByText('Return')).toBeDefined();
      });
    });

    it('if they\'re the first on waitlist, user can borrow it with no further confirmation', async () => {
      checkWaitlist.mockResolvedValue({ status: FIRST_ON_WAITLIST_STATUS });

      const { getByText, findByTestId } = render(<LibraryContainer slug="bh" />);
      await findByTestId('book-container');

      const button = getByText('Borrow');
      await fireEvent.click(button);

      await waitFor(() => {
        expect(checkWaitlist).toHaveBeenCalledWith(book);
        expect(borrowBook).toHaveBeenCalledWith(book);
        expect(getByText('Return')).toBeDefined();
      });
    });

    it('if there are users waiting for longer, shows a confirmation dialog to the user', async () => {
      checkWaitlist.mockResolvedValue({ status: OTHERS_ARE_WAITING_STATUS });
      const bookThatOthersAreInWaitlist = someAvailableBookThatOthersAreInWaitlist();
      getBooksByPage.mockReset().mockResolvedValue({
        ...mockGetBooksByPageResponse, results: [bookThatOthersAreInWaitlist],
      });

      const { getByText, getByTestId, findByTestId } = render(<LibraryContainer slug="bh" />);
      await findByTestId('book-container');

      const button = getByText('Borrow');
      fireEvent.click(button);

      await waitFor(() => {
        expect(getByTestId('waitlist-users')).toHaveTextContent(
          'Users on the wait list: someuser@example.com, someotheruser@example.com',
        );
        expect(getByText(/Do you wish to proceed and borrow this book?/)).toBeDefined();
        expect(checkWaitlist).toHaveBeenCalledWith(bookThatOthersAreInWaitlist);
        expect(borrowBook).not.toHaveBeenCalled();
      });
    });

    it('if users confirms it, book is borrowed and dialog is closed', async () => {
      checkWaitlist.mockResolvedValue({ status: OTHERS_ARE_WAITING_STATUS });

      const {
        getByText, findByText, queryByText, findByTestId,
      } = render(<LibraryContainer slug="bh" />);
      await findByTestId('book-container');

      const button = getByText('Borrow');
      fireEvent.click(button);

      const confirmButton = await findByText('Confirm and Borrow');
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(borrowBook).toHaveBeenCalledWith(book);
        expect(getByText('Return')).toBeDefined();
        expect(queryByText(/Do you wish to proceed and borrow this book?/)).toBeNull();
      });
    });

    it('if users cancels it, book is not borrowed and confirmation dialog is closed', async () => {
      checkWaitlist.mockResolvedValue({ status: OTHERS_ARE_WAITING_STATUS });

      const { findByText, queryByText, findByTestId } = render(<LibraryContainer slug="bh" />);
      await findByTestId('book-container');

      const button = await findByText('Borrow');
      fireEvent.click(button);

      const cancelButton = await findByText('Cancel');
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(borrowBook).not.toHaveBeenCalled();
        expect(findByText('Borrow')).toBeDefined();
        expect(queryByText(/Do you wish to proceed and borrow this book?/)).toBeNull();
      });
    });
  });
});
