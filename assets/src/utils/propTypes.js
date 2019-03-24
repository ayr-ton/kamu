import PropTypes from 'prop-types';

export const UserPropType = PropTypes.shape({
  username: PropTypes.string,
  email: PropTypes.string,
  image_url: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  name: PropTypes.string,
  borrowed_books_count: PropTypes.number,
});

export const BookCopyPropType = PropTypes.shape({
  id: PropTypes.number,
  borrow_date: PropTypes.string,
  user: UserPropType,
});

export const BookPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  copies: PropTypes.arrayOf(BookCopyPropType),
  waitlist_users: PropTypes.arrayOf(UserPropType),
  action: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }),
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  image_url: PropTypes.string,
  isbn: PropTypes.string,
  number_of_pages: PropTypes.number,
  publication_date: PropTypes.string,
  publisher: PropTypes.string,
});
