import { fetchFromAPI } from './helpers';

export const getLoggedUser = () => {
	const user = JSON.parse(sessionStorage.getItem('user'));
	if (user) {
		return Promise.resolve(user);
	}

	return fetchFromAPI('/profile').then(data => {
		const user = data.user;
		sessionStorage.setItem('user', JSON.stringify(user));
		return user;
	});
};

export const getRegion = () => sessionStorage.getItem('region');

export const setRegion = (region) => {
	sessionStorage.setItem('region', region);
};

export const clearRegion = () => {
	sessionStorage.removeItem('region');
};

export default class ProfileService {
	getLoggedUser() {
		return getLoggedUser();
	}

	getRegion() {
		return getRegion();
	}

	setRegion(region) {
		setRegion(region);
	}

	clearRegion() {
		clearRegion();
	}
}