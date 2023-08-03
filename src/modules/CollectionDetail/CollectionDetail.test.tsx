import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimeProvider from '../../providers/AnimeProvider';
import CollectionProvider from '../../providers/CollectionProvider';
import CollectionDetail from './CollectionDetail';
import { MockedProvider } from '@apollo/client/testing';
import { pageMock } from '../../mocks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CollectionList from '../CollectionList/CollectionList';

test('renders without error', async () => {
  const collections = [{ name: 'Test Collection', animes: [] }];
  const path = `/collection-detail/${collections[0].name}`;

  render(
    <MockedProvider mocks={pageMock} addTypename={false}>
      <AnimeProvider>
        <CollectionProvider defaultCollections={collections}>
          <MemoryRouter initialEntries={[path]}>
            <Routes>
              <Route path={'/collection-list'} element={<CollectionList />} />
              <Route path={'/collection-detail/:name'} element={<CollectionDetail />} />
            </Routes>
          </MemoryRouter>
        </CollectionProvider>
      </AnimeProvider>
    </MockedProvider>
  );
  expect(await screen.findByText(collections[0].name)).toBeInTheDocument();
});
