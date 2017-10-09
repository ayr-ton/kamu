import React, {Component} from 'react';
import Book from './Book';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ProfileService from '../services/ProfileService';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from 'material-ui/CircularProgress';
import debounce from 'lodash/debounce'
import Search from 'material-ui/svg-icons/action/search';
import Close from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';


class SearchBar extends Component {

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
                    <TextField value={this.state.searchTerm} hintText="Search"
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

export default class BookList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            currentBook: {},
            hasMoreItems: true,
            isLoading: false,
            nextPage: 1,
            searchTerm: ""
        };

        this._loadBooks = this._loadBooks.bind(this);
        this._handleSearch = this._handleSearch.bind(this);
        this._loadMoreBooks = this._loadMoreBooks.bind(this);
        this._onLoadMoreBooksComplete = this._onLoadMoreBooksComplete.bind(this);
        this._onLoadWithSearchTerm = this._onLoadWithSearchTerm.bind(this);
        this._renderBookItem = this._renderBookItem.bind(this);
    }

    componentDidMount() {
        injectTapEventPlugin();
    }

    _loadBooks(page, callback, searchTerm = "") {
        const {isLoading} = this.state;
        const {service, librarySlug} = this.props;

        if (!isLoading) {
            this.setState({isLoading: true});

            return service.getBooksByPage(librarySlug, page, searchTerm).then(callback);
        }
    }

    _handleSearch(searchTerm) {
        // let searchTerm = event.target.value;

        this.setState({searchTerm});

        debounce(() => this._loadBooks(1, this._onLoadWithSearchTerm, searchTerm), 500)();
    }

    _onLoadWithSearchTerm(response) {
        this.setState({
            hasMoreItems: !!response.next,
            books: response.results,
            isLoading: false,
            nextPage: 2
        })
    };


    _loadMoreBooks() {
        const {nextPage, searchTerm} = this.state;

        this._loadBooks(nextPage, this._onLoadMoreBooksComplete, searchTerm);

    }

    _onLoadMoreBooksComplete(response) {
        this.setState((previous) => {
            return {
                hasMoreItems: !!response.next,
                books: previous.books.concat(response.results),
                isLoading: false,
                nextPage: ++previous.nextPage
            };
        });
    }


    render() {
        let content;
        const profileService = new ProfileService();
        const library = profileService.getRegion();
        const loader = <div style={{padding: 10, textAlign: "center"}}><CircularProgress/></div>;

        if (this.state.books) {
            content = this.state.books.map(book => this._renderBookItem(book, library));
        }

        return (
            <div>
                <SearchBar onChange={this._handleSearch}/>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this._loadMoreBooks}
                    hasMore={this.state.hasMoreItems}
                    threshold={950}
                    loader={loader}>
                    <div className="book-list">
                        {content}
                    </div>
                </InfiniteScroll>
            </div>
        );
    }

    _renderBookItem(book, library) {
        return <Book key={book.id} book={book} service={this.props.service} library={library}/>
    }
}
