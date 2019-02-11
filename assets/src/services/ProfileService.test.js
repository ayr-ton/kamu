import { getLoggedUser, getRegion, setRegion } from './ProfileService';
import { fetchFromAPI } from './helpers';

jest.mock('./helpers');

const region = 'quito';
const user = {
    username: "currentuser@example.com",
    email: "currentuser@example.com",
    image_url: ""
};

describe('Profile Service', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        sessionStorage.clear();
    });

    it("should get the current user from session storage", () => {
        sessionStorage.setItem('user', JSON.stringify(user));

        return getLoggedUser().then((userReturned) => {
            expect(userReturned).toEqual(user);
        });
    });

    it("should get the current user from the API when not present in session storage", () => {
        fetchFromAPI.mockResolvedValue({ user });

        return getLoggedUser().then((userReturned) => {
            expect(fetchFromAPI).toHaveBeenCalledWith('/profile');
            expect(userReturned).toEqual(user);
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
});