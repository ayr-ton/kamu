import { bookIdFromUrl, bookUrl, libraryUrl } from './urls';

describe('URLs helper', () => {
  it('returns the library url with the library slug', () => {
    expect(libraryUrl('bh')).toEqual('/libraries/bh');
  });

  it('returns the book url with the library slug and book details with simple title', () => {
    const book = { id: 123, title: 'Book Name' };
    expect(bookUrl(book, 'bh')).toEqual('/libraries/bh/book/123-book-name');
  });

  it('returns the book url with the library slug and book details with complex title', () => {
    const book = { id: 456, title: 'A linguagem de programação Go?!,#:--teste' };
    expect(bookUrl(book, 'bh')).toEqual('/libraries/bh/book/456-a-linguagem-de-programacao-go-teste');
  });

  it('returns the book id from a url', () => {
    expect(bookIdFromUrl('123-book-name')).toEqual('123');
  });
});
