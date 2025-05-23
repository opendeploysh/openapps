import projectData from "./projects.json";

export type ProjectMeta = {
  slug: string;
  name: string;
  description: string;
  image: string;
  categories: string[];
  github: string;
  websiteUrl: string;
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
};

export const projects = projectData as unknown as Array<ProjectMeta>;
