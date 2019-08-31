import { getLoggedUser } from './ProfileService';
import fetchFromAPI from './helpers';
import { currentUser } from '../../test/userHelper';

jest.mock('./helpers');

describe('Profile Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  it('gets the current user from the API', () => {
    fetchFromAPI.mockResolvedValue({ user: currentUser });

    return getLoggedUser().then((userReturned) => {
      expect(fetchFromAPI).toHaveBeenCalledWith('/profile');
      expect(userReturned).toEqual(currentUser);
    });
  });
});
