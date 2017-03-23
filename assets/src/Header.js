import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import logo from '../images/logo.svg';

export default class Header extends Component {
	render() {
		return (
			<AppBar
				title={<div className="header-content"><img src={logo} alt="Kamu logo" /></div>}
				iconElementLeft={<div></div>}
			/>
		);
	}
}