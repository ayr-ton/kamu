import React, { Component } from 'react';
import Book from './Book';

export default class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: []
		};
	}

	componentWillMount() {
		this._loadBooks();
	}

	_loadBooks() {
		return this.props.service.getBooks(this.props.librarySlug).then(books => {
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