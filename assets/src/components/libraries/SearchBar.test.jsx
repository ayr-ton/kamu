import React from 'react';
import { shallow } from 'enzyme';
import Close from '@material-ui/icons/Close';
import { fireEvent } from '@testing-library/dom';
import { render } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  let searchBarComponent;
  const searchTerm = 'search term text';
  const onChange = jest.fn();

  it('should render with empty search term', () => {
    searchBarComponent = render(<SearchBar onChange={onChange} query="" />);
    const input = searchBarComponent.getByPlaceholderText('Search by book title or author');
    expect(input.value).toBe('');
  });

  it('should render with passed search term', () => {
    searchBarComponent = render(<SearchBar onChange={onChange} query="test search" />);
    searchBarComponent.getByDisplayValue('test search');
  });

  it('should clear search term when click in close icon', () => {
    searchBarComponent = shallow(<SearchBar onChange={onChange} query="" />);
    searchBarComponent.setState({ searchTerm });

    searchBarComponent.find(Close).simulate('click');

    expect(searchBarComponent.state().searchTerm).toEqual('');
  });

  it('should call onchange function passing the trimmed search term when textfield changes', () => {
    searchBarComponent = render(<SearchBar onChange={onChange} query="" />);

    const inputField = searchBarComponent.getByPlaceholderText(/search by book title or author/i);

    fireEvent.change(inputField, { target: { value: `${searchTerm}` } });

    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });

  it('should not call onchange function when trimmed text does not change', () => {
    searchBarComponent = render(<SearchBar onChange={onChange} query="test " />);

    const inputField = searchBarComponent.getByPlaceholderText(/search by book title or author/i);

    fireEvent.change(inputField, { target: { value: 'test  ' } });

    expect(onChange).not.toHaveBeenCalledWith('test');
  });
});
