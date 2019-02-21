import { fetchFromAPI } from './helpers';

export const getLoggedUser = () => {
	return fetchFromAPI('/profile').then(data => data.user);
};

export const getRegion = () => localStorage.getItem('region');

export const setRegion = (region) => {
	localStorage.setItem('region', region);
};

export const clearRegion = () => {
	localStorage.removeItem('region');
};
