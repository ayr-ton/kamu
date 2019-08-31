import fetchFromAPI from './helpers';

export const getLoggedUser = () => fetchFromAPI('/profile').then((data) => data.user);

export default {
  getLoggedUser,
};
