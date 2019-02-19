import { getLoggedUser, getRegion, setRegion, clearRegion } from './ProfileService';
import { fetchFromAPI } from './helpers';
import { currentUser } from '../../test/userHelper';

jest.mock('./helpers');

const region = 'quito';

describe('Profile Service', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        sessionStorage.clear();
    });

    it("gets the current user from the API", () => {
        fetchFromAPI.mockResolvedValue({ user: currentUser });

        return getLoggedUser().then((userReturned) => {
            expect(fetchFromAPI).toHaveBeenCalledWith('/profile');
            expect(userReturned).toEqual(currentUser);
        });
    });

    it("should get the region from session storage", () => {
        sessionStorage.setItem('region', region);

        expect(getRegion()).toEqual(region);
    });

    it("should set the region in session storage", () => {
        setRegion(region);
        expect(sessionStorage.getItem('region')).toEqual(region);
    });

    it("should clear the region in session storage", () => {
        clearRegion();
        expect(sessionStorage.getItem('region')).toBeNull;
    });
});