import React from 'react';
import Book from './Book';
import BookService from '../services/BookService';
import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';
import { someBook } from '../../test/booksHelper';

function generateUser(){
    return {
        username: "test@thoughtsworks.com"
        , email: "test@thoughtsworks.com"
        , image_url: ""
    };
}

describe('Book', () => {
    let bookModel;
    let user = generateUser();
    let bookComponent;
    let bookService = new BookService();

    beforeEach(() => {
        bookModel = someBook([
            {
              "id": 1348,
              "user": {
                "username": "user@example.com",
                "email": "user@example.com.com",
                "image_url": ""
              }
            },
            {
              "id": 1349,
              "user": user
            }
        ]);
    
        bookModel.isAvailable = jest.fn().mockReturnValue(true);
        bookModel.belongsToUser = jest.fn().mockReturnValue(false);

        bookService.borrowCopy = jest.fn().mockResolvedValue();
        bookService.returnBook = jest.fn().mockResolvedValue();

        sessionStorage.clear();

        global.window.ga = function() { }
    });

    it('should contain an img as background-image', () => {
        bookComponent = shallow(<Book key={bookModel.id} book={bookModel} />);
        expect(bookComponent.find(".book-cover").props().style.backgroundImage).toEqual(`url('${bookModel.image_url}')`)
    });

    it('should borrow a book and change available to false and borrowedByMe to true on click', async () => {
        bookComponent = shallow(<Book key={bookModel.id} book={bookModel} service={bookService} library='bh'/>);
        expect(bookComponent.state().available).toBeTruthy();
        expect(bookComponent.state().borrowedByMe).toBeFalsy();

        await bookComponent.find(Button).simulate('click');

        expect(bookComponent.state().available).toBeFalsy();
        expect(bookComponent.state().borrowedByMe).toBeTruthy();
    });

    it('should return a book and change available to true and borrowedByMe to false on click', async () => {
        bookComponent = shallow(<Book key={bookModel.id} book={bookModel} service={bookService}/>);
        bookComponent.setState({available : false, borrowedByMe: true});

        expect(bookComponent.state().available).toBeFalsy();
        expect(bookComponent.state().borrowedByMe).toBeTruthy();

        await bookComponent.find(Button).simulate('click');

        expect(bookComponent.state().available).toBeTruthy();
        expect(bookComponent.state().borrowedByMe).toBeFalsy();
    });

    it('should not render FlatButton when available and borrowByMe is false', () => {
        bookComponent = shallow(<Book key={bookModel.id} book={bookModel} service={bookService}/>);
        bookComponent.setState({available : false, borrowedByMe: false});

        expect(bookComponent.state().available).toBeFalsy();
        expect(bookComponent.state().borrowedByMe).toBeFalsy();

        expect(bookComponent.find("FlatButton").length).toEqual(0);
    });
});
