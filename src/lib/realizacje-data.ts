import { 
  fetchAllRealizacje, 
  fetchRealizacjaById, 
  fetchRealizacjeForGrid 
} from './hygraph-api';

// Unified interface that combines case study and realizacja data
export interface Realizacja {
  id: string;
  title: string;
  description: string;
  client: string;
  year: string;
  category: string;
  location: string;
  area: string;
  scope: string;
  services: string[]; // Array of service names for backwards compatibility
  fullDescription?: string;
  slug: string;
  image: string;
  video: string;
  gallery?: string[];
  // Grid layout properties (hardcoded in components)
  // defaultPos: { x: number; y: number; w: number; h: number }; // Removed - now hardcoded
}

// Hygraph CMS types
export interface HygraphService {
  id: string;
  name: string;
  description?: string;
}

export interface HygraphRealizacja {
  id: string;
  title: string;
  description: string;
  client: string;
  year: string;
  category: string;
  location: string;
  area: string;
  scope: string;
  fullDescription?: {
    html: string;
  };
  services: HygraphService[]; // Service relationship
  slug: string;
  image: {
    id: string;
    url: string;
    width: number;
    height: number;
    fileName: string;
  };
  video: {
    id: string;
    url: string;
    fileName: string;
  };
  gallery?: Array<{
    id: string;
    url: string;
    width: number;
    height: number;
    fileName: string;
  }>;
}

// Legacy type alias for backward compatibility
export type CaseStudy = Realizacja;

// Placeholder data for when there are fewer than 9 realizacje
const createPlaceholder = (index: number): Realizacja => ({
  id: `placeholder-${index}`,
  title: "Data Missing",
  description: "Placeholder content - data not available in CMS",
  client: "No Client",
  year: new Date().getFullYear().toString(),
  category: "Placeholder",
  location: "Unknown",
  area: "N/A",
  scope: "Placeholder content",
  services: ["Placeholder"],
  fullDescription: "This is placeholder content shown when there are fewer than 9 realizacje in the CMS.",
  slug: `placeholder-${index}`,
  image: "/scene.jpg", // Default placeholder image
  video: "", // No video for placeholders
  gallery: [],
});

// Dynamic functions that fetch from Hygraph CMS
export async function getRealizacje(): Promise<Realizacja[]> {
  try {
    return await fetchAllRealizacje();
  } catch (error) {
    console.error('Failed to fetch from Hygraph:', error);
    throw error; // Don't fall back to static data anymore
  }
}

export async function getRealizacjaByIdAsync(id: string): Promise<Realizacja | undefined> {
  try {
    const result = await fetchRealizacjaById(id);
    return result || undefined;
  } catch (error) {
    console.error('Failed to fetch from Hygraph:', error);
    throw error; // Don't fall back to static data anymore
  }
}

export async function getCaseStudies(): Promise<Realizacja[]> {
  try {
    const realizacje = await fetchRealizacjeForGrid();
    
    // Ensure we always have exactly 9 items for the grid
    const gridItems: Realizacja[] = [];
    
    // Add real realizacje (up to 9)
    for (let i = 0; i < 9; i++) {
      if (i < realizacje.length) {
        gridItems.push(realizacje[i]);
      } else {
        // Add placeholder for missing items
        gridItems.push(createPlaceholder(i + 1));
      }
    }
    
    return gridItems;
  } catch (error) {
    console.error('Failed to fetch from Hygraph:', error);
    // If CMS is completely down, return 9 placeholders
    return Array.from({ length: 9 }, (_, i) => createPlaceholder(i + 1));
  }
}

// Legacy function (synchronous, now throws error since we don't have static data)
export function getRealizacjaById(): Realizacja | undefined {
  throw new Error('getRealizacjaById is no longer supported. Use getRealizacjaByIdAsync instead.');
}
