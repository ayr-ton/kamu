import React from "react";
import Header from "./Header";
import { shallow } from "enzyme";
import { clearRegion, getLoggedUser } from './services/ProfileService';

jest.mock('./services/ProfileService');

const createComponent = (props) => shallow(<Header {...props} />);

describe('Header', () => {
    beforeEach(() => {
        window.location.assign = jest.fn();
        getLoggedUser.mockResolvedValue({});
    });

    it('should clear the region and redirect to home when changing region', () => {
        const header = createComponent();
		header.instance()._changeRegion();

		expect(clearRegion).toHaveBeenCalled();
        expect(window.location.assign).toHaveBeenCalledWith('/');
	});

	it('should display the menu', () => {
        const header = createComponent();
        expect(header.find('.header-menu').exists()).toBeTruthy();
	});

    it('should not display the menu when showMenu is false', () => {
        const header = createComponent({ showMenu: false });
        expect(header.find('.header-menu').exists()).toBeFalsy();
    });
});