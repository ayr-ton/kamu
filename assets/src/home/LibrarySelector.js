import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


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
		return this.props.bookService.getLibraries().then(data => {
			this.setState({ libraries: data.results });
		}).catch(() => {
			return false;
		});
	}

	_selectLibrary(library) {
		this.props.profileService.setRegion(library.slug);
		window.location.assign(`/libraries/${library.slug}`);
	}

	render() {
		let content;
		if (this.state.libraries) {
			content = this.state.libraries.map(library => {
				return (
					<ListItem button className='library' key={library.id} onClick={() => this._selectLibrary(library)} alignItems=''>
						{library.name}
					</ListItem>
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