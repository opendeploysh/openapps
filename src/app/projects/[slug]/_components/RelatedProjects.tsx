import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProjectMeta } from "@/lib/projects";
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
  // Find related projects based on matching categories
  const relatedProjects = allProjects
    .filter(
      (project) =>
        // Exclude the current project
        project.slug !== currentProject.slug &&
        // Find projects that share at least one category
        project.categories.some((category) =>
          currentProject.categories.includes(category)
        )
    )
    // Sort by number of matching categories (most matches first)
    .sort((a, b) => {
      const aMatches = a.categories.filter((cat) =>
        currentProject.categories.includes(cat)
      ).length;
      const bMatches = b.categories.filter((cat) =>
        currentProject.categories.includes(cat)
      ).length;

      // If same number of matches, sort by stars
      if (aMatches === bMatches) {
        return (b.stars || 0) - (a.stars || 0);
      }

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
            Similar projects based on shared categories
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentProject.categories.slice(0, 3).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
          {currentProject.categories.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{currentProject.categories.length - 3} more
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
          p.categories.some((cat) => currentProject.categories.includes(cat))
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
