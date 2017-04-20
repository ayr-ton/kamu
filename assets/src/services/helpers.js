export function fetchFromAPI(endpoint) {
	return fetch('/api' + endpoint, { credentials: 'include' }).then(response => {
		return response.json();
	});
}