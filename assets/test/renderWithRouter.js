/* eslint-disable react/display-name */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

function RouterWrapper(initialEntries) {
  return ({ children }) => (
    <MemoryRouter initialEntries={initialEntries}>
      {children}
    </MemoryRouter>
  );
}

export const renderWithRouter = (component, { initialEntries, ...options } = {}) => render(
  component,
  {
    wrapper: RouterWrapper(initialEntries),
    ...options,
  },
);

export default renderWithRouter;
