import React from 'react';
import SearchBar from './SearchBar'
import {shallow} from 'enzyme';
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
        expect(searchBarComponent.state().searchTerm).toEqual("");
    });

    it('should clear search term when click in close icon', () => {
        searchBarComponent = shallow(<SearchBar onChange={onChange}/>);

        searchBarComponent.setState({searchTerm});

        expect(searchBarComponent.state().searchTerm).toEqual(searchTerm);

        const clear = searchBarComponent.find(Close);

        clear.simulate('click');

        expect(searchBarComponent.state().searchTerm).toEqual("");

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

        expect(onChangeSpy.calledWith(searchTerm)).toBeTruthy();
        expect(searchBarComponent.state().searchTerm).toEqual(searchTerm);
    })
});