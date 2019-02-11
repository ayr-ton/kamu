import { fetchFromAPI } from './helpers';

export const setRegion = (region) => {
	sessionStorage.setItem('region', region);
};

export default class ProfileService {
	getLoggedUser() {
		const user = JSON.parse(sessionStorage.getItem('user'));
		if (user) {
			return Promise.resolve(user);
		}

		return fetchFromAPI('/profile').then(data => {
			const user = data.user;
			sessionStorage.setItem('user', JSON.stringify(user));
			return user;
		});
	}

	getRegion() {
		return sessionStorage.getItem('region');
	}

	setRegion(region) {
		setRegion(region);
	}

	clearRegion() {
		sessionStorage.removeItem('region');
	}
}