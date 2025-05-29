import { Metadata } from "next"
import { projects } from "@/lib/projects"
import _ from "lodash"

interface CategoryLayoutProps {
  params: Promise<{ category: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: CategoryLayoutProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const categoryName = categorySlug.replace(/-/g, " ")

  // Find projects in this category
  const categoryProjects = projects.filter((p) =>
    p.tags.some((cat) => cat.toLowerCase().replace(/\s+/g, "-") === categorySlug)
  )

  // Find the actual category name (with proper casing) from the projects
  const actualCategoryName =
    _.chain(projects)
      .flatMap((project) => project.tags)
      .find((cat) => cat.toLowerCase().replace(/\s+/g, "-") === categorySlug)
      .value() || categoryName

  const projectCount = categoryProjects.length

  if (projectCount === 0) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    }
  }

  const title = `${actualCategoryName} - Self-Hosted Open Source Projects`
  const description = `Discover ${projectCount} self-hosted open source ${actualCategoryName.toLowerCase()} projects. Compare features, licenses, and deployment options for ${actualCategoryName.toLowerCase()} software alternatives.`

  return {
    title: `${actualCategoryName} - SaaS Alternatives | OpenApps`,
    description: `Find cost-effective, privacy-respecting ${actualCategoryName.toLowerCase()} alternatives to popular SaaS tools. Compare features and deploy them yourself or through our managed services.`,
    keywords: [
      "SaaS alternatives",
      actualCategoryName.toLowerCase(),
      "cost-effective",
      "privacy-respecting",
      "self-hosted",
      "managed services",
      "docker",
      "kubernetes",
    ],
    authors: [{ name: "OpenApps" }],
    openGraph: {
      title: `${actualCategoryName} - SaaS Alternatives`,
      description: `Find cost-effective, privacy-respecting ${actualCategoryName.toLowerCase()} alternatives to popular SaaS tools.`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `/categories/${categorySlug}`,
    },
  }
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return children
}
