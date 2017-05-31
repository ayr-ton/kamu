import sinon from 'sinon';
import { expect } from 'chai';
import ProfileService from "./ProfileService";

function generateUser(){
    return {
        username: "test@thoughtsworks.com"
        , email: "test@thoughtsworks.com"
        , image_url: ""
    };
}

describe('ProfileService', () => {
    describe('Get user from localStorage', () => {
        let user = generateUser();

		beforeEach(() => {
			global.localStorage = {
				getItem : (key) => {
					return JSON.stringify(user);
				}
			};
        });

        it("Should get user from local Storage", () => {
            let profileService = new ProfileService();
            return profileService.getLoggedUser().then((userReturned) => {
            	expect(userReturned).to.deep.equal(user);
			});
        });
    });

    describe('Get user from backend', () => {
        let user = generateUser();

        let sandbox;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            sandbox.stub(
                require("./helpers")
                , "fetchFromAPI"
            ).withArgs(`/profile`)
            .returns(Promise.resolve({user: user}));

            global.localStorage = {
				setItem : (key, data) => {

				},
				getItem : (key) => {
					return null;
				}
			};
        });

        afterEach(() => {
           sandbox.restore();
        });

        it("Should get user from backend", () => {
            let profileService = new ProfileService();
            return profileService.getLoggedUser().then((userReturned) => {
            	expect(userReturned).to.deep.equal(user);
			});
        });
    });
});