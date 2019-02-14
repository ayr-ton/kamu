import React, { Component } from 'react';
import { getMyBooks } from '../services/BookService';
import BookList from '../libraries/BookList';

export default class MyBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  async componentDidMount() {
    const response = await getMyBooks();
    this.setState({ books: response.results });
  }
  
  render() {
    return (
      <BookList books={this.state.books} />
    );
  }
}
  