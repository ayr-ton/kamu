import React from 'react';
import { shallow } from 'enzyme';
import BookList from './BookList';
import { someBookWithAvailableCopies } from '../../../test/booksHelper';

const shallowBookList = (props) => shallow(<BookList {...props} />);

describe('Book list', () => {
  it('renders without crashing', () => {
    const bookList = shallowBookList({ books: [] });
    expect(bookList.exists()).toBeTruthy();
  });

  it('should render the list of books', () => {
    const books = [
      someBookWithAvailableCopies(),
    ];
    const bookList = shallowBookList({ books, library: 'poa' });

    const bookComponents = bookList.find('Book');

    expect(bookComponents).toHaveLength(books.length);
    expect(bookComponents.at(0).props().book).toEqual(books[0]);
    expect(bookComponents.at(0).props().library).toEqual('poa');
  });
});
