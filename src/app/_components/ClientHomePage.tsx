"use client"

import { useState } from "react"
import { ProjectMeta, projects, projectsWithGitHubData, getProjectPopularity } from "@/lib/projects"
import { Filters, useFilters, FilterOption } from "@/components/filters"
import { ProjectsGrid } from "./ProjectsGrid"
import { CheckCircle, FolderArchive, MessageSquare, Wrench, Film, BarChart3, LockKeyhole, Settings } from "lucide-react"
import { HostingType } from "@/lib/hosting-type"
import { PricingModel } from "@/lib/pricing-model"

// Filter configurations
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

const difficultyFilters: FilterOption[] = [
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Advanced", label: "Advanced" },
]

const pricingFilters: FilterOption[] = [
  { value: PricingModel.Free, label: "Free" },
  { value: PricingModel.OpenCore, label: "Open-Core" },
  { value: PricingModel.EnterpriseLicensing, label: "Enterprise Licensing" },
  { value: PricingModel.PaidOnly, label: "Paid Only" },
  { value: PricingModel.Donationware, label: "Donationware" },
  { value: PricingModel.Trialware, label: "Trialware" },
]

const hostingFilters: FilterOption[] = [
  { value: HostingType.SelfHosted, label: "Self-hosted" },
  { value: HostingType.CloudOnly, label: "Cloud-Only" },
  { value: HostingType.Hybrid, label: "Hybrid" },
  { value: HostingType.SelfHostedSaaS, label: "Self-hosted SaaS" },
]

const popularAlternatives = ["Google Drive", "Slack", "GitHub", "Plex", "LastPass"]

// Home page content component that uses the filters
function HomePageContent() {
  const {
    searchResults,
    sortOrder,
    activeCategoryFilters,
    activeDifficultyFilters,
    activePricingFilters,
    activeHostingFilters,
  } = useFilters()

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
        if (searchResults) {
          return sorted
        }
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
    let filteredProjects = searchResults || projects

    if (activeCategoryFilters.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        project.tags.some((category) => activeCategoryFilters.includes(category))
      )
    }

    if (activeDifficultyFilters.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        activeDifficultyFilters.includes(project.deployment?.difficulty || "Medium")
      )
    }

    if (activePricingFilters.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        activePricingFilters.includes(project.pricingModel ?? PricingModel.Free)
      )
    }

    if (activeHostingFilters.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        activeHostingFilters.includes(project.hostingType ?? HostingType.SelfHosted)
      )
    }

    return filteredProjects
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
      {/* Filter controls using compound components */}
      <section className="mb-4">
        <div className="flex gap-2 mb-3 items-center">
          <Filters.Search placeholder="Search projects..." />
          <div className="flex gap-2 flex-shrink-0">
            <Filters.Sort />
            <Filters.Toggle />
          </div>
        </div>

        <Filters.Panel>
          <Filters.CategoryFilters filters={categoryFilters} />
          <Filters.DifficultyFilters filters={difficultyFilters} />
          <Filters.PricingFilters filters={pricingFilters} />
          <Filters.HostingFilters filters={hostingFilters} />
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
    </>
  )
}

export default function ClientHomePage() {
  return (
    <Filters.Provider projects={projects} defaultSort="popularity">
      <HomePageContent />
    </Filters.Provider>
  )
}
