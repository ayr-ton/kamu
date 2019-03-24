import fetchFromAPI from './helpers';

export const getLibraries = () => fetchFromAPI('/libraries/').then((data) => data);

export const getBooksByPage = (librarySlug, page, filter = '') => fetchFromAPI(`/libraries/${librarySlug}/books/?page=${page}&book_title=${filter}&book_author=${filter}`).then((data) => {
  if (!data.results) {
    return null;
  }

  return data;
});

export const getMyBooks = () => fetchFromAPI('/profile/books');

export const borrowBook = (book, library) => fetchFromAPI(`/libraries/${library}/books/${book.id}/borrow/`, 'POST');

export const returnBook = (book, library) => fetchFromAPI(`/libraries/${library}/books/${book.id}/return/`, 'POST');

export const joinWaitlist = async (book, library) => fetchFromAPI(`/libraries/${library}/books/${book.id}/waitlist/`, 'POST').then((data) => {
  if ('waitlist_item' in data) return Promise.resolve(data.waitlist_item);

  return Promise.reject(new Error({ message: 'Request was successful, but no data was returned' }));
}).catch((error) => Promise.reject(error));
