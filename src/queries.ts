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
            coverImage {
                medium
                large
            }
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
    coverImage: {
        medium: string;
        large: string;
    };
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