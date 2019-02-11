import React, { Component } from 'react';
import { getRegion } from '../services/ProfileService';

export default class LibraryRedirector extends Component {
	render() {
		const region = getRegion();
		if (region != null) {
			window.location.assign(`/libraries/${region}`);
			return null;
		}

		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}