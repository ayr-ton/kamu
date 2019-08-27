import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

function LoadingIndicator(props) {
  return (
    <div
      style={{ padding: 10, textAlign: 'center' }}
      key="booklist-loader"
      data-testid={props['data-testid']}
    >
      <CircularProgress />
    </div>
  );
}

LoadingIndicator.propTypes = {
  'data-testid': PropTypes.string,
};

LoadingIndicator.defaultProps = {
  'data-testid': null,
};

export default LoadingIndicator;
