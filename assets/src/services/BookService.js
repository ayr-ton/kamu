import Book from '../models/Book';
import { fetchFromAPI } from './helpers';

// TODO: Add tests to this class

export default class BookService {
    getLibraries() {
        return fetchFromAPI('/libraries').then(data => {
            return data;
        });
    }

    getBooks(librarySlug) {
        return fetchFromAPI(`/libraries/${librarySlug}/books`).then(data => {
            let books = [];
            for (const bookJson of data.results) {
                let book = Object.assign(new Book(), bookJson);
                books.push(book);
            }
            return books;
        });
    }

    //TODO: Refactor name to borrowCopy
    borrowBook(book) {
        const copyID = book.getAvailableCopyID();
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
    }

    returnBook(book) {
        const copyID = book.getBorrowedCopyID();
        return fetchFromAPI(`/copies/${copyID}/return`, 'POST').then(() => {
            for (let copy of book.copies) {
                if (copy.id == copyID) {
                    copy.user = null;
                    return true;
                }
            }
            return false;
        }).catch(()=>{
            return false;
        });
	}
}
