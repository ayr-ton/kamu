import React from 'react';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import moment from 'moment';

import './WaitlistIndicator.css';

function WaitlistIndicator({ addedDate }) {
  const formattedDate = moment(addedDate).format('ll');
  return (
    <div
      className="waitlist-indicator"
      data-testid="waitlist-indicator"
      title={`You've been waiting since ${formattedDate}`}
    >
      <Icon className="fa fa-clock" />
      Waiting since&nbsp;
      {formattedDate}
    </div>
  );
}

WaitlistIndicator.propTypes = {
  addedDate: PropTypes.string.isRequired,
};

export default WaitlistIndicator;
