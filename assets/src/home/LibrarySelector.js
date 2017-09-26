import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import injectTapEventPlugin from 'react-tap-event-plugin';


export default class LibrarySelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			libraries: []
		};

		this._selectLibrary = this._selectLibrary.bind(this);
	}
	
	componentDidMount() {
		injectTapEventPlugin();
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