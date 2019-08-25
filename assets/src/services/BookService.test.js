import {
  getLibraries, getBooksByPage, getMyBooks, borrowBook, returnBook, joinWaitlist, getWaitlistBooks,
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

  describe('Join the Waitlist', () => {
    it('should call the add to waitlist endpoint for the book and library informed', async () => {
      const book = someBook();

      fetchFromAPI.mockResolvedValue({ waitlist_item: { book } });

      await joinWaitlist(book);
      expect(fetchFromAPI).toHaveBeenCalledWith(`${book.url}waitlist/`, 'POST');
    });

    it('should return the waitlisted item\'s book  if the request was successful and contains that info', async () => {
      const book = someBook();

      fetchFromAPI.mockResolvedValue({ waitlist_item: { book: 'updated_book' } });

      const result = await joinWaitlist(book);
      expect(result).toEqual('updated_book');
    });

    it('should reject the promise if the request was successful but didnt contain waitlist item data', async () => {
      const book = someBook();
      fetchFromAPI.mockResolvedValue({});

      try {
        await joinWaitlist(book);
      } catch (error) {
        expect(error).toEqual(new Error({ message: 'Request was successful, but no data was returned' }));
      }
    });

    it('should reject the promise if the request was unsuccessful ', async () => {
      const book = someBook();
      fetchFromAPI.mockRejectedValue({ status: 404 });

      try {
        await joinWaitlist(book);
      } catch (error) {
        expect(error).toEqual({ status: 404 });
      }
    });
  });
});
