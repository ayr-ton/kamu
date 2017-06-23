import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import BookDetail from './BookDetail';

// FIXME
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class Book extends Component {
	constructor(props) {
		super(props);
		this.state = {
			zDepth: 1,
			available: props.book.isAvailable(),
			borrowedByMe: props.book.belongsToUser(),
			open: false
		};

		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this._actionButtons = this._actionButtons.bind(this);
		this._borrow = this._borrow.bind(this);
		this._return = this._return.bind(this);
		this.changeOpenStatus = this.changeOpenStatus.bind(this);
	}

	onMouseOver() { return this.setState({ zDepth: 2 }); }
	onMouseOut() { this.setState({ zDepth: 1 }); }

	_borrow() {
		this.props.service.borrowBook(this.props.book).then(() => {
			this.setState({ available: false, borrowedByMe: true });
		});
	}

	_return() {
		this.props.service.returnBook(this.props.book).then(() => {
			this.setState({ available: true, borrowedByMe: false });
		});
	}

	_actionButtons() {
		if (this.state.available) {
			return <FlatButton label="Borrow" onTouchTap={this._borrow} />;
		} else if (this.state.borrowedByMe) {
			return <FlatButton label="Return" onTouchTap={this._return} />;
		}

		return null;
	}

	changeOpenStatus() { this.setState({ open: !this.state.open }); }

	render() {
		const book = this.props.book;
		let contentDetail;

		if (this.state.open) {
			contentDetail = <BookDetail open={this.state.open} book={book} changeOpenStatus={this.changeOpenStatus}  />
		}

		return (		
			<div>	
			<Paper className="book" zDepth={this.state.zDepth} onMouseOver={this.onMouseOver} onClick={this.changeOpenStatus} onMouseOut={this.onMouseOut}>
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

			{contentDetail}
			</div>
		);
	}
}
