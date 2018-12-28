import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import MenuItem from "material-ui/MenuItem";

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
            displaysMenu: window.location.pathname !== '/'
        };

		this._changeRegion = this._changeRegion.bind(this);
	}

	componentWillMount() {
		return this.props.service.getLoggedUser().then(user => {
			window.currentUser = user;
		});
	}

	_changeRegion() {
		this.props.service.clearRegion();
		window.location.href = '/';
	}

	_addBook() {
		window.location.href = '/admin/books/book/isbn/';
	}	

	render() {
		let menu;
		if (this.state.displaysMenu) {
			menu = (
				<IconMenu
					iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
					anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				>
					<MenuItem primaryText="Change library" id="change-region" onClick={this._changeRegion} />
					<MenuItem primaryText="Add Book" id="add-book" onClick={this._addBook} />
				</IconMenu>
            );
        }

		return (
				<AppBar
					title={
						<a href="/" className="header-content">
							<img src="/static/images/logo.svg" alt="Kamu logo" />
						</a>
					}
					iconElementLeft={<div></div>}
					iconElementRight={<div>{menu}</div>}
					className="header"
				/>
		);
	}
}