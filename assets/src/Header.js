import React, {Component} from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { withRouter } from 'react-router';
import { Toolbar, Icon, Badge } from "@material-ui/core";
import { clearRegion, getLoggedUser, getRegion } from './services/ProfileService';
import { HOME_URL, ADMIN_URL, MY_BOOKS_URL, ADD_BOOK_URL, LIBRARY_URL_PREFIX } from './utils/constants';

const redirectExternal = (url) => window.location.assign(url);

class Header extends Component {
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

	redirect(url) {
		this.props.history.push(url);
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
								<IconButton title="Library home" id="home-button" onClick={() => this.redirect(`${LIBRARY_URL_PREFIX}/${getRegion()}`) }>
									<Icon className="fa fa-home" />
								</IconButton>

								<IconButton title="My books" id="my-books-button" onClick={() => this.redirect(MY_BOOKS_URL) }>
									<Badge badgeContent={this.state.borrowedBooksCount} color="secondary">
										<Icon className="fa fa-book-reader" />
									</Badge>
								</IconButton>

								<IconButton title="Add a book" id="add-book-button" onClick={() => redirectExternal(ADD_BOOK_URL)}>
									<Icon className="fa fa-plus-circle" />
								</IconButton>

								<IconButton title="Change region" id="change-region-button" onClick={() => { clearRegion(); this.redirect(HOME_URL); }}>
									<Icon className="fa fa-map-marker-alt" />
								</IconButton>

								<IconButton title="Administration" id="admin-button" onClick={() => redirectExternal(ADMIN_URL)}>
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
	showMenu: PropTypes.bool,
	history: PropTypes.shape({}).isRequired,
};

Header.defaultProps = {
	showMenu: true
}

export { Header };
export default withRouter(Header);
