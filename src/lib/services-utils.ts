// Utility functions for handling comma-separated services

/**
 * Parse a comma-separated services string into an array of trimmed service names
 * @param servicesString - Comma-separated string of services
 * @returns Array of service names
 */
export function parseServicesString(servicesString: string | null | undefined): string[] {
  if (!servicesString || typeof servicesString !== 'string') {
    return [];
  }
  
  return servicesString
    .split(',')
    .map(service => service.trim())
    .filter(service => service.length > 0);
}

/**
 * Join an array of services into a comma-separated string
 * @param services - Array of service names
 * @returns Comma-separated string
 */
export function formatServicesString(services: string[]): string {
  return services.filter(service => service.trim().length > 0).join(', ');
}

/**
 * Get services as a formatted string for display
 * @param services - Array of service names or comma-separated string
 * @returns Formatted string ready for display
 */
export function getServicesDisplayString(services: string[] | string): string {
  const serviceArray = Array.isArray(services) ? services : parseServicesString(services);
  return formatServicesString(serviceArray);
}
