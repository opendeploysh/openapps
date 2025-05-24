import { projects, projectsWithGitHubData } from "./projects";

export interface LicenseInfo {
  key: string;
  name: string;
  spdx_id?: string;
  url?: string;
  count: number;
  projects: string[];
  description?: string;
  isOSI: boolean;
  category?: "Copyleft" | "Permissive" | "Proprietary" | "Other";
}

// Helper function to categorize licenses
export const categorizeLicense = (
  licenseName: string
): "Copyleft" | "Permissive" | "Proprietary" | "Other" => {
  const name = licenseName.toLowerCase();
  if (
    name.includes("gpl") ||
    name.includes("agpl") ||
    name.includes("copyleft")
  ) {
    return "Copyleft";
  }
  if (name.includes("mit") || name.includes("apache") || name.includes("bsd")) {
    return "Permissive";
  }
  if (name.includes("proprietary") || name.includes("commercial")) {
    return "Proprietary";
  }
  return "Other";
};

// Helper function to check if license is OSI approved
export const isOSIApproved = (licenseKey: string): boolean => {
  const osiLicenses = [
    "mit",
    "apache-2.0",
    "gpl-2.0",
    "gpl-3.0",
    "lgpl-2.1",
    "lgpl-3.0",
    "bsd-2-clause",
    "bsd-3-clause",
    "mpl-2.0",
    "agpl-3.0",
    "isc",
    "cc0-1.0",
    "artistic-2.0",
    "bsl-1.0",
    "epl-2.0",
    "eupl-1.2",
    "lppl-1.3c",
    "ms-pl",
    "osl-3.0",
    "postgresql",
    "python-2.0",
    "sil-ofl-1.1",
    "w3c",
    "zpl-2.0",
  ];
  return osiLicenses.includes(licenseKey.toLowerCase());
};

// Main function to get license info from both sources
export const getLicenseInfo = (): LicenseInfo[] => {
  const licenseMap = new Map<string, LicenseInfo>();

  // Process projects with direct license field
  projects.forEach((project) => {
    if (project.license) {
      const licenseKey = project.license.toLowerCase();
      if (!licenseMap.has(licenseKey)) {
        licenseMap.set(licenseKey, {
          key: licenseKey,
          name: project.license,
          count: 0,
          projects: [],
          isOSI: isOSIApproved(licenseKey),
          category: categorizeLicense(project.license),
        });
      }
      const license = licenseMap.get(licenseKey)!;
      license.count++;
      license.projects.push(project.slug);
    }
  });

  // Process GitHub license data
  Object.entries(projectsWithGitHubData).forEach(([slug, githubData]) => {
    if (githubData.license) {
      const licenseKey = githubData.license.key;
      if (!licenseMap.has(licenseKey)) {
        licenseMap.set(licenseKey, {
          key: licenseKey,
          name: githubData.license.name,
          spdx_id: githubData.license.spdx_id || undefined,
          url: githubData.license.url || undefined,
          count: 0,
          projects: [],
          isOSI: isOSIApproved(licenseKey),
          category: categorizeLicense(githubData.license.name),
        });
      }
      const license = licenseMap.get(licenseKey)!;
      // Only count if not already counted from direct license field
      const project = projects.find((p) => p.slug === slug);
      if (!project?.license) {
        license.count++;
        license.projects.push(slug);
      }
    }
  });

  return Array.from(licenseMap.values()).sort((a, b) => b.count - a.count);
};

// Helper to get projects for a specific license
export const getProjectsForLicense = (licenseKey: string): typeof projects => {
  const licenseData = getLicenseInfo();
  const license = licenseData.find((l) => l.key === licenseKey);
  if (!license) return [];

  return projects.filter((project) => license.projects.includes(project.slug));
};

// License category colors
export const getCategoryColor = (category: string) => {
  switch (category) {
    case "Copyleft":
      return "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300";
    case "Permissive":
      return "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300";
    case "Proprietary":
      return "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300";
    default:
      return "bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300";
  }
};
