import React from 'react';
import ReactDOM from 'react-dom';
import LibraryRedirector from './LibraryRedirector';
import LibrarySelector from './LibrarySelector';
import BookService from '../services/BookService';
import ProfileService from '../services/ProfileService';

const profileService = new ProfileService();
const bookService = new BookService();

ReactDOM.render((
	<LibraryRedirector profileService={profileService}>
		<LibrarySelector bookService={bookService} profileService={profileService} />
	</LibraryRedirector>
), document.getElementById('home'));