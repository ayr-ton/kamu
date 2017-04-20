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

	belongsToUser() {
		for (const copy of this.copies) {
			if (copy.user && copy.user.username === currentUser.username) return true;
		}

		return false;
	}
}