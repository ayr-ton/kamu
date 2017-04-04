import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from './Header';
import '../css/index.css';

injectTapEventPlugin();

ReactDOM.render(
  <Header />,
  document.getElementById('app-bar')
);
