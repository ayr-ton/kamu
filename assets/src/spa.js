import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';

import '../css/index.css';
import '../css/App.css'

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
