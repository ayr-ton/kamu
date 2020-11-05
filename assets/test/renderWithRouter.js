/* eslint-disable react/display-name */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

function RouterWrapper(options) {
  return ({ children }) => (
    <MemoryRouter {...options}>
      {children}
    </MemoryRouter>
  );
}

export const renderWithRouter = (component, options = {}) => render(component, {
  wrapper: RouterWrapper(options),
});

export default renderWithRouter;
