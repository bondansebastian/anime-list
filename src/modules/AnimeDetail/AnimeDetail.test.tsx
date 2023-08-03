import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimeDetail from './AnimeDetail';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { mediaMock } from '../../mocks';
import AnimeProvider from '../../providers/AnimeProvider';
import CollectionProvider from '../../providers/CollectionProvider';

test('renders without error', async () => {
  render(
    <MockedProvider mocks={mediaMock} addTypename={false}>
      <AnimeProvider>
        <CollectionProvider>
          <MemoryRouter initialEntries={['/anime-detail/1']}>
            <Routes>
              <Route path={'/anime-detail/:id'} element={<AnimeDetail />} />
            </Routes>
          </MemoryRouter>
        </CollectionProvider>
      </AnimeProvider>
    </MockedProvider>
  );
  expect(screen.queryByText("Animes")).not.toBeInTheDocument();
  expect(await screen.findByText("Test Anime")).toBeInTheDocument();
});
