import sinon from 'sinon';
import { expect } from 'chai';
import ProfileService from './ProfileService';

function generateUser(){
    return {
        username: "test@thoughtsworks.com"
        , email: "test@thoughtsworks.com"
        , image_url: ""
    };
}

describe('ProfileService', () => {
    let profileService = new ProfileService();

    describe('Get user from sessionStorage', () => {
        let user = generateUser();

        beforeEach(() => {
            sessionStorage.setItem('user', JSON.stringify(user));
        });

        it("Should get user from session Storage", () => {
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

            global.sessionStorage = {
                setItem : () => {},
                getItem : () => {
                    return null;
                }
            };
        });

        afterEach(() => {
           sandbox.restore();
        });

        it("Should get user from backend", () => {
            return profileService.getLoggedUser().then((userReturned) => {
                expect(userReturned).to.deep.equal(user);
            });
        });
    });

    describe("Region", () => {
        let expectedRegion = null;
        beforeEach(() => {
            global.sessionStorage = {
                setItem : (key, data) => {
                    if (key == 'region') expectedRegion = data;
                },
                getItem : (key) => {
                    if (key == 'region') return expectedRegion;
                    return null;
                }
            };
        });

        it("Should set and retrieve the region in sessionStorage", () => {
            let newRegion = 'quito';
            profileService.setRegion(newRegion);
            
            let region = profileService.getRegion();
            expect(region).to.deep.equal(newRegion);
        });
    });
});