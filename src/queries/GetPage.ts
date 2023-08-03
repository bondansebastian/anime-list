import { gql } from '@apollo/client';
import { mediaQueryFragment } from './GetMedia';

const GET_PAGE = gql`
  query GetPage ($page: Int) {
    Page (page: $page, perPage: 10) {
        pageInfo {
            perPage
            currentPage
            hasNextPage
        }
        media (type: ANIME) {
            ${mediaQueryFragment}
        }
    }
  }
`;

export default GET_PAGE;