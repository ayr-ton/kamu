import React from 'react';
import Book from './Book';
import BookModel from '../models/Book';
import BookService from '../services/BookService';
import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';

function generateBooks() {
    let bookModel = new BookModel();

    bookModel.id = 1;
    bookModel.author = "Kent Beck";
    bookModel.title = "Test Driven Development";
    bookModel.subtitle = "By Example";
    bookModel.desciption = "Lorem ipsum...";
    bookModel.image_url = "http://books.google.com.br/books/content?id=gFgnde_vwMAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";
    bookModel.isbn = "9780321146533";
    bookModel.number_of_pages = 220;
    bookModel.publication_date = "2003-05-17";
    bookModel.publisher = "Addison-Wesley Professional";

    return bookModel;
}

function generateUser(){
    return {
        username: "test@thoughtsworks.com"
        , email: "test@thoughtsworks.com"
        , image_url: ""
    };
}

describe('Book', () => {
    let bookModel = generateBooks();
    let user = generateUser();
    let bookComponent;
    let bookService = new BookService();

    beforeEach(() => {
        bookModel.copies = [
            {
              "id": 1348,
              "user": {
                "username": "bherrera@thoughtworks.com",
                "email": "bherrera@thoughtworks.com",
                "image_url": "https://www.gravatar.com/avatar/5cf7021537744b09534beb1d66adfbea?size=100"
              }
            }
            ,{
              "id": 1349,
              "user": user
            }
        ];
    
        bookModel.isAvailable = jest.fn().mockReturnValue(true);
        bookModel.belongsToUser = jest.fn().mockReturnValue(false);

        bookService.borrowCopy = jest.fn().mockResolvedValue();
        bookService.returnBook = jest.fn().mockResolvedValue();

        global.sessionStorage = { 
            getItem : () => { return null }
        }

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
