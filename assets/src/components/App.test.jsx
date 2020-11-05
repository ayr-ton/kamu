import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { mount } from 'enzyme';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';
import { getLoggedUser } from '../services/ProfileService';
import {
  getBook,
  getBooksByPage, getLibraries, getMyBooks, getWaitlistBooks,
} from '../services/BookService';

import { currentUser } from '../../test/userHelper';
import { lightTheme, darkTheme } from '../styling/themes';
import { trackEvent } from '../utils/analytics';
import { someBook } from '../../test/booksHelper';

jest.mock('../services/ProfileService');
jest.mock('../services/BookService');
jest.mock('../utils/analytics');

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
    getBook.mockResolvedValue(someBook());
    component = createComponent('/');
  });

  it('has a header with a logo and navigation buttons', () => {
    render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);

    expect(screen.getByRole('img', { name: /kamu logo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
  });

  it('shows current user\'s borrow count on my books button', async () => {
    render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);

    await waitFor(() => expect(screen.getByRole('button', { name: /my books/i })).toHaveTextContent(currentUser.borrowed_books_count.toString()));
  });

  describe('routing', () => {
    it('routes to library selector when path is root', () => {
      expect(findByTestID(component, 'library-selector').exists()).toBeTruthy();
    });

    it('routes to my books component when path is /my-books', () => {
      component = createComponent('/my-books');
      expect(findByTestID(component, 'my-books-wrapper').exists()).toBeTruthy();
    });

    it('routes to library component when path is /library/:slug', () => {
      component = createComponent('/libraries/bh');
      expect(findByTestID(component, 'library-wrapper').exists()).toBeTruthy();
    });

    it('routes to book detail and library component when path is /library/:slug/book/:id', async () => {
      component = createComponent('/libraries/bh/book/123');
      expect(findByTestID(component, 'book-detail-loader').exists()).toBeTruthy();
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
      expect(trackEvent).toHaveBeenCalledWith('Preferences', 'Toggle Theme', 'dark');
    });

    it('stores chosen theme as default in local storage', () => {
      findByTestID(component, 'change-theme-button').simulate('click');
      localStorage.getItem('theme', 'dark');
    });
  });
});
