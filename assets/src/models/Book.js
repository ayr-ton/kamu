export default class Book {
	isAvailable() {
		return this.getAvailableCopyID() != null;
	}	

	getAvailableCopyID() {
		for (const copy of this.copies) {
			if (copy.user === null) return copy.id;
		}

		return null;
	}
}