import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { shallow } from 'enzyme';
import Library from './Library';
import { getBooksByPage } from '../services/BookService';
import { setRegion } from '../services/ProfileService';
import { mockGetBooksByPageResponse, mockGetBooksByPageEmptyResponse } from '../../test/mockBookService';
import BookList from './BookList';
import SearchBar from '../utils/filters/SearchBar';

jest.mock('../services/BookService');
jest.mock('../services/ProfileService');

const createComponent = (props) => shallow(<Library slug='bh' {...props} />);

describe('Library', () => {
  let library;

  beforeEach(() => {
    library = createComponent();
    getBooksByPage.mockResolvedValue(mockGetBooksByPageResponse);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('has the book list inside an infinite scroll', () => {
    expect(library.find(InfiniteScroll).find(BookList).exists()).toBeTruthy();
  });

  it('fetches the first page of books for that library from infinite scroll component', () => {
    const infiniteScroll = library.find(InfiniteScroll);
    infiniteScroll.props().loadMore();

    expect(getBooksByPage).toHaveBeenCalledWith('bh', 1, '');
  });

  it('fetches the second page of books when infinite scroll is called the second time', async () => {
    const infiniteScroll = library.find(InfiniteScroll);
    await infiniteScroll.props().loadMore();
    await infiniteScroll.props().loadMore();

    expect(getBooksByPage).toHaveBeenCalledWith('bh', 2, '');
  });

  it('passes the fetched books to the book list component', async () => {
    const infiniteScroll = library.find(InfiniteScroll);
    await infiniteScroll.props().loadMore();

    expect(library.find(BookList).props().books).toEqual(mockGetBooksByPageResponse.results);
  });

  it('passes the library slug to the book list component', async () => {
    const infiniteScroll = library.find(InfiniteScroll);
    await infiniteScroll.props().loadMore();

    expect(library.find(BookList).props().library).toEqual('bh');
  });

  it('appends the other fetched books to the book list component', async () => {
    const infiniteScroll = library.find(InfiniteScroll);
    await infiniteScroll.props().loadMore();
    await infiniteScroll.props().loadMore();

    expect(library.find(BookList).props().books).toHaveLength(4);
  });

  it('tells the infinite scroller when there are more pages available', async () => {
    getBooksByPage.mockResolvedValue({
      ...mockGetBooksByPageResponse,
      next: 'http://example.com/link/to/next/page',
    });

    const infiniteScroll = library.find(InfiniteScroll);
    await infiniteScroll.props().loadMore();

    expect(library.update().find(InfiniteScroll).props().hasMore).toBeTruthy();
  });

  it('tells the infinite scroller when there arent more pages available', async () => {
    getBooksByPage.mockResolvedValue({
      ...mockGetBooksByPageResponse,
      next: null
    });

    const infiniteScroll = library.find(InfiniteScroll);
    await infiniteScroll.props().loadMore();

    expect(library.update().find(InfiniteScroll).props().hasMore).toBeFalsy();
  });

  it('has a search bar', () => {
    expect(library.find(SearchBar).exists()).toBeTruthy();
  });

  it('fetches the books with the search term when the search bar is triggered', () => {
    const searchBar = library.find(SearchBar);

    searchBar.props().onChange('test search');

    expect(getBooksByPage).toHaveBeenCalledWith('bh', 1, 'test search');
  });

  it('clears the previous books when searching', () => {
    library.setState({ books: mockGetBooksByPageResponse.results });
    getBooksByPage.mockResolvedValueOnce(mockGetBooksByPageEmptyResponse);
    const searchBar = library.find(SearchBar);

    searchBar.props().onChange('test search');

    expect(library.state().books).toEqual([]);
  });

  it('does not fetch books again while still loading', () => {
    getBooksByPage.mockResolvedValue({
      ...mockGetBooksByPageResponse,
      next: 'http://example.com/link/to/next/page',
    });

    const infiniteScroll = library.find(InfiniteScroll);
    infiniteScroll.props().loadMore();
    infiniteScroll.props().loadMore();

    expect(getBooksByPage).toHaveBeenCalledTimes(1);
  });

  it('does not update book list when get books fails', async () => {
    library.setState({ books: mockGetBooksByPageResponse.results });
    getBooksByPage.mockResolvedValue(null);

    const infiniteScroll = library.find(InfiniteScroll);
    await infiniteScroll.props().loadMore();

    expect(library.state().books).toEqual(mockGetBooksByPageResponse.results);
  });

  it('sets the library in the users preferences', () => {
    expect(setRegion).toHaveBeenCalledWith('bh');
  });
});
