import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { getLibraries } from '../services/BookService';
import { setRegion } from '../services/ProfileService';

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
		return getLibraries().then(response => {
			this.setState({ libraries: response.results });
		});
	}

	render() {
		return (
			<div className="library-list">
				<List>
					{this.state.libraries.map(library =>
						<ListItem className='library' key={library.id} button>
							<Link to={`/libraries/${library.slug}`} onClick={setRegion(library.slug)}>
								{library.name}
							</Link>
						</ListItem>
					)}
				</List>
			</div>
		);
	}
}