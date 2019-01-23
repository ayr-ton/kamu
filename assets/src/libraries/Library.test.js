import React from 'react';
import Library from './Library';
import BookService from '../services/BookService';
import { mockGetBooksByPageResponse } from '../../test/mockBookService';

import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import BookList from './DumbBookList';

const createComponent = (props) => shallow(<Library slug='library-1' {...props} />);

describe('Library', () => {
  let sandbox;
  let getBooksMock;

  beforeEach(() => {
      sandbox = sinon.createSandbox();
      getBooksMock = sandbox.stub(BookService.prototype, 'getBooksByPage');
      getBooksMock.resolves(mockGetBooksByPageResponse);
  });
  
  afterEach(() => {
      sandbox.restore();
  });

  it('should fetch the list of books for that library', async () => {
  
    const library = await createComponent({ slug: 'bh' });

    expect(getBooksMock.calledWith('bh', 1)).to.be.true;
    expect(library.state('books')).to.deep.equal(mockGetBooksByPageResponse.results);
  });

  it('passes the fetched books to the book list component', async () => {
    const library = await createComponent({ slug: 'bh' });

    expect(library.find(BookList).props().books).to.deep.equal(mockGetBooksByPageResponse.results);;
  });
});
