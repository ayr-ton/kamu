import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon,
} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { WaitlistItemPropType } from '../../utils/propTypes';

export default function WaitlistWarningDialog(props) {
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      open={props.open}
    >
      <DialogTitle className="confirmation-title">
        <Icon className="fa fa-clock" />
      </DialogTitle>
      <DialogContent className="confirmation-content">
        <p>
          There are other users who are waiting for this particular book.
          You might want to check with them before borrowing it.
        </p>

        <p data-testid="waitlist-users">
          {'Users on the wait list: '}
          <strong>
            {props.waitlistItems.sort((oneItem, anotherItem) => (
              moment(oneItem.added_date)
                .diff(anotherItem.added_date)
            ))
              .map((item) => (
                (item.user.name && item.user.name.trim() !== '' && item.user.name) || item.user.username
              ))
              .join(', ')}
          </strong>
        </p>

        <p>Do you wish to proceed and borrow this book?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={props.onConfirm}>
          Confirm and Borrow
        </Button>
      </DialogActions>
    </Dialog>
  );
}

WaitlistWarningDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  waitlistItems: PropTypes.arrayOf(WaitlistItemPropType).isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
