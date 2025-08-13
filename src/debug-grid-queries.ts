// Debug script specifically for testing the grid query
import { hygraphClient } from './lib/hygraph-client';
import { gql } from 'graphql-request';

// The exact query that's failing in production
const GRID_QUERY_WITH_FRAGMENT = gql`
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

  query GetRealizacjasForGrid {
    realizacjas(orderBy: createdAt_DESC) {
      ...RealizacjaWithVideoFields
    }
  }
`;

// A flat version of the same query without fragments (for comparison)
const GRID_QUERY_FLAT = gql`
  query GetRealizacjasForGridFlat {
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
  }
`;

// A minimal version that only includes essential fields
const GRID_QUERY_MINIMAL = gql`
  query GetRealizacjasForGridMinimal {
    realizacjas(orderBy: createdAt_DESC) {
      id
      title
      client
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

// Run multiple tests to compare results
async function debugGridQueries() {
  console.log('🔍 Testing grid queries with different formats...');
  
  const testResults: Record<string, { success: boolean; data?: unknown; error?: unknown }> = {};
  
  try {
    console.log('\n1️⃣ Testing fragment query (the one failing in production):');
    const fragmentResult = await hygraphClient.request(GRID_QUERY_WITH_FRAGMENT);
    console.log('✅ Fragment query SUCCESS');
    console.log('Result:', JSON.stringify(fragmentResult).substring(0, 100) + '...');
    testResults['fragment'] = { success: true, data: fragmentResult };
  } catch (error) {
    console.error('❌ Fragment query FAILED:', error);
    testResults['fragment'] = { success: false, error };
  }
  
  try {
    console.log('\n2️⃣ Testing flat query (same fields, no fragment):');
    const flatResult = await hygraphClient.request(GRID_QUERY_FLAT);
    console.log('✅ Flat query SUCCESS');
    console.log('Result:', JSON.stringify(flatResult).substring(0, 100) + '...');
    testResults['flat'] = { success: true, data: flatResult };
  } catch (error) {
    console.error('❌ Flat query FAILED:', error);
    testResults['flat'] = { success: false, error };
  }
  
  try {
    console.log('\n3️⃣ Testing minimal query:');
    const minimalResult = await hygraphClient.request(GRID_QUERY_MINIMAL);
    console.log('✅ Minimal query SUCCESS');
    console.log('Result:', JSON.stringify(minimalResult).substring(0, 100) + '...');
    testResults['minimal'] = { success: true, data: minimalResult };
  } catch (error) {
    console.error('❌ Minimal query FAILED:', error);
    testResults['minimal'] = { success: false, error };
  }
  
  return testResults;
}

// Run the debug function if this is the main module
if (require.main === module) {
  debugGridQueries()
    .then(() => console.log('\n✨ Grid query debugging complete'))
    .catch(console.error);
}

export { debugGridQueries, GRID_QUERY_WITH_FRAGMENT, GRID_QUERY_FLAT, GRID_QUERY_MINIMAL };
