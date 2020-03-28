import PropTypes from 'prop-types';
import { getRegion } from '../../services/UserPreferences';
import { libraryUrl } from '../../utils/urls';

function LibraryRedirector({ history, children }) {
  const region = getRegion();
  if (region) {
    history.push(libraryUrl(region));
    return null;
  }

  return children;
}

LibraryRedirector.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default LibraryRedirector;
