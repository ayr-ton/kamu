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
		this.fetchBook = this.fetchBook.bind(this);
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

	showDetail(book) {
		if (book) {
			return this.fetchBook(book);
		}
		this.setState({open: !this.state.open, currentBook: {}});
	}

	fetchBook(book) {
		this.props.service.getBookDetail(book).then(book => {
			console.log(book);
			this.setState({
				currentBook: book,
				open: !this.state.open
			});
		}).catch(error => {
			console.error(error);
		});
	}

	render() {
		let content;
		if (this.state.books) {
			content = this.state.books.map(book => {
				return <Book key={book.id} book={book} service={this.props.service} showDetail={this.showDetail} />
			});
		}

		return (
			<div className="book-list">
				<BookDetail open={this.state.open} showDetail={this.showDetail} book={this.state.currentBook} />
				{content}
			</div>
		);
	}
}
