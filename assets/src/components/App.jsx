import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import UserContext from './UserContext';
import Header from './Header';
import LibrarySelector from './home/LibrarySelector';
import LibraryRedirector from './home/LibraryRedirector';
import Library from './libraries/Library';
import MyBooks from './mybooks/MyBooks';
import { getLoggedUser } from '../services/ProfileService';
import { trackAnalyticsPageView, trackEvent } from '../utils/analytics';
import themes from '../styling/themes';
import { getDefaultTheme, setDefaultTheme } from '../services/UserPreferences';

import './App.css';

const setCorrespondingThemeClassToBody = (theme) => {
  document.getElementsByTagName('body')[0].classList = [theme.palette.type];
};

class App extends Component {
  constructor(props) {
    super(props);
    const defaultTheme = getDefaultTheme() === 'dark' ? themes.dark : themes.light;
    this.state = {
      user: undefined,
      theme: defaultTheme,
    };
    setCorrespondingThemeClassToBody(defaultTheme);

    this.updateUser = () => {
      getLoggedUser().then((user) => {
        this.setState({ user });
      });
    };

    this.setTheme = (theme) => {
      setDefaultTheme(theme.palette.type);
      this.setState({ theme });
      setCorrespondingThemeClassToBody(theme);
      trackEvent('Preferences', 'Toggle Theme', theme.palette.type);
    };

    this.toggleTheme = () => {
      const currentTheme = this.state.theme;
      this.setTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };
  }

  componentDidMount() {
    this.updateUser();
  }

  render() {
    const { user } = this.state;
    return (
      <UserContext.Provider value={{ user, updateUser: this.updateUser }}>
        <BrowserRouter>
          <MuiThemeProvider theme={this.state.theme}>
            <React.Fragment>
              <Header toggleTheme={this.toggleTheme} />
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
          </MuiThemeProvider>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default App;
