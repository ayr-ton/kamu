import React, { Component } from 'react';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';

export default class Book extends Component {
	render() {
		const book = this.props.book;
		return (
			<Card className="book">
				<CardMedia>
					<img src={book.image_url} alt={"Cover of " + book.title} />
				</CardMedia>

				<CardTitle title={book.title} subtitle={book.author} />
			</Card>
		);
	}
}