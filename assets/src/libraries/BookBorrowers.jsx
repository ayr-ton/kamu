import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';

const getBorrowers = (copies) => {
  const borrowers = [];
  let headerDisplayed = false;
  let borrowedTimeAgo;

  const borrowedCopies = copies.filter((copy) => copy.user);

  for (const copy of borrowedCopies) {
    if (copy.borrow_date) {
      borrowedTimeAgo = (
        <div className="modal-book__borrowed-elapsed-time">
          <span className="borrowed-elapsed-time__label">Borrowed</span>
          <span className="borrowed-elapsed-time__value">{moment(copy.borrow_date).fromNow()}</span>
        </div>
      );
    }

    if (!headerDisplayed) {
      headerDisplayed = true;
      borrowers.push(<div key="borrowed-title" className="modal-book__borrowed-with-label">Borrowed with:</div>);
    }

    borrowers.push(
      <div key={copy.user.username} className="modal-book__borrowed-with">
        <div className="modal-book__borrowed-with-wrapper">
          <div className="modal-book__borrowed-person">
            <Avatar src={copy.user.image_url} />
            <span>{copy.user.name}</span>
          </div>

          {borrowedTimeAgo}
        </div>
      </div>,
    );
  }

  return borrowers;
};

const BookBorrowers = ({ copies }) => (
  <div className="modal-book__borrowed-informations">
    {getBorrowers(copies)}
  </div>
);

BookBorrowers.propTypes = {
  copies: PropTypes.arrayOf(PropTypes.shape({
    borrow_date: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      image_url: PropTypes.string,
    }),
  })).isRequired,
};

export default BookBorrowers;
