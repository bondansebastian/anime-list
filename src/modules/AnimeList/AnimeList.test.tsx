import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimeList from './AnimeList';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from "@apollo/client/testing";
import { GET_PAGE } from '../../queries';

const mocks = [
  {
    request: {
      query: GET_PAGE,
      variables: {
        page: 1
      }
    },
    result: {
      data: {
        Page: {
          media: [
            { 
              id: 1, 
              title: { english: 'Test Anime', userPreferred: 'Test Anime' },
              coverImage: { medium: '', large: '' } 
            }
          ],
          pageInfo: {
            perPage: 10,
            currentPage: 1,
            hasNextPage: false,
          }
        }
      }
    }
  }
]

test('renders without error', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AnimeList />
    </MockedProvider>,
    { wrapper: BrowserRouter }
  );
  expect(await screen.findByText('Loading')).toBeInTheDocument();
  expect(await screen.findByText("Test Anime")).toBeInTheDocument();
});
