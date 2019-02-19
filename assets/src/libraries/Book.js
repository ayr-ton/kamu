import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import BookDetail from './BookDetail';
import { borrowCopy, returnBook } from '../services/BookService';

export default class Book extends Component {
	constructor(props) {
		super(props);
		this.state = {
			zDepth: 1,
			available: props.book.isAvailable(),
			borrowedByMe: props.book.belongsToUser(),
			canBeAddedToWaitlist: props.book.canBeAddedToWaitlist(),
			open: false
		};

		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this._actionButtons = this._actionButtons.bind(this);
		this._borrow = this._borrow.bind(this);
		this._return = this._return.bind(this);
		this.changeOpenStatus = this.changeOpenStatus.bind(this);
	}

	onMouseOver() { return this.setState({ zDepth: 5 }); }
	onMouseOut() { this.setState({ zDepth: 1 }); }

	_borrow() {
		borrowCopy(this.props.book).then(() => {
			this.setState({ available: false, borrowedByMe: true });
			window.ga('send', 'event', 'Borrow', this.props.book.title, this.props.library);
		});
	}

	_return() {
		returnBook(this.props.book).then(() => {
			this.setState({ available: true, borrowedByMe: false });
			window.ga('send', 'event', 'Return', this.props.book.title, this.props.library);
		});
	}

	_actionButtons() {
		if (this.state.borrowedByMe) {
			return <Button className="btn-return" onClick={this._return}>Return</Button>;
		} else if (this.state.available) {
			return <Button className="btn-borrow" onClick={this._borrow}>Borrow</Button>;
		} else if (this.state.canBeAddedToWaitlist) {
			return <Button className="btn-waitlist">Join the waitlist</Button>;
		}
		return null;
	}

	changeOpenStatus() { 		
		this.setState({ open: !this.state.open }, this._trackAnalytics);					
	}

	_trackAnalytics() {
		if(this.state.open) {														
			window.ga('send', 'event', 'Show Detail', this.props.book.title, this.props.library);
		}
	}

	render() {
		const book = this.props.book;
		let contentDetail;

		if (this.state.open) {
			contentDetail = <BookDetail open={this.state.open} book={book} changeOpenStatus={this.changeOpenStatus} actionButtons={this._actionButtons} />
		}
		
		const bookCover ={
			backgroundImage: `url('${book.image_url}')`
		};

		return (		
			<Paper className="book" elevation={this.state.zDepth} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
				<div className="book-info" onClick={this.changeOpenStatus}>

					<div className="book-cover" style={bookCover}>
						<div className="book-cover-overlay"></div>
					</div>

					<div className="book-details"> 
						<h1 className="book-title">{book.title}</h1>
						<h2 className="book-author">{book.author}</h2>
					</div>
				</div>

				<div className="book-actions">
					{this._actionButtons()}
				</div>
				{contentDetail}
			</Paper>
		);
	}
}
