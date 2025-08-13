import { gql } from 'graphql-request';

// Complete fragment with all fields for detailed views
export const REALIZACJA_COMPLETE_FRAGMENT = gql`
  fragment RealizacjaCompleteFields on Realizacja {
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
    fullDescription {
      html
    }
    image {
      url
      width
      height
      alt
    }
    video {
      url
    }
    gallery {
      url
    }
  }
`;

// Basic fragment for grid/list views (without heavy fields)
export const REALIZACJA_GRID_FRAGMENT = gql`
  fragment RealizacjaGridFields on Realizacja {
    id
    title
    description
    client
    year
    category
    slug
    services
    image {
      url
    }
    video {
      url
    }
  }
`;

// Query to get all realizacjas
export const GET_ALL_REALIZACJAS = gql`
  ${REALIZACJA_COMPLETE_FRAGMENT}
  query GetAllRealizacjas($first: Int = 20, $skip: Int = 0) {
    realizacjas(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      ...RealizacjaCompleteFields
    }
  }
`;

// Query to get a single realizacja by ID
export const GET_REALIZACJA_BY_ID = gql`
  ${REALIZACJA_COMPLETE_FRAGMENT}
  query GetRealizacjaById($id: ID!) {
    realizacja(where: { id: $id }) {
      ...RealizacjaCompleteFields
    }
  }
`;

// Query to get a single realizacja by slug
export const GET_REALIZACJA_BY_SLUG = gql`
  ${REALIZACJA_COMPLETE_FRAGMENT}
  query GetRealizacjaBySlug($slug: String!) {
    realizacja(where: { slug: $slug }) {
      ...RealizacjaCompleteFields
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

// Query to get realizacjas for grid
export const GET_REALIZACJAS_FOR_GRID = gql`
  ${REALIZACJA_GRID_FRAGMENT}
  query GetRealizacjasForGrid {
    realizacjas(orderBy: createdAt_DESC) {
      ...RealizacjaGridFields
    }
  }
`;

// Legacy exports for backward compatibility
export const GET_ALL_REALIZACJE = GET_ALL_REALIZACJAS;
export const GET_ALL_REALIZACJE_SLUGS = GET_ALL_REALIZACJAS_SLUGS;
export const GET_REALIZACJE_FOR_GRID = GET_REALIZACJAS_FOR_GRID;
