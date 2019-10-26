import React from 'react';
import { render } from '@testing-library/react';

import WaitlistIndicator from './WaitlistIndicator';

describe('WaitlistIndicator', () => {
  const date = '2019-09-01T19:19:08.108170Z';

  it('shows the date according to the added date prop', () => {
    const { getAllByText } = render(<WaitlistIndicator addedDate={date} />);

    expect(getAllByText('Waiting since Sep 1, 2019')).toHaveLength(1);
  });

  it('has a title with the date according to the added date prop', () => {
    const { getAllByTitle } = render(<WaitlistIndicator addedDate={date} />);

    expect(getAllByTitle('You\'ve been waiting since Sep 1, 2019')).toHaveLength(1);
  });
});
