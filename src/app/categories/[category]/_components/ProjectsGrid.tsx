"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectFilters, FilterOption } from "@/components/filters";
import { projects, projectsWithGitHubData, ProjectMeta } from "@/lib/projects";
import { matchSorter } from "match-sorter";

interface ProjectsGridProps {
  baseCategoryProjects: ProjectMeta[];
  categoryName: string;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  baseCategoryProjects,
  categoryName,
}) => {
  // Filter state
  const [searchResults, setSearchResults] = useState<ProjectMeta[] | null>(
    null
  );
  const [activeDifficultyFilters, setActiveDifficultyFilters] = useState<
    string[]
  >([]);
  const [activePricingFilters, setActivePricingFilters] = useState<string[]>(
    []
  );
  const [activeHostingFilters, setActiveHostingFilters] = useState<string[]>(
    []
  );
  const [sortOrder, setSortOrder] = useState("stars");

  // Filter options
  const difficultyFilters: FilterOption[] = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Advanced", label: "Advanced" },
  ];

  const pricingFilters: FilterOption[] = [
    { value: "Open Source", label: "Open Source" },
    { value: "Open-Core", label: "Open-Core" },
    { value: "Freemium", label: "Freemium" },
    { value: "Commercial", label: "Commercial" },
  ];

  const hostingFilters: FilterOption[] = [
    { value: "Self-hosted", label: "Self-hosted" },
    { value: "Cloud", label: "Cloud" },
    { value: "Hybrid", label: "Hybrid" },
  ];

  // Apply search and filters
  const getFilteredProjects = () => {
    let filteredProjects = searchResults || baseCategoryProjects;

    // Apply difficulty filters
    if (activeDifficultyFilters.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        activeDifficultyFilters.includes(
          project.deployment?.difficulty || "Medium"
        )
      );
    }

    // Apply pricing filters
    if (activePricingFilters.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        activePricingFilters.includes(project.pricingModel || "Open Source")
      );
    }

    // Apply hosting filters
    if (activeHostingFilters.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        activeHostingFilters.includes(project.hostingType || "Self-hosted")
      );
    }

    return filteredProjects;
  };

  // Sort projects
  const getSortedProjects = (projectList: ProjectMeta[]) => {
    const sorted = [...projectList];
    switch (sortOrder) {
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "stars":
        return sorted.sort((a, b) => {
          const aGithubData = projectsWithGitHubData[a.slug];
          const bGithubData = projectsWithGitHubData[b.slug];
          const aStars = aGithubData?.stargazers_count || 0;
          const bStars = bGithubData?.stargazers_count || 0;
          return bStars - aStars;
        });
      case "difficulty-asc":
        const difficultyOrder = { Easy: 1, Medium: 2, Advanced: 3 };
        return sorted.sort((a, b) => {
          const aDiff = difficultyOrder[a.deployment?.difficulty || "Medium"];
          const bDiff = difficultyOrder[b.deployment?.difficulty || "Medium"];
          return aDiff - bDiff;
        });
      case "difficulty-desc":
        const difficultyOrderDesc = { Easy: 3, Medium: 2, Advanced: 1 };
        return sorted.sort((a, b) => {
          const aDiff =
            difficultyOrderDesc[a.deployment?.difficulty || "Medium"];
          const bDiff =
            difficultyOrderDesc[b.deployment?.difficulty || "Medium"];
          return bDiff - aDiff;
        });
      default:
        return sorted;
    }
  };

  const filteredProjects = getFilteredProjects();
  const sortedProjects = getSortedProjects(filteredProjects);

  // Handle search within category
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    const searchResults = matchSorter(baseCategoryProjects, query, {
      keys: [
        { key: "name", threshold: matchSorter.rankings.WORD_STARTS_WITH },
        {
          key: "description",
          threshold: matchSorter.rankings.WORD_STARTS_WITH,
        },
        {
          key: "alternatives.nonSelfHosted",
          threshold: matchSorter.rankings.CONTAINS,
        },
        { key: "language", threshold: matchSorter.rankings.CONTAINS },
        { key: "license", threshold: matchSorter.rankings.CONTAINS },
      ],
    });

    setSearchResults(searchResults);
  };

  // Handle sorting
  const handleSort = (sortValue: string) => {
    setSortOrder(sortValue);
  };

  // Handle filtering
  const handleFilterChange = (filterType: string, values: string[]) => {
    if (filterType === "difficulty") {
      setActiveDifficultyFilters(values);
    } else if (filterType === "pricing") {
      setActivePricingFilters(values);
    } else if (filterType === "hosting") {
      setActiveHostingFilters(values);
    }
  };

  return (
    <>
      {/* Filters */}
      <ProjectFilters
        onSearch={handleSearch}
        onSort={handleSort}
        onFilterChange={handleFilterChange}
        searchPlaceholder={`Search ${categoryName.toLowerCase()} projects...`}
        difficultyFilters={difficultyFilters}
        pricingFilters={pricingFilters}
        hostingFilters={hostingFilters}
        activeDifficultyFilters={activeDifficultyFilters}
        activePricingFilters={activePricingFilters}
        activeHostingFilters={activeHostingFilters}
        showCategoryFilters={false}
        showDifficultyFilters={true}
        showPricingFilters={true}
        showHostingFilters={true}
        showPopularAlternatives={false}
        enableUrlSync={true}
        defaultSort="stars"
      />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {sortedProjects.length > 0 ? (
          sortedProjects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))
        ) : (
          <div className="col-span-3 py-12 text-center">
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Try adjusting your filters or search query.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchResults(null);
                setActiveDifficultyFilters([]);
                setActivePricingFilters([]);
                setActiveHostingFilters([]);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
