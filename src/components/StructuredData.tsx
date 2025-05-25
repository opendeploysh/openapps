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
  name: "Hostable.tools",
  url: "https://hostable.tools",
  description:
    "Find cost-effective, privacy-respecting alternatives to popular SaaS tools. Compare features, and deploy them yourself or through our managed services.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://hostable.tools/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  sameAs: [
    "https://github.com/hostable-tools",
    "https://twitter.com/hostabletools",
  ],
};

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData;

  switch (type) {
    case "website":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Hostable.tools",
        description:
          "Find cost-effective, privacy-respecting alternatives to popular SaaS tools. Compare features, and deploy them yourself or through our managed services.",
        url: "https://hostable.tools",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://hostable.tools/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
        sameAs: [
          "https://github.com/hostable-tools",
          "https://twitter.com/hostabletools",
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
          url: `https://hostable.tools/projects/${project.slug}`,
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
            url: `https://hostable.tools/projects/${project.slug}`,
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
          name: `${data.category} - SaaS Alternatives`,
          description: `Find cost-effective, privacy-respecting ${data.category.toLowerCase()} alternatives to popular SaaS tools.`,
          url: `https://hostable.tools/categories/${data.category.toLowerCase()}`,
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
                item: "https://hostable.tools",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Categories",
                item: "https://hostable.tools/categories",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: data.category,
                item: `https://hostable.tools/categories/${data.category.toLowerCase()}`,
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
    url: `https://hostable.tools/projects/${project.slug}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    softwareVersion: "Latest",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: `https://hostable.tools/projects/${project.slug}`,
    },
    provider: {
      "@type": "Organization",
      name: "Hostable.tools",
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
    url: `https://hostable.tools/categories/${data.category.toLowerCase()}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: data.projects?.length || 0,
      itemListElement: data.projects?.map((project: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://hostable.tools/projects/${project.slug}`,
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
    name: "Hostable.tools",
    url: "https://hostable.tools",
    description:
      "Find cost-effective, privacy-respecting alternatives to popular SaaS tools. Compare features, and deploy them yourself or through our managed services.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://hostable.tools/search?q={search_term_string}",
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
        item: "https://hostable.tools",
        name: "Home",
      },
      {
        "@type": "ListItem",
        position: 2,
        item: "https://hostable.tools/categories",
        name: "Categories",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 3,
        item: `https://hostable.tools/categories/${item.category.toLowerCase()}`,
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
