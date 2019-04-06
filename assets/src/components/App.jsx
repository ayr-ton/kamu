import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import UserContext from './UserContext';
import Header from './Header';
import LibrarySelector from './home/LibrarySelector';
import LibraryRedirector from './home/LibraryRedirector';
import Library from './libraries/Library';
import MyBooks from './mybooks/MyBooks';
import { getLoggedUser } from '../services/ProfileService';
import trackAnalyticsPageView from '../utils/analytics';

class App extends Component {
  constructor(props) {
    super(props);

    this.updateUser = () => {
      getLoggedUser().then((user) => {
        this.setState({ user });
      });
    };

    this.state = {
      user: null,
      updateUser: this.updateUser,
    };
  }

  componentDidMount() {
    this.updateUser();
  }

  render() {
    const { user, updateUser } = this.state;
    return (
      <UserContext.Provider value={{ user, updateUser }}>
        <BrowserRouter>
          <React.Fragment>
            <Header />
            <div id="content">
              <Route
                exact
                path="/"
                render={({ history }) => (
                  <LibraryRedirector history={history}>
                    <LibrarySelector />
                  </LibraryRedirector>
                )}
              />
              <Route exact path="/my-books" component={MyBooks} />
              <Route
                path="/libraries/:slug"
                render={({ match, history }) => (
                  <Library slug={match.params.slug} history={history} />
                )}
              />
            </div>
            <Route path="/" render={trackAnalyticsPageView} />
          </React.Fragment>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default App;
