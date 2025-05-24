export enum HostingType {
  SelfHosted = "Self-Hosted",
  CloudOnly = "Cloud-Only",
  SelfHostedSaaS = "Self-Hosted SaaS",
  Hybrid = "Hybrid",
}

export interface HostingTypeInfo {
  type: HostingType;
  description: string;
  color: string;
}

export const hostingTypeInfo: Record<HostingType, HostingTypeInfo> = {
  [HostingType.SelfHosted]: {
    type: HostingType.SelfHosted,
    description:
      "Software that can be installed and run on your own infrastructure",
    color:
      "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
  },
  [HostingType.CloudOnly]: {
    type: HostingType.CloudOnly,
    description:
      "Software that runs exclusively on vendor-managed cloud infrastructure",
    color: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
  },
  [HostingType.SelfHostedSaaS]: {
    type: HostingType.SelfHostedSaaS,
    description:
      "Self-hosted software with vendor control or licensing requirements",
    color:
      "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300",
  },
  [HostingType.Hybrid]: {
    type: HostingType.Hybrid,
    description:
      "Software offering both self-hosted and vendor-hosted deployment options",
    color:
      "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
  },
};

export const getHostingTypeColor = (type: HostingType): string => {
  return hostingTypeInfo[type].color;
};
