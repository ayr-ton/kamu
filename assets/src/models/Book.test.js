import Book from './Book';

describe('Book', () => {
	describe('checking the book availability', () => {
		const book1 = new Book();
		book1.copies = [{ id: 1, user: null }];

		const book2 = new Book();
		book2.copies = [ { id: 2, user: {} }, { id: 3, user: null } ];
		const book3 = new Book();
		book3.copies = [ { id: 4, user: {} } ];

		const book4 = new Book();
		book4.copies = [ { id: 5, user: {} }, { id: 6, user: {} }];

		it('should return true when the book has at least one copy without a user', () => {
			expect(book1.isAvailable()).toBeTruthy();
			expect(book2.isAvailable()).toBeTruthy();
		});

		it('should return false when the book does not have a copy without a user', () => {
			expect(book3.isAvailable()).toBeFalsy();
			expect(book4.isAvailable()).toBeFalsy();
		});

		it('should return the first available book copy id without a user', () => {
			expect(book1.getAvailableCopyID()).toEqual(1);
			expect(book2.getAvailableCopyID()).toEqual(3);
		});

		it('should return null when the book does not have a copy without a user', () => {
			expect(book3.getAvailableCopyID()).toBeNull();
			expect(book4.getAvailableCopyID()).toBeNull();
		});
	});

	describe('checking if the user owns a copy of the book', () => {
		it('should return true if the book has a copy that belongs to the user', () => {
			global.currentUser = { username: 1 };
			const book = new Book();
			book.copies = [ { id: 1, user: global.currentUser } ];
			expect(book.belongsToUser()).toBeTruthy();

			book.copies = [ { id: 2, user: global.currentUser }, { id: 3, user: null } ];
			expect(book.belongsToUser()).toBeTruthy();
		});

		it('should return false if the book does not have a copy that belongs to the user', () => {
			global.currentUser = { username: 1 };
			const book = new Book();
			book.copies = [ { id: 4, user: { username: 2 } } ];
			expect(book.belongsToUser()).toBeFalsy();

			book.copies = [];
			expect(book.belongsToUser()).toBeFalsy();
		});

		it('should return the id of the copy that belongs to the user', () => {
			global.currentUser = { username: 1 };
			const book = new Book();
			book.copies = [ { id: 1, user: global.currentUser } ];
			expect(book.getBorrowedCopyID()).toEqual(1);

			book.copies = [ { id: 2, user: global.currentUser }, { id: 3, user: null } ];
			expect(book.getBorrowedCopyID()).toEqual(2);
		});

		it('should return null if the book does not have a copy that belongs to the user', () => {
			global.currentUser = { username: 1 };
			const book = new Book();
			book.copies = [ { id: 4, user: { username: 2 } } ];
			expect(book.getBorrowedCopyID()).toBeNull();

			book.copies = [];
			expect(book.getBorrowedCopyID()).toBeNull();
		});
	});
});
