import React from 'react';
import LibraryRedirector from './LibraryRedirector';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('LibraryRedirector', () => {
	let librarySelector;
	
	describe('when a region is set', () => {
		
		beforeEach(() => {
			global.window = { location: { href: '' } };
			let profileService = {
				getRegion: () => 'bh'
			};

			librarySelector = shallow(<LibraryRedirector profileService={profileService}><div></div></LibraryRedirector>);	
		});

		it('should redirect to the correct library', () => {
			expect(global.window.location.href).to.equal('/libraries/bh');
		});

		it('should not render any children', () => {
			expect(librarySelector.children()).to.have.length.of(0);
		});
	});

	describe('when a region is not set', () => {

		beforeEach(() => {
			global.window = { location: { href: '' } };
			let profileService = {
				getRegion: () => null
			};

			librarySelector = shallow(<LibraryRedirector profileService={profileService}><div></div></LibraryRedirector>);	
		});

		it('should not redirect', () => {
			expect(global.window.location.href).to.equal('');
		});

		it('should render its children', () => {
			expect(librarySelector.children()).to.have.length.of(1);
		});
	});

});