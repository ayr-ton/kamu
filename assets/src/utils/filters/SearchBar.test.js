import React from 'react';
import SearchBar from './SearchBar'
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Close from '@material-ui/icons/Close';
import { TextField } from '@material-ui/core';

describe('<Search />', () => {

    let searchBarComponent;
    const searchTerm = 'search term text';
    const onChange = () => {
    };

    it('should render with empty search term', () => {
        searchBarComponent = shallow(<SearchBar onChange={onChange}/>);
        expect(searchBarComponent.state().searchTerm).to.equal("");
    });

    it('should clear search term when click in close icon', () => {
        searchBarComponent = shallow(<SearchBar onChange={onChange}/>);

        searchBarComponent.setState({searchTerm});

        expect(searchBarComponent.state().searchTerm).to.be.equal(searchTerm);

        const clear = searchBarComponent.find(Close);

        clear.simulate('click');

        expect(searchBarComponent.state().searchTerm).to.be.equal("");

    });

    it('should call onchange function passing the search term when textfield changes', () => {
        const onChangeSpy = sinon.spy(onChange);
        const textfieldChangeEvent = {
            target: {
                value: searchTerm
            }
        };

        searchBarComponent = shallow(<SearchBar onChange={onChangeSpy}/>);
        const textField = searchBarComponent.find(TextField);

        textField.props().onChange(textfieldChangeEvent);

        expect(onChangeSpy.calledWith(searchTerm)).to.be.true;
        expect(searchBarComponent.state().searchTerm).to.be.equal(searchTerm);
    })
});