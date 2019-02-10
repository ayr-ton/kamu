import Book from '../models/Book';
import { fetchFromAPI } from './helpers';

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

export const borrowCopy = (book) => {
  const copyID = book.getAvailableCopyID();
  if (!copyID) return Promise.resolve(null);
  
  return fetchFromAPI(`/copies/${copyID}/borrow`, 'POST').then(() => {
    for (let copy of book.copies) {
      if (copy.id == copyID) {
        copy.user = currentUser;
        return true;
      }
    }
    return false;
  }).catch(() => {
    return false;
  });
};

export const returnBook = (book) => {
  const copyID = book.getBorrowedCopyID();
  if (!copyID) return Promise.resolve(null);
  
  return fetchFromAPI(`/copies/${copyID}/return`, 'POST').then(() => {
    for (let copy of book.copies) {
      if (copy.id == copyID) {
        copy.user = null;
        return true;
      }
    }
    return false;
  }).catch(() => {
    return false;
  });
};

export default class BookService {
  getLibraries() {
    return getLibraries();
  }
  
  getBooksByPage(librarySlug, page, filter = "") {
    return getBooksByPage(librarySlug, page, filter);
  }
  
  borrowCopy(book) {
    return borrowCopy(book);
  }
  
  returnBook(book) {
    return returnBook(book);
  }
}
