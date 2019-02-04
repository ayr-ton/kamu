import Book from './Book';
import { someBook } from '../../test/booksHelper';

describe('Book model', () => {
	describe('checking the book availability', () => {
		it('should return true when the book has one copy without a user', () => {
			const book = someBook([{ id: 1, user: null }]);
			expect(book.isAvailable()).toBeTruthy();
		});

		it('should return true when the book has at least one copy without a user', () => {
			const book = someBook([ { id: 2, user: {} }, { id: 3, user: null } ]);
			expect(book.isAvailable()).toBeTruthy();
		});

		it('should return false when the book does not have a copy without a user', () => {
			const book = someBook([ { id: 2, user: {} } ]);
			expect(book.isAvailable()).toBeFalsy();
		});
	
		it('should return false when all of the copies without a user', () => {
			const book = someBook([ { id: 5, user: {} }, { id: 6, user: {} }]);
			expect(book.isAvailable()).toBeFalsy();
		});

		it('should return the first available book copy id without a user', () => {
			const book = someBook([ { id: 2, user: {} }, { id: 3, user: null } ]);			
			expect(book.getAvailableCopyID()).toEqual(3);
		});

		it('should return null when the book does not have copies', () => {
			const book = someBook([]);
			expect(book.getAvailableCopyID()).toBeNull();
		});
	
		it('should return null when the book does not have a copy without a user', () => {
			const book = someBook([ { id: 5, user: {} }, { id: 6, user: {} }]);
			expect(book.getAvailableCopyID()).toBeNull();
		});

		it('should return the number of available copies', () => {
			const book = someBook([ { id: 5, user: null }, { id: 6, user: {} }, { id: 7, user: null }]);
			expect(book.getCountBookCopiesAvailable()).toEqual(2);
		});
	});

	describe('checking if the user owns a copy of the book', () => {
		global.currentUser = { username: 1 };

		it('should return true if the book has only one copy that belongs to the user', () => {
			const book = someBook([ { id: 1, user: global.currentUser } ]);
			expect(book.belongsToUser()).toBeTruthy();
		});

		it('should return true if the book has at least one copy that belongs to the user', () => {
			const book = someBook([ { id: 2, user: global.currentUser }, { id: 3, user: null } ]);
			expect(book.belongsToUser()).toBeTruthy();
		});

		it('should return false if none of the copies belongs to the user', () => {
			const book = someBook([ { id: 4, user: { username: 2 } } ]);
			expect(book.belongsToUser()).toBeFalsy();
		});

		it('should return false if the book has no copies', () => {
			const book = someBook([]);
			expect(book.belongsToUser()).toBeFalsy();
		});

		it('should return the id of the copy that belongs to the user when it has one copy', () => {
			const book = someBook([ { id: 1, user: global.currentUser } ]);
			expect(book.getBorrowedCopyID()).toEqual(1);
		});

		it('should return the id of the copy when one of the copies belong to user', () => {
			const book = someBook([ { id: 2, user: global.currentUser }, { id: 3, user: null } ]);
			expect(book.getBorrowedCopyID()).toEqual(2);
		});

		it('should return null if the book does not have a copy that belongs to the user', () => {
			const book = someBook([ { id: 4, user: { username: 2 } } ]);
			expect(book.getBorrowedCopyID()).toBeNull();
		});
	});
});
