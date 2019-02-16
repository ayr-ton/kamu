import React from 'react';
import { shallow } from 'enzyme';
import Header from "./Header";
import Main from "./Main";

const createComponent = (props) => shallow(<Main {...props} />);

describe('Main', () => {
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
