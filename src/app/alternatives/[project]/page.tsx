import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import {
  ChevronLeft,
  Github,
  ExternalLink,
  Star,
  Code,
  Shield,
  Info,
  CheckCircle,
  DollarSign,
  Server,
  ArrowRight,
} from "lucide-react"
import { projects, getProjectPopularity, projectsWithGitHubData, ProjectMeta } from "@/lib/projects"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ProjectCard } from "@/components/ProjectCard"
import { SameCategoryProjects } from "./_components/SameCategoryProjects"
import { Metadata } from "next"
import { pricingModelInfo } from "@/lib/pricing-model"
import { hostingTypeInfo } from "@/lib/hosting-type"
import { AlternativePreviewCard } from "./_components/AlternativePreviewCard"
import { useCompileFromSlug } from "@/mdx/render-projects"

interface AlternativesPageProps {
  params: Promise<{
    project: string
  }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({ project: project.slug }))
}

export async function generateMetadata({ params }: AlternativesPageProps): Promise<Metadata> {
  const { project: projectSlug } = await params
  const project = projects.find((p) => p.slug === projectSlug)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    }
  }

  // Count alternatives for description
  const selfHostedCount = project.alternatives?.selfHosted?.length || 0

  const sameCategoryCount = projects.filter((p) => p.category === project.category).length - 1

  const title = `Alternatives to ${project.name} - Cost-Effective SaaS Alternatives`
  const description = `Discover ${
    selfHostedCount + sameCategoryCount
  }+ cost-effective, privacy-respecting alternatives to ${
    project.name
  }. Compare features and deploy them yourself or through our managed services.`

  return {
    title,
    description,
    keywords: [
      `${project.name} alternatives`,
      `${project.name} open source`,
      `self-hosted ${project.name}`,
      `${project.category.toLowerCase()} software`,
      "open source",
      "self-hosted",
      "alternatives",
      project.category.toLowerCase(),
      ...(project.alternatives?.nonSelfHosted || []).map((alt) => `${alt} alternative`),
    ].join(", "),
    authors: [{ name: "OpenApps" }],
    creator: "OpenApps",
    publisher: "OpenApps",
    robots: "index, follow",
    alternates: {
      canonical: `/alternatives/${project.slug}`,
    },
  }
}

