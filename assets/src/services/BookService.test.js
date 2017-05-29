import sinon from 'sinon';
import { expect } from 'chai';
import BookService from "./BookService";
import Book from "../models/Book";

describe('BookService', () => {
    describe('getLibraries', () => {
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

        it("Should return libraries", (done) => {
            let bookService = new BookService();

            bookService.getLibraries().then(librariesReturned => {
                expect(librariesReturned).to.deep.equal(libraries);
                done();
            });
        });
    });

    describe('getBooks', () => {
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

        it("Should return books", (done) => {
            let bookService = new BookService();

            bookService.getBooks(slug).then(booksReturned => {
                expect(booksReturned).to.deep.equal(books);
                done();
            });
        });
    });



});