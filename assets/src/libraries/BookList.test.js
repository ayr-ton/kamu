import React from 'react';
import { shallow } from 'enzyme';
import BookList from './BookList';

const shallowBookList = props => shallow(<BookList {...props} />);
const books = [
  {
    id: 1,
    title: 'book 1',
    author: 'author 1',
  },
];

describe('Book list', () => {
  it('renders without crashing', () => {
    const bookList = shallowBookList({ books: [] });
    expect(bookList.exists()).toBeTruthy();
  });

  it('should render the list of books', () => {
    const bookList = shallowBookList({ books, library: 'poa' });

    const bookComponents = bookList.find('Book');

    expect(bookComponents).toHaveLength(books.length);
    expect(bookComponents.at(0).props().book).toEqual(books[0]);
    expect(bookComponents.at(0).props().library).toEqual('poa');
  });
});
