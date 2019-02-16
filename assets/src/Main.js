import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './Header';
import LibrarySelector from './home/LibrarySelector';

function Main() {
  return (
    <Router basename="/spa">
      <div>
        <Header />
        <div id="content">
          <Route exact path="/" component={LibrarySelector} />
          <Route path="/libraries/:slug" render={() => (
            <p>Library</p>
          )} />
        </div>
      </div>
    </Router>
  );
}

export default Main;
