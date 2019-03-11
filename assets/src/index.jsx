import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import ErrorBoundary from './utils/ErrorBoundary';
import App from './components/App';

import '../css/index.css';
import '../css/App.css';

Sentry.init({
  dsn: 'https://9c31d56d5fab41ce9a199af00c3e1eb2@sentry.io/1406532',
});

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
