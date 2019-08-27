import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import App from './App';
import { getLoggedUser } from '../services/ProfileService';
import { getBooksByPage, getLibraries, getMyBooks, getWaitlistBooks } from '../services/BookService';
import { currentUser } from '../../test/userHelper';
import { lightTheme, darkTheme } from '../styling/themes';

jest.mock('../services/ProfileService');
jest.mock('../services/BookService');

const createComponent = (route) => mount(
  <MemoryRouter initialEntries={[route]}>
    <App />
  </MemoryRouter>,
);

describe('App', () => {
  let component;

  beforeEach(() => {
    getLoggedUser.mockResolvedValue(currentUser);
    getBooksByPage.mockResolvedValue({ results: [] });
    getMyBooks.mockResolvedValue({ results: [] });
    getWaitlistBooks.mockResolvedValue({ results: [] });
    getLibraries.mockResolvedValue({ results: [{ slug: 'bh', id: 1 }] });
    component = createComponent('/');
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('has a header', () => {
    expect(findByTestID(component, 'header').exists()).toBeTruthy();
  });

  it('shows fetched user\'s related information', () => {
    const usersBooksCountBadge = findByTestID(component, 'my-books-button');
    expect(usersBooksCountBadge.text()).toEqual(currentUser.borrowed_books_count.toString());
  });

  describe('routing', () => {
    it('routes to library selector when path is root', () => {
      expect(findByTestID(component, 'library-selector').exists()).toBeTruthy();
    });

    it('routes to my books component when path is /my-books', () => {
      component = createComponent('/my-books');
      expect(findByTestID(component, 'my-books-wrapper').exists()).toBeTruthy();
    });

    it('routes to my books component when path is /library/:slug', () => {
      component = createComponent('/libraries/bh');
      expect(findByTestID(component, 'library-wrapper').exists()).toBeTruthy();
    });
  });

  describe('theming', () => {
    afterEach(() => {
      localStorage.clear();
    });

    it('renders with theme stored in localStorage', () => {
      localStorage.setItem('theme', 'dark');
      component = createComponent('/');
      expect(component.find(MuiThemeProvider).props().theme).toEqual(darkTheme);
    });

    it('renders with light theme if no default theme is stored in localStorage', () => {
      expect(component.find(MuiThemeProvider).props().theme).toEqual(lightTheme);
      expect(document.getElementsByTagName('body')[0].className).toEqual('light');
    });

    it('changes to dark theme when change theme button is clicked', () => {
      findByTestID(component, 'change-theme-button').simulate('click');
      expect(component.find(MuiThemeProvider).props().theme).toEqual(darkTheme);
      expect(document.getElementsByTagName('body')[0].className).toEqual('dark');
    });

    it('stores chosen theme as default in local storage', () => {
      findByTestID(component, 'change-theme-button').simulate('click');
      localStorage.getItem('theme', 'dark');
    });
  });
});
