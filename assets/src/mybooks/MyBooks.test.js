import React from 'react';
import { shallow } from 'enzyme';
import MyBooks from './MyBooks';
import { getMyBooks } from '../services/BookService';

import BookList from '../libraries/BookList';

jest.mock('../services/BookService');

describe('My books', () => {
  const createComponent = (props = {}) => shallow(<MyBooks {...props} />);

  it('renders without crashing', () => {
    const myBooks = createComponent();
    expect(myBooks.exists()).toBeTruthy();
  });

  it('fetches the books when mounted', () => {
    createComponent();

    expect(getMyBooks).toHaveBeenCalled();
  });

  it('has a BookList component', () => {
    const component = createComponent();
    expect(component.find(BookList).exists()).toBeTruthy();
  });

  it('passes the fetched books to the BookList', async () => {
    const books = ['book1'];
    getMyBooks.mockReturnValue({ results: books });

    const component = await createComponent();

    expect(component.find(BookList).props().books).toEqual(books);
  });
});
