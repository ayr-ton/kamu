import React from 'react';
import LibrarySelector from './LibrarySelector';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

describe('LibrarySelector', () => {
	let librarySelector;
	let bookService;
	let profileService;
	const libraries = [
	{
		id: 1,
		url: "http://localhost:8000/api/libraries/bh/",
		name: "Belo Horizonte",
		slug: "bh",
	}
	];

	beforeEach(() => {
		global.window = { location: { href: '' } };

		bookService = {
			getLibraries: () => { return Promise.resolve(libraries); }
		};

		profileService = {
			setRegion: (region) => {}
		};

		librarySelector = shallow(<LibrarySelector bookService={bookService} profileService={profileService} />);
	});

	it('should set the region in ProfileService when choosing a library', async () => {
		const setRegion = sinon.spy(profileService, 'setRegion');

		await librarySelector.instance()._loadLibraries();
		librarySelector.find('ListItem').first().simulate('click');
		
		expect(setRegion.calledWith('bh')).to.be.true;
	});

	it('should redirect to the library page when choosing a library', async () => {
		await librarySelector.instance()._loadLibraries();
		librarySelector.find('ListItem').first().simulate('click');
		
		expect(global.window.location.href).to.equal('/libraries/bh');
	});
});