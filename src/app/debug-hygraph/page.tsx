"use client";

import { useState } from 'react';
import { hygraphClient } from '@/lib/hygraph-client';

export default function HygraphDebugPage() {
  const [results, setResults] = useState<Record<string, { success: boolean; data?: unknown; error?: string }>>({}); // Proper type definition
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testQueries = [
  
    {
      name: '🆕 Grid Query (Minimal)',
      query: `
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
      `
    },
    {
      name: 'Basic Connectivity',
      query: `
        query BasicTest {
          __schema {
            queryType {
              name
            }
          }
        }
      `
    },
    {
      name: 'Available Models',
      query: `
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
      `
    },
    {
      name: 'Check video field in schema',
      query: `
        query CheckVideoField {
          __type(name: "Realizacja") {
            fields(includeDeprecated: true) {
              name
              type {
                name
                kind
                ofType {
                  name
                  kind
                }
              }
            }
          }
        }
      `
    },
    {
      name: 'Test realizacjas (plural)',
      query: `
        query TestRealizacjasPlural {
          realizacjas {
            id
            title
          }
        }
      `
    },
    {
      name: 'Test realizacja by ID (singular)',
      query: `
        query TestRealizacjaSingular {
          realizacja(where: { id: "cmea0xneqi7pj07me1wh7k7t7" }) {
            id
            title
          }
        }
      `
    },
    {
      name: 'Test basic fields',
      query: `
        query TestBasicFields {
          realizacjas {
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
      `
    },
    {
      name: 'Test services as string (comma-separated)',
      query: `
        query TestServicesString {
          realizacjas {
            id
            title
            services
          }
        }
      `
    },
    {
      name: 'Test complete basic fields with services',
      query: `
        query TestCompleteBasic {
          realizacjas {
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
            createdAt
            updatedAt
          }
        }
      `
    },
    {
      name: 'Test video as asset with url',
      query: `
        query TestVideoAsset {
          realizacjas {
            id
            title
            video {
              url
            }
          }
        }
      `
    },
    {
      name: 'Test video as asset full details',
      query: `
        query TestVideoAssetFull {
          realizacjas {
            id
            title
            video {
              url
              fileName
              size
              mimeType
              width
              height
            }
          }
        }
      `
    },
    {
      name: 'Test gallery field',
      query: `
        query TestGalleryField {
          realizacjas {
            id
            title
            gallery {
              url
            }
          }
        }
      `
    },
    {
      name: 'Test fullDescription',
      query: `
        query TestFullDescription {
          realizacjas {
            id
            title
            fullDescription {
              html
            }
          }
        }
      `
    },
    {
      name: 'Test image as asset',
      query: `
        query TestImageAsset {
          realizacjas {
            id
            title
            image {
              url
            }
          }
        }
      `
    },
    {
      name: 'Test slug query that fails',
      query: `
        query TestSlugQuery {
          realizacja(where: { slug: "corab-stoisko-targowe-or-intersolar-europe-monachium-2024" }) {
            id
            title
            slug
          }
        }
      `
    },
    {
      name: 'List all slugs to see what exists',
      query: `
        query ListAllSlugs {
          realizacjas {
            id
            title
            slug
          }
        }
      `
    },
    {
      name: 'Test simple slug query without fragment',
      query: `
        query TestSimpleSlugQuery {
          realizacja(where: { slug: "corab-stoisko-targowe-or-intersolar-europe-monachium-2024" }) {
            id
            title
            description
            client
            year
            slug
            image {
              url
            }
            video {
              url
            }
          }
        }
      `
    },
    {
      name: 'Test each field individually - basic fields',
      query: `
        query TestBasicFields {
          realizacja(where: { slug: "corab-stoisko-targowe-or-intersolar-europe-monachium-2024" }) {
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
      `
    },
    {
      name: 'Test services field',
      query: `
        query TestServicesField {
          realizacja(where: { slug: "corab-stoisko-targowe-or-intersolar-europe-monachium-2024" }) {
            id
            title
            services
          }
        }
      `
    },
    {
      name: 'Test fullDescription field',
      query: `
        query TestFullDescriptionField {
          realizacja(where: { slug: "corab-stoisko-targowe-or-intersolar-europe-monachium-2024" }) {
            id
            title
            fullDescription {
              html
            }
          }
        }
      `
    },
    {
      name: 'Test gallery field',
      query: `
        query TestGalleryField {
          realizacja(where: { slug: "corab-stoisko-targowe-or-intersolar-europe-monachium-2024" }) {
            id
            title
            gallery {
              url
            }
          }
        }
      `
    }
  ];

  const runTest = async (query: string, name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`🧪 Running test: ${name}`);
      const result = await hygraphClient.request(query);
      console.log(`✅ ${name} - Success:`, result);
      setResults(prev => ({
        ...prev,
        [name]: { success: true, data: result }
      }));
    } catch (err: unknown) {
      console.log(`❌ ${name} - Failed:`, err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setResults(prev => ({
        ...prev,
        [name]: { success: false, error: errorMessage }
      }));
    }
    
    setLoading(false);
  };

  const runAllTests = async () => {
    setResults({});
    for (const test of testQueries) {
      await runTest(test.query, test.name);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Hygraph Debug Console</h1>
        
        <div className="mb-8">
          <button
            onClick={runAllTests}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Running Tests...' : 'Run All Tests'}
          </button>
        </div>

        <div className="grid gap-4">
          {testQueries.map((test, index) => (
            <div key={index} className="border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{test.name}</h3>
                <button
                  onClick={() => runTest(test.query, test.name)}
                  disabled={loading}
                  className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm disabled:opacity-50"
                >
                  Test
                </button>
              </div>
              
              <pre className="bg-gray-900 p-3 rounded text-xs overflow-x-auto mb-3">
                {test.query.trim()}
              </pre>
              
              {results?.[test.name] && (
                <div className={`p-3 rounded ${
                  results[test.name].success 
                    ? 'bg-green-900/30 border border-green-700' 
                    : 'bg-red-900/30 border border-red-700'
                }`}>
                  {results[test.name].success ? (
                    <div>
                      <div className="text-green-400 font-semibold mb-2">✅ Success</div>
                      <pre className="text-xs overflow-x-auto">
                        {JSON.stringify(results[test.name].data, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <div>
                      <div className="text-red-400 font-semibold mb-2">❌ Failed</div>
                      <div className="text-red-300 text-sm">
                        {results[test.name].error}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-900/30 border border-red-700 rounded-lg">
            <h3 className="text-red-400 font-semibold mb-2">Error</h3>
            <p className="text-red-300">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
