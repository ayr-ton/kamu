import { expect } from 'chai';
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
			expect(book1.isAvailable()).to.be.true;
			expect(book2.isAvailable()).to.be.true;
		});

		it('should return false when the book does not have a copy without a user', () => {
			expect(book3.isAvailable()).to.be.false;
			expect(book4.isAvailable()).to.be.false;
		});

		it('should return the first available book copy without a user', () => {
			expect(book1.getAvailableCopyID()).to.equal(1);
			expect(book2.getAvailableCopyID()).to.equal(3);
		});

		it('should return null when the book does not have a copy without a user', () => {
			expect(book3.getAvailableCopyID()).to.be.null;
			expect(book4.getAvailableCopyID()).to.be.null;
		});
	});
});
