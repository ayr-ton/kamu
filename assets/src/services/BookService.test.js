import sinon from 'sinon';
import { expect } from 'chai';
import BookService from "./BookService";
import Book from "../models/Book";

describe('BookService', () => {
    describe('Get Libraries', () => {
        const libraries = [
            {
                id: 1,
                url: "http://localhost:8000/api/libraries/quito/",
                me: "Quito",
                slug: "quito"
            },
            {
                id: 2,
                url: "http://localhost:8000/api/libraries/bh/",
                name: "Belo Horizonte",
                slug: "bh"
            }
        ];

        let sandbox;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            sandbox.stub(
                require("./helpers")
                , "fetchFromAPI"
            ).withArgs('/libraries')
                .returns(
                    Promise.resolve({results: libraries})
                );
        });

        afterEach(() => {
           sandbox.restore();
        });

        it("Should return libraries", () => {
            let bookService = new BookService();

            return bookService.getLibraries().then(librariesReturned => {
                expect(librariesReturned).to.deep.equal(libraries);
            });
        });
    });

    describe('Get Books', () => {
        let books = [];
        let book1 = new Book();
        book1.id = 1;
        book1.author = "Kent Beck";
        book1.title = "Test Driven Development";
        book1.subtitle = "By Example";
        book1.desciption = "Lorem ipsum...";
        book1.image_url = "http://books.google.com.br/books/content?id=gFgnde_vwMAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";
        book1.isbn = "9780321146533";
        book1.number_of_pages = 220;
        book1.publication_date = "2003-05-17";
        book1.publisher = "Addison-Wesley Professional";

        book1.copies = [{
              "id": 1348,
              "user": {
                "username": "bherrera@thoughtworks.com",
                "email": "bherrera@thoughtworks.com",
                "image_url": "https://www.gravatar.com/avatar/5cf7021537744b09534beb1d66adfbea?size=100"
              }
            }];
        books.push(book1);
        
        let book2 = new Book();
        book2.id = 2;
        book2.author = "Robert Martin";
        book2.title = "Clean Code";
        book2.subtitle = "A Handbook of Agile Software Craftsmanship";
        book2.desciption = "Lorem ipsum...";
        book2.image_url = "http://books.google.com.br/books/content?id=gFgnde_vwMAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";
        book2.isbn = "9780132350884";
        book2.number_of_pages = 431;
        book2.publication_date = "2009-05-17";
        book2.publisher = "Pearson Education";

        book2.copies = [{
                "id": 1349,
                "user": null
            }];
        books.push(book2);

        const slug = "quito";

        let sandbox;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            sandbox.stub(
                require("./helpers")
                , "fetchFromAPI"
            ).withArgs(`/libraries/${slug}`)
                .returns(
                    Promise.resolve({books: books})
                );
        });

        afterEach(() => {
           sandbox.restore();
        });

        it("Should return books", () => {
            let bookService = new BookService();

            return bookService.getBooks(slug).then(booksReturned => {
                expect(booksReturned).to.deep.equal(books);
            });
        });
    });

    describe('Borrow book', () => {
        let book = new Book();
        book.id = 1;
        book.author = "Kent Beck";
        book.title = "Test Driven Development";
        book.subtitle = "By Example";
        book.desciption = "Lorem ipsum...";
        book.image_url = "http://books.google.com.br/books/content?id=gFgnde_vwMAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";
        book.isbn = "9780321146533";
        book.number_of_pages = 220;
        book.publication_date = "2003-05-17";
        book.publisher = "Addison-Wesley Professional";

        book.copies = [
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
              "user": null
            }
        ];

        let user = {
            username: "test@thoughtsworks.com"
            , email: "test@thoughtsworks.com"
            , image_url: ""
        }


        let sandbox;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            sandbox.stub(
                require("./helpers")
                , "fetchFromAPI"
            ).withArgs(`/copies/${book.copies[1].id}/borrow`)
            .returns(Promise.resolve({}));

            sandbox.stub(
                book
                , "getAvailableCopyID"
            ).returns(book.copies[1].id);

            global.currentUser = user;
        });

        afterEach(() => {
           sandbox.restore();
        });

        it("Should borrow copy", () => {
            let bookService = new BookService();

            return bookService.borrowBook(book).then(data => {
                expect(data).to.be.true
                expect(book.copies[1].user).to.deep.equal(user);
            });
        });


        //ToDo: Add a test for the case that no copies are available, expect return False from the method
    });

    describe('Return book', () => {
        let book = new Book();
        book.id = 1;
        book.author = "Kent Beck";
        book.title = "Test Driven Development";
        book.subtitle = "By Example";
        book.desciption = "Lorem ipsum...";
        book.image_url = "http://books.google.com.br/books/content?id=gFgnde_vwMAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";
        book.isbn = "9780321146533";
        book.number_of_pages = 220;
        book.publication_date = "2003-05-17";
        book.publisher = "Addison-Wesley Professional";

        let user = {
            username: "test@thoughtsworks.com"
            , email: "test@thoughtsworks.com"
            , image_url: ""
        };

        book.copies = [
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


        let sandbox;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            sandbox.stub(
                require("./helpers")
                , "fetchFromAPI"
            ).withArgs(`/copies/${book.copies[1].id}/return`)
            .returns(Promise.resolve({}));

            sandbox.stub(
                book
                , "getBorrowedCopyID"
            ).returns(book.copies[1].id);

            global.currentUser = user;
        });

        afterEach(() => {
           sandbox.restore();
        });

        it("Should return copy", () => {
            let bookService = new BookService();

            return bookService.returnBook(book).then(data => {
                expect(data).to.be.true;
                expect(book.copies[1].user).to.deep.equal(null);
            });
        });


        //ToDo: Add a test for the case that the user doesnt have copies of the book
    });

});