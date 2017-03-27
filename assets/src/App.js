import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../css/App.css';
import Header from './Header';
import BookList from './BookList';
import BookService from './BookService';
import LibrarySelector from './LibrarySelector';
import LibraryService from './LibraryService';

class App extends Component {
  render() {
    const bookService = new BookService();
    const libraryService = new LibraryService();

    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <Router>
            <div>
              <Route exact path="/" render={routeProps => <LibrarySelector service={libraryService} {...routeProps} /> } />
              <Route path="/library/:library_slug" render={routeProps => <BookList service={bookService} {...routeProps} /> } />
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
