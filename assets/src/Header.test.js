import React from "react";
import { shallow } from "enzyme";
import Badge from '@material-ui/core/Badge';
import Header from "./Header";
import { getRegion, clearRegion, getLoggedUser } from './services/ProfileService';
import { currentUser } from "../test/userHelper";

jest.mock('./services/ProfileService');

const createComponent = (props) => shallow(<Header {...props} />);

describe('Header', () => {
  beforeEach(() => {
    getLoggedUser.mockResolvedValue(currentUser);
    window.location.assign = jest.fn();
  });

  it('clears the region and redirects to home when clicking change region', () => {
    const header = createComponent();

    const button = header.find('#change-region-button');
    button.simulate('click');

    expect(clearRegion).toHaveBeenCalled();
    expect(button).toHaveLinkTo('/');
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
    expect(header.find('#my-books-button')).toHaveLinkTo('/my-books');
  });

  it('redirects to admin page when clicking on admin button', () => {
    const header = createComponent();

    header.find('#admin-button').simulate('click');

    expect(window.location.assign).toHaveBeenCalledWith('/admin');
  });

  it('redirects to library page when clicking on home button', () => {
    getRegion.mockReturnValueOnce('bh');
    const header = createComponent();

    expect(header.find('#home-button')).toHaveLinkTo('/libraries/bh');
  });

  it('redirects to add book page when clicking on add book button', () => {
    getRegion.mockReturnValueOnce('bh');
    const header = createComponent();

    header.find('#add-book-button').simulate('click');

    expect(window.location.assign).toHaveBeenCalledWith('/admin/books/book/isbn/');
  });

  it('has a badge with the borrowed book count in my books button', async () => {
    getRegion.mockReturnValueOnce('bh');
    const header = await createComponent();

    const badge = header.find('#my-books-button').find(Badge);

    expect(badge.exists()).toBeTruthy();
    expect(badge.props().badgeContent).toEqual(currentUser.borrowed_books_count);
  });
});
