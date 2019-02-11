import React from 'react';
import ReactDOM from 'react-dom';
import LibraryRedirector from './LibraryRedirector';
import LibrarySelector from './LibrarySelector';

ReactDOM.render((
	<LibraryRedirector>
		<LibrarySelector />
	</LibraryRedirector>
), document.getElementById('home'));
