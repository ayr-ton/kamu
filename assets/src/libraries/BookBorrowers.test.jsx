import React from 'react';
import { shallow } from 'enzyme';
import Avatar from '@material-ui/core/Avatar';

import BookBorrowers from './BookBorrowers';
import { someBookWithNoAvailableCopies } from '../../test/booksHelper';

const shallowBookDetail = (props) => shallow(<BookBorrowers {...props} />);
const testDefaultProps = {
  copies: someBookWithNoAvailableCopies().copies,
};

describe('BookBorrowers', () => {
  it('renders information about who are the people who have a borrowed copy', () => {
    const bookDetail = shallowBookDetail({ ...testDefaultProps });

    expect(
      bookDetail.find('.modal-book__borrowed-informations').find(Avatar),
    ).toHaveLength(1);
  });
});
