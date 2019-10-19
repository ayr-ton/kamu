import React from 'react';
import {
  render,
} from '@testing-library/react';

import WaitlistIndicator from './WaitlistIndicator';

describe('WaitlistIndicator', () => {
  it('shows a relative date according to the added date prop', () => {
    const date = '2019-09-01T19:19:08.108170Z';
    const { getAllByText } = render(<WaitlistIndicator addedDate={date} />);

    expect(getAllByText('Waiting since Sep 1, 2019')).toHaveLength(1);
  });
});
