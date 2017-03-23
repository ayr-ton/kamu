export default class BookService {
	getBooks() {
		return fetch('/api/books/')
		.then(response => {
			return response.json();
		}).then(data => {
			return data.results;
		});
	}
}