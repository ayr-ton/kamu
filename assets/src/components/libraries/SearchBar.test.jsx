import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  let searchBarComponent;
  const searchTerm = 'search term text';

  it('should render with empty search term', () => {
    searchBarComponent = render(<SearchBar onChange={() => {}} query="" />);
    const input = searchBarComponent.getByPlaceholderText('Search by book title or author');
    expect(input.value).toBe('');
  });

  it('should render with passed search term', () => {
    searchBarComponent = render(<SearchBar onChange={() => {}} query="test search" />);
    expect(searchBarComponent.getByDisplayValue('test search')).toBeInTheDocument();
  });

  it('should clear search term when click in close icon', () => {
    searchBarComponent = render(<SearchBar onChange={() => {}} query="" />);

    const inputField = searchBarComponent.getByPlaceholderText('Search by book title or author');

    userEvent.type(inputField, 'test');
    expect(inputField.value).toBe('test');

    userEvent.click(searchBarComponent.getByRole('img', { name: 'Close' }));
    expect(inputField.value).toBe('');
  });

  it('should call onchange function passing the trimmed search term when textfield changes', () => {
    const onChange = jest.fn();

    searchBarComponent = render(<SearchBar onChange={onChange} query="" />);

    const inputField = searchBarComponent.getByPlaceholderText('Search by book title or author');

    userEvent.type(inputField, searchTerm);

    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });

  it('should not call onchange function when trimmed text does not change', () => {
    const onChangeMock = jest.fn();

    searchBarComponent = render(<SearchBar onChange={onChangeMock} query="test " />);

    const inputField = searchBarComponent.getByPlaceholderText('Search by book title or author');

    userEvent.type(inputField, 'test  ');

    expect(onChangeMock).not.toHaveBeenCalledWith('test');
  });
});
