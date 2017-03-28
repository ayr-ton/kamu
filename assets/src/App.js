import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../css/App.css';
import Header from './Header';
import BookList from './BookList';
import BookService from './BookService';
import LibrarySelector from './LibrarySelector';

class App extends Component {
  render() {
    const bookService = new BookService();

    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <Router>
            <div>
              <Route exact path="/" render={routeProps => <LibrarySelector service={bookService} {...routeProps} /> } />
              <Route path="/library/:library_slug" render={routeProps => <BookList service={bookService} {...routeProps} /> } />
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
