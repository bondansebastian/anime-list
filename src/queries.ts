import { ApolloError, gql } from '@apollo/client';

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

export type Media = {
    id: number;
    title: {
        english: string;
        userPreferred: string;
    };
    bannerImage: string;
    coverImage: {
        medium: string;
        large: string;
    };
    genres: Array<string>;
    episodes: number;
    description: string;
    averageScore: number;
    meanScore: number;
    popularity: number;
    trending: number;
    isAdult: boolean;
}

export type PageInfo = {
    perPage: number;
    currentPage: number;
    hasNextPage: boolean;
}

export type PageQueryResult = {
    loading: boolean;
    error?: ApolloError | undefined;
    data: {
        Page: {
            media: Array<Media>;
            pageInfo: PageInfo;
        }
    } | undefined;
}