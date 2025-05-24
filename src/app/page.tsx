"use client";

import { useState } from "react";
import { matchSorter } from "match-sorter";
import { ProjectMeta, projects } from "@/lib/projects";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "./_components/HeroHeader";
import { SearchFilters } from "./_components/SearchFilters";

import { ProjectsGrid } from "./_components/ProjectsGrid";
import { DeploymentGuide } from "./_components/DeploymentGuide";
import { RequestCTA } from "./_components/RequestCTA";
import { Footer } from "./_components/Footer";

export default function Home() {
  const [searchResults, setSearchResults] = useState<null | ProjectMeta[]>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("relevance");

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12;

  // Sort function that works with both search results and regular projects
  const getSortedProjects = (projectList: ProjectMeta[]) => {
    const sorted = [...projectList];

    switch (sortOrder) {
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "stars":
        return sorted.sort((a, b) => {
          // Use popularity or github data if available
          const aPopularity = a.popularity || 0;
          const bPopularity = b.popularity || 0;
          return bPopularity - aPopularity;
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
      case "relevance":
      default:
        // For search results, keep match-sorter ordering
        // For regular projects, sort by popularity
        if (searchResults) {
          return sorted; // Keep match-sorter ranking
        }
        return sorted.sort((a, b) => {
          const aPopularity = a.popularity || 0;
          const bPopularity = b.popularity || 0;
          return bPopularity - aPopularity;
        });
    }
  };

  // Get current projects - use search results if available, otherwise use all projects
  const baseProjects = searchResults || projects;
  const activeProjects = getSortedProjects(baseProjects);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = activeProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(activeProjects.length / projectsPerPage);

  const handleSearch = (query: string) => {
    setActiveFilter(null);
    setCurrentPage(1); // Reset to first page when searching

    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    // Use match-sorter for fuzzy searching with prioritized keys
    const filteredProjects = matchSorter(projects, query, {
      keys: [
        // Primary keys with highest priority
        { key: "name", threshold: matchSorter.rankings.WORD_STARTS_WITH },
        {
          key: "description",
          threshold: matchSorter.rankings.WORD_STARTS_WITH,
        },

        // Secondary keys for broader matching
        {
          key: "alternatives.selfHosted",
          threshold: matchSorter.rankings.CONTAINS,
        },
        {
          key: "alternatives.nonSelfHosted",
          threshold: matchSorter.rankings.CONTAINS,
        },
        { key: "categories", threshold: matchSorter.rankings.CONTAINS },

        // Tertiary keys for loose matching
        { key: "language", threshold: matchSorter.rankings.CONTAINS },
        { key: "license", threshold: matchSorter.rankings.CONTAINS },
      ],
      // Sort by best match first
      sorter: (rankedItems) => rankedItems,
    });

    setSearchResults(filteredProjects);
  };

  const handleCategoryFilter = (categoryName: string) => {
    setActiveFilter(categoryName);
    setCurrentPage(1); // Reset to first page when filtering

    // Use match-sorter for more flexible category matching
    const filteredProjects = matchSorter(projects, categoryName, {
      keys: [
        { key: "categories", threshold: matchSorter.rankings.CONTAINS },
        { key: "primaryCategory", threshold: matchSorter.rankings.EQUAL },
      ],
    });

    setSearchResults(filteredProjects);
  };

  const clearSearchAndFilters = () => {
    setSearchResults(null);
    setActiveFilter(null);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />

      <div className="container mx-auto px-2 py-4 max-w-5xl">
        <HeroHeader projectCount={projects.length} />

        <SearchFilters
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          onClearFilters={clearSearchAndFilters}
          activeFilter={activeFilter}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <ProjectsGrid
          currentProjects={currentProjects}
          searchResults={searchResults}
          activeFilter={activeFilter}
          currentPage={currentPage}
          totalPages={totalPages}
          indexOfFirstProject={indexOfFirstProject}
          indexOfLastProject={indexOfLastProject}
          activeProjectsLength={activeProjects.length}
          setCurrentPage={setCurrentPage}
          onClearFilters={clearSearchAndFilters}
        />

        <DeploymentGuide />

        <RequestCTA />

        <Footer />
      </div>
    </div>
  );
}
