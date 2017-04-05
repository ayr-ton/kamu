export default class BookService {
	getLibraries() {
		return fetch('/api/libraries/', { credentials: 'include' })
		.then(response => {
			return response.json();
		}).then(data => {
			return data.results;
		});
	}

	getBooks(librarySlug) {
		return fetch(`/api/libraries/${librarySlug}/`, { credentials: 'include' })
		.then(response => {
			return response.json();
		}).then(data => {
			return data.books;
		});
	}
}