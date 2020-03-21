import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

export const renderWithRouter = (component) => render(component, { wrapper: MemoryRouter });
export default renderWithRouter;
