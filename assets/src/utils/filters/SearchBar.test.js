import React from 'react';
import SearchBar from './SearchBar'
import {shallow} from 'enzyme';
import {expect} from 'chai';

describe('<Search />', () => {

    let searchBarComponent;

    it('should render with empty search term', () => {
        searchBarComponent = shallow(<SearchBar onChange={() => {
        }}/>)
        expect(searchBarComponent.state().searchTerm).to.equal("");
    });

    it('should clear search term when click in NavigationClose icon', () => {

        const searchTerm = 'texto de teste';
        const onChange = () => {
        };

        searchBarComponent = shallow(<SearchBar onChange={onChange}/>);

        searchBarComponent.setState({searchTerm});

        expect(searchBarComponent.state().searchTerm).to.be.equal(searchTerm);

        const clear = searchBarComponent.find('NavigationClose');

        clear.simulate('click');

        expect(searchBarComponent.state().searchTerm).to.be.equal("");

    });
});