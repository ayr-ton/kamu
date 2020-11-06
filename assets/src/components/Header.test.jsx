import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { getRegion, clearRegion } from '../services/UserPreferences';

const mockContext = jest.fn();
jest.mock('../services/UserPreferences');
jest.mock('./UserContext', () => ({
  Consumer: ({ children }) => children(jest.fn()),
}));

const history = { push: jest.fn() };
const createComponent = ({ theme, toggleTheme = () => {} } = {}) => render(
  <Header theme={theme} toggleTheme={toggleTheme} history={history} />,
);

describe('Header', () => {
  beforeEach(() => {
    delete global.location;
    global.location = { assign: jest.fn() };
  });

  it('clears the region and redirects to home when clicking change region', () => {
    const header = createComponent();

    const changeRegionButton = header.getByRole('button', { name: 'Change region' });

    userEvent.click(changeRegionButton);

    expect(clearRegion).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith('/');
  });

  it('displays the default logo', () => {
    const header = createComponent();

    const logo = header.getByAltText('Kamu logo');

    expect(logo).toHaveAttribute('src', '/static/images/logo.svg');
  });

  it('displays the alternative logo if dark mode is active', () => {
    const header = createComponent({ theme: { palette: { type: 'dark' } } });

    const logo = header.getByAltText('Kamu logo');

    expect(logo).toHaveAttribute('src', '/static/images/logo-dark.svg');
  });

  it('displays the menu', () => {
    const header = createComponent();
    expect(header.getByRole('button', { name: /library home/i })).toBeInTheDocument();
  });

  it('redirects to my books page when clicking on my books', () => {
    const header = createComponent();

    const myBooks = header.getByRole('button', { name: /my books/i });

    userEvent.click(myBooks);

    expect(history.push).toHaveBeenCalledWith('/my-books');
  });

  it('redirects to admin page when clicking on admin button', () => {
    const header = createComponent();

    const admin = header.getByRole('button', { name: /administration/i });

    userEvent.click(admin);

    expect(global.location.assign).toHaveBeenCalledWith('/admin');
  });

  it('redirects to library page when clicking on home button', () => {
    getRegion.mockReturnValue('bh');
    const header = createComponent();

    const home = header.getByRole('button', { name: /library home/i });

    userEvent.click(home);

    expect(history.push).toHaveBeenCalledWith('/libraries/bh');
  });

  it('redirects to home page when clicking on home button and no region is set', () => {
    getRegion.mockReturnValue(null);
    const header = createComponent();

    const home = header.getByRole('button', { name: /library home/i });

    userEvent.click(home);

    expect(history.push).toHaveBeenCalledWith('/');
  });

  it('redirects to add book page when clicking on add book button', () => {
    const header = createComponent();

    const home = header.getByRole('button', { name: /add a book/i });

    userEvent.click(home);

    expect(global.location.assign).toHaveBeenCalledWith('/admin/books/book/isbn/');
  });

  it('has a badge with the borrowed book count in my books button', () => {
    mockContext.mockReturnValue({ user: { borrowed_books_count: 5 } });

    const header = createComponent();

    expect(header.getByText(/5/i)).toBeInTheDocument();
  });

  it('calls toggleTheme prop when change theme button is clicked', () => {
    const toggleTheme = jest.fn();
    const header = createComponent({ toggleTheme });

    const home = header.getByRole('button', { name: /change theme/i });

    userEvent.click(home);

    expect(toggleTheme).toHaveBeenCalled();
  });
});
