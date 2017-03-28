import React from 'react';
import App from './App';
import BookList from './BookList';
import Header from './Header';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('Main app layout', () => {
	let app;
	beforeEach(() => {
		app = shallow(<App />);
	});

	it('should have only one header as a child', () => {
		expect(app.contains(<Header />)).to.be.true;
	});
});