import Book from '../models/Book';
import { fetchFromAPI } from './helpers';

// TODO: Add tests to this class

export default class BookService {
	getLibraries() {
		return fetchFromAPI('/libraries').then(data => {
			return data.results;
		});
	}

	getBooks(librarySlug) {
		return fetchFromAPI(`/libraries/${librarySlug}`).then(data => {
			let books = [];
			for (const bookJson of data.books) {
				let book = Object.assign(new Book(), bookJson);
				books.push(book);
			}
			return books;
		});
	}

	getBook(book_id) {
		return fetchFromAPI(`/books/${book_id}/show`).then(data => {
			return data;
		});
	}

	borrowBook(book) {
		const copyID = book.getAvailableCopyID();
		return fetchFromAPI(`/copies/${copyID}/borrow`, 'POST').then(data => {
			for (let copy of book.copies) {
				if (copy.id == copyID) {
					copy.user = currentUser;
					break;
				}
			}
			return true;
		});
	}

	returnBook(book) {
		const copyID = book.getBorrowedCopyID();
		return fetchFromAPI(`/copies/${copyID}/return`, 'POST').then(data => {
			for (let copy of book.copies) {
				if (copy.id == copyID) {
					copy.user = null;
					break;
				}
			}
			return true;
		});
	}
}
