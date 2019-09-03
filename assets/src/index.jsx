import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import ErrorBoundary from './components/ErrorBoundary';
import App from './components/App';

import './index.css';

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });
}

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
