export default class Book {
  getAvailableCopyID() {
    for (const copy of this.copies) {
      if (copy.user === null) return copy.id;
    }

    return null;
  }

  getCountBookCopiesAvailable() {
    return this.copies.filter((copy) => copy.user === null).length;
  }

  getBorrowedCopyID() {
    for (const copy of this.copies) {
      if (copy.user && copy.user.username === currentUser.username) return copy.id;
    }

    return null;
  }
}
