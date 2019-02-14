import React from 'react';
import BookList from './BookList';
import { shallow } from 'enzyme';

const shallowBookList = (props) => shallow(<BookList {...props} />);
const books = [
  {
    id: 1,
    title: "book 1",
    author: "author 1"
  },
];

describe('Book list', () => {
  it('renders without crashing', () => {
    const bookList = shallowBookList();
    expect(bookList.exists()).toBeTruthy();
  });
  
  it('should render the list of books', () => {
    const bookList = shallowBookList({ books });
    
    const bookComponents = bookList.find('Book');
    
    expect(bookComponents).toHaveLength(books.length);
    expect(bookComponents.at(0).props().book).toEqual(books[0]);
  });
});
