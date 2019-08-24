import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';
import { withRouter } from 'react-router';
import UserContext from './UserContext';
import { clearRegion, getRegion } from '../services/ProfileService';
import {
  HOME_URL, ADMIN_URL, MY_BOOKS_URL, ADD_BOOK_URL, LIBRARY_URL_PREFIX,
} from '../utils/constants';

const redirectExternal = (url) => window.location.assign(url);
const getHomeEndpoint = () => (getRegion() ? `${LIBRARY_URL_PREFIX}/${getRegion()}` : HOME_URL);

function Header({ history, toggleTheme }) {
  const redirect = (url) => history.push(url);
  return (
    <AppBar className="header" data-testid="header">
      <Toolbar>
        <a href={getHomeEndpoint()} className="header-content" onClick={(e) => { e.preventDefault(); redirect(getHomeEndpoint()); }}>
          <img src="/static/images/logo.svg" alt="Kamu logo" />
        </a>

        <div style={{ flexGrow: 1 }} />

        <div className="header-menu">
          <IconButton title="Library home" id="home-button" onClick={() => redirect(getHomeEndpoint())}>
            <Icon className="fa fa-home" />
          </IconButton>

          <IconButton title="My books" id="my-books-button" onClick={() => redirect(MY_BOOKS_URL)}>
            <UserContext.Consumer>
              {({ user }) => (
                <Badge badgeContent={user ? user.borrowed_books_count : 0} color="secondary">
                  <Icon className="fa fa-book-reader" />
                </Badge>
              )}
            </UserContext.Consumer>
          </IconButton>

          <IconButton title="Add a book" id="add-book-button" onClick={() => redirectExternal(ADD_BOOK_URL)}>
            <Icon className="fa fa-plus-circle" />
          </IconButton>

          <IconButton title="Change region" id="change-region-button" onClick={() => { clearRegion(); redirect(HOME_URL); }}>
            <Icon className="fa fa-map-marker-alt" />
          </IconButton>

          <IconButton title="Change theme" data-testid="change-theme-button" onClick={() => toggleTheme()}>
            <Icon className="fa fa-adjust" />
          </IconButton>

          <IconButton title="Administration" id="admin-button" onClick={() => redirectExternal(ADMIN_URL)}>
            <Icon className="fa fa-cog" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  history: PropTypes.shape({}).isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export { Header };
export default withRouter(Header);
