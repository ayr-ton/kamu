import fetchFromAPI from './helpers';

export const getLibraries = () => fetchFromAPI('/libraries/').then((data) => data);

export const getBooksByPage = (librarySlug, page, filter = '') => fetchFromAPI(`/libraries/${librarySlug}/books/?page=${page}&book_title=${filter}&book_author=${filter}`).then((data) => {
  if (!data.results) {
    throw new Error('Request to load books did not have results');
  }

  return data;
});

export const getMyBooks = () => fetchFromAPI('/profile/books');

export const borrowBook = (book) => fetchFromAPI(`${book.url}borrow/`, 'POST');

export const returnBook = (book) => fetchFromAPI(`${book.url}return/`, 'POST');

export const joinWaitlist = async (book) => fetchFromAPI(`${book.url}waitlist/`, 'POST').then((data) => {
  if ('waitlist_item' in data) return Promise.resolve(data.waitlist_item.book);

  return Promise.reject(new Error({ message: 'Request was successful, but no data was returned' }));
}).catch((error) => Promise.reject(error));
