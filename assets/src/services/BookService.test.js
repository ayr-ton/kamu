import {
  getLibraries,
  getBooksByPage,
  getMyBooks,
  getBook,
  borrowBook,
  returnBook,
  joinWaitlist,
  leaveWaitlist,
  getWaitlistBooks,
  reportMissing, reportFound,
} from './BookService';
import fetchFromAPI from './helpers';
import {
  someBookWithAvailableCopies, someBookWithACopyFromMe, someBook,
} from '../../test/booksHelper';

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

  it('fails when response to get books does not have results', () => {
    fetchFromAPI.mockResolvedValue({
      error: 'some error',
    });

    return expect(getBooksByPage('bh', 1)).rejects.toBeInstanceOf(Error);
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

  it('returns the list of books I have waitlisted', () => {
    const response = {
      results: [someBook()],
    };
    fetchFromAPI.mockResolvedValue(response);

    return getWaitlistBooks().then((data) => {
      expect(data).toEqual(response);
    });
  });

  it('returns a book from a library', () => {
    const book = someBook();
    const librarySlug = 'sp';
    fetchFromAPI.mockResolvedValue(book);

    return getBook(librarySlug, book.id).then((data) => {
      expect(data).toEqual(book);
      expect(fetchFromAPI).toHaveBeenCalledWith(`/libraries/${librarySlug}/books/${book.id}/`);
    });
  });

  it('should call book borrow endpoint and return the response', async () => {
    const book = someBookWithAvailableCopies();
    const updatedBook = someBookWithACopyFromMe();

    fetchFromAPI.mockResolvedValue(updatedBook);

    const response = await borrowBook(book);
    expect(fetchFromAPI).toHaveBeenCalledWith(`${book.url}borrow/`, 'POST');
    expect(response).toEqual(updatedBook);
  });

  it('should call book return endpoint and return the response', async () => {
    const book = someBookWithACopyFromMe();
    const updatedBook = someBookWithAvailableCopies();

    fetchFromAPI.mockResolvedValue(updatedBook);

    const response = await returnBook(book);
    expect(fetchFromAPI).toHaveBeenCalledWith(`${book.url}return/`, 'POST');
    expect(response).toEqual(updatedBook);
  });

  describe('Waitlist', () => {
    it('should call the add to waitlist endpoint for the book and library informed and return the updated book', async () => {
      const book = someBook();
      const updatedBook = 'updated_book';
      fetchFromAPI.mockResolvedValue(updatedBook);

      const result = await joinWaitlist(book);

      expect(fetchFromAPI).toHaveBeenCalledWith(`${book.url}waitlist/`, 'POST');
      expect(result).toEqual(updatedBook);
    });

    it('should call the leave waitlist endpoint for the book and library informed and return the updated book', async () => {
      const book = someBook();
      const updatedBook = 'updated_book';
      fetchFromAPI.mockResolvedValue(updatedBook);

      const result = await leaveWaitlist(book);

      expect(fetchFromAPI).toHaveBeenCalledWith(`${book.url}waitlist/`, 'DELETE');
      expect(result).toEqual(updatedBook);
    });

    it('should call the missing endpoint and return the updated book', async () => {
      const book = someBookWithAvailableCopies();
      const updatedBook = someBook(
        [{
          id: 1,
          user: null,
          missing: true,
        }],
      );

      fetchFromAPI.mockResolvedValue(updatedBook);

      const result = await reportMissing(book);

      expect(fetchFromAPI).toHaveBeenCalledWith(`${book.url}missing/`, 'PATCH');
      expect(result).toEqual(updatedBook);
    });

    it('should call the found endpoint and return the updated book', async () => {
      const book = someBookWithAvailableCopies();
      const updatedBook = someBook(
        [{
          id: 1,
          user: null,
          missing: false,
        }],
      );

      fetchFromAPI.mockResolvedValue(updatedBook);

      const result = await reportFound(book);

      expect(fetchFromAPI).toHaveBeenCalledWith(`${book.url}found/`, 'PATCH');
      expect(result).toEqual(updatedBook);
    });
  });
});
