import React, {Component} from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import { Toolbar } from "@material-ui/core";

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuAnchorElement: null,
		};

		this._changeRegion = this._changeRegion.bind(this);
		this._handleMenuClick = this._handleMenuClick.bind(this);
		this._handleMenuClose = this._handleMenuClose.bind(this);
	}

	componentWillMount() {
		return this.props.service.getLoggedUser().then(user => {
			window.currentUser = user;
		});
	}

	_admin() {
		window.location.assign('/admin/');
	}

	_changeRegion() {
		this.props.service.clearRegion();
		window.location.assign('/');
	}

	_addBook() {
		window.location.assign('/admin/books/book/isbn/');
	}	

	_handleMenuClick(event) {
		this.setState({ menuAnchorElement: event.currentTarget });
	}

	_handleMenuClose() {
		this.setState({ menuAnchorElement: null });
	}

	render() {
		let menu;
		if (this.props.showMenu) {
			menu = (
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
						<MenuItem id="admin" onClick={this._admin}>Admin</MenuItem>
						<MenuItem id="change-region" onClick={this._changeRegion}>Change library</MenuItem>
						<MenuItem id="add-book" onClick={this._addBook}>Add book</MenuItem>
					</Menu>
				</div>
			);
		}

		return (
				<AppBar
					className="header"
				>
					<Toolbar>
						<a href="/" className="header-content">
							<img src="/static/images/logo.svg" alt="Kamu logo" />
						</a>

						{menu}
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
