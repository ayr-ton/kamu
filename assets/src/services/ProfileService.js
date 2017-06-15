import { fetchFromAPI } from './helpers';

export default class ProfileService {
	getLoggedUser() {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			return Promise.resolve(user);
		}

		return fetchFromAPI('/profile').then(data => {
			const user = data.user;
			localStorage.setItem('user', JSON.stringify(user));
			return user;
		});
	}

	getRegion() {
		return localStorage.getItem('region');
	}

	setRegion(region) {
		localStorage.setItem('region', region);
	}

	clearRegion() {
		localStorage.removeItem('region');
	}
}