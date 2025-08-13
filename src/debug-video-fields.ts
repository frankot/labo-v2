// Debug script to test video fields in Hygraph
import { hygraphClient } from './lib/hygraph-client';
import { gql } from 'graphql-request';

// Test a very simple query with only the video fields
const TEST_VIDEO_QUERY = gql`
  query TestVideoFieldsOnly {
    realizacjas {
      id
      title
      client
      video {
        url
      }
    }
  }
`;

// Run this as a one-off script to test the video fields
async function debugVideoFields() {
  console.log('🔍 Debugging video fields in Hygraph CMS...');
  
  try {
    // Execute the simplest possible query for videos
    const data = await hygraphClient.request(TEST_VIDEO_QUERY);
    console.log('✅ Query executed successfully');
    console.log('Raw response:', JSON.stringify(data, null, 2));
    
    // Check if we got data
    const realizacjas = data.realizacjas || [];
    console.log(`Found ${realizacjas.length} realizacjas`);
    
    // Check each item's video field
    realizacjas.forEach((item: any, index: number) => {
      console.log(`Item ${index + 1}: ${item.client || item.title}`);
      console.log(`  - Video: ${item.video?.url || 'MISSING'}`);
    });
    
    return data;
  } catch (error) {
    console.error('❌ Error executing video field query:', error);
    const graphqlError = error as { response?: { errors?: unknown[] } };
    console.error('GraphQL error details:', graphqlError.response?.errors || 'No detailed errors');
    return null;
  }
}

// Export function for use in debug tools
export { debugVideoFields };

// Run the function directly if this is the main module
if (require.main === module) {
  debugVideoFields()
    .then(() => console.log('Debug script completed'))
    .catch(console.error);
}
