import React, {Component} from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import { Toolbar, Icon } from "@material-ui/core";
import { clearRegion, getLoggedUser, getRegion } from './services/ProfileService';
import { HOME_URL, ADMIN_URL, MY_BOOKS_URL, ADD_BOOK_URL, LIBRARY_URL_PREFIX } from './utils/constants';

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

	componentDidMount() {
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

						<div style={{flexGrow: 1}} />

						{this.props.showMenu && (
							<div className="header-menu">
								<IconButton title="Library home" id="home-button" onClick={() => redirect(`${LIBRARY_URL_PREFIX}/${getRegion()}`)}>
									<Icon className="fa fa-home" />
								</IconButton>

								<IconButton title="My books" id="my-books-button" onClick={() => redirect(MY_BOOKS_URL)}>
									<Icon className="fa fa-book-reader" />
								</IconButton>

								<IconButton title="Add a book" id="add-book-button" onClick={() => redirect(ADD_BOOK_URL)}>
									<Icon className="fa fa-plus-circle" />
								</IconButton>

								<IconButton title="Change region" id="change-region-button" onClick={clearRegionAndRedirect}>
									<Icon className="fa fa-map-marker-alt" />
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
