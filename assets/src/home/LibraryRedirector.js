import { getRegion } from '../services/ProfileService';

function LibraryRedirector(props) {
	const region = getRegion();
	if (region != null) {
		window.location.assign(`/libraries/${region}`);
		return null;
	}

	return props.children;
}

export default LibraryRedirector;
