import React, { Component } from 'react';

export default class LibraryRedirector extends Component {
	render() {
		const region = this.props.profileService.getRegion();
		if (region != null) {
			window.location.href = `/libraries/${region}`;
			return null;
		}

		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}