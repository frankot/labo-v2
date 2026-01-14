import { gql } from 'graphql-request';

// Complete fragment with all fields for detailed views
export const REALIZACJA_COMPLETE_FRAGMENT = gql`
  fragment RealizacjaCompleteFields on Realizacja {
    id
    title
    description
    client
    clientLogo {
      url
    }
    yearString
    category
    location
    area
    scope
    slug
    services
    order
    fullDescription {
      html
    }
    image {
      url
  width
  height
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
    yearString
    category
    slug
    services
    order
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

// Fragment for navbar (title and description only, limited to 9)
export const REALIZACJA_NAVBAR_FRAGMENT = gql`
  fragment RealizacjaNavbarFields on Realizacja {
    id
    title
    description
    slug
  }
`;

// Query to get realizacjas for navbar dropdown (9 items)
export const GET_REALIZACJAS_FOR_NAVBAR = gql`
  ${REALIZACJA_NAVBAR_FRAGMENT}
  query GetRealizacjasForNavbar {
    realizacjas(first: 9, orderBy: createdAt_DESC) {
      ...RealizacjaNavbarFields
    }
  }
`;

// Legacy exports for backward compatibility
export const GET_ALL_REALIZACJE = GET_ALL_REALIZACJAS;
export const GET_ALL_REALIZACJE_SLUGS = GET_ALL_REALIZACJAS_SLUGS;
export const GET_REALIZACJE_FOR_GRID = GET_REALIZACJAS_FOR_GRID;

// Team-related fragments and queries
export const SECTION_FRAGMENT = gql`
  fragment SectionFields on Section {
    id
    name
    slug
    description
    displayOrder
  }
`;

export const WORKER_FRAGMENT = gql`
  fragment WorkerFields on Worker {
    id
    name
    role
    phone
    email
    description
    createdAt
    workerOrder
    image {
      url
  width
  height
    }
  }
`;

// Query to get all sections and workers separately (since relationship is Worker->Section)
export const GET_ALL_SECTIONS_WITH_WORKERS = gql`
  ${SECTION_FRAGMENT}
  ${WORKER_FRAGMENT}
  query GetAllSectionsWithWorkers {
    sections(orderBy: displayOrder_ASC) {
      ...SectionFields
    }
    workers(first: 100, orderBy: createdAt_DESC) {
      ...WorkerFields
      section { # multi-reference returns array of Section
        id
        name
        slug
      }
    }
  }
`;

// Query to get all sections (without workers)
export const GET_ALL_SECTIONS = gql`
  ${SECTION_FRAGMENT}
  query GetAllSections {
    sections(orderBy: displayOrder_ASC) {
      ...SectionFields
    }
  }
`;

// Query to get workers by section slug
export const GET_WORKERS_BY_SECTION = gql`
  ${WORKER_FRAGMENT}
  query GetWorkersBySection($sectionSlug: String!) {
    workers(
      where: { section_some: { slug: $sectionSlug } }
      orderBy: createdAt_DESC
    ) {
      ...WorkerFields
      section {
        id
        name
        slug
      }
    }
  }
`;

// Query to get all workers
export const GET_ALL_WORKERS = gql`
  ${WORKER_FRAGMENT}
  query GetAllWorkers {
    workers(orderBy: createdAt_DESC) {
      ...WorkerFields
      section {
        id
        name
        slug
      }
    }
  }
`;
