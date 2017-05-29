import sinon from 'sinon';
import { expect } from 'chai';
import BookService from "./BookService";

describe('BookService', () => {
	let libraries = [
		{
			id: 1
			, name: "Santiago"
		}
		,{
			id: 2
			, name: "Valparaiso"
		}
	];

	beforeEach(() => {
		sinon.stub(
			require("./helpers")
			, "fetchFromAPI"
		).returns(
			Promise.resolve({results: libraries})
		);
	});

	it("Should return libraries", (done) => {
		let bookService = new BookService();

		bookService.getLibraries().then(librariesReturned => {
			expect(librariesReturned).to.deep.equal(libraries);
			done();
		});
	});
});