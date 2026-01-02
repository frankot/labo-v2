// Team data types and interfaces

// Core team worker interface
export interface TeamWorker {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  description: string;
  createdAt: string;
  sectionId: string; // Worker belongs to a section
  workerOrder?: number; // Order within section (1 is first, higher numbers appear later)
}

// Core team section interface
export interface TeamSection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
}

// Complete team data structure
export interface TeamData {
  sections: TeamSection[];
  workers: TeamWorker[];
}

// Legacy interface for backward compatibility with Team.tsx
export interface LegacyTeamData {
  [sectionName: string]: TeamWorker[];
}

// Fallback team sections
export const fallbackSections: TeamSection[] = [
  {
    id: "section-1",
    name: "Właściciele",
    slug: "wlasciciele",
    description: "Założyciele i właściciele firmy",
    displayOrder: 1,
  },
  {
    id: "section-2",
    name: "PM",
    slug: "pm",
    description: "Zarządzanie projektami",
    displayOrder: 2,
  },
  {
    id: "section-3",
    name: "Dział Projektowy",
    slug: "dzial-projektowy",
    description: "Zespół projektowy",
    displayOrder: 3,
  },
  {
    id: "section-4",
    name: "Dział Kreatywny",
    slug: "dzial-kreatywny",
    description: "Zespół kreatywny",
    displayOrder: 4,
  },
  {
    id: "section-5",
    name: "Producenci",
    slug: "producenci",
    description: "Zespół produkcji",
    displayOrder: 5,
  },
  {
    id: "section-6",
    name: "Logistyka",
    slug: "logistyka",
    description: "Zespół logistyczny",
    displayOrder: 6,
  },
];

// Fallback team workers
export const fallbackWorkers: TeamWorker[] = [
  // Właściciele
  {
    id: "1",
    name: "Bartek Kowalski",
    role: "CEO & Founder",
    phone: "+48 123 456 789",
    email: "bartek@company.com",
    image: "/team/Bartek.jpg",
    description: "Visionary leader driving innovation and strategic growth.",
    createdAt: "2024-01-01T00:00:00Z",
    sectionId: "section-1",
  },
  {
    id: "2",
    name: "Robert Nowak",
    role: "Co-Founder & CTO",
    phone: "+48 123 456 788",
    email: "robert@company.com",
    image: "/team/Robert.jpg",
    description: "Tech architect building scalable solutions for the future.",
    createdAt: "2024-01-02T00:00:00Z",
    sectionId: "section-1",
  },
  // PM
  {
    id: "3",
    name: "Anna Wiśniewska",
    role: "Senior Project Manager",
    phone: "+48 123 456 787",
    email: "anna@company.com",
    image: "/team/Bartek.jpg",
    description: "Expert in coordinating complex projects and team workflows.",
    createdAt: "2024-01-03T00:00:00Z",
    sectionId: "section-2",
  },
  {
    id: "4",
    name: "Michał Zieliński",
    role: "Project Manager",
    phone: "+48 123 456 786",
    email: "michal@company.com",
    image: "/team/Robert.jpg",
    description: "Ensuring seamless project delivery and client satisfaction.",
    createdAt: "2024-01-04T00:00:00Z",
    sectionId: "section-2",
  },
  // Dział Projektowy
  {
    id: "5",
    name: "Katarzyna Dąbrowska",
    role: "Lead Architect",
    phone: "+48 123 456 785",
    email: "katarzyna@company.com",
    image: "/team/Bartek.jpg",
    description: "Creating innovative architectural solutions and designs.",
    createdAt: "2024-01-05T00:00:00Z",
    sectionId: "section-3",
  },
  {
    id: "6",
    name: "Piotr Lewandowski",
    role: "Senior Developer",
    phone: "+48 123 456 784",
    email: "piotr@company.com",
    image: "/team/Robert.jpg",
    description: "Building robust applications with cutting-edge technology.",
    createdAt: "2024-01-06T00:00:00Z",
    sectionId: "section-3",
  },
  {
    id: "7",
    name: "Magdalena Wójcik",
    role: "Systems Analyst",
    phone: "+48 123 456 783",
    email: "magdalena@company.com",
    image: "/team/Bartek.jpg",
    description: "Analyzing complex systems and optimizing performance.",
    createdAt: "2024-01-07T00:00:00Z",
    sectionId: "section-3",
  },
  // Dział Kreatywny
  {
    id: "8",
    name: "Jakub Kowalczyk",
    role: "Creative Director",
    phone: "+48 123 456 782",
    email: "jakub@company.com",
    image: "/team/Robert.jpg",
    description: "Leading creative vision and brand development strategies.",
    createdAt: "2024-01-08T00:00:00Z",
    sectionId: "section-4",
  },
  {
    id: "9",
    name: "Natalia Kamińska",
    role: "UX/UI Designer",
    phone: "+48 123 456 781",
    email: "natalia@company.com",
    image: "/team/Bartek.jpg",
    description: "Crafting intuitive user experiences and beautiful interfaces.",
    createdAt: "2024-01-09T00:00:00Z",
    sectionId: "section-4",
  },
  {
    id: "10",
    name: "Tomasz Jankowski",
    role: "Graphic Designer",
    phone: "+48 123 456 780",
    email: "tomasz@company.com",
    image: "/team/Robert.jpg",
    description: "Creating compelling visual content and brand materials.",
    createdAt: "2024-01-10T00:00:00Z",
    sectionId: "section-4",
  },
  // Producenci
  {
    id: "11",
    name: "Agnieszka Mazur",
    role: "Production Manager",
    phone: "+48 123 456 779",
    email: "agnieszka@company.com",
    image: "/team/Bartek.jpg",
    description: "Overseeing production processes and quality control.",
    createdAt: "2024-01-11T00:00:00Z",
    sectionId: "section-5",
  },
  {
    id: "12",
    name: "Łukasz Krawczyk",
    role: "Technical Producer",
    phone: "+48 123 456 778",
    email: "lukasz@company.com",
    image: "/team/Robert.jpg",
    description: "Managing technical aspects of production workflows.",
    createdAt: "2024-01-12T00:00:00Z",
    sectionId: "section-5",
  },
  {
    id: "13",
    name: "Monika Piotrowska",
    role: "Quality Specialist",
    phone: "+48 123 456 777",
    email: "monika@company.com",
    image: "/team/Bartek.jpg",
    description: "Ensuring highest quality standards in all deliverables.",
    createdAt: "2024-01-13T00:00:00Z",
    sectionId: "section-5",
  },
  // Logistyka
  {
    id: "14",
    name: "Krzysztof Grabowski",
    role: "Logistics Manager",
    phone: "+48 123 456 776",
    email: "krzysztof@company.com",
    image: "/team/Robert.jpg",
    description: "Coordinating supply chain and delivery operations.",
    createdAt: "2024-01-14T00:00:00Z",
    sectionId: "section-6",
  },
  {
    id: "15",
    name: "Dorota Pawlak",
    role: "Operations Coordinator",
    phone: "+48 123 456 775",
    email: "dorota@company.com",
    image: "/team/Bartek.jpg",
    description: "Streamlining operations and resource management.",
    createdAt: "2024-01-15T00:00:00Z",
    sectionId: "section-6",
  },
  {
    id: "16",
    name: "Marcin Michalski",
    role: "Supply Chain Specialist",
    phone: "+48 123 456 774",
    email: "marcin@company.com",
    image: "/team/Robert.jpg",
    description: "Optimizing supply chain efficiency and cost-effectiveness.",
    createdAt: "2024-01-16T00:00:00Z",
    sectionId: "section-6",
  },
];

