import { hygraphClient } from './hygraph-client';

// Debug function to test schema and identify issues
export async function debugHygraphSchema() {
  console.log('🔍 Starting Hygraph schema debug...');
  
  try {
    // Test 1: Basic connectivity
    console.log('📡 Testing basic connectivity...');
    await hygraphClient.request(`
      query BasicConnectivity {
        __schema {
          queryType {
            name
          }
        }
      }
    `);
    console.log('✅ Basic connectivity works');

    // Test 2: List available models
    console.log('📋 Checking available models...');
    const modelsTest: any = await hygraphClient.request(`
      query AvailableModels {
        __schema {
          queryType {
            fields {
              name
              description
            }
          }
        }
      }
    `);
    
    const availableModels = modelsTest.__schema.queryType.fields
      .filter((field: any) => field.name.toLowerCase().includes('realizac'))
      .map((field: any) => field.name);
    
    console.log('🎯 Found realizacja-related models:', availableModels);

    // Test 3: Try different model names
    const possibleNames = ['realizacje', 'realizacja', 'Realizacje', 'Realizacja'];
    let workingModelName = null;

    for (const modelName of possibleNames) {
      try {
        console.log(`🧪 Testing model name: ${modelName}`);
        await hygraphClient.request(`
          query Test${modelName} {
            ${modelName} {
              id
            }
          }
        `);
        workingModelName = modelName;
        console.log(`✅ Model name "${modelName}" works!`);
        break;
      } catch (error) {
        console.log(`❌ Model name "${modelName}" failed`);
      }
    }

    if (!workingModelName) {
      throw new Error('No valid model name found. Please check if your Realizacja content model is published and accessible via API.');
    }

    // Test 4: Check basic fields
    console.log(`📝 Testing basic fields for ${workingModelName}...`);
    const basicFields = await hygraphClient.request(`
      query TestBasicFields {
        ${workingModelName} {
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
        }
      }
    `);
    console.log('✅ Basic fields work');

    // Test 5: Check services field type
    console.log('🔧 Testing services field...');
    try {
      // Try as relationship
      await hygraphClient.request(`
        query TestServicesRelation {
          ${workingModelName} {
            id
            services {
              id
              name
            }
          }
        }
      `);
      console.log('✅ Services field is a relationship');
    } catch (error) {
      try {
        // Try as string/JSON
        await hygraphClient.request(`
          query TestServicesString {
            ${workingModelName} {
              id
              services
            }
          }
        `);
        console.log('✅ Services field is a string/JSON field');
      } catch (error) {
        console.log('❌ Services field not found or has issues');
      }
    }

    // Test 6: Check fullDescription field type
    console.log('📄 Testing fullDescription field...');
    try {
      // Try as Rich Text
      await hygraphClient.request(`
        query TestFullDescriptionRichText {
          ${workingModelName} {
            id
            fullDescription {
              html
            }
          }
        }
      `);
      console.log('✅ FullDescription is a Rich Text field');
    } catch (error) {
      try {
        // Try as regular text
        await hygraphClient.request(`
          query TestFullDescriptionText {
            ${workingModelName} {
              id
              fullDescription
            }
          }
        `);
        console.log('✅ FullDescription is a regular text field');
      } catch (error) {
        console.log('❌ FullDescription field not found or has issues');
      }
    }

    // Test 7: Check image field type
    console.log('🖼️ Testing image field...');
    try {
      // Try as Asset
      await hygraphClient.request(`
        query TestImageAsset {
          ${workingModelName} {
            id
            image {
              url
            }
          }
        }
      `);
      console.log('✅ Image is an Asset field');
    } catch (error) {
      try {
        // Try as URL string
        await hygraphClient.request(`
          query TestImageString {
            ${workingModelName} {
              id
              image
            }
          }
        `);
        console.log('✅ Image is a URL string field');
      } catch (error) {
        console.log('❌ Image field not found or has issues');
      }
    }

    // Test 8: Check video field type
    console.log('🎥 Testing video field...');
    try {
      // Try as Asset
      await hygraphClient.request(`
        query TestVideoAsset {
          ${workingModelName} {
            id
            video {
              url
            }
          }
        }
      `);
      console.log('✅ Video is an Asset field');
    } catch (error) {
      try {
        // Try as URL string
        await hygraphClient.request(`
          query TestVideoString {
            ${workingModelName} {
              id
              video
            }
          }
        `);
        console.log('✅ Video is a URL string field');
      } catch (error) {
        console.log('❌ Video field not found or has issues');
      }
    }

    console.log('🎉 Schema debug completed!');
    return { success: true, modelName: workingModelName };

  } catch (error) {
    console.error('💥 Schema debug failed:', error);
    return { success: false, error };
  }
}

// Flexible query builder that adapts to different schema configurations
export function buildFlexibleQuery(modelName: string, options: {
  servicesAsRelation?: boolean;
  fullDescriptionAsRichText?: boolean;
  imageAsAsset?: boolean;
  videoAsAsset?: boolean;
} = {}) {
  
  const servicesField = options.servicesAsRelation 
    ? `services { id name description }`
    : `services`;

  const fullDescriptionField = options.fullDescriptionAsRichText
    ? `fullDescription { html }`
    : `fullDescription`;

  const imageField = options.imageAsAsset
    ? `image { url width height alt }`
    : `image`;

  const videoField = options.videoAsAsset
    ? `video { url }`
    : `video`;

  const galleryField = options.imageAsAsset
    ? `gallery { url width height alt }`
    : `gallery`;

  return `
    query GetRealizacje {
      ${modelName} {
        id
        title
        description
        client
        year
        category
        location
        area
        scope
        ${servicesField}
        ${fullDescriptionField}
        slug
        ${imageField}
        ${videoField}
        ${galleryField}
        createdAt
        updatedAt
      }
    }
  `;
}

// Debug fetch function with detailed error reporting
export async function debugFetchRealizacje(): Promise<any> {
  console.log('🚀 Starting debug fetch...');
  
  // First run schema debug
  const debugResult = await debugHygraphSchema();
  
  if (!debugResult.success) {
    throw new Error(`Schema debug failed: ${debugResult.error}`);
  }

  const modelName = debugResult.modelName!;
  console.log(`✅ Using model name: ${modelName}`);

  // Try different query configurations
  const configurations = [
    // Configuration 1: All as relations/assets
    {
      name: 'Full Relations/Assets',
      options: {
        servicesAsRelation: true,
        fullDescriptionAsRichText: true,
        imageAsAsset: true,
        videoAsAsset: true
      }
    },
    // Configuration 2: Mixed
    {
      name: 'Mixed Types',
      options: {
        servicesAsRelation: false,
        fullDescriptionAsRichText: true,
        imageAsAsset: true,
        videoAsAsset: false
      }
    },
    // Configuration 3: All as strings
    {
      name: 'All Strings',
      options: {
        servicesAsRelation: false,
        fullDescriptionAsRichText: false,
        imageAsAsset: false,
        videoAsAsset: false
      }
    }
  ];

  for (const config of configurations) {
    try {
      console.log(`🧪 Trying configuration: ${config.name}`);
      const query = buildFlexibleQuery(modelName, config.options);
      const result = await hygraphClient.request(query);
      console.log(`✅ Configuration "${config.name}" works!`);
      console.log('📊 Sample data:', JSON.stringify(result, null, 2));
      return { success: true, data: result, config: config.options, modelName };
    } catch (error) {
      console.log(`❌ Configuration "${config.name}" failed:`, error);
    }
  }

  throw new Error('All query configurations failed. Please check your Hygraph schema.');
}
