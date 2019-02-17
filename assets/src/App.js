import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import LibrarySelector from './home/LibrarySelector';
import Library from './libraries/Library';
import MyBooks from './mybooks/MyBooks';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div id="content">
          <Route exact path="/" component={LibrarySelector} />
          <Route exact path="/my-books" component={MyBooks} />
          <Route path="/libraries/:slug" render={({ match }) => (
            <Library slug={match.params.slug} />
          )} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
