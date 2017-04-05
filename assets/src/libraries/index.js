import React from 'react';
import ReactDOM from 'react-dom';
import BookList from './BookList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BookService from './BookService';

const container = document.getElementById('libraries');
const library = container.getAttribute('data-library');

ReactDOM.render((
	<MuiThemeProvider>
		<BookList service={new BookService()} librarySlug={library} />
	</MuiThemeProvider>
), container);