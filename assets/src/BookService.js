export default class BookService {
	getLibraries() {
		return fetch('/api/libraries/')
		.then(response => {
			return response.json();
		}).then(data => {
			return data.results;
		});
	}

	getBooks() {
		return fetch('/api/books/')
		.then(response => {
			return response.json();
		}).then(data => {
			return data.results;
		});
	}
}