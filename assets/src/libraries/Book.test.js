import React from 'react';
import Book from './Book';
import BookModel from '../models/Book';
import BookService from '../services/BookService';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

describe('<Book />', () => {
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

    let user = {
        username: "test@thoughtsworks.com"
        , email: "test@thoughtsworks.com"
        , image_url: ""
    };

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

    let bookComponent;

    let bookService = new BookService();

    let sandbox;
	beforeEach(() => {
	    sandbox = sinon.sandbox.create();
        sandbox.stub(
            bookModel
            , "isAvailable"
        ).returns(true);
        sandbox.stub(
            bookModel
            , "belongsToUser"
        ).returns(false);

        sandbox.stub(
            bookService
            , "borrowBook"
        ).returns({
            then: (f) => {
                f();
            }
        });

        sandbox.stub(
            bookService
            , "returnBook"
        ).returns({
            then: (f) => {
                f();
            }
        });

	});

	afterEach(() => {
       sandbox.restore();
    });

	it('should change zDepth to 2 onMouseOver', () => {
	    bookComponent = shallow(<Book key={bookModel.id} book={bookModel} />);
	    expect(bookComponent.state().zDepth).to.equal(1);
		bookComponent.simulate('mouseover');
		expect(bookComponent.state().zDepth).to.equal(2);
	});

	it('should change zDepth to 1 onMouseOut', () => {
	    bookComponent = shallow(<Book key={bookModel.id} book={bookModel} />);
	    bookComponent.setState({zDepth: 2});
	    expect(bookComponent.state().zDepth).to.equal(2);
		bookComponent.simulate('mouseout');
		expect(bookComponent.state().zDepth).to.equal(1);
	});

	it('should contain an img element', () => {
	    bookComponent = shallow(<Book key={bookModel.id} book={bookModel} />);
	    expect(bookComponent.contains(<img src={bookModel.image_url} alt={"Cover of " + bookModel.title} />)).to.be.true;
	});

	it('should borrow a book and change available to false and borrowedByMe to true on TouchTap', () => {
	    bookComponent = shallow(<Book key={bookModel.id} book={bookModel} service={bookService}/>);
	    expect(bookComponent.state().available).to.be.true;
	    expect(bookComponent.state().borrowedByMe).to.be.false;

	    bookComponent.find("FlatButton").simulate('touchTap');

	    expect(bookComponent.state().available).to.be.false;
	    expect(bookComponent.state().borrowedByMe).to.be.true;
	});

	it('should return a book and change available to true and borrowedByMe to false on TouchTap', () => {
	    bookComponent = shallow(<Book key={bookModel.id} book={bookModel} service={bookService}/>);
	    bookComponent.setState({available : false, borrowedByMe: true});

	    expect(bookComponent.state().available).to.be.false;
	    expect(bookComponent.state().borrowedByMe).to.be.true;

	    bookComponent.find("FlatButton").simulate('touchTap');

	    expect(bookComponent.state().available).to.be.true;
	    expect(bookComponent.state().borrowedByMe).to.be.false;
	});

	it('should not render FlatButton when available and borrowByMe is false', () => {
	    bookComponent = shallow(<Book key={bookModel.id} book={bookModel} service={bookService}/>);
	    bookComponent.setState({available : false, borrowedByMe: false});

	    expect(bookComponent.state().available).to.be.false;
	    expect(bookComponent.state().borrowedByMe).to.be.false;

	    expect(bookComponent.find("FlatButton").length).to.equal(0);
	});
});