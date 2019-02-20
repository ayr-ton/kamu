import React from 'react';
import Book from './Book';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import { currentUser } from '../../test/userHelper';
import { someBook, someBookWithAvailableCopies, someBookWithNoAvailableCopies, someBookWithACopyFromMe } from '../../test/booksHelper';
import { borrowCopy, returnBook } from '../services/BookService';

jest.mock('../services/BookService');

expect.extend({
    toHaveBorrowButton(received) {
        const pass = received.find(Button).exists()
            && received.find(Button).hasClass('btn-borrow')
            && !received.find(Button).hasClass('btn-return');
        return { pass, message: () => `expected component to have a borrow button` }
    },

    toHaveReturnButton(received) {
        const pass = received.find(Button).exists()
            && !received.find(Button).hasClass('btn-borrow')
            && received.find(Button).hasClass('btn-return');
        return { pass, message: () => `expected component to have a return button` }
    }
});

const createComponent = (book) => shallow(<Book book={book} library="bh" />);

describe('Book', () => {
    beforeEach(() => {
        borrowCopy.mockResolvedValue();
        returnBook.mockResolvedValue();

        global.currentUser = currentUser;

        global.window.ga = function() { }
    });

    it('should contain the book cover as background image', () => {
        const book = someBook();

        const bookComponent = createComponent(book);

        expect(bookComponent.find(".book-cover").props().style.backgroundImage).toEqual(`url('${book.image_url}')`);
    });

    it('shows the borrow button when the book has available copies', () => {
        const book = someBookWithAvailableCopies();
        const bookComponent = createComponent(book);

        expect(bookComponent).toHaveBorrowButton();
    });

    it('shows the return button when clicking borrow', async () => {
        const book = someBookWithAvailableCopies();
        const bookComponent = createComponent(book);

        await bookComponent.find(Button).simulate('click');

        expect(bookComponent).toHaveReturnButton();
    });

    it('calls the borrow function when clicking on the borrow button', async () => {
        const book = someBookWithAvailableCopies();
        const bookComponent = createComponent(book);

        await bookComponent.find(Button).simulate('click');

        expect(borrowCopy).toHaveBeenCalledWith(book);
    });

    it('shows the return button when the book is borrowed by me', () => {
        const book = someBookWithACopyFromMe();
        const bookComponent = createComponent(book);

        expect(bookComponent).toHaveReturnButton();
    });

    it('shows the return button when the book is borrowed by me but still has available copies', () => {
        const book = someBook([
            { id: 1, user: currentUser },
            { id: 2, user: null }
        ]);
        const bookComponent = createComponent(book);

        expect(bookComponent).toHaveReturnButton();
    });

    it('shows the borrow button when clicking return', async () => {
        const book = someBookWithACopyFromMe();
        const bookComponent = createComponent(book);

        await bookComponent.find(Button).simulate('click');

        expect(bookComponent).toHaveBorrowButton();
    });

    it('calls the return function when clicking on the return button', async () => {
        const book = someBookWithACopyFromMe();
        const bookComponent = createComponent(book);

        await bookComponent.find(Button).simulate('click');

        expect(returnBook).toHaveBeenCalledWith(book);
    });

    it('does not show the buttons when the book does not have available copies', () => {
        const book = someBookWithNoAvailableCopies();
        const bookComponent = createComponent(book);

        expect(bookComponent).not.toHaveBorrowButton();
        expect(bookComponent).not.toHaveReturnButton();
    });
});
