import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';

export default class LibrarySelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			libraries: []
		};

		this._selectLibrary = this._selectLibrary.bind(this);
	}

	componentWillMount() {
		this._loadLibraries();
	}

	_loadLibraries() {
		return this.props.bookService.getLibraries().then(libraries => {
			this.setState({ libraries });
		}).catch(error => {
			console.error(error);
		});
	}

	_selectLibrary(library) {
		this.props.profileService.setRegion(library.slug);
		window.location.href = `/libraries/${library.slug}`;
	}

	render() {
		let content;
		if (this.state.libraries) {
			content = this.state.libraries.map(library => {
				return (
					<ListItem className='library' key={library.id} primaryText={library.name} onClick={() => this._selectLibrary(library)} />
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