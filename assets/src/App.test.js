import React from 'react';
import { shallow } from 'enzyme';
import Header from "./Header";
import App from "./App";

const createComponent = (props) => shallow(<App {...props} />);

describe('App', () => {
  let component;

  beforeEach(() => {
    component = createComponent();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('has a header', () => {
    expect(component.find(Header).exists()).toBeTruthy();
	});
});
