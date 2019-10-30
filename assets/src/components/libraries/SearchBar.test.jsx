import React from 'react';
import { shallow } from 'enzyme';
import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  let searchBarComponent;
  const searchTerm = 'search term text';
  const onChange = jest.fn();

  it('should render with empty search term', () => {
    searchBarComponent = shallow(<SearchBar onChange={onChange} query="" />);
    expect(searchBarComponent.state().searchTerm).toEqual('');
  });

  it('should render with passed search term', () => {
    searchBarComponent = shallow(<SearchBar onChange={onChange} query="test search" />);
    expect(searchBarComponent.state().searchTerm).toEqual('test search');
  });

  it('should clear search term when click in close icon', () => {
    searchBarComponent = shallow(<SearchBar onChange={onChange} query="" />);
    searchBarComponent.setState({ searchTerm });

    searchBarComponent.find(Close).simulate('click');

    expect(searchBarComponent.state().searchTerm).toEqual('');
  });

  it('should call onchange function passing the trimmed search term when textfield changes', () => {
    const textfieldChangeEvent = {
      target: {
        value: `${searchTerm} `,
      },
    };

    searchBarComponent = shallow(<SearchBar onChange={onChange} query="" />);
    const textField = searchBarComponent.find(TextField);

    textField.props().onChange(textfieldChangeEvent);

    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });

  it('should not call onchange function when trimmed text does not change', () => {
    const textfieldChangeEvent = {
      target: {
        value: 'test  ',
      },
    };

    searchBarComponent = shallow(<SearchBar onChange={onChange} query="test " />);
    const textField = searchBarComponent.find(TextField);

    textField.props().onChange(textfieldChangeEvent);

    expect(onChange).not.toHaveBeenCalledWith('test  ');
  });
});
