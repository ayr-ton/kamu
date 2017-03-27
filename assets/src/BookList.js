import React, { Component } from 'react';
import Book from './Book';

export default class BookList extends Component {
	constructor(props) {
		super(props);
		this.librarySlug = props.match.params.library_slug;
		this.state = {
			books: []
		};
	}

	componentWillMount() {
		this._loadBooks(this.library);
	}

	_loadBooks() {
		return this.props.service.getBooks().then(books => {
			this.setState({ books });
		}).catch(error => {
			console.error(error);
		});
	}

	render() {
		let content;
		if (this.state.books) {
			content = this.state.books.map(book => {
				return <Book key={book.id} book={book} />
			});
		}

		return (
			<div className="book-list">
				{content}
			</div>
		);
	}
}