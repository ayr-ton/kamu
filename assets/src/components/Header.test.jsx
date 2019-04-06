import React from 'react';
import { shallow, mount } from 'enzyme';
import Badge from '@material-ui/core/Badge';
import { Header } from './Header';
import { getRegion, clearRegion } from '../services/ProfileService';

const mockContext = jest.fn();
jest.mock('../services/ProfileService');
jest.mock('./UserContext', () => ({
  Consumer: ({ children }) => children(mockContext()),
}));

const history = { push: jest.fn() };
const createComponent = (props) => shallow(<Header history={history} {...props} />);
const mountComponent = (props) => mount(<Header history={history} {...props} />);

describe('Header', () => {
  beforeEach(() => {
    window.location.assign = jest.fn();
    jest.resetAllMocks();
  });

  it('clears the region and redirects to home when clicking change region', () => {
    const header = createComponent();

    header.find('#change-region-button').simulate('click');

    expect(clearRegion).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith('/');
  });

  it('displays the menu', () => {
    const header = createComponent();
    expect(header.find('.header-menu').exists()).toBeTruthy();
  });

  it('redirects to my books page when clicking on my books', () => {
    const header = createComponent();

    header.find('#my-books-button').simulate('click');

    expect(history.push).toHaveBeenCalledWith('/my-books');
  });

  it('redirects to admin page when clicking on admin button', () => {
    const header = createComponent();

    header.find('#admin-button').simulate('click');

    expect(window.location.assign).toHaveBeenCalledWith('/admin');
  });

  it('redirects to library page when clicking on home button', () => {
    getRegion.mockReturnValue('bh');
    const header = createComponent();

    header.find('#home-button').simulate('click');

    expect(history.push).toHaveBeenCalledWith('/libraries/bh');
  });

  it('redirects to home page when clicking on home button and no region is set', () => {
    getRegion.mockReturnValue(null);
    const header = createComponent();

    header.find('#home-button').simulate('click');

    expect(history.push).toHaveBeenCalledWith('/');
  });

  it('redirects to add book page when clicking on add book button', () => {
    const header = createComponent();

    header.find('#add-book-button').simulate('click');

    expect(window.location.assign).toHaveBeenCalledWith('/admin/books/book/isbn/');
  });

  it('has a badge with the borrowed book count in my books button', async () => {
    mockContext.mockReturnValue({ user: { borrowed_books_count: 5 } });

    const header = await mountComponent();

    const badge = header.find('#my-books-button').find(Badge);

    expect(badge.exists()).toBeTruthy();
    expect(badge.props().badgeContent).toEqual(5);
  });
});
