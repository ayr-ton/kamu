import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

export default class Book extends Component {
	constructor() {
		super();
		this.state = { zDepth: 1 };
	}

	onMouseOver = () => this.setState({ zDepth: 2 });
	onMouseOut = () => this.setState({ zDepth: 1 });

	render() {
		const book = this.props.book;

		return (
			<Paper className="book" zDepth={this.state.zDepth} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
				<img className="book-cover" src={book.image_url} alt={"Cover of " + book.title} />
				<div className="book-details">
					<h1 className="book-title">{book.title}</h1>
					<h2 className="book-author">{book.author}</h2>
				</div>
			</Paper>
		);
	}
}