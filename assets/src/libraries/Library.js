import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getBooksByPage } from '../services/BookService';
import BookList from './DumbBookList';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  async componentDidMount() {
    const booksResponse = await getBooksByPage(this.props.slug, 1);
    this.setState({
      books: booksResponse.results
    });
  }

  render() {
    return (
      <BookList books={this.state.books} />
    );
  }
}

Library.propTypes = {
  slug: PropTypes.string.isRequired
};

export default Library;
