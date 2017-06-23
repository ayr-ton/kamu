import React, { Component } from 'react';
import { IconButton, Dialog, Avatar } from 'material-ui';
import '../../css/ModalBook.css';
import moment from 'moment';
import Clear from 'material-ui/svg-icons/content/clear';

export default class BookDetail extends Component {
	constructor(props) {
		super(props);
		this.changeOpenStatus = this.props.changeOpenStatus.bind(this);
	}

	render() {		
		const book = this.props.book;
		const copiesAvailable = book.getCountBookCopiesAvailable();

		const styles = {
			largeIcon: {
				width: 40,
				height: 40,
			},  
			large: {
				padding: 0
			}
		};

		const actions = [
			<IconButton iconStyle={styles.largeIcon} style={styles.large} onTouchTap={this.changeOpenStatus}>
				<Clear />
			</IconButton>
		];

		let borrowers = [];
		let headerDisplayed = false;
		let borrowed_time_ago;

		for (let copy of book.copies) {
			if(copy.user) {
				if(copy.borrow_date) {
					borrowed_time_ago = <div className="modal-book__borrowed-elapsed-time">
							<span className="borrowed-elapsed-time__label">Borrowed</span>
							<span className="borrowed-elapsed-time__value">{moment(copy.borrow_date).fromNow()}</span>
						</div>
				}

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
						
						{borrowed_time_ago}
					</div>
				</div>);
			}
		}

		return (
			<Dialog
				actions={actions}
				modal={false}
				open={this.props.open}
				onRequestClose={this.changeOpenStatus}
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
					</div>
				</div>
			</div>
			</Dialog>
		);
	}
}
