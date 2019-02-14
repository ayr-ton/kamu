import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import { getBooksByPage } from '../services/BookService';
import BookList from './BookList';
import SearchBar from '../utils/filters/SearchBar';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      hasNextPage: true,
      page: 1,
      searchTerm: '',
      isLoading: false,
    };

    this.loadBooks = this.loadBooks.bind(this);
    this.searchTermChanged = this.searchTermChanged.bind(this);
  }

  async loadBooks() {
    if (this.state.isLoading) return;

    this.setState({ isLoading: true, hasNextPage: false });

    const booksResponse = await getBooksByPage(this.props.slug, this.state.page, this.state.searchTerm) || {};
    if (booksResponse && booksResponse.results) {
      this.setState((state) => ({
        books: state.books.concat(booksResponse.results),
        page: state.page + 1,
      }));
    }

    this.setState({
      hasNextPage: !!booksResponse.next,
      isLoading: false,
    });
  }

  searchTermChanged(searchTerm) {
    this.setState({
      searchTerm,
      books: [],
      page: 1,
      hasNextPage: false,
    }, () => {
      this.loadBooks();
    });
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar onChange={this.searchTermChanged} />
        <InfiniteScroll
          loadMore={this.loadBooks}
          hasMore={this.state.hasNextPage}
          threshold={950}
          loader={(
            <div style={{padding: 10, textAlign: "center"}} key='booklist-loader'>
              <CircularProgress />
            </div>
          )}
        >
          <BookList books={this.state.books} />
        </InfiniteScroll>
      </React.Fragment>
    );
  }
}

Library.propTypes = {
  slug: PropTypes.string.isRequired
};

export default Library;
