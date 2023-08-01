import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimeDetail from './AnimeDetail';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', () => {
  render(<AnimeDetail />, { wrapper: BrowserRouter });
  const text = screen.getByText(/AnimeDetail/i);
  expect(text).toBeInTheDocument();
});
