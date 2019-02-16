import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import LibrarySelector from './home/LibrarySelector';
import Library from './libraries/Library';

function Main() {
  return (
    <Router basename="/spa">
      <div>
        <Header />
        <div id="content">
          <Route exact path="/" component={LibrarySelector} />
          <Route path="/libraries/:slug" render={({ match }) => (
            <Library slug={match.params.slug} />
          )} />
        </div>
      </div>
    </Router>
  );
}

export default Main;
