"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProjectCard } from "@/components/ProjectCard"
import { ProjectMeta } from "@/lib/projects"

interface SameCategoryProjectsProps {
  projects: ProjectMeta[]
  categoryName: string
}

export function SameCategoryProjects({ projects, categoryName }: SameCategoryProjectsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 9

  // Pagination logic
  const totalPages = Math.ceil(projects.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const paginatedProjects = projects.slice(startIndex, startIndex + projectsPerPage)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    // Scroll to the section
    document.getElementById("same-category-section")?.scrollIntoView({ behavior: "smooth" })
  }

  if (projects.length === 0) {
    return null
  }

  return (
    <div id="same-category-section" className="mb-16">
      <h2 className="text-2xl font-bold mb-6">More {categoryName} projects</h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        Discover other open source projects in the {categoryName.toLowerCase()} category:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedProjects.map((categoryProject) => (
          <ProjectCard key={categoryProject.slug} {...categoryProject} showLicense={true} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber
              if (totalPages <= 5) {
                pageNumber = i + 1
              } else if (currentPage <= 3) {
                pageNumber = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i
              } else {
                pageNumber = currentPage - 2 + i
              }

              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(pageNumber)}
                  className="w-10"
                >
                  {pageNumber}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Show pagination info */}
      <div className="text-center mt-4">
        <p className="text-sm text-neutral-500">
          Showing {startIndex + 1}-{Math.min(startIndex + projectsPerPage, projects.length)} of {projects.length}{" "}
          projects in {categoryName.toLowerCase()}
        </p>
      </div>
    </div>
  )
}
