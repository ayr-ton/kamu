import React from 'react';
import Library from './Library';
import { getBooksByPage } from '../services/BookService';
import { mockGetBooksByPageResponse } from '../../test/mockBookService';
import { shallow } from 'enzyme';
import BookList from './DumbBookList';

jest.mock('../services/BookService');

const createComponent = (props) => shallow(<Library slug='library-1' {...props} />);

describe('Library', () => {
  beforeEach(() => {
    getBooksByPage.mockResolvedValue(mockGetBooksByPageResponse);
  });
  
  it('should fetch the list of books for that library', async () => {
    await createComponent({ slug: 'bh' });

    expect(getBooksByPage).toHaveBeenCalledWith('bh', 1);
  });

  it('passes the books in state to the book list component', async () => {
    const library = await createComponent();
    const books = mockGetBooksByPageResponse.results;
    library.setState({ books })

    expect(library.update().find(BookList).props().books).toEqual(books);
  });
});
