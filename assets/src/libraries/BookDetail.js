import React, { Component } from 'react';
import {Paper, FlatButton, Dialog, FontIcon, Avatar, ListItem, List} from 'material-ui';
import '../../css/ModalBook.css';

export default class BookDetail extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const book = this.props.book;
		const actions = [
			<FlatButton
				label="Close"
				primary={true}
				onTouchTap={this.props.showDetail}
			/>,
		];
		console.log(this.props.book);

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
				<img src={this.props.book.image_url} className="modal-book__image"/>
				</div>
				<div className="modal-book__details">
					<div className="modal-book__title">{this.props.book.title}</div>
					<div className="modal-book__author">{this.props.book.author}</div>

					<div className="modal-book__details-container">
						<div className="modal-book__available-wrapper">
							<div className="modal-book__detail-label">Disponibilidade</div>
							<div className="modal-book__detail-value">0 de 0</div>
						</div>
						<div className="modal-book__publisher-wrapper">
							<div className="modal-book__publisher-name">
								<div className="modal-book__detail-label">Editora</div>
								<div className="modal-book__detail-value">{this.props.book.publisher}</div>
							</div>
							<div className="modal-book__publication-date">
								<div className="modal-book__detail-label">Data de Publicação</div>
								<div className="modal-book__detail-value">{this.props.book.publication_date}</div>
							</div>
							<div className="modal-book__number-of-pages">
								<div className="modal-book__detail-label">Páginas</div>
								<div className="modal-book__detail-value">{this.props.book.number_of_pages}</div>
							</div>
						</div>
					</div>

					<div className="modal-book__description-wrapper">
						<div className="modal-book__detail-label">Sobre o Livro</div>
						<div className="modal-book__description">{this.props.book.description}</div>
					</div>

					<div className="modal-book__borrowed-informations">
						<div className="modal-book__borrowed-with">
							<div className="modal-book__borrowed-with-label">Emprestado com:</div>

							<div className="modal-book__borrowed-with-wrapper">
								<div className="modal-book__borrowed-person">
									<Avatar src={this.props.book.image_url}/>
									<span>{'Andrey'}</span>
								</div>
								<div className="modal-book__borrowed-elapsed-time">
									<span className="borrowed-elapsed-time__label">Emprestado a </span>
									<span className="borrowed-elapsed-time__value">20 dias</span>
								</div>
							</div>
						</div>

						<div className="modal-book__waitlist">
							<div className="modal-book__waitlist-label">
								<FontIcon className="material-icons">people</FontIcon>
								<span className="modal-book__waitlist-amount">4</span>
							</div>
							<div className="modal-book__waitlist-value">""</div>
						</div>
					</div>
				</div>
			</div>
			</Dialog>
		);
	}
}


// author
// title
// subtitle
// description
// image_url
// isbn
// number_of_pages
// publication_date
// publisher
