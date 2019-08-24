import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import App from './App';
import { getLoggedUser } from '../services/ProfileService';
import { getBooksByPage, getLibraries } from '../services/BookService';
import { currentUser } from '../../test/userHelper';

jest.mock('../services/ProfileService');
jest.mock('../services/BookService');

const createComponent = (route) => mount(
  <MemoryRouter initialEntries={[route]}>
    <App />
  </MemoryRouter>,
);

describe('App', () => {
  let component;

  beforeEach(() => {
    getLoggedUser.mockResolvedValue(currentUser);
    getBooksByPage.mockResolvedValue({ results: [] });
    getLibraries.mockResolvedValue({ results: [{ slug: 'bh', id: 1 }] });
    component = createComponent('/');
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('has a header', () => {
    expect(component.find({ 'data-test-id': 'header' }).exists()).toBeTruthy();
  });

  describe('routing', () => {
    it('routes to library selector when path is root', () => {
      expect(component.find({ 'data-test-id': 'library-selector' }).exists()).toBeTruthy();
    });

    it('routes to my books component when path is /my-books', () => {
      component = createComponent('/my-books');
      expect(component.find({ 'data-test-id': 'my-books-wrapper' }).exists()).toBeTruthy();
    });

    it('routes to my books component when path is /library/:slug', () => {
      component = createComponent('/libraries/bh');
      expect(component.find({ 'data-test-id': 'library-wrapper' }).exists()).toBeTruthy();
    });
  });
});
