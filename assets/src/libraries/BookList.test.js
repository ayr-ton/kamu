import React from 'react';
import BookList from './BookList';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

describe('<BookList />', () => {
    let bookList;
    let bookService;
    const librarySlug = 'slug';
    const books = {
        count: 2,
        previous: null,
        next: null,
        results: [
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
        ]
    };

    beforeEach(() => {
        bookService = {
            getBooks: () => {
                return Promise.resolve(books);
            }
        };

        bookList = shallow(<BookList service={bookService} librarySlug='slug'/>);
    });

    it('should render the list of books in its state', () => {
        bookList.instance().setState({books: books.results});
        expect(bookList.find('Book')).to.have.length(books.results.length);
    });

    it('should call _loadBooks() when mounting the component', () => {
        const spy = sinon.spy(bookList.instance(), '_loadBooks');
        bookList.instance().componentWillMount();
        expect(spy.called).to.be.true;
        bookList.instance()._loadBooks.restore();
    });

    it('should read the books from an API and set the state', async () => {
        await bookList.instance()._loadBooks();
        expect(bookList.state('books')).to.equal(books.results);
    });

    it('should pass the library slug to getBooks', () => {
        const spy = sinon.spy(bookService, 'getBooks');
        bookList.instance()._loadBooks();
        expect(spy.calledWith(librarySlug)).to.be.true;
        bookService.getBooks.restore();
    });
});