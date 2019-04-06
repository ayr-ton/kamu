import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import App from './App';
import { getLoggedUser } from '../services/ProfileService';
import { currentUser } from '../../test/userHelper';
import UserContext from './UserContext';

jest.mock('../services/ProfileService');

const createComponent = (props) => shallow(<App {...props} />);

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

  it('renders a UserContext with user equal to currentUser', () => {
    const provider = component.find(UserContext.Provider);
    expect(provider.exists()).toBeTruthy();
    expect(provider.props().value.user).toEqual(currentUser);
  });

  it('renders a UserContext with updateUser function', () => {
    const provider = component.find(UserContext.Provider);
    expect(provider.exists()).toBeTruthy();
    expect(provider.props().value.updateUser).toEqual(component.instance().updateUser);
  });

  describe('updateUser()', () => {
    it('calls getLoggedUser and updates states user', async () => {
      getLoggedUser.mockResolvedValue({ ...currentUser, borrowed_books_count: 5 });

      await component.instance().updateUser();

      expect(getLoggedUser).toHaveBeenCalled();
      expect(component.state('user').borrowed_books_count).toEqual(5);
    });
  });
});
