import React, {Component} from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { Link } from 'react-router-dom';
import { Toolbar, Icon, Badge } from "@material-ui/core";
import { clearRegion, getLoggedUser, getRegion } from './services/ProfileService';
import { HOME_URL, ADMIN_URL, MY_BOOKS_URL, ADD_BOOK_URL, LIBRARY_URL_PREFIX } from './utils/constants';

const redirect = (url) => window.location.assign(url);

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			borrowedBooksCount: 0,
		};
	}

	componentDidMount() {
		return getLoggedUser().then(user => {
			window.currentUser = user;
			this.setState({
				borrowedBooksCount: user.borrowed_books_count,
			});
		});
	}

	render() {
		return (
				<AppBar	className="header">
					<Toolbar>
						<a href={HOME_URL} className="header-content">
							<img src="/static/images/logo.svg" alt="Kamu logo" />
						</a>

						<div style={{flexGrow: 1}} />

						{this.props.showMenu && (
							<div className="header-menu">
								<IconButton title="Library home" id="home-button">
									<Link to={`${LIBRARY_URL_PREFIX}/${getRegion()}`}>
										<Icon className="fa fa-home" />
									</Link>
								</IconButton>

								<IconButton title="My books" id="my-books-button">
									<Badge badgeContent={this.state.borrowedBooksCount} color="secondary">
										<Link to={MY_BOOKS_URL}>
											<Icon className="fa fa-book-reader" />
										</Link>
									</Badge>
								</IconButton>

								<IconButton title="Add a book" id="add-book-button" onClick={() => redirect(ADD_BOOK_URL)}>
									<Icon className="fa fa-plus-circle" />
								</IconButton>

								<IconButton title="Change region" id="change-region-button" onClick={clearRegion}>
									<Link to={HOME_URL}>
										<Icon className="fa fa-map-marker-alt" />
									</Link>
								</IconButton>

								<IconButton title="Administration" id="admin-button" onClick={() => redirect(ADMIN_URL)}>
									<Icon className="fa fa-cog" />
								</IconButton>
							</div>
						)}
					</Toolbar>
				</AppBar>
		);
	}
}

Header.propTypes = {
	showMenu: PropTypes.bool
};

Header.defaultProps = {
	showMenu: true
}
