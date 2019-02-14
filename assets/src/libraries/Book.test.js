import React from 'react';
import Book from './Book';
import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';
import { someBook } from '../../test/booksHelper';
import { borrowCopy, returnBook } from '../services/BookService';

jest.mock('../services/BookService');

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

        bookComponent = shallow(<Book key={bookModel.id} book={bookModel} library='bh'/>);

        borrowCopy.mockResolvedValue();
        returnBook.mockResolvedValue();

        sessionStorage.clear();

        global.window.ga = function() { }
    });

    it('should contain an img as background-image', () => {
        expect(bookComponent.find(".book-cover").props().style.backgroundImage).toEqual(`url('${bookModel.image_url}')`)
    });

    it('should borrow a book and change available to false and borrowedByMe to true on click', async () => {
        expect(bookComponent.state().available).toBeTruthy();
        expect(bookComponent.state().borrowedByMe).toBeFalsy();

        await bookComponent.find(Button).simulate('click');

        expect(bookComponent.state().available).toBeFalsy();
        expect(bookComponent.state().borrowedByMe).toBeTruthy();
    });

    it('calls the borrow function on click when book is available', async () => {
        await bookComponent.find(Button).simulate('click');

        expect(borrowCopy).toHaveBeenCalledWith(bookModel);
    });

    it('should return a book and change available to true and borrowedByMe to false on click', async () => {
        bookComponent.setState({available : false, borrowedByMe: true});

        expect(bookComponent.state().available).toBeFalsy();
        expect(bookComponent.state().borrowedByMe).toBeTruthy();

        await bookComponent.find(Button).simulate('click');

        expect(bookComponent.state().available).toBeTruthy();
        expect(bookComponent.state().borrowedByMe).toBeFalsy();
    });

    it('calls the return function on click when book is borrowedByMe', async () => {
        bookComponent.setState({available : false, borrowedByMe: true});

        await bookComponent.find(Button).simulate('click');

        expect(returnBook).toHaveBeenCalledWith(bookModel);
    });

    it('should not render FlatButton when available and borrowByMe is false', () => {
        bookComponent.setState({available : false, borrowedByMe: false});

        expect(bookComponent.state().available).toBeFalsy();
        expect(bookComponent.state().borrowedByMe).toBeFalsy();

        expect(bookComponent.find("FlatButton").length).toEqual(0);
    });
});
