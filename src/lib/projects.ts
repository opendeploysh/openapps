import projectData from "./projects.json";
import githubData from "./projects-github.json";
import { RestEndpointMethodTypes } from "@octokit/rest";

export type ProjectMeta = {
  slug: string;
  name: string;
  description: string;
  image: string;
  categories: string[];
  github: string;
  websiteUrl: string;
  discord?: string;

  license: string;
  alternatives: string[];
  logo: {
    dark: string;
    light: string;
  };
  stars: number;
  language: string;
  deployment?: {
    difficulty: "Easy" | "Medium" | "Advanced";
    justification: string;
  };
  popularity?: number;
};

export const projects = projectData as unknown as Array<ProjectMeta>;
export const projectsWithGitHubData = githubData as unknown as Record<
  string,
  {
    lastCommitDate: string;
    languages: Record<string, number>;
  } & RestEndpointMethodTypes["repos"]["get"]["response"]["data"]
>;

/**
 * Computes a popularity score (0-100) for a project based on GitHub metrics
 */
export const getProjectPopularity = (slug: string): number => {
  const project = projects.find((p) => p.slug === slug);
  if (project?.popularity) return project.popularity;

  const githubData = projectsWithGitHubData[slug];
  if (!githubData || !project) return 0;

  // Get projects in same categories
  const similarProjects = projects.filter((p) =>
    p.categories.some((cat) => project.categories.includes(cat))
  );

  // Get GitHub data for similar projects
  const similarProjectsData = similarProjects
    .map((p) => projectsWithGitHubData[p.slug])
    .filter(Boolean);

  // Weight different factors that contribute to popularity
  const weights = {
    stars: 0.4, // 40% weight for stars
    forks: 0.2, // 20% weight for forks
    subscribers_count: 0.15, // 15% weight for watchers
    openIssues: 0.1, // 10% weight for open issues as engagement metric
    lastCommit: 0.15, // 15% weight for recency of last commit
  };

  // Get max values across similar projects to normalize scores
  const maxStats = similarProjectsData.reduce(
    (acc, project) => ({
      stars: Math.max(acc.stars, project.stargazers_count || 0),
      forks: Math.max(acc.forks, project.forks || 0),
      subscribers_count: Math.max(
        acc.subscribers_count,
        project.subscribers_count || 0
      ),
      openIssues: Math.max(acc.openIssues, project.open_issues || 0),
      lastCommitDate: Math.max(
        acc.lastCommitDate,
        project.lastCommitDate ? new Date(project.lastCommitDate).getTime() : 0
      ),
    }),
    {
      stars: 0,
      forks: 0,
      subscribers_count: 0,
      openIssues: 0,
      lastCommitDate: 0,
    }
  );

  // Calculate normalized scores (0-1) compared to similar projects
  const scores = {
    stars: maxStats.stars
      ? (githubData.stargazers_count || 0) / maxStats.stars
      : 0,
    forks: maxStats.forks ? (githubData.forks || 0) / maxStats.forks : 0,
    subscribers_count: maxStats.subscribers_count
      ? (githubData.subscribers_count || 0) / maxStats.subscribers_count
      : 0,
    openIssues: maxStats.openIssues
      ? (githubData.open_issues || 0) / maxStats.openIssues
      : 0,
    lastCommit:
      maxStats.lastCommitDate && githubData.lastCommitDate
        ? new Date(githubData.lastCommitDate).getTime() /
          maxStats.lastCommitDate
        : 0,
  };

  const newLocal =
    Object.entries(weights).reduce((total, [metric, weight]) => {
      return total + scores[metric as keyof typeof scores] * weight;
    }, 0) * 100;
  // Calculate weighted average and convert to 0-100 scale
  const popularityScore = newLocal;

  return Math.round(popularityScore);
};
