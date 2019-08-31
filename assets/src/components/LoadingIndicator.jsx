import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoadingIndicator() {
  return (
    <div
      style={{ padding: 10, textAlign: 'center' }}
      key="booklist-loader"
      data-testid="loading-indicator"
    >
      <CircularProgress />
    </div>
  );
}

export default LoadingIndicator;
