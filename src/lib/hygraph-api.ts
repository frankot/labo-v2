import { hygraphClient } from './hygraph-client';
import {
  GET_ALL_REALIZACJAS,
  GET_REALIZACJA_BY_ID,
  GET_REALIZACJA_BY_SLUG,
  GET_ALL_REALIZACJAS_SLUGS,
  GET_REALIZACJAS_FOR_GRID,
} from './hygraph-queries';
import { Realizacja } from './realizacje-data';
import { parseServicesString } from './services-utils';

// Types based on Hygraph response
export interface HygraphAsset {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface HygraphRichText {
  html: string;
}

// Updated Hygraph response interface with partial fields
export interface HygraphRealizacjaResponse {
  id: string;
  title: string;
  description?: string;
  client?: string;
  year?: string;
  category?: string;
  location?: string;
  area?: string;
  scope?: string;
  services?: string; // Simple string field with comma-separated values
  fullDescription?: HygraphRichText;
  slug?: string;
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  video?: {
    url?: string;
  }; // Video as asset field with minimal structure
  gallery?: Array<{
    url: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

// Response types for GraphQL queries (updated for "realizacjas" plural)
interface RealizacjeResponse {
  realizacjas: HygraphRealizacjaResponse[];
}

interface RealizacjaResponse {
  realizacja: HygraphRealizacjaResponse | null;
}

interface RealizacjeSlugsResponse {
  realizacjas: { slug: string; id: string }[];
}

// Transform Hygraph data to match our existing interface
function transformHygraphToRealizacja(hygraphData: HygraphRealizacjaResponse): Realizacja {
  // Debug the incoming video data
  console.log(`Processing realizacja: ${hygraphData.title} (${hygraphData.id})`);
  
  // Extract video URL with fallback - handle potentially missing fields
  const videoUrl = hygraphData.video?.url || '';
  console.log(`Extracted video URL: ${videoUrl}`);
  
  return {
    id: hygraphData.id,
    title: hygraphData.title,
    description: hygraphData.description || '',
    client: hygraphData.client || '',
    year: hygraphData.year || '',
    category: hygraphData.category || '',
    image: hygraphData.image?.url || '',
    location: hygraphData.location || '',
    area: hygraphData.area || '',
    scope: hygraphData.scope || '',
    services: parseServicesString(hygraphData.services || ''), // Parse comma-separated services
    fullDescription: hygraphData.fullDescription?.html || '', // Added proper handling
    gallery: hygraphData.gallery?.map(asset => asset.url) || [], // Gallery as asset array
    video: videoUrl, // Video CDN URL from asset with additional logging
    slug: hygraphData.slug || '',
  };
}

// Fetch all realizacje
export async function fetchAllRealizacje(): Promise<Realizacja[]> {
  try {
    const data = await hygraphClient.request<RealizacjeResponse>(GET_ALL_REALIZACJAS);
    return data.realizacjas.map(transformHygraphToRealizacja);
  } catch (error) {
    console.error('Error fetching realizacje:', error);
    // Return empty array as fallback
    return [];
  }
}

// Fetch realizacja by ID
export async function fetchRealizacjaById(id: string): Promise<Realizacja | null> {
  try {
    const data = await hygraphClient.request<RealizacjaResponse>(GET_REALIZACJA_BY_ID, { id });
    if (!data.realizacja) return null;
    return transformHygraphToRealizacja(data.realizacja);
  } catch (error) {
    console.error('Error fetching realizacja by ID:', error);
    return null;
  }
}

// Fetch realizacja by slug
export async function fetchRealizacjaBySlug(slug: string): Promise<Realizacja | null> {
  try {
    const data = await hygraphClient.request<RealizacjaResponse>(GET_REALIZACJA_BY_SLUG, { slug });
    if (!data.realizacja) return null;
    return transformHygraphToRealizacja(data.realizacja);
  } catch (error) {
    console.error('Error fetching realizacja by slug:', error);
    return null;
  }
}

// Fetch all slugs for static generation
export async function fetchAllRealizacjeSlugs(): Promise<string[]> {
  try {
    const data = await hygraphClient.request<RealizacjeSlugsResponse>(GET_ALL_REALIZACJAS_SLUGS);
    return data.realizacjas.map((item) => item.slug);
  } catch (error) {
    console.error('Error fetching realizacje slugs:', error);
    return [];
  }
}

// Fetch realizacje for grid - simplified version with only working queries
export async function fetchRealizacjeForGrid(): Promise<Realizacja[]> {
  try {
    console.log('🎯 Attempting to fetch realizacje for grid with MINIMAL query...');
    
    // Use the minimal query that was confirmed working in debug
    const data = await hygraphClient.request<RealizacjeResponse>(GET_REALIZACJAS_FOR_GRID);
    console.log('✅ Query successful');
    
    // Check if we actually got realizacjas data
    if (!data.realizacjas || !Array.isArray(data.realizacjas)) {
      console.error('⚠️ No realizacjas array in response:', data);
      return [];
    }
    
    console.log(`Found ${data.realizacjas.length} realizacje items`);
    
    // Map with better error handling for individual items
    const mappedItems = data.realizacjas.map((item, index) => {
      try {
        return transformHygraphToRealizacja(item);
      } catch (itemError) {
        console.error(`⚠️ Error transforming realizacja at index ${index}:`, itemError);
        return null;
      }
    }).filter((item): item is Realizacja => item !== null);
    
    console.log(`Successfully mapped ${mappedItems.length} realizacje items`);
    return mappedItems;

  } catch (error) {
    console.error('Error fetching realizacje for grid:', error);
    
    // Enhanced error logging
    if (typeof error === 'object' && error !== null) {
      const graphqlError = error as { response?: { errors?: unknown[]; status?: number }; request?: { query?: string } };
      
      console.error('HTTP Status:', graphqlError.response?.status || 'Unknown');
      console.error('GraphQL errors:', graphqlError.response?.errors || 'No detailed errors');
      
      // Log the first 200 characters of the query that failed
      if (graphqlError.request?.query) {
        console.error('Failed query (first 200 chars):', 
          graphqlError.request.query.substring(0, 200) + '...');
      }
      
      // Fallback gracefully - return empty array to show placeholders
      console.log('⚠️ Returning empty array to show placeholders');
    }
    
    return [];
  }
}

// Re-export types for backward compatibility
export type { Realizacja } from './realizacje-data';
export type CaseStudy = Realizacja;
