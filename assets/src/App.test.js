import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import App from './App';
import { getLoggedUser } from './services/ProfileService';
import { currentUser } from '../test/userHelper';

jest.mock('./services/ProfileService');

const createComponent = props => shallow(<App {...props} />);

describe('App', () => {
  let component;

  beforeEach(() => {
    getLoggedUser.mockResolvedValue(currentUser);
    component = createComponent();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('has a header', () => {
    expect(component.find(Header).exists()).toBeTruthy();
  });

  it('loads the user profile', () => {
    expect(getLoggedUser).toHaveBeenCalled();
  });

  it('passes the users borrowed books count to the header', () => {
    expect(component.find(Header).props().borrowedBooksCount).toEqual(currentUser.borrowed_books_count);
  });
});
