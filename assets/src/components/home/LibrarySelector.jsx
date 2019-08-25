import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withRouter } from 'react-router';
import { getLibraries } from '../../services/BookService';

class LibrarySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libraries: [],
    };
  }

  componentDidMount() {
    this.loadLibraries();
  }

  loadLibraries() {
    return getLibraries().then((response) => {
      this.setState({ libraries: response.results });
    });
  }

  render() {
    return (
      <div className="library-list">
        <List>
          {this.state.libraries.map((library) => (
            <ListItem
              className="library"
              key={library.id}
              onClick={() => this.props.history.push(`/libraries/${library.slug}`)}
              button
            >
              {library.name}
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

LibrarySelector.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export { LibrarySelector };
export default withRouter(LibrarySelector);
