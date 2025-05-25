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
    color: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
  },
  [HostingType.SelfHostedSaaS]: {
    type: HostingType.SelfHostedSaaS,
    description:
      "Self-hosted software with vendor control or licensing requirements",
    color:
      "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300",
  },
  [HostingType.Hybrid]: {
    type: HostingType.Hybrid,
    description:
      "Software offering both self-hosted and vendor-hosted deployment options",
    color:
      "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300",
  },
};

export const getHostingTypeColor = (type: HostingType): string => {
  return hostingTypeInfo[type].color;
};
