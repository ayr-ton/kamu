import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this._getBooks();
  }

  _getBooks() {
    fetch('/api/books/').then(response => {
      return response.json();
    }).then(data => {
      let results = data.results.map(book => {
        return `${book.title} (${book.author})`;
      });
      console.log(results);
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
