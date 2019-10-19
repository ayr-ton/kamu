import React from 'react';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import moment from 'moment';

function WaitlistIndicator({ addedDate }) {
  return (
    <div className="waitlist-indicator" title="You've been waiting since 2019-10-08" data-testid="waitlist-indicator-text">
      <Icon className="fa fa-clock" />
      Waiting since&nbsp;
      {moment(addedDate).format('ll')}
    </div>
  );
}

WaitlistIndicator.propTypes = {
  addedDate: PropTypes.string.isRequired,
};

export default WaitlistIndicator;
