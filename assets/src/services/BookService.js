import Book from '../models/Book';
import {fetchFromAPI} from './helpers';

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

export default class BookService {
    getLibraries() {
        return fetchFromAPI('/libraries').then(data => {
            return data;
        });
    }

    getBooksByPage(librarySlug, page, filter = "") {
        return fetchFromAPI(`/libraries/${librarySlug}/books/?page=${page}&book_title=${filter}&book_author=${filter}`).then(data => {
            return formatBooksRequest(data);
        });
    }

    borrowCopy(book) {
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
        }).catch(() => {
            return false;
        });
    }
}
