import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import '../css/index.css';
import '../css/App.css';

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
