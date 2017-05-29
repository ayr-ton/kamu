import sinon from 'sinon';
import { expect } from 'chai';
import ProfileService from "./ProfileService";

describe('ProfileService', () => {
    describe('Get user from localStorage', () => {
        let user = {
            username: "test@thoughtsworks.com"
            , email: "test@thoughtsworks.com"
            , image_url: ""
        };

		beforeEach(() => {
			global.localStorage = {
				getItem : (key) => {
					return JSON.stringify(user);
				}
			};
        });

        it("Should get user from local Storage", (done) => {
            let profileService = new ProfileService();
            profileService.getLoggedUser().then((userReturned) => {
            	expect(userReturned).to.deep.equal(user);
            	done();
			});
        });
    });

    describe('Get user from backend', () => {
        let user = {
            username: "test@thoughtsworks.com"
            , email: "test@thoughtsworks.com"
            , image_url: ""
        };



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

        it("Should get user from backend", (done) => {
            let profileService = new ProfileService();
            profileService.getLoggedUser().then((userReturned) => {
            	expect(userReturned).to.deep.equal(user);
            	done();
			});
        });
    });
});