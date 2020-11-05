import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { getLoggedUser } from '../services/ProfileService';
import {
  getBook, getBooksByPage, getLibraries, getMyBooks, getWaitlistBooks,
} from '../services/BookService';

import { currentUser } from '../../test/userHelper';
import { trackEvent } from '../utils/analytics';
import { someBook } from '../../test/booksHelper';
import renderWithRouter from '../../test/renderWithRouter';

jest.mock('../services/ProfileService');
jest.mock('../services/BookService');
jest.mock('../utils/analytics');

describe('App', () => {
  beforeEach(() => {
    getLoggedUser.mockResolvedValue(currentUser);
    getBooksByPage.mockResolvedValue({ results: [] });
    getMyBooks.mockResolvedValue({ results: [] });
    getWaitlistBooks.mockResolvedValue({ results: [] });
    getLibraries.mockResolvedValue({ results: [{ slug: 'bh', id: 1 }] });
    getBook.mockResolvedValue(someBook());
  });

  it('has a header with a logo and navigation buttons', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('img', { name: /kamu logo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
  });

  it('shows current user\'s borrow count on my books button', async () => {
    renderWithRouter(<App />);

    await waitFor(() => expect(screen.getByRole('button', { name: /my books/i })).toHaveTextContent(currentUser.borrowed_books_count.toString()));
  });

  describe('routing', () => {
    it('routes to library selector when path is root', () => {
      renderWithRouter(<App />, { initialEntries: ['/'] });
      expect(screen.getByTestId('library-selector')).toBeInTheDocument();
    });

    it('routes to my books component when path is /my-books', async () => {
      renderWithRouter(<App />, { initialEntries: ['/my-books'] });
      expect(screen.getByTestId('my-books-wrapper')).toBeInTheDocument();
      expect(await screen.findByText(/borrowed with me/i)).toBeInTheDocument();
    });

    it('routes to library component when path is /library/:slug', async () => {
      renderWithRouter(<App />, { initialEntries: ['/libraries/bh'] });
      expect(screen.getByTestId('library-wrapper')).toBeInTheDocument();
      expect(await screen.findByTestId('book-list-container')).toBeInTheDocument();
    });

    it('routes to book detail and library component when path is /library/:slug/book/:id', async () => {
      renderWithRouter(<App />, { initialEntries: ['/libraries/bh/book/123'] });
      expect(screen.getByTestId('library-wrapper')).toBeInTheDocument();
      expect(await screen.findByTestId('book-detail-wrapper')).toBeInTheDocument();
    });
  });

  describe('theming', () => {
    afterEach(() => {
      localStorage.clear();
    });

    it('renders with theme stored in localStorage', () => {
      localStorage.setItem('theme', 'dark');
      renderWithRouter(<App />);
      expect(document.getElementsByTagName('body')[0].className).toEqual('dark');
    });

    it('renders with light theme if no default theme is stored in localStorage', () => {
      renderWithRouter(<App />);
      expect(document.getElementsByTagName('body')[0].className).toEqual('light');
    });

    it('changes to dark theme when change theme button is clicked', () => {
      renderWithRouter(<App />);

      userEvent.click(screen.getByRole('button', { name: /change theme/i }));

      expect(document.getElementsByTagName('body')[0].className).toEqual('dark');
      expect(trackEvent).toHaveBeenCalledWith('Preferences', 'Toggle Theme', 'dark');
    });

    it('stores chosen theme as default in local storage', () => {
      renderWithRouter(<App />);

      userEvent.click(screen.getByRole('button', { name: /change theme/i }));

      expect(localStorage.getItem('theme')).toEqual('dark');
    });
  });
});
