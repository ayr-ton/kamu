import React, {Component} from 'react';
import Book from './Book';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ProfileService from '../services/ProfileService';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from 'material-ui/CircularProgress';
import debounce from 'lodash/debounce'
import SearchBar from '../utils/filters/SearchBar';

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
            this.setState({isLoading: true, hasMoreItems: false});

            return service.getBooksByPage(librarySlug, page, searchTerm).then(callback);
        }
    }

    _handleSearch(searchTerm) {

        this.setState({searchTerm});

        window.scroll(0, 0);

        this._loadBooks(1, this._onLoadWithSearchTerm, searchTerm);
    }

    _onLoadWithSearchTerm(response) {
        this.setState({
            hasMoreItems: !!response.next,
            books: response.results,
            isLoading: false,
            nextPage: 2
        })
    }

    _loadMoreBooks() {
        const {nextPage, searchTerm} = this.state;

        this._loadBooks(nextPage, this._onLoadMoreBooksComplete, searchTerm);

    }

    _onLoadMoreBooksComplete(response) {

        if (!response) {
            this.setState({
                hasMoreItems: false,
                isLoading: false,
            });
        }
        else {
            this.setState((previous) => {
                return {
                    hasMoreItems: !!response.next,
                    books: previous.books.concat(response.results),
                    isLoading: false,
                    nextPage: ++previous.nextPage
                };
            });
        }
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
                <SearchBar onChange={debounce(this._handleSearch, 300)}/>
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
