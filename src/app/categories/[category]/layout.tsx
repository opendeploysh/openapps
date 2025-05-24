import { Metadata } from "next";
import { projects } from "@/lib/projects";
import _ from "lodash";

interface CategoryLayoutProps {
  params: {
    category: string;
  };
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const categorySlug = params.category;
  const categoryName = categorySlug.replace(/-/g, " ");

  // Find projects in this category
  const categoryProjects = projects.filter((p) =>
    p.categories.some(
      (cat) => cat.toLowerCase().replace(/\s+/g, "-") === categorySlug
    )
  );

  // Find the actual category name (with proper casing) from the projects
  const actualCategoryName =
    _.chain(projects)
      .flatMap((project) => project.categories)
      .find((cat) => cat.toLowerCase().replace(/\s+/g, "-") === categorySlug)
      .value() || categoryName;

  const projectCount = categoryProjects.length;

  if (projectCount === 0) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  const title = `${actualCategoryName} - Self-Hosted Open Source Projects`;
  const description = `Discover ${projectCount} self-hosted open source ${actualCategoryName.toLowerCase()} projects. Compare features, licenses, and deployment options for ${actualCategoryName.toLowerCase()} software alternatives.`;

  return {
    title,
    description,
    keywords: [
      `${actualCategoryName.toLowerCase()} software`,
      `self-hosted ${actualCategoryName.toLowerCase()}`,
      `open source ${actualCategoryName.toLowerCase()}`,
      `${actualCategoryName.toLowerCase()} alternatives`,
      `${actualCategoryName.toLowerCase()} projects`,
      "self-hosted",
      "open source",
      "privacy",
      "deployment",
      actualCategoryName.toLowerCase(),
    ].join(", "),
    authors: [{ name: "OSS Finder" }],
    openGraph: {
      title,
      description,
      type: "website",
      url: `/categories/${categorySlug}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `/categories/${categorySlug}`,
    },
  };
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return children;
}
