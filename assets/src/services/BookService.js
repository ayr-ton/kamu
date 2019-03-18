import Book from '../models/Book';
import fetchFromAPI from './helpers';

const updateBookCopyUser = (book, copyID, user) => {
  const copy = book.copies.find(({ id }) => id === copyID);
  copy.user = user;
};

const formatBooksRequest = (data) => {
  const books = [];

  data.results.forEach((bookJson) => {
    const book = Object.assign(new Book(), bookJson);
    books.push(book);
  });

  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: books,
  };
};

export const getLibraries = () => fetchFromAPI('/libraries/').then((data) => data);

export const getBooksByPage = (librarySlug, page, filter = '') => fetchFromAPI(`/libraries/${librarySlug}/books/?page=${page}&book_title=${filter}&book_author=${filter}`).then((data) => {
  if (!data.results) {
    return null;
  }

  return formatBooksRequest(data);
});

export const getMyBooks = () => fetchFromAPI('/profile/books').then((data) => formatBooksRequest(data));

export const borrowCopy = async (book) => {
  const copyID = book.getAvailableCopyID();
  if (!copyID) return Promise.resolve(null);

  const response = await fetchFromAPI(`/copies/${copyID}/borrow`, 'POST');
  updateBookCopyUser(book, copyID, currentUser);
  return response;
};

export const returnBook = async (book) => {
  const copyID = book.getBorrowedCopyID();
  if (!copyID) return Promise.resolve(null);

  const response = await fetchFromAPI(`/copies/${copyID}/return`, 'POST');
  updateBookCopyUser(book, copyID, null);
  return response;
};

export const joinWaitlist = async (library, book) => fetchFromAPI(`/libraries/${library}/books/${book.id}/waitlist/`, 'POST').then((data) => {
  if ('waitlist_item' in data) return Promise.resolve(data.waitlist_item);

  return Promise.reject(new Error({ message: 'Request was successful, but no data was returned' }));
}).catch((error) => Promise.reject(error));
