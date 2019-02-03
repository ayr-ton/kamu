import React from "react";
import Header from "./Header";
import {shallow} from "enzyme";

describe('Header', () => {
    let profileService;
	let header;

    beforeEach(() => {
		window.location.assign = jest.fn();

        profileService = {
            getLoggedUser: jest.fn().mockResolvedValue({}),
            clearRegion: jest.fn()
        };
    });

    function renderHeader(props) {
        header = shallow(<Header service={profileService} {...props} />);
    }

    it('should clear the region and redirect to home', () => {
        renderHeader();
		header.instance()._changeRegion();

		expect(profileService.clearRegion).toHaveBeenCalled();
        expect(window.location.assign).toHaveBeenCalledWith('/');
	});

	it('should display the menu', () => {
        renderHeader();
        expect(header.find('.header-menu').exists()).toBeTruthy();
	});

    it('should not display the menu when showMenu is false', () => {
        renderHeader({ showMenu: false });
        expect(header.find('.header-menu').exists()).toBeFalsy();
    });
});