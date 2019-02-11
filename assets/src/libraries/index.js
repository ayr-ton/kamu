import React from 'react';
import ReactDOM from 'react-dom';
import Library from './Library';

const container = document.getElementById('libraries');
const library = container.getAttribute('data-library');

ReactDOM.render((
  <Library slug={library} />
), container);
