import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimeList from './AnimeList';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from "@apollo/client/testing";
import { pageMock } from '../../mocks';
import AnimeProvider from '../../providers/AnimeProvider';
import CollectionProvider from '../../providers/CollectionProvider';

test('renders without error', async () => {
  render(
    <MockedProvider mocks={pageMock} addTypename={false}>
      <AnimeProvider>
        <CollectionProvider>
          <AnimeList />
        </CollectionProvider>
      </AnimeProvider>
    </MockedProvider>,
    { wrapper: BrowserRouter }
  );
  expect(await screen.findByText('Loading')).toBeInTheDocument();
  expect(await screen.findByText("Test Anime")).toBeInTheDocument();
});
