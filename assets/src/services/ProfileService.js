import { fetchFromAPI } from './helpers';

export default class ProfileService {
	getLoggedUser() {
		return fetchFromAPI('/profile').then(data => {
			return data.user;
		});
	}
}