import projectData from "../../.next/cache/projects.json";
import githubData from "./projects-github.json";

import { RestEndpointMethodTypes } from "@octokit/rest";
import { z } from "zod";

export const primaryCategories = [
  "communication",
  "email-complete",
  "email-delivery",
  "email-transfer",
  "email-lists",
  "email-webmail",
  "irc",
  "sip",
  "social",
  "video-chat",
  "xmpp-servers",
  "xmpp-clients",
  "blogging",
  "docs",
  "ebooks",
  "digital-library",
  "library-systems",
  "media",
  "streaming",
  "audio",
  "multimedia",
  "video",
  "photos",
  "recipes",
  "static-sites",
  "wikis",
  "calendar",
  "groupware",
  "notes",
  "office",
  "dashboards",
  "polls",
  "tasks",
  "time-tracking",
  "backup",
  "booking",
  "crm",
  "fitness",
  "hr",
  "identity",
  "inventory",
  "knowledge",
  "planning",
  "ticketing",
  "finance",
  "analytics",
  "automation",
  "dev",
  "api",
  "ci-cd",
  "serverless",
  "feature-flags",
  "ide",
  "localization",
  "low-code",
  "dev-projects",
  "testing",
  "monitoring",
  "remote",
  "search",
  "self-hosting",
  "status",
  "web-servers",
  "archiving",
  "database",
  "dns",
  "filesync",
  "filesystems",
  "object-storage",
  "p2p",
  "file-upload",
  "file-manager",
  "pastebin",
  "auth",
  "passwords",
  "proxy",
  "vpn",
  "learning",
  "genealogy",
  "conferences",
  "ecommerce",
  "csa",
  "manufacturing",
  "iot",
  "genai",
  "maps",
  "bookmarks",
  "short-links",
  "games",
  "game-tools",
  "misc",
  "surveillance",
] as const;

export const mdxProjectData = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  logo: z.string(),
  heroImage: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) {
        console.warn("Project hero image not set");
        return true;
      }
      return true;
    }),

  primaryCategory: z.enum(primaryCategories),
  categories: z.array(z.string()),

  github: z.string().regex(/^[^/]+\/[^/]+$/),

  websiteUrl: z.string().url().optional(),
  discord: z.string().url().optional(),

  license: z.string().optional(),
  alternatives: z.object({
    selfHosted: z.array(z.string()).optional(),
    nonSelfHosted: z.array(z.string()).optional(),
  }),
  deployment: z.object({
    difficulty: z.enum(["Easy", "Medium", "Advanced"]),
    justification: z.string(),
  }),
  popularity: z.number().optional(),

  language: z.string().optional(),
});

export type ProjectMeta = z.infer<typeof mdxProjectData>;

export const githubProjectData = z.object({
  lastCommitDate: z.string().transform((str) => new Date(str)),
  languages: z.record(z.string(), z.number()),
  stars: z.number(),
  forks: z.number(),
  watchers: z.number(),
  issues: z.number(),
});

export const projects = projectData as unknown as Array<ProjectMeta>;
export const projectsWithGitHubData = githubData as unknown as Record<
  string,
  {
    lastCommitDate: string;
    languages: Record<string, number>;
  } & RestEndpointMethodTypes["repos"]["get"]["response"]["data"]
>;

/**
 * Computes a popularity score for a project based on GitHub metrics
 * Higher score means more popular
 */
export const getProjectPopularity = (slug: string): number => {
  const project = projects.find((p) => p.slug === slug);
  if (project?.popularity) return project.popularity;

  const githubData = projectsWithGitHubData[slug];
  if (!githubData || !project) return 0;

  // Weight different factors that contribute to popularity
  const weights = {
    stars: 0.4, // 40% weight for stars
    forks: 0.2, // 20% weight for forks
    watchers: 0.15, // 15% weight for watchers
    issues: 0.1, // 10% weight for open issues
    lastCommit: 0.15, // 15% weight for recency
  };

  // Get max values across all projects for normalization
  const maxStats = {
    stars: Math.max(
      ...Object.values(projectsWithGitHubData).map(
        (d) => d.stargazers_count || 0
      )
    ),
    forks: Math.max(
      ...Object.values(projectsWithGitHubData).map((d) => d.forks || 0)
    ),
    watchers: Math.max(
      ...Object.values(projectsWithGitHubData).map(
        (d) => d.subscribers_count || 0
      )
    ),
    issues: Math.max(
      ...Object.values(projectsWithGitHubData).map((d) => d.open_issues || 0)
    ),
  };

  // Calculate normalized scores (0-1 range)
  const scores = {
    stars: (githubData.stargazers_count || 0) / maxStats.stars,
    forks: (githubData.forks || 0) / maxStats.forks,
    watchers: (githubData.subscribers_count || 0) / maxStats.watchers,
    issues: (githubData.open_issues || 0) / maxStats.issues,
    lastCommit: githubData.lastCommitDate
      ? Math.max(
          0,
          1 -
            (Date.now() - new Date(githubData.lastCommitDate).getTime()) /
              (365 * 24 * 60 * 60 * 1000)
        )
      : 0,
  };

  // Calculate weighted score and scale to 0-100
  const score =
    Object.entries(weights).reduce((total, [metric, weight]) => {
      return total + scores[metric as keyof typeof scores] * weight;
    }, 0) * 100;

  return Math.round(score);
};
