import {
  borrowBook, returnBook, joinWaitlist, leaveWaitlist, reportMissing,
} from '../services/BookService';
import { trackEvent } from './analytics';
import {
  BORROW_BOOK_ACTION,
  JOIN_WAITLIST_BOOK_ACTION,
  LEAVE_WAITLIST_BOOK_ACTION,
  REPORT_BOOK_MISSING,
  RETURN_BOOK_ACTION,
} from './constants';
import performAction from './bookAction';

jest.mock('./analytics');
jest.mock('../services/BookService');

describe('performAction', () => {
  const book = {};
  const library = 'library';

  it('calls borrow api and sends analytics event when action is BORROW', () => {
    performAction(BORROW_BOOK_ACTION, book, library);

    expect(borrowBook).toHaveBeenCalledWith(book);
    expect(trackEvent).toHaveBeenCalledWith('Borrow', book.title, library);
  });

  it('calls return api and sends analytics event when action is RETURN', () => {
    performAction(RETURN_BOOK_ACTION, book, library);

    expect(returnBook).toHaveBeenCalledWith(book);
    expect(trackEvent).toHaveBeenCalledWith('Borrow', book.title, library);
  });

  it('calls join waitlist api and sends analytics event when action is JOIN_WAITLIST', () => {
    performAction(JOIN_WAITLIST_BOOK_ACTION, book, library);

    expect(joinWaitlist).toHaveBeenCalledWith(book);
    expect(trackEvent).toHaveBeenCalledWith('JoinWaitlist', book.title, library);
  });

  it('calls leave waitlist api and sends analytics event when action is LEAVE_WAITLIST', () => {
    performAction(LEAVE_WAITLIST_BOOK_ACTION, book, library);

    expect(leaveWaitlist).toHaveBeenCalledWith(book);
    expect(trackEvent).toHaveBeenCalledWith('LeaveWaitlist', book.title, library);
  });

  it('returns the response of the action', () => {
    const expectedResult = 'blablablabla';
    leaveWaitlist.mockReturnValue(expectedResult);
    const result = performAction(LEAVE_WAITLIST_BOOK_ACTION, book, library);

    expect(result).toEqual(expectedResult);
  });

  it('calls missing book api and sends analytics event when action is REPORT_BOOK_MISSING', () => {
    performAction(REPORT_BOOK_MISSING, book, library);

    expect(reportMissing).toHaveBeenCalledWith(book);
    expect(trackEvent).toHaveBeenCalledWith('ReportBookMissing', book.title, library);
  });
});
