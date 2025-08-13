import { hygraphClient } from './hygraph-client';
import {
  GET_ALL_REALIZACJAS,
  GET_REALIZACJA_BY_ID,
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
  year?: string | number; // Can be number from CMS
  category?: string;
  location?: string;
  area?: string;
  scope?: string;
  services?: string; // Simple string field with comma-separated values
  fullDescription?: HygraphRichText; // Changed back to HygraphRichText for Rich Text field
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
  // Extract video URL with fallback - handle potentially missing fields
  const videoUrl = hygraphData.video?.url || '';
  
  return {
    id: hygraphData.id,
    title: hygraphData.title,
    description: hygraphData.description || '',
    client: hygraphData.client || '',
    year: (hygraphData.year || '').toString(), // Convert number to string
    category: hygraphData.category || '',
    image: hygraphData.image?.url || '',
    location: hygraphData.location || '',
    area: hygraphData.area || '',
    scope: hygraphData.scope || '',
    services: parseServicesString(hygraphData.services || ''), // Parse comma-separated services
    fullDescription: hygraphData.fullDescription?.html || '', // Extract HTML from Rich Text
    gallery: hygraphData.gallery?.map(asset => asset.url) || [], // Gallery as asset array
    video: videoUrl, // Video CDN URL from asset
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
    // Query with all available fields from the schema
    const completeSlugQuery = `
      query GetRealizacjaBySlugComplete($slug: String!) {
        realizacja(where: { slug: $slug }) {
          id
          title
          description
          client
          year
          category
          location
          area
          scope
          fullDescription {
            html
          }
          slug
          services
          image {
            url
          }
          video {
            url
          }
          gallery {
            url
          }
        }
      }
    `;
    
    const data = await hygraphClient.request<RealizacjaResponse>(completeSlugQuery, { slug });
    
    if (!data.realizacja) {
      return null;
    }
    
    // Handle the data properly - extract HTML from Rich Text field
    const hygraphData = {
      ...data.realizacja,
      year: data.realizacja.year?.toString() || '',
      category: data.realizacja.category || '',
      location: data.realizacja.location || '',
      area: data.realizacja.area || '',
      scope: data.realizacja.scope || '',
      services: data.realizacja.services || '', // Services as string from CMS
      fullDescription: data.realizacja.fullDescription || { html: '' }, // Ensure Rich Text structure
      gallery: data.realizacja.gallery || [],
    };
    
    return transformHygraphToRealizacja(hygraphData);
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
    // Use the minimal query that was confirmed working in debug
    const data = await hygraphClient.request<RealizacjeResponse>(GET_REALIZACJAS_FOR_GRID);
    
    // Check if we actually got realizacjas data
    if (!data.realizacjas || !Array.isArray(data.realizacjas)) {
      return [];
    }
    
    // Map with better error handling for individual items
    const mappedItems = data.realizacjas.map((item) => {
      try {
        return transformHygraphToRealizacja(item);
      } catch {
        return null;
      }
    }).filter((item): item is Realizacja => item !== null);
    
    return mappedItems;

  } catch (error) {
    console.error('Error fetching realizacje for grid:', error);
    return [];
  }
}

// Re-export types for backward compatibility
export type { Realizacja } from './realizacje-data';
export type CaseStudy = Realizacja;
