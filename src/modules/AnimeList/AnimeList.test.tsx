import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimeList from './AnimeList';
import { BrowserRouter } from 'react-router-dom';

test('renders Home text', () => {
  render(<AnimeList />, { wrapper: BrowserRouter });
  const text = screen.getByText(/Home/i);
  expect(text).toBeInTheDocument();
});
