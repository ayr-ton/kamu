import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { checkWaitlist, getBooksByPage } from '../../services/BookService';
import BookList from '../books/BookList';
import SearchBar from './SearchBar';
import { setRegion } from '../../services/UserPreferences';
import LoadingIndicator from '../LoadingIndicator';
import ErrorMessage from '../error/ErrorMessage';
import BookDetailContainer from '../books/detail/BookDetailContainer';
import {
  BORROW_BOOK_ACTION,
  CLOSE_BOOK_ACTION,
  OPEN_BOOK_ACTION,
  OTHERS_ARE_WAITING_STATUS,
} from '../../utils/constants';
import performAction from '../../utils/bookAction';
import { bookIdFromUrl, bookUrl, libraryUrl } from '../../utils/urls';
import WaitlistWarningDialog from '../books/WaitlistWarningDialog';
import UserContext from '../UserContext';

const initialState = {
  books: [],
  hasNextPage: true,
  page: 1,
  searchTerm: '',
  isLoading: false,
  hasError: false,
  confirmationOpen: false,
  confirmationWaitlistBook: null,
};

class Library extends Component {
  constructor(props) {
    super(props);

    const searchTerm = new URLSearchParams(props.history.location.search).get('q') || '';
    this.state = {
      ...initialState,
      searchTerm,
    };

    this.onBookAction = this.onBookAction.bind(this);
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

  onBookAction(action, book) {
    if (action === CLOSE_BOOK_ACTION) {
      return this.props.history.push(libraryUrl(this.props.slug));
    }
    if (action === OPEN_BOOK_ACTION) {
      return this.props.history.push(bookUrl(book, this.props.slug));
    }

    return this.performActionAndUpdateState(action, book);
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

  async performActionAndUpdateState(action, book, shouldCheckWaitlist = true) {
    const { books } = this.state;
    if (shouldCheckWaitlist && action === BORROW_BOOK_ACTION) {
      const { status } = await checkWaitlist(book);
      if (status === OTHERS_ARE_WAITING_STATUS) {
        return this.setState({
          confirmationOpen: true,
          confirmationWaitlistBook: book,
        });
      }
    }

    const updatedBook = await performAction(action, book, this.props.slug);
    this.setState({
      books: books.map((it) => (it.id === updatedBook.id ? updatedBook : it)),
      confirmationOpen: false,
      confirmationWaitlistBook: null,
    });
    this.context.updateUser();
    return updatedBook;
  }

  render() {
    const { slug } = this.props;
    return this.state.hasError ? (
      <ErrorMessage
        title="Something went wrong."
        subtitle="An error happened while loading this page. Please try again."
      />
    ) : (
      <div data-testid="library-wrapper">
        <Route
          path="/libraries/:slug/book/:book"
          render={({ match }) => (
            <BookDetailContainer
              librarySlug={slug}
              bookId={bookIdFromUrl(match.params.book)}
              data-testid="book-detail-loader"
              onAction={this.onBookAction}
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
            onAction={this.onBookAction}
          />
        </InfiniteScroll>
        <WaitlistWarningDialog
          open={this.state.confirmationOpen}
          waitlistItems={this.state.confirmationWaitlistBook
            ? this.state.confirmationWaitlistBook.waitlist_items : []}
          onCancel={() => this.setState({
            confirmationOpen: false,
            confirmationWaitlistBook: null,
          })}
          onConfirm={() => this.performActionAndUpdateState(
            BORROW_BOOK_ACTION,
            this.state.confirmationWaitlistBook,
            false,
          )}
        />
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

Library.contextType = UserContext;

export { Library };
export default withRouter(Library);
