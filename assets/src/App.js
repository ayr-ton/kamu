import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import Header from './Header';
import BookList from './BookList';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <BookList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
