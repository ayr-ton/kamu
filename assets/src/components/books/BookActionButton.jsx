import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { BookPropType } from '../../utils/propTypes';
import {
  BORROW_BOOK_ACTION,
  JOIN_WAITLIST_BOOK_ACTION, LEAVE_WAITLIST_BOOK_ACTION, OTHERS_ARE_WAITING_STATUS,
  RETURN_BOOK_ACTION,
} from '../../utils/constants';
import {
  borrowBook,
  checkWaitlist,
  joinWaitlist,
  leaveWaitlist,
  returnBook,
} from '../../services/BookService';
import WaitlistWarningDialog from './WaitlistWarningDialog';
import UserContext from '../UserContext';
import { Book } from './Book';

export default function BookActionButton({ book, library, color }) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  // const [book, setBook] = useState(false);

  function performAction(action, eventCategory) {
    return action(book).then((response) => {
      setConfirmationOpen(false);
      // this.setState({ book: response, confirmationOpen: false });
      // this.context.updateUser();
      window.ga('send', 'event', eventCategory, book.title, library);
    });
  }

  async function borrow() {
    const { status } = await checkWaitlist(book);
    if (status !== OTHERS_ARE_WAITING_STATUS) {
      return performAction(borrowBook, 'Borrow');
    }

    setConfirmationOpen(true);
  }

  let button = null;
  const { action } = book;
  if (action) {
    switch (action.type) {
      case BORROW_BOOK_ACTION:
        button = <Button color={color} onClick={() => borrow()}>Borrow</Button>;
        break;
      case RETURN_BOOK_ACTION:
        button = <Button color={color} onClick={() => performAction(returnBook, 'Return')}>Return</Button>;
        break;
      case JOIN_WAITLIST_BOOK_ACTION:
        button = <Button color={color} onClick={() => performAction(joinWaitlist, 'JoinWaitlist')}>Join the waitlist</Button>;
        break;
      case LEAVE_WAITLIST_BOOK_ACTION:
        button = <Button color={color} onClick={() => performAction(leaveWaitlist, 'LeaveWaitlist')}>Leave the waitlist</Button>;
        break;
      default:
        break;
    }
  }

  return (
    <div>
      {button}
      <WaitlistWarningDialog
        open={confirmationOpen}
        waitlistItems={book.waitlist_items}
        onCancel={() => setConfirmationOpen(false)}
        onConfirm={() => performAction(borrowBook, 'Borrow')}
      />
    </div>
  );
}

// BookActionButton.contextType = UserContext;

BookActionButton.propTypes = {
  book: BookPropType.isRequired,
  library: PropTypes.string.isRequired,
  color: PropTypes.string,
};

BookActionButton.defaultProps = {
  color: 'secondary',
};
