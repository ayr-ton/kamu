import { fetchFromAPI } from './helpers';

export default class BookService {
	getLibraries() {
		return fetchFromAPI('/libraries').then(data => {
			return data.results;
		});
	}

	getBooks(librarySlug) {
		return fetchFromAPI(`/libraries/${librarySlug}`).then(data => {
			return data.books;
		});
	}
}