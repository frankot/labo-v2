import { gql } from 'graphql-request';

// Basic fragment with confirmed working fields including services string
export const REALIZACJA_BASIC_FRAGMENT = gql`
  fragment RealizacjaBasicFields on Realizacja {
    id
    title
    description
    client
    year
    category
    location
    area
    scope
    slug
    services
    image {
      url
      width
      height
      alt
    }
    createdAt
    updatedAt
  }
`;

// Fragment with video field (minimal working version)
export const REALIZACJA_WITH_VIDEO_FRAGMENT = gql`
  fragment RealizacjaWithVideoFields on Realizacja {
    id
    title
    description
    client
    year
    category
    location
    area
    scope
    slug
    services
    image {
      url
      width
      height
      alt
    }
    video {
      url
    }
    createdAt
    updatedAt
  }
`;

// Minimal query for testing basic connectivity
export const GET_REALIZACJAS_MINIMAL = gql`
  ${REALIZACJA_BASIC_FRAGMENT}
  query GetRealizacjasMinimal {
    realizacjas {
      ...RealizacjaBasicFields
    }
  }
`;

// Query to get all realizacjas - using video fragment
export const GET_ALL_REALIZACJAS = gql`
  ${REALIZACJA_WITH_VIDEO_FRAGMENT}
  query GetAllRealizacjas($first: Int = 20, $skip: Int = 0) {
    realizacjas(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      ...RealizacjaWithVideoFields
    }
  }
`;

// Query to get a single realizacja by ID
export const GET_REALIZACJA_BY_ID = gql`
  ${REALIZACJA_WITH_VIDEO_FRAGMENT}
  query GetRealizacjaById($id: ID!) {
    realizacja(where: { id: $id }) {
      ...RealizacjaWithVideoFields
    }
  }
`;

// Query to get a single realizacja by slug
export const GET_REALIZACJA_BY_SLUG = gql`
  ${REALIZACJA_WITH_VIDEO_FRAGMENT}
  query GetRealizacjaBySlug($slug: String!) {
    realizacja(where: { slug: $slug }) {
      ...RealizacjaWithVideoFields
    }
  }
`;

// Query to get all slugs (for static generation)
export const GET_ALL_REALIZACJAS_SLUGS = gql`
  query GetAllRealizacjasSlugs {
    realizacjas {
      slug
      id
    }
  }
`;

// Query to get realizacjas for grid - MINIMAL WORKING VERSION
export const GET_REALIZACJAS_FOR_GRID = gql`
  query GetRealizacjasForGrid {
    realizacjas(orderBy: createdAt_DESC) {
      id
      title
      description
      client
      year
      category
      location
      area
      scope
      slug
      services
      image {
        url
      }
      video {
        url
      }
    }
  }
`;

// Legacy exports for backward compatibility
export const GET_ALL_REALIZACJE = GET_ALL_REALIZACJAS;
export const GET_ALL_REALIZACJE_SLUGS = GET_ALL_REALIZACJAS_SLUGS;
export const GET_REALIZACJE_FOR_GRID = GET_REALIZACJAS_FOR_GRID;
export const GET_REALIZACJE_FOR_GRID_SIMPLE = GET_REALIZACJAS_FOR_GRID;
export const GET_REALIZACJE_FOR_GRID_MINIMAL = GET_REALIZACJAS_FOR_GRID;
export const GET_REALIZACJA_BY_ID_SIMPLE = GET_REALIZACJA_BY_ID;
export const GET_REALIZACJE_MINIMAL = GET_REALIZACJAS_MINIMAL;
