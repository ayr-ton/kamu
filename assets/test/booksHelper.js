import { currentUser, someUser } from './userHelper';
import { BORROW_BOOK_ACTION, RETURN_BOOK_ACTION, JOIN_WAITLIST_BOOK_ACTION } from '../src/utils/constants';

export const borrowAction = { type: BORROW_BOOK_ACTION };
export const returnAction = { type: RETURN_BOOK_ACTION };
export const joinWaitlistAction = { type: JOIN_WAITLIST_BOOK_ACTION };

export const someBook = (copies = [], waitlistUsers = [], action = borrowAction) => ({
  id: 1,
  author: 'Kent Beck',
  title: 'Test Driven Development',
  subtitle: 'By Example',
  description: 'Lorem ipsum...',
  image_url: 'http://books.google.com.br/books/content?id=gFgnde_vwMAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  isbn: '9780321146533',
  number_of_pages: 220,
  publication_date: '2003-05-17',
  publisher: 'Addison-Wesley Professional',
  waitlist_users: waitlistUsers,
  copies,
  action,
});

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
