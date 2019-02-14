import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

import '../css/index.css';
import '../css/App.css'

ReactDOM.render(
  <Header showMenu={window.location.pathname !== '/'} />,
  document.getElementById('app-bar')
);
