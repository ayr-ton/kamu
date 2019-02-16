import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';

configure({ adapter: new Adapter() });

expect.extend({
  toHaveLinkTo(received, path) {
    const link = received.find(Link);
    if (!link.exists()) return {
      pass: false,
      message: () => 'expected component to have a Link but couldn\'t find one'
    };

    const actualPath = link.props().to;
    return {
      pass: actualPath === path,
      message: () => `expected link to have path '${path}' but had ${actualPath} instead`
    };
  }
});
