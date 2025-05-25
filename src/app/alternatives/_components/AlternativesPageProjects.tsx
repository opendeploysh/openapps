"use client"

import React, { useState } from "react"
import { CheckCircle, FolderArchive, MessageSquare, Wrench, Film, BarChart3, LockKeyhole, Settings } from "lucide-react"
import { projects, ProjectMeta, projectsWithGitHubData, getProjectPopularity } from "@/lib/projects"
import { Filters, useFilters, FilterOption } from "@/components/filters"
import { ProjectsGrid } from "@/app/_components/ProjectsGrid"
import { HostingType } from "@/lib/hosting-type"

const allProjects = projects.filter((project) => project.hostingType === HostingType.CloudOnly)

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
]

export const AlternativesPageProjects: React.FC = () => {
  const { searchResults, sortOrder, activeCategoryFilters } = useFilters()

  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 12

  // Sort function
  const getSortedProjects = (projectList: ProjectMeta[]) => {
    const sorted = [...projectList]

    switch (sortOrder) {
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case "stars":
        return sorted.sort((a, b) => {
          const aGithubData = projectsWithGitHubData[a.slug]
          const bGithubData = projectsWithGitHubData[b.slug]
          const aStars = aGithubData?.stargazers_count || 0
          const bStars = bGithubData?.stargazers_count || 0
          return bStars - aStars
        })
      case "difficulty-asc":
        const difficultyOrder = { Easy: 1, Medium: 2, Advanced: 3 }
        return sorted.sort((a, b) => {
          const aDiff = difficultyOrder[a.deployment?.difficulty || "Medium"]
          const bDiff = difficultyOrder[b.deployment?.difficulty || "Medium"]
          return aDiff - bDiff
        })
      case "difficulty-desc":
        const difficultyOrderDesc = { Easy: 3, Medium: 2, Advanced: 1 }
        return sorted.sort((a, b) => {
          const aDiff = difficultyOrderDesc[a.deployment?.difficulty || "Medium"]
          const bDiff = difficultyOrderDesc[b.deployment?.difficulty || "Medium"]
          return bDiff - aDiff
        })
      case "popularity":
        return sorted.sort((a, b) => getProjectPopularity(b.slug) - getProjectPopularity(a.slug))
      case "relevance":
      default:
        if (searchResults) return sorted
        return sorted.sort((a, b) => {
          const aGithubData = projectsWithGitHubData[a.slug]
          const bGithubData = projectsWithGitHubData[b.slug]
          const aStars = aGithubData?.stargazers_count || 0
          const bStars = bGithubData?.stargazers_count || 0
          return bStars - aStars
        })
    }
  }

  // Apply all filters
  const getFilteredProjects = () => {
    return allProjects.filter((project) => {
      const passesSearch =
        searchResults == null || searchResults.length === 0 || searchResults.map((p) => p.slug).includes(project.slug)
      const passesCategory = activeCategoryFilters.length === 0 || activeCategoryFilters.includes(project.category)
      return passesSearch && passesCategory
    })
  }

  const filteredProjects = getFilteredProjects()
  const activeProjects = getSortedProjects(filteredProjects)
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = activeProjects.slice(indexOfFirstProject, indexOfLastProject)

  const totalPages = Math.ceil(activeProjects.length / projectsPerPage)

  const clearSearchAndFilters = () => {
    setCurrentPage(1)
  }

  return (
    <>
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Alternatives to SaaS services</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Discover cloud-based open source alternatives that you can deploy and manage without the complexity of
          self-hosting.
        </p>

        {/* Filter controls using compound components */}
        <section className="mb-4">
          <div className="flex gap-2 mb-3 items-center">
            <Filters.Search placeholder="Search cloud-based alternatives..." />
            <div className="flex gap-2 flex-shrink-0">
              <Filters.Sort />
              <Filters.Toggle />
            </div>
          </div>

          <Filters.Panel>
            <Filters.CategoryFilters filters={categoryFilters} />
          </Filters.Panel>
        </section>

        <ProjectsGrid
          currentProjects={currentProjects}
          searchResults={searchResults}
          activeFilter={null}
          currentPage={currentPage}
          totalPages={totalPages}
          indexOfFirstProject={indexOfFirstProject}
          indexOfLastProject={indexOfLastProject}
          activeProjectsLength={activeProjects.length}
          setCurrentPage={setCurrentPage}
          onClearFilters={clearSearchAndFilters}
        />
      </div>
    </>
  )
}
