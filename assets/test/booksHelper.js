import Book from '../src/models/Book';
import { currentUser, someUser } from './userHelper';

export const someBook = (copies = [], waitlistUsers = []) => {
  const book = new Book();

  book.id = 1;
  book.author = 'Kent Beck';
  book.title = 'Test Driven Development';
  book.subtitle = 'By Example';
  book.desciption = 'Lorem ipsum...';
  book.image_url = 'http://books.google.com.br/books/content?id=gFgnde_vwMAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api';
  book.isbn = '9780321146533';
  book.number_of_pages = 220;
  book.publication_date = '2003-05-17';
  book.publisher = 'Addison-Wesley Professional';

  book.copies = copies;
  book.waitlist_users = waitlistUsers;

  return book;
};

export const someBookWithNoAvailableCopies = () => someBook([
  {
    id: 1,
    user: someUser,
  },
]);

export const someBookWithAvailableCopies = () => someBook([
  {
    id: 1,
    user: null,
  },
]);

export const someBookWithACopyFromMe = () => someBook([
  {
    id: 1,
    user: currentUser,
  },
]);

export const someBookThatCanBeAddedToWaitlist = () => someBookWithNoAvailableCopies();
