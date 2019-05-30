import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from './ErrorMessage';

const createComponent = () => shallow(<ErrorMessage />);

describe('Error Message', () => {
  it('has a title', () => {
    const component = createComponent();
    expect(component.find('h1').text()).toEqual('Something went wrong.');
  });

  it('has a message', () => {
    const component = createComponent();
    expect(component.find('p').text()).toEqual('An error happened while loading this page. Please try again.');
  });
});
