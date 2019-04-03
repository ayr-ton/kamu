import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import { BookCopyPropType } from '../../../utils/propTypes';


const BookBorrowers = ({ copies }) => {
  const borrowedCopies = copies.filter((copy) => copy.user);

  const borrowers = borrowedCopies.map((copy) => {
    let borrowedTimeAgo;
    if (copy.borrow_date) {
      borrowedTimeAgo = (
        <div className="modal-book__borrowed-elapsed-time">
          <span className="borrowed-elapsed-time__label">Borrowed</span>
          <span className="borrowed-elapsed-time__value">{moment(copy.borrow_date).fromNow()}</span>
        </div>
      );
    }

    return (
      <div key={copy.user.username} className="modal-book__borrowed-with">
        <div className="modal-book__borrowed-with-wrapper">
          <div className="modal-book__borrowed-person">
            <Avatar src={copy.user.image_url} />
            <span>{copy.user.name}</span>
          </div>

          {borrowedTimeAgo}
        </div>
      </div>
    );
  });

  if (borrowers.length > 0) {
    return (
      <div className="modal-book__borrowed-informations">
        <div key="borrowed-title" className="modal-book__borrowed-with-label">Borrowed with:</div>
        {borrowers}
      </div>
    );
  }

  return null;
};

BookBorrowers.propTypes = {
  copies: PropTypes.arrayOf(BookCopyPropType).isRequired,
};

export default BookBorrowers;
