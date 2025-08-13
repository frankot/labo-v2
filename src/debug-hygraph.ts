import { debugHygraphSchema, debugFetchRealizacje } from './lib/hygraph-debug';

// Add this to your page component or create a separate debug page
export async function runHygraphDebug() {
  console.log('🚀 Starting Hygraph debugging...');
  
  try {
    // Run comprehensive schema debug
    const schemaResult = await debugHygraphSchema();
    console.log('Schema debug result:', schemaResult);
    
    // Try to fetch data with flexible queries
    const fetchResult = await debugFetchRealizacje();
    console.log('Fetch debug result:', fetchResult);
    
    return { success: true, schema: schemaResult, fetch: fetchResult };
  } catch (error) {
    console.error('Debug failed:', error);
    return { success: false, error };
  }
}

// You can call this in your component like:
// useEffect(() => {
//   runHygraphDebug();
// }, []);
