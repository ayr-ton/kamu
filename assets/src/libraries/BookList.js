import React, {Component} from 'react';
import Book from './Book';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ProfileService from '../services/ProfileService';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from 'material-ui/CircularProgress';

export default class BookList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            currentBook: {},
            hasMoreItems: true,
            isLoading: false,
            currentPage: 1
        };

        this._loadBooks = this._loadBooks.bind(this);
        this._onLoadBooksComplete = this._onLoadBooksComplete.bind(this);
        this._renderBookItem = this._renderBookItem.bind(this);
    }

    componentDidMount() {
        injectTapEventPlugin();
    }

    _loadBooks() {
        const {isLoading, currentPage} = this.state;
        const {service, librarySlug} = this.props;

        if (!isLoading) {
            this.setState({isLoading: true});

            service.getBooksByPage(librarySlug, currentPage).then(this._onLoadBooksComplete);
        }
    }

    _onLoadBooksComplete(response) {
        this.setState((previous) => {
            return {
                hasMoreItems: !!response.next,
                books: previous.books.concat(response.results),
                isLoading: false,
                currentPage: ++previous.currentPage
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
            <InfiniteScroll
                pageStart={0}
                loadMore={this._loadBooks}
                hasMore={this.state.hasMoreItems}
                threshold={950}
                loader={loader}>
                <div className="book-list">
                    {content}
                </div>
            </InfiniteScroll>
        );
    }

    _renderBookItem(book, library) {
        return <Book key={book.id} book={book} service={this.props.service} library={library}/>
    }
}
