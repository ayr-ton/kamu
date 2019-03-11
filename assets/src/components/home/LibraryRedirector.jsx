import PropTypes from 'prop-types';
import { getRegion } from '../../services/ProfileService';

function LibraryRedirector({ history, children }) {
  const region = getRegion();
  if (region) {
    history.push(`/libraries/${region}`);
    return null;
  }

  return children;
}

LibraryRedirector.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default LibraryRedirector;
