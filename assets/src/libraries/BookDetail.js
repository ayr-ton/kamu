import React, { Component } from 'react';
import { FlatButton, Dialog, FontIcon } from 'material-ui';
import '../../css/ModalBook.css';

export default class BookDetail extends Component {
	constructor(props) {
		super(props);
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

		return (
			<Dialog
				actions={actions}
				modal={true}
				open={this.props.open}
				onRequestClose={this.props.showDetail}
				contentStyle={{width: "70%", maxWidth: "none"}}
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
							<div className="modal-book__detail-label">Disponibilidade</div>
							<div className="modal-book__detail-value">{copiesAvailable} de {book.copies.length}</div>
						</div>
						<div className="modal-book__publisher-wrapper">
							<div className="modal-book__publisher-name">
								<div className="modal-book__detail-label">Editora</div>
								<div className="modal-book__detail-value">{book.publisher}</div>
							</div>
							<div className="modal-book__publication-date">
								<div className="modal-book__detail-label">Data de Publicação</div>
								<div className="modal-book__detail-value">{book.publication_date}</div>
							</div>
							<div className="modal-book__number-of-pages">
								<div className="modal-book__detail-label">Páginas</div>
								<div className="modal-book__detail-value">{book.number_of_pages}</div>
							</div>
						</div>
					</div>

					<div className="modal-book__description-wrapper">
						<div className="modal-book__detail-label">Sobre o Livro</div>
						<div className="modal-book__description">{book.description}</div>
					</div>

					<div className="modal-book__borrowed-informations">

						<div className="modal-book__waitlist">
							<div className="modal-book__waitlist-label">
								<FontIcon className="material-icons">people</FontIcon>
								<span className="modal-book__waitlist-amount">4</span>
							</div>
							<div className="modal-book__waitlist-value">""</div>
							<div className="modal-book__waitlist-button"><span>ENTRAR NA FILA</span></div>
						</div>
					</div>
				</div>
			</div>
			</Dialog>
		);
	}
}
