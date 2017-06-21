import React, { Component } from 'react';
import Book from './Book';
import BookDetail from './BookDetail';

export default class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: [],
			open: false,
			currentBook: {}
		};
		this.showDetail = this.showDetail.bind(this);
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

	showDetail(book) {
		this.setState({
			currentBook: book,		
			open: !this.state.open
		});
	}

	render() {
		let content, bookDetail;

		if (this.state.books) {
			content = this.state.books.map(book => {
				return <Book key={book.id} book={book} service={this.props.service} showDetail={this.showDetail} />
			});
		}

		if (this.state.open) {
			bookDetail = <BookDetail open={this.state.open} showDetail={this.showDetail} book={this.state.currentBook} />
		}

		return (			
			<div className="book-list">
				{bookDetail}
				{content}
			</div>			
		);

	}
}
