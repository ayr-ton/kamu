import React, {Component} from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import { Toolbar } from "@material-ui/core";
import { clearRegion, getLoggedUser } from './services/ProfileService';
import { HOME_URL, ADMIN_URL, MY_BOOKS_URL, ADD_BOOK_URL } from './utils/constants';

const redirect = (url) => window.location.assign(url);
const clearRegionAndRedirect = () => { clearRegion(); redirect(HOME_URL); }

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuAnchorElement: null,
		};

		this._handleMenuClick = this._handleMenuClick.bind(this);
		this._handleMenuClose = this._handleMenuClose.bind(this);
	}

	componentWillMount() {
		return getLoggedUser().then(user => {
			window.currentUser = user;
		});
	}

	_handleMenuClick(event) {
		this.setState({ menuAnchorElement: event.currentTarget });
	}

	_handleMenuClose() {
		this.setState({ menuAnchorElement: null });
	}

	render() {
		return (
				<AppBar	className="header">
					<Toolbar>
						<a href={HOME_URL} className="header-content">
							<img src="/static/images/logo.svg" alt="Kamu logo" />
						</a>
						{this.props.showMenu && (
							<div className="header-menu">
								<IconButton
									onClick={this._handleMenuClick}
								>
									<MoreVertIcon />
								</IconButton>
								<Menu
									transformOrigin={{horizontal: 'right', vertical: 'top'}}
									anchorOrigin={{horizontal: 'right', vertical: 'top'}}
									anchorEl={this.state.menuAnchorElement}
									open={Boolean(this.state.menuAnchorElement)}
									onClose={this._handleMenuClose}
								>
									<MenuItem id="admin-button" onClick={() => redirect(ADMIN_URL)}>Admin</MenuItem>
									<MenuItem id="change-region-button" onClick={clearRegionAndRedirect}>Change library</MenuItem>
									<MenuItem id="add-book-button" onClick={() => redirect(ADD_BOOK_URL)}>Add book</MenuItem>
									<MenuItem id="my-books-button" onClick={() => redirect(MY_BOOKS_URL)}>My books</MenuItem>
								</Menu>
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
