import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import LibrarySelector from './home/LibrarySelector';
import LibraryRedirector from './home/LibraryRedirector';
import Library from './libraries/Library';
import MyBooks from './mybooks/MyBooks';
import { getLoggedUser } from './services/ProfileService';
import { trackAnalyticsPageView } from './utils/analytics';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    getLoggedUser().then(user => {
      // TODO: get rid of the need for a global user variable
      window.currentUser = user;
      this.setState({ user });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header borrowedBooksCount={this.state.user ? this.state.user.borrowed_books_count : 0} />
          {this.state.user && (
            <div id="content">
              <Route exact path="/" render={({ history }) => (
                <LibraryRedirector history={history}>
                  <LibrarySelector />
                </LibraryRedirector>
              )} />
              <Route exact path="/my-books" component={MyBooks} />
              <Route path="/libraries/:slug" render={({ match }) => (
                <Library slug={match.params.slug} />
              )} />
            </div>
          )}
          <Route path="/" render={trackAnalyticsPageView} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
