import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

export default class Book extends Component {
	constructor() {
		super();
		this.state = { zDepth: 1 };

		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this._actionButtons = this._actionButtons.bind(this);
	}

	onMouseOver() { return this.setState({ zDepth: 2 }); }
	onMouseOut() { this.setState({ zDepth: 1 }); }

	_actionButtons() {
		if (this.props.book.isAvailable()) {
			return <FlatButton label="Borrow" className="borrow-button" />;
		}

		return null;
	}

	render() {
		const book = this.props.book;

		return (
			<Paper className="book" zDepth={this.state.zDepth} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
				<div className="book-cover">
					<img src={book.image_url} alt={"Cover of " + book.title} />
					<div className="book-cover-overlay"></div>
				</div>

				<div className="book-details">
					<h1 className="book-title">{book.title}</h1>
					<h2 className="book-author">{book.author}</h2>
				</div>

				<div className="book-actions">
					{this._actionButtons()}
				</div>
			</Paper>
		);
	}
}