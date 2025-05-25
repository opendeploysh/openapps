"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectFilters, FilterOption } from "@/components/filters";
import {
  projects,
  projectsWithGitHubData,
  ProjectMeta,
  getProjectPopularity,
} from "@/lib/projects";
import { matchSorter } from "match-sorter";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, RefreshCw } from "lucide-react";

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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12;

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
      case "popularity":
        return sorted.sort(
          (a, b) => getProjectPopularity(b.slug) - getProjectPopularity(a.slug)
        );
      default:
        return sorted;
    }
  };

  // Get current projects - apply filters and pagination
  const filteredProjects = getFilteredProjects();
  const sortedProjects = getSortedProjects(filteredProjects);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = sortedProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);

  // Handle search within category
  const handleSearch = useCallback(
    (query: string) => {
      setCurrentPage(1); // Reset to first page on search

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
    },
    [baseCategoryProjects]
  );

  // Handle sorting
  const handleSort = useCallback((sortValue: string) => {
    setSortOrder(sortValue);
    setCurrentPage(1); // Reset to first page on sort
  }, []);

  // Handle filtering
  const handleFilterChange = useCallback(
    (filterType: string, values: string[]) => {
      setCurrentPage(1); // Reset to first page on filter change

      if (filterType === "difficulty") {
        setActiveDifficultyFilters(values);
      } else if (filterType === "pricing") {
        setActivePricingFilters(values);
      } else if (filterType === "hosting") {
        setActiveHostingFilters(values);
      }
    },
    []
  );

  // Clear all filters and search
  const clearAllFilters = () => {
    setSearchResults(null);
    setActiveDifficultyFilters([]);
    setActivePricingFilters([]);
    setActiveHostingFilters([]);
    setCurrentPage(1);
  };

  // Check if we have active filters but no results
  const hasActiveFilters =
    searchResults !== null ||
    activeDifficultyFilters.length > 0 ||
    activePricingFilters.length > 0 ||
    activeHostingFilters.length > 0;
  const hasNoResults = sortedProjects.length === 0 && hasActiveFilters;

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

      {/* Results Section */}
      <section className="mb-6">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {searchResults ? "Search Results" : `${categoryName} Projects`}
          </h2>
          {sortedProjects.length > 0 && (
            <p className="text-sm text-neutral-500">
              Showing {indexOfFirstProject + 1}-
              {Math.min(indexOfLastProject, sortedProjects.length)} of{" "}
              {sortedProjects.length} projects
            </p>
          )}
        </div>

        {/* No Results View */}
        {hasNoResults && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                <span className="text-amber-600 dark:text-amber-400 text-xs">
                  !
                </span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              No projects found
            </h3>

            <p className="text-neutral-600 dark:text-neutral-400 text-center max-w-md mb-6">
              We couldn't find any {categoryName.toLowerCase()} projects
              matching your criteria. Try adjusting your filters or search
              query.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Clear filters
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  clearAllFilters();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Show all {categoryName.toLowerCase()} projects
              </Button>
            </div>

            {/* Search Tips */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                💡 Search tips:
              </h4>
              <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Try broader terms or different keywords</li>
                <li>• Check spelling and try variations</li>
                <li>• Adjust difficulty, pricing, or hosting filters</li>
                <li>• Browse related categories for more options</li>
              </ul>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!hasNoResults && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {currentProjects.map((project) => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {/* First page */}
                    {currentPage > 2 && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="cursor-pointer"
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {/* Ellipsis before current page group */}
                    {currentPage > 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Previous page */}
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(currentPage - 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="cursor-pointer"
                        >
                          {currentPage - 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {/* Current page */}
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        {currentPage}
                      </PaginationLink>
                    </PaginationItem>

                    {/* Next page */}
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(currentPage + 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="cursor-pointer"
                        >
                          {currentPage + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {/* Ellipsis after current page group */}
                    {currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Last page */}
                    {currentPage < totalPages - 1 && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(totalPages);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="cursor-pointer"
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) {
                            setCurrentPage(currentPage + 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};
