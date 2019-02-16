import React, { Component } from 'react';
import { getMyBooks } from '../services/BookService';
import BookList from '../libraries/BookList';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';

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
      <React.Fragment>
        <Paper elevation={10} className="page-title">
          <Icon className="fa fa-book-reader" />
          My books
        </Paper>
        <BookList books={this.state.books} />
      </React.Fragment>
    );
  }
}
  