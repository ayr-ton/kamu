import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import App from './App';
import { getLoggedUser } from '../services/ProfileService';
import { getBooksByPage, getLibraries } from '../services/BookService';
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
    getLibraries.mockResolvedValue({ results: [{ slug: 'bh', id: 1 }] });
    component = createComponent('/');
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('has a header', () => {
    expect(component.find({ 'data-testid': 'header' }).exists()).toBeTruthy();
  });

  describe('routing', () => {
    it('routes to library selector when path is root', () => {
      expect(component.find({ 'data-testid': 'library-selector' }).exists()).toBeTruthy();
    });

    it('routes to my books component when path is /my-books', () => {
      component = createComponent('/my-books');
      expect(component.find({ 'data-testid': 'my-books-wrapper' }).exists()).toBeTruthy();
    });

    it('routes to my books component when path is /library/:slug', () => {
      component = createComponent('/libraries/bh');
      expect(component.find({ 'data-testid': 'library-wrapper' }).exists()).toBeTruthy();
    });
  });

  describe('theming', () => {
    it('renders with light theme as default', () => {
      expect(component.find(MuiThemeProvider).props().theme).toEqual(lightTheme);
    });

    it('changes to dark theme when change theme button is clicked', () => {
      component.find({ 'data-testid': 'change-theme-button' }).first().simulate('click');
      expect(component.find(MuiThemeProvider).props().theme).toEqual(darkTheme);
    });
  });
});
