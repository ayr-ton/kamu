import Book from '../src/models/Book';
import { currentUser, someUser } from './userHelper';
import { BORROW_BOOK_ACTION, RETURN_BOOK_ACTION, JOIN_WAITLIST_BOOK_ACTION } from '../src/utils/constants';

export const borrowAction = { type: BORROW_BOOK_ACTION };
export const returnAction = { type: RETURN_BOOK_ACTION };
export const joinWaitlistAction = { type: JOIN_WAITLIST_BOOK_ACTION };

export const someBook = (copies = [], waitlistUsers = [], action = borrowAction) => {
  const book = new Book();

  book.id = 1;
  book.author = 'Kent Beck';
  book.title = 'Test Driven Development';
  book.subtitle = 'By Example';
  book.description = 'Lorem ipsum...';
  book.image_url = 'http://books.google.com.br/books/content?id=gFgnde_vwMAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api';
  book.isbn = '9780321146533';
  book.number_of_pages = 220;
  book.publication_date = '2003-05-17';
  book.publisher = 'Addison-Wesley Professional';
  book.action = action;

  book.copies = copies;
  book.waitlist_users = waitlistUsers;

  return book;
};

export const someBookWithNoAvailableCopies = () => someBook(
  [{
    id: 1,
    user: someUser,
    borrow_date: '2019-03-07',
  }],
  [],
  joinWaitlistAction,
);

export const someBookWithAvailableCopies = () => someBook(
  [{
    id: 1,
    user: null,
  }],
);

export const someBookWithACopyFromMe = () => someBook(
  [{
    id: 1,
    user: currentUser,
  }],
  [],
  returnAction,
);

export const someBookThatCanBeAddedToWaitlist = () => someBook(
  [{
    id: 1,
    user: someUser,
    borrow_date: '2019-03-07',
  }],
  [],
  joinWaitlistAction,
);
