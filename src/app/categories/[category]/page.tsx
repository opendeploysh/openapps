import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { CategoryHeader } from "./_components/CategoryHeader"
import { RelatedCategories } from "./_components/RelatedCategories"
import { ContributeCTA } from "./_components/ContributeCTA"
import { ProjectsGrid } from "./_components/ProjectsGrid"
import { GitHubContributeButton } from "@/components/GitHubEditButton"
import {
  getAllCategoriesData,
  getCategoryProjects,
  findCategoryDataBySlug,
  getColorClasses,
} from "@/lib/category-utils"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

// Generate metadata for the page
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const category = findCategoryDataBySlug(categorySlug)
  const baseCategoryProjects = getCategoryProjects(categorySlug)

  if (!category)
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    }

  return {
    title: `${category.name} Projects - Open Source Self-Hosted Apps`,
    description: `Discover ${
      baseCategoryProjects.length
    } open source ${category.name.toLowerCase()} projects that you can self-host. Find alternatives to popular commercial services.`,
    keywords: [
      category.name.toLowerCase(),
      "open source",
      "self-hosted",
      "projects",
      "alternatives",
      ...category.name.toLowerCase().split(" "),
    ],
    openGraph: {
      title: `${category.name} Projects - Open Source Self-Hosted Apps`,
      description: `Discover ${
        baseCategoryProjects.length
      } open source ${category.name.toLowerCase()} projects that you can self-host.`,
      type: "website",
      url: `/categories/${categorySlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Projects - Open Source Self-Hosted Apps`,
      description: `Discover ${
        baseCategoryProjects.length
      } open source ${category.name.toLowerCase()} projects that you can self-host.`,
    },
  }
}

// Generate static params for all categories
export async function generateStaticParams() {
  const allCategories = getAllCategoriesData()

  return allCategories.map((category) => ({
    category: category.name.toLowerCase().replace(/\s+/g, "-"),
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params

  // Get category data and projects server-side
  const category = findCategoryDataBySlug(categorySlug)
  const baseCategoryProjects = getCategoryProjects(categorySlug)
  const allCategories = getAllCategoriesData()

  console.log(baseCategoryProjects)

  // Handle case where category doesn't exist
  if (!category) {
    notFound()
  }

  const colors = getColorClasses(category.color)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />
      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Back to categories link and edit button */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/categories">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Categories
            </Button>
          </Link>

          <div className="flex gap-2">
            <GitHubContributeButton variant="outline" size="sm">
              Add a project
            </GitHubContributeButton>
          </div>
        </div>

        {/* Category Header */}
        <CategoryHeader category={category} projectCount={baseCategoryProjects.length} colors={colors} />

        {/* Projects Grid with Client-side Filtering */}
        <ProjectsGrid baseCategoryProjects={baseCategoryProjects} categoryName={category.name} />

        {/* Related Categories */}
        <RelatedCategories
          allCategories={allCategories}
          currentCategoryName={category.name}
          getColorClasses={getColorClasses}
        />

        {/* Contribute CTA */}
        <ContributeCTA categoryName={category.name} />
      </div>
      <Footer />
    </div>
  )
}
