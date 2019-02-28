import React from 'react';
import { shallow } from 'enzyme';
import LibraryRedirector from './LibraryRedirector';
import { getRegion } from '../services/ProfileService';

jest.mock('../services/ProfileService');

const history = { push: jest.fn() };
const createComponent = () => shallow(<LibraryRedirector history={history}><div>some element</div></LibraryRedirector>);

describe('Library Redirector', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should redirect to the library when a region is set', () => {
    getRegion.mockReturnValueOnce('bh');

    createComponent();

    expect(history.push).toHaveBeenCalledWith('/libraries/bh');
  });

  it('should not redirect when a region is not set', () => {
    getRegion.mockReturnValueOnce(null);

    createComponent();

    expect(history.push).not.toHaveBeenCalled();
  });

  it('should not render any children when a region is set', () => {
    getRegion.mockReturnValueOnce('bh');

    const	libraryRedirector = createComponent();

    expect(libraryRedirector.children()).toHaveLength(0);
  });

  it('should render its children when a region is not set', () => {
    getRegion.mockReturnValueOnce(null);

    const	libraryRedirector = createComponent();

    expect(libraryRedirector.children()).toHaveLength(1);
  });
});