export default async function AlternativesPage({ params }: AlternativesPageProps) {
  const { project: projectSlug } = await params

  const project = projects.find((p) => p.slug === projectSlug)

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
        <Navbar />
        <div className="container max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mb-4">
              <Info className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Project not found</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              The project you're looking for doesn't exist or may have been moved.
            </p>
            <Link href="/alternatives">
              <Button>Browse All Alternatives</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Get GitHub data for license information
  const githubData = projectsWithGitHubData[project.slug]

  // Get self-hosted alternatives from the project's alternatives.selfHosted array
  const selfHostedAlternativeProjects = await Promise.all(
    (project.alternatives?.selfHosted ?? [])
      .map((altName) => {
        // Find the project in our database
        return projects.find(
          (p) =>
            p.name.toLowerCase() === altName.toLowerCase() ||
            p.slug.toLowerCase() === altName.toLowerCase().replace(/\s+/g, "-") ||
            p.slug.toLowerCase() === altName.toLowerCase()
        )
      })
      .filter((p): p is ProjectMeta => Boolean(p))
      .map(async (p) => {
        const mdxData = await useCompileFromSlug(p.slug).catch(() => null)
        return { ...p, mdxData }
      })
  ).catch(() => [])

  const hasAlternatives = selfHostedAlternativeProjects.length > 0

  // Get all projects in the same primary category, excluding already shown alternatives
  const alreadyShownSlugs = new Set([
    project.slug, // Exclude current project
    ...selfHostedAlternativeProjects.map((p) => p.slug),
  ])

  const sameCategoryProjects = projects
    .filter((p) => p.category === project.category && !alreadyShownSlugs.has(p.slug))
    .sort((a, b) => getProjectPopularity(b.slug) - getProjectPopularity(a.slug))

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />

      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Back navigation */}
        <div className="flex gap-4 mb-6">
          <Link href="/alternatives">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Alternatives
            </Button>
          </Link>
          <Link href={`/projects/${project.slug}`}>
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              View Project Details
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center">
              {project.logo ? (
                <img src={project.logo} alt={`${project.name} logo`} className="w-10 h-10 rounded-lg" />
              ) : (
                <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Alternatives to {project.name}</h1>
            </div>
          </div>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
            {project.description} Find open source and proprietary alternatives that serve similar purposes.
          </p>

          {/* Project Details */}
          <div className="flex flex-wrap gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-neutral-500" />
              <span className="text-neutral-600 dark:text-neutral-400">License:</span>
              <Badge variant="outline" className="text-xs">
                {project.license ?? githubData?.license?.spdx_id ?? "Unknown"}
              </Badge>
            </div>

            {githubData?.stargazers_count && (
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-neutral-600 dark:text-neutral-400">Stars:</span>
                <Badge variant="outline" className="text-xs">
                  {githubData.stargazers_count.toLocaleString()}
                </Badge>
              </div>
            )}

            {project.deployment && (
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-neutral-500" />
                <span className="text-neutral-600 dark:text-neutral-400">Difficulty:</span>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    project.deployment.difficulty === "Easy"
                      ? "text-green-600 dark:text-green-400"
                      : project.deployment.difficulty === "Medium"
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {project.deployment.difficulty}
                </Badge>
              </div>
            )}

            {project.pricingModel && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-neutral-500" />
                <span className="text-neutral-600 dark:text-neutral-400">Pricing:</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        variant="outline"
                        className={`text-xs border-none ${pricingModelInfo[project.pricingModel].color} cursor-help`}
                      >
                        {project.pricingModel}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">{pricingModelInfo[project.pricingModel].description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}

            {project.hostingType && (
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-neutral-500" />
                <span className="text-neutral-600 dark:text-neutral-400">Hosting:</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        variant="outline"
                        className={`text-xs border-none ${hostingTypeInfo[project.hostingType].color} cursor-help`}
                      >
                        {project.hostingType}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">{hostingTypeInfo[project.hostingType].description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>

        {!hasAlternatives ? (
          <div className="text-center py-16 mb-16">
            <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Info className="h-8 w-8 text-neutral-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No alternatives listed</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              We haven't identified specific alternatives for {project.name} yet.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href={`/projects/${project.slug}`}>
                <Button>View Project Details</Button>
              </Link>
              <Link href="/alternatives">
                <Button variant="outline">Browse All Alternatives</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {selfHostedAlternativeProjects.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Self-hosted alternatives to {project.name}</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                  Open source projects that can replace {project.name}:
                </p>
                <div className="grid grid-cols-1 gap-6">
                  {selfHostedAlternativeProjects
                    .sort((a, b) => getProjectPopularity(b.slug) - getProjectPopularity(a.slug))
                    .map((alternativeProject) => (
                      <AlternativePreviewCard
                        key={alternativeProject.slug}
                        project={alternativeProject}
                        ContentPreview={<div>{alternativeProject.mdxData?.content}</div>}
                      />
                    ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Same Category Projects - Paginated */}
        {project.category && <SameCategoryProjects projects={sameCategoryProjects} categoryName={project.category} />}

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-xl p-8 mb-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to try {project.name}?</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Deploy {project.name} and take control of your data with this open source alternative.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/projects/${project.slug}`}>
                <Button size="lg" className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  View Project Details
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link href={`https://github.com/${project.github}`} target="_blank">
                  <Github className="h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="text-center pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg font-semibold mb-4">Explore by Category</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {project.tags.map((category) => (
              <Link key={category} href={`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`}>
                <Badge
                  variant="outline"
                  className="text-sm px-3 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
                >
                  {category}
                </Badge>
              </Link>
            ))}
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">Find more projects in these tags</p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
