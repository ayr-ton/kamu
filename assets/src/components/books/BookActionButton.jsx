import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import {
  BORROW_BOOK_ACTION,
  JOIN_WAITLIST_BOOK_ACTION,
  LEAVE_WAITLIST_BOOK_ACTION,
  RETURN_BOOK_ACTION,
} from '../../utils/constants';

export default function BookActionButton({ action, onClick, color }) {
  switch (action) {
    case BORROW_BOOK_ACTION:
      return <Button color={color} onClick={() => onClick(action)}>Borrow</Button>;
    case RETURN_BOOK_ACTION:
      return <Button color={color} onClick={() => onClick(action)}>Return</Button>;
    case JOIN_WAITLIST_BOOK_ACTION:
      return <Button color={color} onClick={() => onClick(action)}>Join the waitlist</Button>;
    case LEAVE_WAITLIST_BOOK_ACTION:
      return <Button color={color} onClick={() => onClick(action)}>Leave the waitlist</Button>;
    default:
      return null;
  }
}

BookActionButton.propTypes = {
  action: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
};

BookActionButton.defaultProps = {
  action: null,
  color: 'secondary',
};
