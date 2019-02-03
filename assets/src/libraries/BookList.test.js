import React from 'react';
import BookList from './BookList';
import {shallow} from 'enzyme';

describe('BookList', () => {
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

        bookService = {
            getBooksByPage: jest.fn().mockResolvedValue(books)
        };

        bookList = shallow(<BookList service={bookService} librarySlug='slug'/>);
    });

    it('should render the list of books in its state', () => {
        bookList.instance().setState({books: books.results});
        expect(bookList.find('Book')).toHaveLength(books.results.length);
    });

    it('should read the books from an API and set the state', async () => {
        await bookList.instance()._loadMoreBooks();
        expect(bookList.state('books')).toEqual(books.results);
    });

    it('should pass the library slug to getBooksByPage', () => {
        bookList.instance()._loadMoreBooks();
        expect(bookService.getBooksByPage).toHaveBeenCalledWith(librarySlug, 1, '');
    });
});