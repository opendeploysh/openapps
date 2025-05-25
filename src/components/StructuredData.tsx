import { ProjectMeta } from "@/lib/projects";

interface StructuredDataProps {
  type: "website" | "project" | "category";
  data?: {
    project?: ProjectMeta;
    category?: string;
    projectCount?: number;
  };
}

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OpenApps",
  url: "https://openapps.sh",
  description:
    "Find cost-effective, privacy-respecting alternatives to popular SaaS tools. Compare features, and deploy them yourself or through our managed services.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://openapps.sh/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  sameAs: ["https://github.com/openapps-sh", "https://twitter.com/openapps_sh"],
};

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData;

  switch (type) {
    case "website":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "OpenApps",
        description:
          "Find cost-effective, privacy-respecting alternatives to popular SaaS tools. Compare features, and deploy them yourself or through our managed services.",
        url: "https://openapps.sh",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://openapps.sh/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
        sameAs: [
          "https://github.com/openapps-sh",
          "https://twitter.com/openapps_sh",
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
          url: `https://openapps.sh/projects/${project.slug}`,
          applicationCategory: project.category,
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
            url: `https://openapps.sh/projects/${project.slug}`,
          },
          applicationSubCategory: project.tags,
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
          name: `${data.category} - SaaS Alternatives`,
          description: `Find cost-effective, privacy-respecting ${data.category.toLowerCase()} alternatives to popular SaaS tools.`,
          url: `https://openapps.sh/tags/${data.category.toLowerCase()}`,
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
                item: "https://openapps.sh",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Categories",
                item: "https://openapps.sh/tags",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: data.category,
                item: `https://openapps.sh/tags/${data.category.toLowerCase()}`,
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

export function ProjectStructuredData({ project }: { project: ProjectMeta }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    url: `https://openapps.sh/projects/${project.slug}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    softwareVersion: "Latest",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: `https://openapps.sh/projects/${project.slug}`,
    },
    provider: {
      "@type": "Organization",
      name: "OpenApps",
    },
    inLanguage: "en",
    license: project.license || "Various",
    downloadUrl: project.github
      ? `https://github.com/${project.github}`
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function CategoryStructuredData({ data }: { data: any }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${data.category} - Self-Hosted Software`,
    description: `Discover the best self-hosted ${data.category.toLowerCase()} software alternatives.`,
    url: `https://openapps.sh/tags/${data.category.toLowerCase()}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: data.projects?.length || 0,
      itemListElement: data.projects?.map((project: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://openapps.sh/projects/${project.slug}`,
        name: project.name,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OpenApps",
    url: "https://openapps.sh",
    description:
      "Find cost-effective, privacy-respecting alternatives to popular SaaS tools. Compare features, and deploy them yourself or through our managed services.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://openapps.sh/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: any[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: "https://openapps.sh",
        name: "Home",
      },
      {
        "@type": "ListItem",
        position: 2,
        item: "https://openapps.sh/tags",
        name: "Categories",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 3,
        item: `https://openapps.sh/tags/${item.category.toLowerCase()}`,
        name: item.name,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
