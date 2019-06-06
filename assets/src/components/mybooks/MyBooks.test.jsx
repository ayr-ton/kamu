import React from 'react';
import { mount } from 'enzyme';
import MyBooks from './MyBooks';
import { getMyBooks } from '../../services/BookService';
import BookList from '../books/BookList';
import { someBookWithACopyFromMe } from '../../../test/booksHelper';

jest.mock('../../services/BookService');

const createComponent = (props = {}) => mount(<MyBooks {...props} />);

describe('My books', () => {
  beforeEach(() => {
    getMyBooks.mockReturnValue({ results: [] });
  });

  afterEach(() => {
    getMyBooks.mockClear();
  });

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
    const books = [someBookWithACopyFromMe()];
    getMyBooks.mockReturnValue({ results: books });

    const component = await createComponent();
    await component.update();

    expect(component.find(BookList).props().books).toEqual(books);
  });
});
