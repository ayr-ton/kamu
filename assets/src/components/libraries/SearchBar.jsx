import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import './SearchBar.css';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.query || '',
    };

    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onChange(event) {
    const newSearchTerm = event.target.value;
    const previousSearchTerm = this.state.searchTerm;
    this.setState({ searchTerm: newSearchTerm });

    if (newSearchTerm.trim() !== previousSearchTerm.trim()) {
      this.props.onChange(newSearchTerm.trim());
    }
  }

  onClear() {
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
            onChange={this.onChange}
            value={this.state.searchTerm}
            className="search-bar-input"
            placeholder="Search by book title or author"
          />
          {this.state.searchTerm !== ''
            && (
              <div className="search-bar-close-icon-container" data-testid="nameInput">
                <Close
                  inputprops={
                    { 'data-testid': 'nameInput' }
                  }
                  className="search-bar-close-icon"
                  onClick={this.onClear}
                />
              </div>
            )}
        </div>
      </Paper>
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};
