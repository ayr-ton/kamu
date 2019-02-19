import React from "react";
import { shallow } from "enzyme";
import Badge from '@material-ui/core/Badge';
import { Header } from './Header';
import { getRegion, clearRegion } from './services/ProfileService';

jest.mock('./services/ProfileService');

const history = { push: jest.fn() };
const createComponent = (props) => shallow(<Header history={history} {...props} />);

describe('Header', () => {
  beforeEach(() => {
    window.location.assign = jest.fn();
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

  it('does not display the menu when showMenu is false', () => {
    const header = createComponent({ showMenu: false });
    expect(header.find('.header-menu').exists()).toBeFalsy();
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
    getRegion.mockReturnValueOnce('bh');
    const header = createComponent();

    header.find('#home-button').simulate('click');

    expect(history.push).toHaveBeenCalledWith('/libraries/bh');
  });

  it('redirects to add book page when clicking on add book button', () => {
    const header = createComponent();

    header.find('#add-book-button').simulate('click');

    expect(window.location.assign).toHaveBeenCalledWith('/admin/books/book/isbn/');
  });

  it('has a badge with the borrowed book count in my books button', async () => {
    const borrowedBooksCount = 5;
    const header = await createComponent({ borrowedBooksCount });

    const badge = header.find('#my-books-button').find(Badge);

    expect(badge.exists()).toBeTruthy();
    expect(badge.props().badgeContent).toEqual(borrowedBooksCount);
  });
});
