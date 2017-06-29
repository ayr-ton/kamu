import React, { Component } from 'react';
import Book from './Book';
import ProfileService from '../services/ProfileService';

export default class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: [],			
			currentBook: {}
		};
	}

	componentWillMount() {
		this._loadBooks();
	}

	_loadBooks() {
		return this.props.service.getBooks(this.props.librarySlug).then(books => {
			this.setState({ books });
		}).catch(() => {
			return false;
		});
	}

	render() {
		let content;
		const profileService = new ProfileService();
		const library = profileService.getRegion();

		if (this.state.books) {
			content = this.state.books.map(book => {
				return <Book key={book.id} book={book} service={this.props.service} library={library} />
			});
		}

		return (			
			<div className="book-list">
				{content}
			</div>			
		);

	}
}
