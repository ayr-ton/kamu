import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../css/App.css'

export default class Header extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<AppBar
					title={<div className="header-content"><img src="/static/images/logo.svg" alt="Kamu logo" /></div>}
					iconElementLeft={<div></div>}
				/>
			</MuiThemeProvider>
		);
	}
}