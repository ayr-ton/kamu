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

  getCountBookCopiesAvailable() {
    return this.copies.filter((copy) => copy.user === null).length;
  }

  belongsToUser() {
    return this.getBorrowedCopyID() != null;
  }

  getBorrowedCopyID() {
    for (const copy of this.copies) {
      if (copy.user && copy.user.username === currentUser.username) return copy.id;
    }

    return null;
  }

  isUserInWaitlist() {
    return this.waitlist_users.filter((user) => user.username === currentUser.username).length > 0;
  }

  canBeAddedToWaitlist() {
    return !this.isAvailable() && !this.isUserInWaitlist();
  }
}
