import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookActionButton from './BookActionButton';
import {
  BORROW_BOOK_ACTION,
  RETURN_BOOK_ACTION,
  JOIN_WAITLIST_BOOK_ACTION,
  LEAVE_WAITLIST_BOOK_ACTION,
} from '../../utils/constants';

describe('Action button', () => {
  it('shows the return button when the book has a return action', () => {
    const { getByRole } = render(
      <BookActionButton onClick={jest.fn()} action={RETURN_BOOK_ACTION} />,
    );

    expect(getByRole('button')).toHaveTextContent('Return');
  });

  it('shows the borrow button when the book has a borrow action', () => {
    const { getByRole } = render(
      <BookActionButton onClick={jest.fn()} action={BORROW_BOOK_ACTION} />,
    );

    expect(getByRole('button')).toHaveTextContent('Borrow');
  });

  it('shows the join waitlist button when the book has a join waitlist action', () => {
    const { getByRole } = render(
      <BookActionButton onClick={jest.fn()} action={JOIN_WAITLIST_BOOK_ACTION} />,
    );

    expect(getByRole('button')).toHaveTextContent('Join the waitlist');
  });

  it('shows the leave waitlist button when the book has a leave waitlist action', () => {
    const { getByRole } = render(
      <BookActionButton onClick={jest.fn()} action={LEAVE_WAITLIST_BOOK_ACTION} />,
    );

    expect(getByRole('button')).toHaveTextContent('Leave the waitlist');
  });

  it('shows no button when action is null', () => {
    const { queryByRole } = render(
      <BookActionButton onClick={jest.fn()} action={null} />,
    );

    expect(queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls the onClick function with the received action', async () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <BookActionButton onClick={onClick} action={BORROW_BOOK_ACTION} />,
    );

    await userEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledWith(BORROW_BOOK_ACTION);
  });
});
