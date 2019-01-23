import React from 'react';
import DumbBookList from './DumbBookList';
import {shallow} from 'enzyme';
import {expect} from 'chai';

describe('Dumb Book list', () => {
  const shallowBookList = (props) => shallow(<DumbBookList {...props} />);
  const books = [
    {
      id: 1,
      title: "book 1",
      author: "author 1"
    },
  ];
  
  it('renders without crashing', () => {
    const bookList = shallowBookList();
    expect(bookList.exists()).to.be.true;
  });
  
  it('should render the list of books', () => {
    const bookList = shallowBookList({ books });
    
    const bookComponents = bookList.find('Book');
    
    expect(bookComponents).to.have.length(books.length);
    expect(bookComponents.at(0).props().book).to.equal(books[0]);
  });
  
});
