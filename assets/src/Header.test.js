import React from 'react';
import Header from './Header';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Header', () => {
	it('should clear the region and redirect to home', () => {
		global.window = { location: { href: '' }};
		let profileService = {
			getLoggedUser: () => Promise.resolve({}),
			clearRegion: () => {}
		};

		let header = shallow(<Header service={profileService} />);
		const clearRegion = sinon.spy(profileService, 'clearRegion');

		header.instance()._changeRegion();

		expect(clearRegion.called).to.be.true;
        expect(global.window.location.href).to.equal('/');
	});
});