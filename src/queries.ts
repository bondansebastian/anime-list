import { gql } from '@apollo/client';

export const GET_PAGE = gql`
  query GetPage ($page: Int) {
    Page (page: $page, perPage: 10) {
        pageInfo {
            perPage
            currentPage
            hasNextPage
        }
        media (type: ANIME) {
            id
            title {
                english
                userPreferred
            }
            bannerImage
            coverImage {
                medium
                large
            }
            genres
            episodes
            description
            averageScore
            meanScore
            popularity
            trending
            isAdult
        }
    }
  }
`;