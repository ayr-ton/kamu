import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { getBooksByPage } from '../services/BookService';
import BookList from './BookList';
import SearchBar from '../utils/filters/SearchBar';
import { setRegion } from '../services/ProfileService';

class Library extends Component {
  constructor(props) {
    super(props);

    const searchTerm = new URLSearchParams(props.history.location.search).get('q') || '';

    this.state = {
      books: [],
      hasNextPage: true,
      page: 1,
      searchTerm,
      isLoading: false,
    };

    this.loadBooks = this.loadBooks.bind(this);
    this.searchTermChanged = this.searchTermChanged.bind(this);
  }

  componentDidMount() {
    setRegion(this.props.slug);
  }

  async loadBooks() {
    if (this.state.isLoading) return;

    this.setState({ isLoading: true, hasNextPage: false });

    const { page, searchTerm } = this.state;
    const booksResponse = await getBooksByPage(this.props.slug, page, searchTerm) || {};
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

    this.props.history.replace({
      search: searchTerm ? new URLSearchParams({ q: searchTerm }).toString() : null,
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
        <SearchBar onChange={this.searchTermChanged} query={this.state.searchTerm} />
        <InfiniteScroll
          loadMore={this.loadBooks}
          hasMore={this.state.hasNextPage}
          threshold={950}
          loader={(
            <div style={{ padding: 10, textAlign: 'center' }} key="booklist-loader">
              <CircularProgress />
            </div>
          )}
        >
          <BookList books={this.state.books} library={this.props.slug} />
        </InfiniteScroll>
      </React.Fragment>
    );
  }
}

Library.propTypes = {
  slug: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default Library;
