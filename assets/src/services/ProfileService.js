import { fetchFromAPI } from './helpers';

export const getLoggedUser = () => {
	return fetchFromAPI('/profile').then(data => data.user);
};

export const getRegion = () => sessionStorage.getItem('region');

export const setRegion = (region) => {
	sessionStorage.setItem('region', region);
};

export const clearRegion = () => {
	sessionStorage.removeItem('region');
};
