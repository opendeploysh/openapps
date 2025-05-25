import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  githubProjectData,
  ProjectMeta,
  projectsWithGitHubData,
} from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";

interface RelatedProjectsProps {
  currentProject: ProjectMeta;
  allProjects: ProjectMeta[];
  maxProjects?: number;
}

export function RelatedProjects({
  currentProject,
  allProjects,
  maxProjects = 3,
}: RelatedProjectsProps) {
  // Find related projects based on matching tags
  const relatedProjects = allProjects
    .filter(
      (project) =>
        // Exclude the current project
        project.slug !== currentProject.slug &&
        // Find projects that share at least one category
        project.tags.some((category) => currentProject.tags.includes(category))
    )
    // Sort by number of matching tags (most matches first)
    .sort((a, b) => {
      const aMatches = a.tags.filter((cat) =>
        currentProject.tags.includes(cat)
      ).length;
      const bMatches = b.tags.filter((cat) =>
        currentProject.tags.includes(cat)
      ).length;

      const aStars = projectsWithGitHubData[a.slug]?.stargazers_count || 0;
      const bStars = projectsWithGitHubData[b.slug]?.stargazers_count || 0;

      // If same number of matches, sort by stars
      if (aMatches === bMatches) return bStars - aStars;

      return bMatches - aMatches;
    })
    // Limit the number of results
    .slice(0, maxProjects);

  // Don't render if no related projects found
  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Related Projects</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            Similar projects based on shared tags
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentProject.tags.slice(0, 3).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
          {currentProject.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{currentProject.tags.length - 3} more
            </Badge>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedProjects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>

      {/* See more link if there are many related projects */}
      {allProjects.filter(
        (p) =>
          p.slug !== currentProject.slug &&
          p.tags.some((cat) => currentProject.tags.includes(cat))
      ).length > maxProjects && (
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/">
              Explore More Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
