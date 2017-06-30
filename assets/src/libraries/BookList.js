import React, { Component } from 'react';
import Book from './Book';
import injectTapEventPlugin from 'react-tap-event-plugin';


export default class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: [],			
			currentBook: {}
		};
	}

	componentDidMount() {
		injectTapEventPlugin();
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

		if (this.state.books) {
			content = this.state.books.map(book => {
				return <Book key={book.id} book={book} service={this.props.service} />
			});
		}

		return (			
			<div className="book-list">
				{content}
			</div>			
		);

	}
}
