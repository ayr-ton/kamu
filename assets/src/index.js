import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import ProfileService from './services/ProfileService';
import '../css/index.css';
import '../css/App.css'

injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <Header service={new ProfileService()} />
    </MuiThemeProvider>,
    document.getElementById('app-bar')
);
