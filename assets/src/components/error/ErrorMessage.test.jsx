import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('Error Message', () => {
  it('has a title and a message', () => {
    const errorMessage = render(
      <ErrorMessage
        title="Something went wrong"
        subtitle="An error happened while loading this page. Please try again."
      />,
    );
    errorMessage.getByText('Something went wrong');
    errorMessage.getByText('An error happened while loading this page. Please try again.');
  });
});
