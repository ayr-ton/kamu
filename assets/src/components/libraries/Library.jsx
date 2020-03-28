import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { getBooksByPage } from '../../services/BookService';
import BookList from '../books/BookList';
import SearchBar from './SearchBar';
import { setRegion } from '../../services/UserPreferences';
import LoadingIndicator from '../LoadingIndicator';
import ErrorMessage from '../error/ErrorMessage';
import BookDetailContainer from '../books/detail/BookDetailContainer';
import { CLOSE_BOOK_ACTION, OPEN_BOOK_ACTION } from '../../utils/constants';
import performAction from '../../utils/bookAction';

const initialState = {
  books: [],
  hasNextPage: true,
  page: 1,
  searchTerm: '',
  isLoading: false,
  hasError: false,
};

class Library extends Component {
  constructor(props) {
    super(props);

    const searchTerm = new URLSearchParams(props.history.location.search).get('q') || '';
    this.state = {
      ...initialState,
      searchTerm,
    };

    this.loadBooks = this.loadBooks.bind(this);
    this.searchTermChanged = this.searchTermChanged.bind(this);
    this.performActionAndUpdateState = this.performActionAndUpdateState.bind(this);
  }

  componentDidMount() {
    this.loadBooks();
  }

  componentDidUpdate(prevProps) {
    if (this.props.slug !== prevProps.slug) {
      this.setState(initialState);
      this.loadBooks();
    }
  }

  async loadBooks() {
    if (this.state.isLoading) return;

    this.setState({ isLoading: true, hasNextPage: false });

    const { page, searchTerm } = this.state;

    try {
      const booksResponse = await getBooksByPage(this.props.slug, page, searchTerm);
      setRegion(this.props.slug);
      this.setState((state) => ({
        books: state.books.concat(booksResponse.results),
        page: state.page + 1,
        hasNextPage: !!booksResponse.next,
        isLoading: false,
      }));
    } catch (e) {
      this.setState({
        hasError: true,
        isLoading: false,
      });
    }
  }

  updateQueryString() {
    const { searchTerm } = this.state;
    const queryString = new URLSearchParams(this.props.history.location.search);
    if (searchTerm) {
      queryString.set('q', searchTerm);
    } else {
      queryString.delete('q');
    }

    this.props.history.replace({
      search: queryString.toString(),
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
      this.updateQueryString();
    });
  }

  async performActionAndUpdateState(action, book) {
    const { books } = this.state;
    const updatedBook = await performAction(action, book, this.props.slug);
    this.setState({ books: books.map((it) => (it.id === updatedBook.id ? updatedBook : it)) });
    return updatedBook;
  }

  render() {
    const { slug } = this.props;
    return this.state.hasError ? <ErrorMessage /> : (
      <div data-testid="library-wrapper">
        <Route
          path="/libraries/:slug/book/:bookId"
          render={({ match }) => (
            <BookDetailContainer
              librarySlug={slug}
              bookId={match.params.bookId}
              data-testid="book-detail-loader"
              onAction={(action, book) => {
                if (action === CLOSE_BOOK_ACTION) {
                  return this.props.history.push(`/libraries/${slug}`);
                }
                return this.performActionAndUpdateState(action, book);
              }}
            />
          )}
        />
        <SearchBar onChange={this.searchTermChanged} query={this.state.searchTerm} />
        <InfiniteScroll
          initialLoad={false}
          loadMore={this.loadBooks}
          hasMore={this.state.hasNextPage}
          threshold={950}
          loader={<LoadingIndicator key="loading-indicator" />}
        >
          <BookList
            books={this.state.books}
            onAction={(action, book) => {
              if (action === OPEN_BOOK_ACTION) {
                return this.props.history.push(`/libraries/${slug}/book/${book.id}`);
              }
              return this.performActionAndUpdateState(action, book);
            }}
          />
        </InfiniteScroll>
      </div>
    );
  }
}

Library.propTypes = {
  slug: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export { Library };
export default withRouter(Library);
