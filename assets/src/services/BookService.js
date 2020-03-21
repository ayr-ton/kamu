import fetchFromAPI from './helpers';

export const getLibraries = () => fetchFromAPI('/libraries/');

export const getBooksByPage = (librarySlug, page, filter = '') => fetchFromAPI(`/libraries/${librarySlug}/books/?page=${page}&book_title=${filter}&book_author=${filter}`).then((data) => {
  if (!data.results) {
    throw new Error('Request to load books did not have results');
  }

  return data;
});

export const getMyBooks = () => fetchFromAPI('/profile/books');

export const getWaitlistBooks = () => fetchFromAPI('/profile/waitlist');

export const getBook = (librarySlug, bookId) => fetchFromAPI(`/libraries/${librarySlug}/books/${bookId}/`);

export const borrowBook = (book) => fetchFromAPI(`${book.url}borrow/`, 'POST');

export const returnBook = (book) => fetchFromAPI(`${book.url}return/`, 'POST');

export const joinWaitlist = (book) => fetchFromAPI(`${book.url}waitlist/`, 'POST');

export const leaveWaitlist = (book) => fetchFromAPI(`${book.url}waitlist/`, 'DELETE');

export const checkWaitlist = (book) => fetchFromAPI(`${book.url}waitlist/check/`, 'GET');
