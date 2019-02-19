import Book from '../models/Book';
import { fetchFromAPI } from './helpers';

const updateBookCopyUser = (book, copyID, user) => {
  const copy = book.copies.find(({ id }) => id === copyID)
  copy.user = user;
}

const formatBooksRequest = (data) => {
  let books = [];
  
  for (const bookJson of data.results) {
    let book = Object.assign(new Book(), bookJson);
    books.push(book);
  }
  
  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: books
  };
};

export const getLibraries = () => fetchFromAPI('/libraries').then(data => data);

export const getBooksByPage = (librarySlug, page, filter = '') => 
  fetchFromAPI(`/libraries/${librarySlug}/books/?page=${page}&book_title=${filter}&book_author=${filter}`).then(data => {
    if (!data.results) {
      return null;
    }
    
    return formatBooksRequest(data);
  });

export const getMyBooks = () =>
  fetchFromAPI(`/profile/books`).then(data => {
    return formatBooksRequest(data);
  });

export const borrowCopy = (book) => {
  const copyID = book.getAvailableCopyID();
  if (!copyID) return Promise.resolve(null);
  
  return fetchFromAPI(`/copies/${copyID}/borrow`, 'POST').then(() => {
    updateBookCopyUser(book, copyID, currentUser);
  });
};

export const returnBook = (book) => {
  const copyID = book.getBorrowedCopyID();
  if (!copyID) return Promise.resolve(null);
  
  return fetchFromAPI(`/copies/${copyID}/return`, 'POST').then(() => {
    updateBookCopyUser(book, copyID, null);
  });
};

export const joinWaitlist = (library, book) => {
  return Promise.resolve();
}