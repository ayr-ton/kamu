import React from "react";
import Header from "./Header";
import { shallow } from "enzyme";
import { clearRegion, getLoggedUser } from './services/ProfileService';

jest.mock('./services/ProfileService');

const createComponent = (props) => shallow(<Header {...props} />);

describe('Header', () => {
  beforeEach(() => {
    window.location.assign = jest.fn();
    getLoggedUser.mockResolvedValue({});
  });

  it('clears the region and redirects to home when clicking change region', () => {
    const header = createComponent();

    header.find('#change-region-button').simulate('click');

    expect(clearRegion).toHaveBeenCalled();
    expect(window.location.assign).toHaveBeenCalledWith('/');
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

    expect(window.location.assign).toHaveBeenCalledWith('/my-books');
  });
});