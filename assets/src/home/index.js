import React from 'react';
import ReactDOM from 'react-dom';
import LibrarySelector from './LibrarySelector';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BookService from '../services/BookService';
import ProfileService from '../services/ProfileService';

ReactDOM.render((
	<MuiThemeProvider>
		<LibrarySelector bookService={new BookService()} profileService={new ProfileService()} />
	</MuiThemeProvider>
), document.getElementById('home'));