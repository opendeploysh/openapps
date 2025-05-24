import { ProjectMeta } from "@/lib/projects";

interface StructuredDataProps {
  type: "website" | "project" | "category";
  data?: {
    project?: ProjectMeta;
    category?: string;
    projectCount?: number;
  };
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData;

  switch (type) {
    case "website":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "OSS Finder",
        description:
          "Discover and explore self-hostable open-source alternatives to popular proprietary software",
        url: "https://ossfinder.com",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://ossfinder.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
        sameAs: [
          "https://github.com/ossfinder",
          "https://twitter.com/ossfinder",
        ],
      };
      break;

    case "project":
      if (data?.project) {
        const project = data.project;
        structuredData = {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: project.name,
          description: project.description,
          url: `https://ossfinder.com/projects/${project.slug}`,
          applicationCategory: project.primaryCategory,
          operatingSystem: "Linux, Windows, macOS",
          softwareVersion: "Latest",
          license: project.license || "Open Source",
          programmingLanguage: project.language,
          codeRepository: project.github
            ? `https://github.com/${project.github}`
            : undefined,
          downloadUrl: project.github
            ? `https://github.com/${project.github}`
            : undefined,
          softwareHelp: {
            "@type": "CreativeWork",
            url: `https://ossfinder.com/projects/${project.slug}`,
          },
          applicationSubCategory: project.categories,
          featureList: project.alternatives?.nonSelfHosted || [],
          screenshot: project.heroImage || undefined,
          aggregateRating: project.popularity
            ? {
                "@type": "AggregateRating",
                ratingValue: Math.min(
                  5,
                  Math.max(1, (project.popularity / 20000) * 5)
                ),
                bestRating: 5,
                worstRating: 1,
                ratingCount: project.popularity,
              }
            : undefined,
        };
      }
      break;

    case "category":
      if (data?.category && data?.projectCount) {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${data.category} - Open Source Projects`,
          description: `Collection of ${
            data.projectCount
          } open source ${data.category.toLowerCase()} projects`,
          url: `https://ossfinder.com/categories/${data.category
            .toLowerCase()
            .replace(/\s+/g, "-")}`,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: data.projectCount,
            itemListElement: [],
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://ossfinder.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Categories",
                item: "https://ossfinder.com/categories",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: data.category,
                item: `https://ossfinder.com/categories/${data.category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`,
              },
            ],
          },
        };
      }
      break;
  }

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}
