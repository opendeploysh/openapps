"use client";

import { useState } from "react";
import { matchSorter } from "match-sorter";
import { ProjectMeta, projects } from "@/lib/projects";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "./_components/HeroHeader";
import { ProjectFilters, FilterOption } from "@/components/filters";
import { ProjectsGrid } from "./_components/ProjectsGrid";
import { DeploymentGuide } from "./_components/DeploymentGuide";
import { RequestCTA } from "./_components/RequestCTA";
import { Footer } from "../components/Footer";
import {
  CheckCircle,
  FolderArchive,
  MessageSquare,
  Wrench,
  Film,
  BarChart3,
  LockKeyhole,
  Settings,
} from "lucide-react";

export default function Home() {
  const [searchResults, setSearchResults] = useState<null | ProjectMeta[]>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeCategoryFilters, setActiveCategoryFilters] = useState<string[]>(
    []
  );
  const [activeDifficultyFilters, setActiveDifficultyFilters] = useState<
    string[]
  >([]);
  const [sortOrder, setSortOrder] = useState("relevance");

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12;

  // Categories with icons for filters
  const categoryFilters: FilterOption[] = [
    {
      value: "Productivity",
      label: "Productivity",
      icon: <CheckCircle className="w-3 h-3" />,
    },
    {
      value: "File Storage",
      label: "File Storage",
      icon: <FolderArchive className="w-3 h-3" />,
    },
    {
      value: "Communication",
      label: "Communication",
      icon: <MessageSquare className="w-3 h-3" />,
    },
    {
      value: "Development",
      label: "Development",
      icon: <Wrench className="w-3 h-3" />,
    },
    { value: "Media", label: "Media", icon: <Film className="w-3 h-3" /> },
    {
      value: "Analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-3 h-3" />,
    },
    {
      value: "Security",
      label: "Security",
      icon: <LockKeyhole className="w-3 h-3" />,
    },
    {
      value: "Automation",
      label: "Automation",
      icon: <Settings className="w-3 h-3" />,
    },
  ];

  // Difficulty filters
  const difficultyFilters: FilterOption[] = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Advanced", label: "Advanced" },
  ];

  // Popular alternatives for quick search
  const popularAlternatives = [
    "Google Drive",
    "Slack",
    "GitHub",
    "Plex",
    "LastPass",
  ];

  // Sort function that works with both search results and regular projects
  const getSortedProjects = (projectList: ProjectMeta[]) => {
    const sorted = [...projectList];

    switch (sortOrder) {
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "stars":
        return sorted.sort((a, b) => {
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

  // Apply all filters to get final project list
  const getFilteredProjects = () => {
    let filteredProjects = searchResults || projects;

    // Apply category filters
    if (activeCategoryFilters.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        project.categories.some((category) =>
          activeCategoryFilters.includes(category)
        )
      );
    }

    // Apply difficulty filters
    if (activeDifficultyFilters.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        activeDifficultyFilters.includes(
          project.deployment?.difficulty || "Medium"
        )
      );
    }

    return filteredProjects;
  };

  // Get current projects - apply filters and pagination
  const filteredProjects = getFilteredProjects();
  const activeProjects = getSortedProjects(filteredProjects);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = activeProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(activeProjects.length / projectsPerPage);

  const handleSearch = (query: string) => {
    setActiveFilter(null);
    setCurrentPage(1);

    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    const filteredProjects = matchSorter(projects, query, {
      keys: [
        { key: "name", threshold: matchSorter.rankings.WORD_STARTS_WITH },
        {
          key: "description",
          threshold: matchSorter.rankings.WORD_STARTS_WITH,
        },
        {
          key: "alternatives.selfHosted",
          threshold: matchSorter.rankings.CONTAINS,
        },
        {
          key: "alternatives.nonSelfHosted",
          threshold: matchSorter.rankings.CONTAINS,
        },
        { key: "categories", threshold: matchSorter.rankings.CONTAINS },
        { key: "language", threshold: matchSorter.rankings.CONTAINS },
        { key: "license", threshold: matchSorter.rankings.CONTAINS },
      ],
      sorter: (rankedItems) => rankedItems,
    });

    setSearchResults(filteredProjects);
  };

  const handleSort = (sortValue: string) => {
    setSortOrder(sortValue);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType: string, values: string[]) => {
    setCurrentPage(1);

    if (filterType === "category") {
      setActiveCategoryFilters(values);
    } else if (filterType === "difficulty") {
      setActiveDifficultyFilters(values);
    }
  };

  const clearSearchAndFilters = () => {
    setSearchResults(null);
    setActiveFilter(null);
    setActiveCategoryFilters([]);
    setActiveDifficultyFilters([]);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />

      <div className="container mx-auto px-2 py-4 max-w-5xl">
        <HeroHeader projectCount={projects.length} />

        <ProjectFilters
          onSearch={handleSearch}
          onSort={handleSort}
          onFilterChange={handleFilterChange}
          sortValue={sortOrder}
          categoryFilters={categoryFilters}
          difficultyFilters={difficultyFilters}
          popularAlternatives={popularAlternatives}
          activeCategoryFilters={activeCategoryFilters}
          activeDifficultyFilters={activeDifficultyFilters}
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
