import React from 'react';
import SearchBar from './SearchBar'
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

describe('<Search />', () => {

    let searchBarComponent;

    it('should render with empty search term', () => {
        searchBarComponent = shallow(<SearchBar onChange={() => {}}/>)
        expect(searchBarComponent.state().searchTerm).to.equal("");
    })
});