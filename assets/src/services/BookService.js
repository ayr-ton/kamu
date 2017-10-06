import Book from '../models/Book';
import {fetchFromAPI} from './helpers';

// TODO: Add tests to this class


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

const parseBooksRequest = (values) => {
    return values.reduce((prev, curr) => prev.concat(curr.results), []);
};

export default class BookService {
    getLibraries() {
        return fetchFromAPI('/libraries').then(data => {
            return data;
        });
    }

    getBooks(librarySlug) {

        let promises = [];

        return fetchFromAPI(`/libraries/${librarySlug}/books/`).then(data => {
            let formatedData = formatBooksRequest(data);

            promises.push(Promise.resolve(formatedData));

            let count = formatedData.count;
            let pendingRequests = Math.ceil(count / formatedData.results.length) - 1;

            for (let i = 0; i < pendingRequests; i++) {
                promises.push(this.getBooksByPage(librarySlug, i + 2));
            }

            return Promise.all(promises).then(parseBooksRequest);
        });
    }

    getBooksByPage(librarySlug, page) {
        return fetchFromAPI(`/libraries/${librarySlug}/books/?page=${page}`).then(data => {
            return formatBooksRequest(data);
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
        }).catch(() => {
            return false;
        });
    }
}
