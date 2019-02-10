import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import { getBooksByPage } from '../services/BookService';
import BookList from './DumbBookList';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      page: 1,
      hasNextPage: true,
    };

    this.loadBooks = this.loadBooks.bind(this);
  }

  async loadBooks() {
    const booksResponse = await getBooksByPage(this.props.slug, this.state.page);
    this.setState((currentState) => ({
      books: currentState.books.concat(booksResponse.results),
      page: currentState.page + 1,
      hasNextPage: !!booksResponse.next
    }));
  }

  render() {
    return (
      <InfiniteScroll
        pageStart={1}
        loadMore={this.loadBooks}
        hasMore={this.state.hasNextPage}
        threshold={950}
        loader={(
          <div style={{padding: 10, textAlign: "center"}} key='booklist-loader'>
            <CircularProgress />
          </div>
        )}
      >
        <div className="book-list">
          <BookList books={this.state.books} />
        </div>
      </InfiniteScroll>
    );
  }
}

Library.propTypes = {
  slug: PropTypes.string.isRequired
};

export default Library;
