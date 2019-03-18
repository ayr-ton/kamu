import {
  getLibraries, getBooksByPage, getMyBooks, borrowCopy, returnBook, joinWaitlist,
} from './BookService';
import fetchFromAPI from './helpers';
import {
  someBookWithAvailableCopies, someBookWithACopyFromMe, someBookWithNoAvailableCopies, someBook,
} from '../../test/booksHelper';
import { currentUser, someUser } from '../../test/userHelper';

const mockLibraries = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      url: 'http://localhost:8000/api/libraries/quito/',
      me: 'Quito',
      slug: 'quito',
    },
    {
      id: 2,
      url: 'http://localhost:8000/api/libraries/bh/',
      name: 'Belo Horizonte',
      slug: 'bh',
    },
  ],
};

jest.mock('./helpers');

describe('Book Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    global.currentUser = currentUser;
  });

  it('should return libraries', () => {
    fetchFromAPI.mockResolvedValue(mockLibraries);

    return getLibraries().then((data) => {
      expect(fetchFromAPI).toHaveBeenCalledWith('/libraries/');
      expect(data.results).toEqual(mockLibraries.results);
    });
  });

  it('should return list of books by page', () => {
    const books = [someBookWithAvailableCopies()];
    const slug = 'quito';
    const filter = '';
    const page = 1;

    const mockResponse = {
      count: books.length,
      next: null,
      previous: null,
      results: books,
    };
    fetchFromAPI.mockResolvedValue(mockResponse);

    return getBooksByPage(slug, page).then((data) => {
      expect(fetchFromAPI).toHaveBeenCalledWith(`/libraries/${slug}/books/?page=${page}&book_title=${filter}&book_author=${filter}`);
      expect(data).toEqual(mockResponse);
    });
  });

  it('returns null when response to get books does not have results', () => {
    fetchFromAPI.mockResolvedValue({
      error: 'some error',
    });

    return getBooksByPage('bh', 1).then((data) => {
      expect(data).toBeNull();
    });
  });

  it('returns the list of books I borrowed', () => {
    const response = {
      results: [someBookWithACopyFromMe()],
    };
    fetchFromAPI.mockResolvedValue(response);

    return getMyBooks().then((data) => {
      expect(data).toEqual(response);
    });
  });

  describe('Borrow book', () => {
    it('should borrow a book that has an available copy and update the book copies with the user', async () => {
      const book = someBookWithAvailableCopies();
      const expectedResponse = 'bla';

      fetchFromAPI.mockResolvedValue(expectedResponse);

      const response = await borrowCopy(book);
      expect(book.copies[0].user).toEqual(currentUser);
      expect(fetchFromAPI).toHaveBeenCalledWith(`/copies/${book.copies[0].id}/borrow`, 'POST');
      expect(response).toEqual(expectedResponse);
    });

    it('shouldnt borrow a book when all copies are borrowed', async () => {
      const book = someBookWithNoAvailableCopies();

      await borrowCopy(book);
      expect(book.copies[0].user).toEqual(someUser);
      expect(fetchFromAPI).not.toHaveBeenCalled();
    });

    it('shouldnt mark the book as borrowed when the request fails', async () => {
      const book = someBookWithAvailableCopies();

      fetchFromAPI.mockRejectedValue(new Error('some error'));

      try {
        await borrowCopy(book);
      } catch (_) {
        expect(book.copies[0].user).toBeNull();
      }
    });
  });

  describe('Return book', () => {
    it('should return the book copy and remove the user from the copies', async () => {
      const book = someBookWithACopyFromMe();
      const expectedResponse = 'bla';

      fetchFromAPI.mockResolvedValue(expectedResponse);

      const response = await returnBook(book);
      expect(book.copies[0].user).toBeNull();
      expect(fetchFromAPI).toHaveBeenCalledWith(`/copies/${book.copies[0].id}/return`, 'POST');
      expect(response).toEqual(expectedResponse);
    });

    it('shouldnt return a book when doesnt belong to user', async () => {
      const book = someBookWithNoAvailableCopies();

      await returnBook(book);
      expect(book.copies[0].user).toEqual(someUser);
      expect(fetchFromAPI).not.toHaveBeenCalled();
    });

    it('shouldnt mark the book as returned when the request fails', async () => {
      const book = someBookWithACopyFromMe();
      fetchFromAPI.mockRejectedValue(new Error('some error'));

      try {
        await returnBook(book);
      } catch (_) {
        expect(book.copies[0].user).toEqual(currentUser);
      }
    });
  });

  describe('Join the Waitlist', () => {
    it('should call the add to waitlist endpoint for the book and library informed', async () => {
      const book = someBook();

      fetchFromAPI.mockResolvedValue({ waitlist_item: { book } });

      await joinWaitlist(book, 'bh');
      expect(fetchFromAPI).toHaveBeenCalledWith(`/libraries/bh/books/${book.id}/waitlist/`, 'POST');
    });

    it('should return the waitlisted item if the request was successful and contains that info', async () => {
      const book = someBook();

      fetchFromAPI.mockResolvedValue({ waitlist_item: 'mocked_waitlisted_item' });

      const result = await joinWaitlist(book, 'bh');
      expect(result).toEqual('mocked_waitlisted_item');
    });

    it('should reject the promise if the request was successful but didnt contain waitlist item data', async () => {
      const book = someBook();
      fetchFromAPI.mockResolvedValue({});

      try {
        await joinWaitlist(book, 'bh');
      } catch (error) {
        expect(error).toEqual(new Error({ message: 'Request was successful, but no data was returned' }));
      }
    });

    it('should reject the promise if the request was unsuccessful ', async () => {
      const book = someBook();
      fetchFromAPI.mockRejectedValue({ status: 404 });

      try {
        await joinWaitlist(book, 'bh');
      } catch (error) {
        expect(error).toEqual({ status: 404 });
      }
    });
  });
});
