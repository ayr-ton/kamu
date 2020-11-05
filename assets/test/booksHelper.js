import { currentUser, someUser, someOtherUser } from './userHelper';
import {
  BORROW_BOOK_ACTION, RETURN_BOOK_ACTION, JOIN_WAITLIST_BOOK_ACTION, LEAVE_WAITLIST_BOOK_ACTION,
} from '../src/utils/constants';

export const borrowAction = { type: BORROW_BOOK_ACTION };
export const returnAction = { type: RETURN_BOOK_ACTION };
export const joinWaitlistAction = { type: JOIN_WAITLIST_BOOK_ACTION };
export const leaveWaitlistAction = { type: LEAVE_WAITLIST_BOOK_ACTION };

const randomId = () => Math.floor(Math.random() * 100);

export const someBook = (
  copies = [],
  waitlistItems = [],
  action = borrowAction,
  waitlistAddedDate = null,
) => ({
  id: randomId(),
  author: 'Kent Beck',
  title: 'Test Driven Development',
  subtitle: 'By Example',
  description: 'Lorem ipsum...',
  image_url: 'http://books.google.com.br/books/content?id=gFgnde_vwMAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  isbn: '9780321146533',
  number_of_pages: 220,
  publication_date: '2003-05-17',
  publisher: 'Addison-Wesley Professional',
  url: 'http://testserver/api/library/kamu/books/1/',
  waitlist_items: waitlistItems,
  waitlist_added_date: waitlistAddedDate,
  copies,
  action,
});

export const someBookWithNoAvailableCopies = () => someBook(
  [{
    id: randomId(),
    user: someUser,
    borrow_date: '2019-03-07',
  }],
  [],
  joinWaitlistAction,
);

export const someBookWithAvailableCopies = () => someBook(
  [{
    id: randomId(),
    user: null,
  }],
);

export const someBookWithACopyFromMe = () => someBook(
  [{
    id: randomId(),
    user: currentUser,
  }],
  [],
  returnAction,
);

export const someBookThatCanBeAddedToWaitlist = () => someBook(
  [{
    id: randomId(),
    user: someUser,
    borrow_date: '2019-03-07',
  }],
  [],
  joinWaitlistAction,
);

export const someBookThatIsInMyWaitlist = () => someBook(
  [{
    id: randomId(),
    user: someUser,
    borrow_date: '2019-03-07',
  }],
  [{
    user: someUser,
    added_date: '2018-09-01T19:19:08.108170Z',
  }, {
    user: currentUser,
    added_date: '2019-09-01T19:19:08.108170Z',
  }],
  leaveWaitlistAction,
  '2019-09-01T19:19:08.108170Z',
);

export const someAvailableBookThatOthersAreInWaitlist = () => someBook(
  [{
    id: randomId(),
    user: null,
  }],
  [{
    user: someOtherUser,
    added_date: '2019-09-01T19:19:08.108170Z',
  }, {
    user: someUser,
    added_date: '2018-09-01T19:19:08.108170Z',
  }],
  borrowAction,
);
