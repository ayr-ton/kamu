import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this._onChange = this._onChange.bind(this);
    this._onClear = this._onClear.bind(this);
  }

  _onChange(event) {
    const newSearchTerm = event.target.value;
    this.setState({ searchTerm: newSearchTerm });
    this.props.onChange(newSearchTerm);
  }

  _onClear() {
    this.setState({ searchTerm: '' });
    this.props.onChange('');
  }

  render() {
    return (
      <Paper elevation={10} className="search-bar-paper">
        <div className="search-bar-container">
          <div className="search-bar-search-icon-container">
            <Search className="search-bar-icon" />
          </div>
          <TextField
            onChange={this._onChange}
            value={this.state.searchTerm}
            className="search-bar-input"
            placeholder="Search by book title or author"
          />
          {this.state.searchTerm !== ''
                    && (
                    <div className="search-bar-close-icon-container">
                      <Close className="search-bar-close-icon" onClick={this._onClear} />
                    </div>
                    )}
        </div>
      </Paper>
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
};
