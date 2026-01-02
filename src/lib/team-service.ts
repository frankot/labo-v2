import { fetchAllSections } from './hygraph-api';
import type { HygraphTeamSection } from './hygraph-api';
import { 
  fallbackTeamData, 
  convertToLegacyFormat,
  type TeamData, 
  type TeamSection, 
  type TeamWorker,
  type LegacyTeamData 
} from './team-data';

/**
 * Transform CMS sections to our TeamData format
 */
function transformCMSToTeamData(cmsSections: HygraphTeamSection[]): TeamData {
  const sections: TeamSection[] = [];
  const workers: TeamWorker[] = [];

  cmsSections.forEach(cmsSection => {
    // Add section
    sections.push({
      id: cmsSection.id,
      name: cmsSection.name,
      slug: cmsSection.slug,
      description: cmsSection.description || '',
      displayOrder: cmsSection.displayOrder,
    });

    // Add workers for this section
    if (cmsSection.workers && Array.isArray(cmsSection.workers)) {
      cmsSection.workers.forEach((cmsWorker) => {
        workers.push({
          id: cmsWorker.id,
          name: cmsWorker.name,
          role: cmsWorker.role,
          phone: cmsWorker.phone,
          email: cmsWorker.email,
          image: cmsWorker.image || '',
          description: cmsWorker.description,
          createdAt: cmsWorker.createdAt,
          workerOrder: cmsWorker.workerOrder,
          sectionId: cmsSection.id,
        });
      });
    }
  });

  return { sections, workers };
}

/**
 * Load team data from CMS with fallback to hardcoded data
 */
export async function loadTeamData(): Promise<{
  teamData: LegacyTeamData;
  firstDepartment: string;
}> {
  try {
    const cmsSections = await fetchAllSections();
    
    if (cmsSections.length > 0) {
      // Transform CMS data to our format
      const teamData = transformCMSToTeamData(cmsSections);
      
      // Convert to legacy format for backward compatibility
      const legacyTeamData = convertToLegacyFormat(teamData);
      const firstDepartment = teamData.sections[0]?.name || "Właściciele";
      
      return {
        teamData: legacyTeamData,
        firstDepartment,
      };
    } else {
      // Fallback to hardcoded data
      const legacyTeamData = convertToLegacyFormat(fallbackTeamData);
      return {
        teamData: legacyTeamData,
        firstDepartment: "Właściciele",
      };
    }
  } catch (error) {
    console.error('Error loading team data:', error);
    
    // Use fallback data on error
    const legacyTeamData = convertToLegacyFormat(fallbackTeamData);
    return {
      teamData: legacyTeamData,
      firstDepartment: "Właściciele",
    };
  }
}

/**
 * Load raw team data (new format) from CMS with fallback
 */
export async function loadRawTeamData(): Promise<TeamData> {
  try {
    const cmsSections = await fetchAllSections();
    
    if (cmsSections.length > 0) {
      return transformCMSToTeamData(cmsSections);
    } else {
      return fallbackTeamData;
    }
  } catch (error) {
    console.error('Error loading raw team data:', error);
    return fallbackTeamData;
  }
}

/**
 * Get list of all department names
 */
export function getDepartmentNames(teamData: LegacyTeamData): string[] {
  return Object.keys(teamData);
}

/**
 * Get team members for a specific department
 */
export function getTeamMembersByDepartment(
  teamData: LegacyTeamData, 
  department: string
): TeamWorker[] {
  return teamData[department] || [];
}

/**
 * Check if a department exists in the team data
 */
export function departmentExists(teamData: LegacyTeamData, department: string): boolean {
  return department in teamData;
}

/**
 * Get the first available department name
 */
export function getFirstDepartment(teamData: LegacyTeamData): string {
  const departments = getDepartmentNames(teamData);
  return departments[0] || "Właściciele";
}

/**
 * Validate that a department is valid, return first department if invalid
 */
export function validateDepartment(teamData: LegacyTeamData, department: string): string {
  if (departmentExists(teamData, department)) {
    return department;
  }
  return getFirstDepartment(teamData);
}
