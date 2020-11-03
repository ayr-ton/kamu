import React from 'react';
import { render } from '@testing-library/react';
import { LibrarySelector } from './LibrarySelector';
import { getLibraries } from '../../services/BookService';

jest.mock('../../services/BookService');

const history = { push: jest.fn() };

describe('LibrarySelector', () => {
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
  });

  it('redirects to the library page when clicking', async () => {
    const librarySelector = render(<LibrarySelector history={history} />);

    const bhItem = await librarySelector.findByText('Belo Horizonte');

    bhItem.click();

    expect(history.push).toHaveBeenCalledWith('/libraries/bh');
  });
});
