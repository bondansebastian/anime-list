import { gql } from '@apollo/client';

export const mediaQueryFragment = `
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
` 

const GET_MEDIA = gql`
  query GetMedia ($id: Int) {
    Media (id: $id, type: ANIME) {
      ${mediaQueryFragment}
    }
  }
`;

export default GET_MEDIA;