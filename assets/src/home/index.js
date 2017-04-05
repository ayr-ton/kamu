import React from 'react';
import ReactDOM from 'react-dom';
import LibrarySelector from './LibrarySelector';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BookService from '../services/BookService';

ReactDOM.render((
	<MuiThemeProvider>
		<LibrarySelector service={new BookService()} />
	</MuiThemeProvider>
), document.getElementById('home'));