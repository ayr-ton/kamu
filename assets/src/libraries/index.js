import React from 'react';
import ReactDOM from 'react-dom';
import BookList from './BookList';
import BookService from '../services/BookService';

const container = document.getElementById('libraries');
const library = container.getAttribute('data-library');

ReactDOM.render((
	<BookList service={new BookService()} librarySlug={library} />
), container);