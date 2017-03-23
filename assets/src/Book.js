import React, { Component } from 'react';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';

export default class Book extends Component {
	render() {
		return (
			<Card>
				<CardMedia>
					<img src="" alt="" />
				</CardMedia>

				<CardTitle title={this.props.book.title} subtitle={this.props.book.author} />
			</Card>
		);
	}
}