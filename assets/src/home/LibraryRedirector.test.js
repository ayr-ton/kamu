import React from 'react';
import LibraryRedirector from './LibraryRedirector';
import { shallow } from 'enzyme';
import { getRegion } from '../services/ProfileService';

jest.mock('../services/ProfileService');

const createComponent = () => shallow(<LibraryRedirector><div>some element</div></LibraryRedirector>);

describe('Library Redirector', () => {
	beforeEach(() => {
		window.location.assign = jest.fn();
	});
	
	it('should redirect to the library when a region is set', () => {
		getRegion.mockReturnValueOnce('bh');

		createComponent();

		expect(window.location.assign).toHaveBeenCalledWith('/libraries/bh');
	});

	it('should not redirect when a region is not set', () => {
		getRegion.mockReturnValueOnce(null);
	
		createComponent();

		expect(window.location.assign).not.toHaveBeenCalled();
	});

	it('should not render any children when a region is set', () => {
		getRegion.mockReturnValueOnce('bh');

		const	libraryRedirector = createComponent();

		expect(libraryRedirector.children()).toHaveLength(0);
	});

	it('should render its children when a region is not set', () => {
		getRegion.mockReturnValueOnce(null);

		const	libraryRedirector = createComponent();

		expect(libraryRedirector.children()).toHaveLength(1);
	});
});