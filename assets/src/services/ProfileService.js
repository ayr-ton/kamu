export default class ProfileService {
	getLoggedUser() {
		return fetch('/api/profile', { credentials: 'include' })
		.then(response => {
			return response.json();
		}).then(data => {
			return data.user;
		});
	}
}