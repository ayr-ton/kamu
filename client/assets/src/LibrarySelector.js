import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';

export default class LibrarySelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			libraries: []
		};
	}

	componentWillMount() {
		this._loadLibraries();
	}

	_loadLibraries() {
		return this.props.service.getLibraries().then(libraries => {
			this.setState({ libraries });
		}).catch(error => {
			console.error(error);
		});
	}

	render() {
		let content;
		if (this.state.libraries) {
			content = this.state.libraries.map(library => {
				return (
					<ListItem primaryText={library.name} />
				);
			});
			content = (<List>{content}</List>);
		}

		return (
			<div className="library-list">
				{content}
			</div>
		);
	}
}