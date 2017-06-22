import React, { Component } from 'react';
import { FlatButton, Dialog, FontIcon, Avatar } from 'material-ui';
import '../../css/ModalBook.css';
import moment from 'moment';

export default class BookDetail extends Component {
	constructor(props) {
		super(props);
	}

	handleClose() {
		this.setState({open: false});
	}

	render() {		
		const book = this.props.book;
		const copiesAvailable = book.getCountBookCopiesAvailable();

		const actions = [
			<FlatButton
				label="Close"
				primary={true}
				onTouchTap={this.props.showDetail}
			/>,
		];

		let borrowers = [];
		let headerDisplayed = false;
		for (let copy of book.copies) {
			if(copy.user) {
				if(!headerDisplayed) {
					headerDisplayed = true;
					borrowers.push(<div key="borrowed-title" className="modal-book__borrowed-with-label">Borrowed with:</div>);
				}

				borrowers.push(<div key={copy.user.username} className="modal-book__borrowed-with">					
					<div className="modal-book__borrowed-with-wrapper">
						<div className="modal-book__borrowed-person">
							<Avatar src={copy.user.image_url} />
							<span>{copy.user.username}</span>
						</div>					
						<div className="modal-book__borrowed-elapsed-time">
							<span className="borrowed-elapsed-time__label">Borrowed</span>
							<span className="borrowed-elapsed-time__value">{moment(copy.borrow_date).fromNow()}</span>
						</div>
					</div>
				</div>);
			}
		}

		return (
			<Dialog
				actions={actions}
				modal={true}
				open={this.props.open}
				onRequestClose={this.props.showDetail}
				contentStyle={{width: "90%", maxWidth: "none"}} 
				autoScrollBodyContent={true} 
				actionsContainerClassName="modal-actions" 
				contentClassName="modal-container" 
			>

			<div className="modal-book">
				<div className="modal-book__image-box">
				<img src={book.image_url} className="modal-book__image"/>
				</div>
				<div className="modal-book__details">
					<div className="modal-book__title">{book.title}</div>
					<div className="modal-book__author">{book.author}</div>

					<div className="modal-book__details-container">
						<div className="modal-book__available-wrapper">
							<div className="modal-book__detail-label">Availability</div>
							<div className="modal-book__detail-value">{copiesAvailable} of {book.copies.length}</div>
						</div>
						<div className="modal-book__publisher-wrapper">
							<div className="modal-book__publisher-name">
								<div className="modal-book__detail-label">Publisher</div>
								<div className="modal-book__detail-value">{book.publisher}</div>
							</div>
							<div className="modal-book__publication-date">
								<div className="modal-book__detail-label">Publication date</div>
								<div className="modal-book__detail-value">{book.publication_date}</div>
							</div>
							<div className="modal-book__number-of-pages">
								<div className="modal-book__detail-label">Pages</div>
								<div className="modal-book__detail-value">{book.number_of_pages}</div>
							</div>
						</div>
					</div>

					<div className="modal-book__description-wrapper">
						<div className="modal-book__detail-label">About</div>
						<div className="modal-book__description">{book.description}</div>
					</div>

					<div className="modal-book__status">
						<div className="modal-book__borrowed-informations">
							{borrowers}
						</div>
						
						<div className="modal-book__waitlist">
							<div className="modal-book__waitlist-label">
								<FontIcon className="material-icons">people</FontIcon>
								<span className="modal-book__waitlist-amount">4</span>
							</div>
							<div className="modal-book__waitlist-value"></div>
							<button className="modal-book__waitlist-button"><span>Join in the queue</span></button>
						</div>
					</div>
				</div>
			</div>
			</Dialog>
		);
	}
}
