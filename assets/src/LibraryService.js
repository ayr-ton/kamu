export default class LibraryService {
	getLibraries() {
		return fetch('/api/libraries/')
		.then(response => {
			return response.json();
		}).then(data => {
			return data.results;
		});
	}
}