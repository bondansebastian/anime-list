import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimeDetail from './AnimeDetail';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { pageMock } from '../../mocks';
import AnimeProvider from '../../components/AnimeProvider';
import AnimeList from '../AnimeList/AnimeList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AnimeList />,
    index: false,
  },
  {
    path: "/anime-detail/1",
    element: <AnimeDetail />,
    index: true,
  },
])

test('renders without error', async () => {
  render(
    <MockedProvider mocks={pageMock} addTypename={false}>
      <AnimeProvider>
        <RouterProvider router={router} />
      </AnimeProvider>
    </MockedProvider>
  );
  expect(await screen.findByText("Test Anime")).toBeInTheDocument();
});
