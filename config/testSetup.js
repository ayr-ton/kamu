import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.findByTestID = (wrapper, testID) => wrapper.find({ 'data-testid': testID }).first();
