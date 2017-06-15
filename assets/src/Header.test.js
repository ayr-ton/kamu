import React from "react";
import Header from "./Header";
import {shallow} from "enzyme";
import {expect} from "chai";
import sinon from "sinon";

describe('Header', () => {
    let profileService;
	let header;

    beforeEach(() => {
		global.window = { location: { href: '' }};

        profileService = {
            getLoggedUser: () => Promise.resolve({}),
            clearRegion: () => {
            }
        };
    });

    function renderHeader() {
        header = shallow(<Header service={profileService}/>);
    }

    it('should clear the region and redirect to home', () => {
		const clearRegion = sinon.spy(profileService, 'clearRegion');

        renderHeader();
		header.instance()._changeRegion();

		expect(clearRegion.called).to.be.true;
        expect(global.window.location.href).to.equal('/');
	});

	it('should display the change library menu', () => {
		global.window.location.pathname = '/foo';
        renderHeader();
        expect(header.state('displaysMenu')).to.be.true;
	});

    it('should not display the change library menu in home', () => {
		global.window.location.pathname = '/';
        renderHeader();
        expect(header.state('displaysMenu')).to.be.false;
    });
});