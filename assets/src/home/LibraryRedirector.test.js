import React from 'react';
import LibraryRedirector from './LibraryRedirector';
import { shallow } from 'enzyme';

describe('LibraryRedirector', () => {
	let librarySelector;
	
	describe('when a region is set', () => {
		beforeEach(() => {
			window.location.assign = jest.fn();
			let profileService = {
				getRegion: () => 'bh'
			};

			librarySelector = shallow(<LibraryRedirector profileService={profileService}><div></div></LibraryRedirector>);	
		});

		it('should redirect to the correct library', () => {
			expect(window.location.assign).toHaveBeenCalledWith('/libraries/bh');
		});

		it('should not render any children', () => {
			expect(librarySelector.children()).toHaveLength(0);
		});
	});

	describe('when a region is not set', () => {

		beforeEach(() => {
			window.location.assign = jest.fn();
			let profileService = {
				getRegion: () => null
			};

			librarySelector = shallow(<LibraryRedirector profileService={profileService}><div></div></LibraryRedirector>);	
		});

		it('should not redirect', () => {
			expect(window.location.assign).not.toHaveBeenCalled();
		});

		it('should render its children', () => {
			expect(librarySelector.children()).toHaveLength(1);
		});
	});

});