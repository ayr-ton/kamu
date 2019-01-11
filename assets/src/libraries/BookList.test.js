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
    let sessionStorage = {};

    beforeEach(() => {

        global.sessionStorage = {
            getItem: (key) => {
                return sessionStorage[key];
            },
            setItem: (key, value) => {
                sessionStorage[key] = value;
            }
        };

        global.window = {};

        bookService = {
            getBooksByPage: () => {
                return Promise.resolve(books);
            }
        };

        bookList = shallow(<BookList service={bookService} librarySlug='slug'/>);
    });

    it('should render the list of books in its state', () => {
        bookList.instance().setState({books: books.results});
        expect(bookList.find('Book')).to.have.length(books.results.length);
    });

    it('should read the books from an API and set the state', async () => {
        await bookList.instance()._loadMoreBooks();
        expect(bookList.state('books')).to.deep.equal(books.results);
    });

    it('should pass the library slug to getBooksByPage', () => {
        const spy = sinon.spy(bookService, 'getBooksByPage');
        const page = 1;

        bookList.instance()._loadMoreBooks();
        expect(spy.calledWith(librarySlug, page)).to.be.true;
        bookService.getBooksByPage.restore();
    });

    it('should show wishlist button when there is search results', () => {
        bookList.instance().setState({books: [], isLoading: false, searchTerm: "A Book that does not exists"});
        let button = bookList.find('.wishlist').children().children()
        expect(button.contains('Add book to Wishlist')).to.equal(true)
    });

    it('should not show wishlist button when there is search results', () => {
        bookList.instance().setState({books: books.results, isLoading: false, searchTerm: "book 1"});
        let button = bookList.find('.wishlist').children().children()
        expect(button.contains('Add book to Wishlist')).to.equal(false)
    });
});