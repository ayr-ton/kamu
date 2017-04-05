import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from './Header';
import ProfileService from './services/ProfileService';
import '../css/index.css';
import '../css/App.css'

injectTapEventPlugin();

ReactDOM.render(
  <Header service={new ProfileService()} />,
  document.getElementById('app-bar')
);
