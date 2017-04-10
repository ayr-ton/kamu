import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';


export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null
		};
	}

	componentWillMount() {
		this.props.service.getLoggedUser().then(user => {
			this.setState({ user });
		});
	}

	render() {
		let avatar;
		if (this.state.user) {
			avatar = <Avatar src={this.state.user.image_url} size={50} />;
		}

		return (
			<MuiThemeProvider>
				<AppBar
					title={
						<a href="/" className="header-content">
							<img src="/static/images/logo.svg" alt="Kamu logo" />
						</a>
					}
					iconElementLeft={<div></div>}
					iconElementRight={avatar}
					className="header"
				/>
			</MuiThemeProvider>
		);
	}
}