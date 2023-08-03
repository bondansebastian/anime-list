import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimeList from './AnimeList';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from "@apollo/client/testing";
import { pageMock } from '../../mocks';
import AnimeProvider from '../../providers/AnimeProvider';

test('renders without error', async () => {
  render(
    <MockedProvider mocks={pageMock} addTypename={false}>
      <AnimeProvider>
        <AnimeList />
      </AnimeProvider>
    </MockedProvider>,
    { wrapper: BrowserRouter }
  );
  expect(await screen.findByText('Loading')).toBeInTheDocument();
  expect(await screen.findByText("Test Anime")).toBeInTheDocument();
});
