import React, {Component, PropTypes} from 'react';
import Search from 'material-ui/svg-icons/action/search';
import Close from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

export default class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ""
        };

        this._onChange = this._onChange.bind(this);
        this._onClear = this._onClear.bind(this);
    }

    _onChange(event, searchTerm) {
        this.setState({searchTerm});
        this.props.onChange(searchTerm);
    }

    _onClear() {
        this.setState({searchTerm: ""});
        this.props.onChange("");
    }

    render() {
        return (
            <Paper zDepth={3} className="search-bar-paper">
                <div className="search-bar-container">
                    <div className="search-bar-search-icon-container">
                        <Search className="search-bar-icon"/>
                    </div>
                    <TextField value={this.state.searchTerm}
                               hintText="Search by book title or author"
                               onChange={this._onChange}
                               underlineShow={false}
                               className="search-bar-input"/>
                    {this.state.searchTerm !== "" &&
                    <div className="search-bar-close-icon-container">
                        <Close className="search-bar-close-icon" onClick={this._onClear}/>
                    </div>}
                </div>
            </Paper>
        )
    }
}

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
};