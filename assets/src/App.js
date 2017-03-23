import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import Header from './Header';
import BookList from './BookList';
import BookService from './BookService';

class App extends Component {
  
  render() {
    const bookService = new BookService();
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <BookList service={bookService} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