// Fallback complete team data
export const fallbackTeamData: TeamData = {
  sections: fallbackSections,
  workers: fallbackWorkers,
};

// Utility functions for data transformation

/**
 * Get workers for a specific section
 */
export function getWorkersBySection(teamData: TeamData, sectionId: string): TeamWorker[] {
  return teamData.workers
    .filter(worker => worker.sectionId === sectionId)
    .sort((a, b) => {
      // Sort by workerOrder field first (1 is first, higher numbers later)
      const orderA = a.workerOrder ?? 9999;
      const orderB = b.workerOrder ?? 9999;
      
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      
      // If order is the same, sort by createdAt (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}

/**
 * Get workers for a specific section by section name
 */
export function getWorkersBySectionName(teamData: TeamData, sectionName: string): TeamWorker[] {
  const section = teamData.sections.find(s => s.name === sectionName);
  if (!section) return [];
  return getWorkersBySection(teamData, section.id);
}

/**
 * Convert new TeamData structure to legacy format for backward compatibility
 */
export function convertToLegacyFormat(teamData: TeamData): LegacyTeamData {
  const legacyData: LegacyTeamData = {};
  
  teamData.sections.forEach(section => {
    const workers = getWorkersBySection(teamData, section.id);
    legacyData[section.name] = workers;
  });
  
  return legacyData;
}

/**
 * Convert legacy format back to new TeamData structure
 */
export function convertFromLegacyFormat(legacyData: LegacyTeamData): TeamData {
  const sections: TeamSection[] = [];
  const workers: TeamWorker[] = [];
  
  Object.entries(legacyData).forEach(([sectionName, sectionWorkers], index) => {
    const sectionId = `section-${index + 1}`;
    
    // Create section
    sections.push({
      id: sectionId,
      name: sectionName,
      slug: sectionName.toLowerCase().replace(/\s+/g, '-').replace(/ł/g, 'l'),
      description: `${sectionName} team section`,
      displayOrder: index + 1,
    });
    
    // Add workers with section reference
    sectionWorkers.forEach(worker => {
      workers.push({
        ...worker,
        sectionId,
      });
    });
  });
  
  return { sections, workers };
}
