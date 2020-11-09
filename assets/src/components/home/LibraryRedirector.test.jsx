import React from 'react';
import { render } from '@testing-library/react';
import LibraryRedirector from './LibraryRedirector';
import { getRegion } from '../../services/UserPreferences';

jest.mock('../../services/UserPreferences');

const history = { push: jest.fn() };

describe('Library Redirector', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should redirect to the library when a region is set', () => {
    getRegion.mockReturnValueOnce('bh');
    render(<LibraryRedirector history={history} />);

    expect(history.push).toHaveBeenCalledWith('/libraries/bh');
  });

  it('should not redirect when a region is not set', () => {
    getRegion.mockReturnValueOnce(null);
    render(<LibraryRedirector history={history}><div>some element</div></LibraryRedirector>);

    expect(history.push).not.toHaveBeenCalled();
  });

  it('should not render any children when a region is set', () => {
    getRegion.mockReturnValueOnce('bh');

    const libraryRedirector = render(
      <LibraryRedirector history={history}>
        <div>some element</div>
      </LibraryRedirector>,
    );

    expect(libraryRedirector.container.children).toHaveLength(0);
  });

  it('should render its children when a region is not set', () => {
    getRegion.mockReturnValueOnce(null);

    const libraryRedirector = render(
      <LibraryRedirector history={history}>
        <div>some element</div>
      </LibraryRedirector>,
    );

    expect(libraryRedirector.container.children).toHaveLength(1);
  });
});
