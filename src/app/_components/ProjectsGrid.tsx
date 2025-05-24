import { ProjectCard } from "@/components/ProjectCard";
import { ProjectMeta } from "@/lib/projects";
import { Button } from "@/components/ui/button";
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
  currentProjects: ProjectMeta[];
  searchResults: ProjectMeta[] | null;
  activeFilter: string | null;
  currentPage: number;
  totalPages: number;
  indexOfFirstProject: number;
  indexOfLastProject: number;
  activeProjectsLength: number;
  setCurrentPage: (page: number) => void;
  onClearFilters: () => void;
}

export const ProjectsGrid = ({
  currentProjects,
  searchResults,
  activeFilter,
  currentPage,
  totalPages,
  indexOfFirstProject,
  indexOfLastProject,
  activeProjectsLength,
  setCurrentPage,
  onClearFilters,
}: ProjectsGridProps) => {
  // Check if we have an active search/filter but no results
  const hasActiveSearchOrFilter =
    searchResults !== null || activeFilter !== null;
  const hasNoResults = activeProjectsLength === 0 && hasActiveSearchOrFilter;

  if (hasNoResults) {
    return (
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {activeFilter ? `${activeFilter}` : "Search Results"}
          </h2>
          <p className="text-sm text-neutral-500">No projects found</p>
        </div>

        {/* No Results Found View */}
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
            No alternatives found
          </h3>

          <p className="text-neutral-600 dark:text-neutral-400 text-center max-w-md mb-6">
            {activeFilter
              ? `We couldn't find any projects in the "${activeFilter}" category. Try browsing other categories or adjusting your search.`
              : "We couldn't find any projects matching your search. Try different keywords or browse our categories."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Clear filters
            </Button>
            <Button
              variant="default"
              onClick={() => {
                onClearFilters();
                // Scroll to top to see all projects
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Browse all projects
            </Button>
          </div>

          {/* Suggestions */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              💡 Search tips:
            </h4>
            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <li>
                • Try broader terms (e.g., "chat" instead of "slack
                alternative")
              </li>
              <li>• Check spelling and try different variations</li>
              <li>• Browse by categories using the filter options</li>
              <li>• Use the popular alternatives tags for inspiration</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          {searchResults
            ? activeFilter
              ? activeFilter
              : "Search Results"
            : "Featured Projects"}
        </h2>
        <p className="text-sm text-neutral-500">
          Showing {indexOfFirstProject + 1}-
          {Math.min(indexOfLastProject, activeProjectsLength)} of{" "}
          {activeProjectsLength} projects
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProjects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
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
    </section>
  );
};
