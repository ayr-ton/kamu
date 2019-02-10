import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { shallow } from 'enzyme';
import Library from './Library';
import { getBooksByPage } from '../services/BookService';
import { mockGetBooksByPageResponse } from '../../test/mockBookService';
import BookList from './DumbBookList';

jest.mock('../services/BookService');

const createComponent = (props) => shallow(<Library slug='library-1' {...props} />);

describe('Library', () => {
  beforeEach(() => {
    getBooksByPage.mockResolvedValue(mockGetBooksByPageResponse);
  });
  
  it('has the book list inside an infinite scroll', () => {
    const library = createComponent();

    expect(library.find(InfiniteScroll).find(BookList).exists()).toBeTruthy();
  });
  
  it('fetches the first page of books for that library from infinite scroll component', () => {
    const library = createComponent({ slug: 'bh' });

    const infiniteScroll = library.find(InfiniteScroll);
    infiniteScroll.props().loadMore(1);

    expect(getBooksByPage).toHaveBeenCalledWith('bh', 1);
  });

  it('fetches the second page of books when infinite scroll is called the second time', async () => {
    const library = createComponent({ slug: 'bh' });

    const infiniteScroll = library.find(InfiniteScroll);
    await infiniteScroll.props().loadMore(1);
    await infiniteScroll.props().loadMore(2);

    expect(getBooksByPage).toHaveBeenCalledWith('bh', 2);
  });

  it('passes the fetched books to the book list component', async () => {
    const library = createComponent();

    const infiniteScroll = library.find(InfiniteScroll);
    await infiniteScroll.props().loadMore(1);

    expect(library.find(BookList).props().books).toEqual(mockGetBooksByPageResponse.results);
  });

  it('appends the other fetched books to the book list component', async () => {
    const library = createComponent();

    const infiniteScroll = library.find(InfiniteScroll);
    await infiniteScroll.props().loadMore(1);
    await infiniteScroll.props().loadMore(2);

    expect(library.find(BookList).props().books).toHaveLength(4);
  });

  it('tells the infinite scroller when there are more pages available', async () => {
    const library = createComponent();
    getBooksByPage.mockResolvedValue({
      ...mockGetBooksByPageResponse,
      next: 'http://example.com/link/to/next/page',
    });

    const infiniteScroll = library.find(InfiniteScroll);
    await infiniteScroll.props().loadMore(1);

    expect(library.update().find(InfiniteScroll).props().hasMore).toBeTruthy();
  });

  it('tells the infinite scroller when there arent more pages available', async () => {
    const library = createComponent();
    getBooksByPage.mockResolvedValue({
      ...mockGetBooksByPageResponse,
      next: null
    });

    const infiniteScroll = library.find(InfiniteScroll);
    await infiniteScroll.props().loadMore(1);

    expect(library.update().find(InfiniteScroll).props().hasMore).toBeFalsy();
  });
});
