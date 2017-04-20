import React from 'react';
import Book from './Book';
import BookList from './BookList';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

describe('<BookList />', () => {
	let bookList;
	let bookService;
	const librarySlug = 'slug';
	const books = [
		{
			id: 1,
			title: "book 1",
			author: "author 1"
		},
		{
			id: 2,
			title: "book 2",
			author: "author 2"
		},
	];

	beforeEach(() => {
		bookService = {
			getBooks: () => { return Promise.resolve(books); }
		};

		bookList = shallow(<BookList service={bookService} librarySlug='slug' />);
	});

	it('should render the list of books in its state', () => {
		bookList.instance().setState({ books });
		expect(bookList.find('Book')).to.have.length(books.length);
		expect(bookList.contains(<Book book={books[0]} service={bookService} />)).to.be.true;
		expect(bookList.contains(<Book book={books[1]} service={bookService} />)).to.be.true;
	});

	it('should call _loadBooks() when mounting the component', () => {
		const spy = sinon.spy(bookList.instance(), '_loadBooks');
		bookList.instance().componentWillMount();
		expect(spy.called).to.be.true;
		bookList.instance()._loadBooks.restore();
	});

	it('should read the books from an API and set the state', async () => {
		await bookList.instance()._loadBooks();
		expect(bookList.state('books')).to.equal(books);
	});

	it('should pass the library slug to getBooks', () => {
		const spy = sinon.spy(bookService, 'getBooks');
		bookList.instance()._loadBooks();
		expect(spy.calledWith(librarySlug)).to.be.true;
		bookService.getBooks.restore();
	});
});