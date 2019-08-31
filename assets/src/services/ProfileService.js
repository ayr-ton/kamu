import fetchFromAPI from './helpers';

export const getLoggedUser = () => fetchFromAPI('/profile').then((data) => data.user);

export const getRegion = () => localStorage.getItem('region');

export const setRegion = (region) => {
  localStorage.setItem('region', region);
};

export const clearRegion = () => {
  localStorage.removeItem('region');
};

export const getDefaultTheme = () => localStorage.getItem('theme') || 'light';

export const setDefaultTheme = (theme) => {
  localStorage.setItem('theme', theme);
};
