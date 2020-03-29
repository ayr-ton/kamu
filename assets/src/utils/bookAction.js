import {
  borrowBook, returnBook, joinWaitlist, leaveWaitlist,
} from '../services/BookService';
import { trackEvent } from './analytics';
import {
  BORROW_BOOK_ACTION,
  JOIN_WAITLIST_BOOK_ACTION,
  LEAVE_WAITLIST_BOOK_ACTION,
  RETURN_BOOK_ACTION,
} from './constants';

export default function performAction(action, book, library = '') {
  let eventCategory;
  let actionFunction;
  if (action === BORROW_BOOK_ACTION) {
    eventCategory = 'Borrow';
    actionFunction = borrowBook;
  } else if (action === RETURN_BOOK_ACTION) {
    eventCategory = 'Return';
    actionFunction = returnBook;
  } else if (action === JOIN_WAITLIST_BOOK_ACTION) {
    eventCategory = 'JoinWaitlist';
    actionFunction = joinWaitlist;
  } else if (action === LEAVE_WAITLIST_BOOK_ACTION) {
    eventCategory = 'LeaveWaitlist';
    actionFunction = leaveWaitlist;
  }

  trackEvent(eventCategory, book.title, library);
  return actionFunction(book);
}
