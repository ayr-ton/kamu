import React from 'react';
import { shallow } from 'enzyme';
import ListItem from '@material-ui/core/ListItem';
import { LibrarySelector } from './LibrarySelector';
import { getLibraries } from '../services/BookService';

jest.mock('../services/BookService');

const history = { push: jest.fn() };

describe('LibrarySelector', () => {
  let librarySelector;
  const libraries = {
    count: 1,
    next: null,
    previous: null,
    results: [
      {
        id: 1,
        url: 'http://localhost:8000/api/libraries/bh/',
        name: 'Belo Horizonte',
        slug: 'bh',
      },
    ],
  };

  beforeEach(() => {
    getLibraries.mockResolvedValue(libraries);
    librarySelector = shallow(<LibrarySelector history={history} />);
  });

  it('redirects to the library page when clicking', async () => {
    await librarySelector.instance()._loadLibraries();

    librarySelector.find(ListItem).simulate('click');

    expect(history.push).toHaveBeenCalledWith('/libraries/bh');
  });
});
