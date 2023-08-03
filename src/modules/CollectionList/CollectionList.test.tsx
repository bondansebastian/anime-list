import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AnimeProvider from '../../providers/AnimeProvider';
import CollectionProvider from '../../providers/CollectionProvider';
import CollectionList from './CollectionList';

test('renders without error', async () => {
  render(
    <AnimeProvider>
      <CollectionProvider>
        <CollectionList />
      </CollectionProvider>
    </AnimeProvider>,
    { wrapper: BrowserRouter }
  );
  expect(await screen.findByText("Collections")).toBeInTheDocument();
});
