import { someBookWithAvailableCopies, someBookWithACopyFromMe } from './booksHelper';

export const mockGetBooksByPageResponse = {
  count: 2,
  previous: null,
  next: null,
  results: [
    someBookWithAvailableCopies(),
    someBookWithACopyFromMe(),
  ],
};

export const mockGetBooksByPageEmptyResponse = {
  count: 0,
  previous: null,
  next: null,
  results: [],
};
