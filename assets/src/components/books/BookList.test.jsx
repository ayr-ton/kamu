import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import BookList from './BookList';
import { someBook } from '../../../test/booksHelper';
import { renderWithRouter as render } from '../../../test/renderWithRouter';

describe('Book list', () => {
  it('should render the list of books', () => {
    const books = [
      { ...someBook(), id: 1, title: 'Book 1' },
      { ...someBook(), id: 2, title: 'Another book' },
    ];

    const { getByText } = render(<BookList books={books} library="poa" />);

    expect(getByText('Book 1')).toBeInTheDocument();
    expect(getByText('Another book')).toBeInTheDocument();
  });
});
