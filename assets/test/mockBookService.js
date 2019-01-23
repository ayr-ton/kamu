import Book from '../src/models/Book';

const generateBooks = () => {
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
  return books;
}

export const mockGetBooksByPageResponse = {
  count: 2,
  previous: null,
  next: null,
  results: generateBooks()
};
