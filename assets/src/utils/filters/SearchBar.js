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
            <Paper zDepth={3} style={{
                position: 'fixed',
                zIndex: 3,
                width: '100%',
                height: 50,
                top: 64,
                backgroundColor: 'white'
            }}>
                <div style={{position: 'relative', width: '80%', height: 50, left: 80}}>
                    <div style={{display: 'inline-block', verticalAlign: 'middle', marginLeft: 5}}>
                        <Search style={{color: 'gray', marginLeft: 5}}/>
                    </div>
                    <TextField value={this.state.searchTerm} hintText="Search by book title or author"
                               onChange={this._onChange}
                               underlineShow={false}
                               style={{
                                   marginLeft: 10,
                                   width: '90%',
                                   height: '96%',
                                   fontSize: 'larger',
                                   border: 'none',
                                   outline: 'none'
                               }}/>
                    {this.state.searchTerm !== "" &&
                    <div style={{display: 'inline-block', verticalAlign: 'middle'}}>
                        <Close style={{color: 'gray', cursor: 'pointer'}} onClick={this._onClear}/>
                    </div>}
                </div>
            </Paper>
        )
    }
}

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
};