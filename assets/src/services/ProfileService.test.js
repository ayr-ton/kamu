import ProfileService from './ProfileService';
import { fetchFromAPI } from './helpers';

jest.mock('./helpers');

const region = 'quito';

const user = {
    username: "currentuser@example.com",
    email: "currentuser@example.com",
    image_url: ""
};

describe('ProfileService', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        sessionStorage.clear();
    });

    it("should get the current user from session storage", () => {
        const profileService = new ProfileService();
        sessionStorage.setItem('user', JSON.stringify(user));

        return profileService.getLoggedUser().then((userReturned) => {
            expect(userReturned).toEqual(user);
        });
    });

    it("should get the current user from the API when not present in session storage", () => {
        const profileService = new ProfileService();
        fetchFromAPI.mockResolvedValue({ user });

        return profileService.getLoggedUser().then((userReturned) => {
            expect(fetchFromAPI).toHaveBeenCalledWith('/profile');
            expect(userReturned).toEqual(user);
        });
    });

    it("should get the region from session storage", () => {
        const profileService = new ProfileService();
        sessionStorage.setItem('region', region);

        expect(profileService.getRegion()).toEqual(region);
    });

    it("should set the region in session storage", () => {
        const profileService = new ProfileService();

        profileService.setRegion(region);
        expect(sessionStorage.getItem('region')).toEqual(region);
    });
});