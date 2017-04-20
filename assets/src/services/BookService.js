import Book from '../models/Book';
import { fetchFromAPI } from './helpers';

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

	borrowBookCopy(copyID) {
		return fetchFromAPI(`/copies/${copyID}/borrow`, 'POST').then(data => {
			return true;
		});
	}
}