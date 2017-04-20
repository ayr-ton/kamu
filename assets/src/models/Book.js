export default class Book {
	isAvailable() {
		for (const copy of this.copies) {
			if (copy.user === null) return true;
		}

		return false;
	}	
}