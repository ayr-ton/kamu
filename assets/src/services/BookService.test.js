import sinon from "sinon";
import {expect} from "chai";
import BookService from "./BookService";
import Book from "../models/Book";

function generateLibraries() {
    return {
        count: 2,
        next: null,
        previous: null,
        results: [
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
        ]
    }
}

function generateUser() {
    return {
        username: "test@thoughtsworks.com"
        , email: "test@thoughtsworks.com"
        , image_url: ""
    };
}

function generateBooks() {
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

    return {
        count: 2,
        next: null,
        previous: null,
        results: books
    };
}

describe('BookService', () => {
    describe('Get Libraries', () => {
        const libraries = generateLibraries();

        let sandbox;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            sandbox.stub(
                require("./helpers")
                , "fetchFromAPI"
            ).withArgs('/libraries')
                .returns(
                    Promise.resolve(libraries)
                );
        });

        afterEach(() => {
            sandbox.restore();
        });

        it("Should return libraries", () => {
            let bookService = new BookService();

            return bookService.getLibraries().then(data => {
                expect(data.results).to.deep.equal(libraries.results);
            });
        });
    });

    describe('Get Books', () => {
        let books = generateBooks();

        const slug = "quito";

        let sandbox;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            sandbox.stub(
                require("./helpers")
                , "fetchFromAPI"
            ).withArgs(`/libraries/${slug}/books/`)
                .returns(
                    Promise.resolve(books)
                );
        });

        afterEach(() => {
            sandbox.restore();
        });

        it("Should return books", () => {
            let bookService = new BookService();

            return bookService.getBooks(slug).then(data => {
                expect(data).to.deep.equal(books);
            });
        });
    });

    describe('Borrow book', () => {
        let book = generateBooks().results[0];
        let user = generateUser();


        let sandbox;
        beforeEach(() => {
            book.copies = [
                {
                    "id": 1348,
                    "user": {
                        "username": "bherrera@thoughtworks.com",
                        "email": "bherrera@thoughtworks.com",
                        "image_url": "https://www.gravatar.com/avatar/5cf7021537744b09534beb1d66adfbea?size=100"
                    }
                }
                , {
                    "id": 1349,
                    "user": null
                }
            ];

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

        it("Shouldn't borrow copy because all copies are borrowed", () => {
            let bookService = new BookService();

            book.copies.pop();

            return bookService.borrowBook(book).then(data => {
                expect(data).to.be.false
            });
        })

        //ToDo: Add a test for the case that no copies are available, expect return False from the method
    });

    describe('Borrow book II', () => {
        let book = generateBooks().results[0];
        let user = generateUser();


        let sandbox;
        beforeEach(() => {
            book.copies = [
                {
                    "id": 1348,
                    "user": {
                        "username": "bherrera@thoughtworks.com",
                        "email": "bherrera@thoughtworks.com",
                        "image_url": "https://www.gravatar.com/avatar/5cf7021537744b09534beb1d66adfbea?size=100"
                    }
                }
                , {
                    "id": 1349,
                    "user": null
                }
            ];

            sandbox = sinon.sandbox.create();
            sandbox.stub(
                require("./helpers")
                , "fetchFromAPI"
            ).withArgs(`/copies/${book.copies[1].id}/borrow`)
                .returns(Promise.reject(new Error("Because yes")));

            sandbox.stub(
                book
                , "getAvailableCopyID"
            ).returns(book.copies[1].id);

            global.currentUser = user;
        });

        afterEach(() => {
            sandbox.restore();
        });

        it("Shouldn't borrow copy because backend fails", () => {
            let bookService = new BookService();

            return bookService.borrowBook(book).then(data => {
                expect(data).to.be.false
            });
        })


        //ToDo: Add a test for the case that no copies are available, expect return False from the method
    });

    describe('Return book', () => {
        let book = generateBooks().results[0];
        let user = generateUser();

        let sandbox;
        beforeEach(() => {
            book.copies = [
                {
                    "id": 1348,
                    "user": {
                        "username": "bherrera@thoughtworks.com",
                        "email": "bherrera@thoughtworks.com",
                        "image_url": "https://www.gravatar.com/avatar/5cf7021537744b09534beb1d66adfbea?size=100"
                    }
                }
                , {
                    "id": 1349,
                    "user": user
                }
            ];

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

        it("Shouldn't return copy", () => {
            let bookService = new BookService();
            book.copies.pop();
            return bookService.returnBook(book).then(data => {
                expect(data).to.be.false;
            });
        });

        //ToDo: Add a test for the case that the user doesnt have copies of the book
    });


    describe('Return book II', () => {
        let book = generateBooks().results[0];
        let user = generateUser();

        let sandbox;
        beforeEach(() => {
            book.copies = [
                {
                    "id": 1348,
                    "user": {
                        "username": "bherrera@thoughtworks.com",
                        "email": "bherrera@thoughtworks.com",
                        "image_url": "https://www.gravatar.com/avatar/5cf7021537744b09534beb1d66adfbea?size=100"
                    }
                }
                , {
                    "id": 1349,
                    "user": user
                }
            ];

            sandbox = sinon.sandbox.create();
            sandbox.stub(
                require("./helpers")
                , "fetchFromAPI"
            ).withArgs(`/copies/${book.copies[1].id}/return`)
                .returns(Promise.reject(new Error("Because backend fail")));

            sandbox.stub(
                book
                , "getBorrowedCopyID"
            ).returns(book.copies[1].id);

            global.currentUser = user;
        });

        afterEach(() => {
            sandbox.restore();
        });

        it("Shouldn't return copy because backend fail", () => {
            let bookService = new BookService();
            return bookService.returnBook(book).then(data => {
                expect(data).to.be.false;
            });
        });


        //ToDo: Add a test for the case that the user doesnt have copies of the book
    });

});