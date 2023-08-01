import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

test('renders Home text', () => {
  render(<Home />, { wrapper: BrowserRouter });
  const text = screen.getByText(/Home/i);
  expect(text).toBeInTheDocument();
});
