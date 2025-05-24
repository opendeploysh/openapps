"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Layout,
  ChevronLeft,
  CheckCircle,
  FolderArchive,
  MessageSquare,
  Wrench,
  Film,
  BarChart3,
  LockKeyhole,
  Settings,
  Server,
  Database,
  Globe,
  Zap,
  ArrowRight,
  Star,
  GitFork,
  FilterX,
  SlidersHorizontal,
  ArrowUpDown,
  Info,
  Code,
  ShieldCheck,
  Smartphone,
  FileText,
  RefreshCw,
  BarChart,
  LineChart,
  Pencil,
  Mail,
  Users,
  Clock,
  Search,
  Headphones,
} from "lucide-react";
import { useParams } from "next/navigation";
import { ProjectCard } from "@/components/ProjectCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projects } from "@/lib/projects";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectFilters, FilterOption } from "@/components/filters";
import { matchSorter } from "match-sorter";
import _ from "lodash";

// Icon mapping for categories
const categoryIcons: Record<string, React.ReactNode> = {
  "Developer Tools": <Code className="w-5 h-5" />,
  Communication: <MessageSquare className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Cybersecurity: <ShieldCheck className="w-5 h-5" />,
  "E-commerce": <Smartphone className="w-5 h-5" />,
  Automation: <Settings className="w-5 h-5" />,
  Documentation: <FileText className="w-5 h-5" />,
  Video: <Film className="w-5 h-5" />,
  Analytics: <BarChart3 className="w-5 h-5" />,
  Notetaking: <Pencil className="w-5 h-5" />,
  Design: <Pencil className="w-5 h-5" />,
  CMS: <Globe className="w-5 h-5" />,
  "Social Media": <Users className="w-5 h-5" />,
  "Project Management": <Clock className="w-5 h-5" />,
  "Auth & SSO": <LockKeyhole className="w-5 h-5" />,
  "Internal Tools": <Wrench className="w-5 h-5" />,
  "Product Management": <RefreshCw className="w-5 h-5" />,
  "Password Managers": <LockKeyhole className="w-5 h-5" />,
  CRM: <Users className="w-5 h-5" />,
  "Enterprise Search": <Search className="w-5 h-5" />,
  "API Platform": <Code className="w-5 h-5" />,
  "Platform as a Service": <Server className="w-5 h-5" />,
  Monitoring: <LineChart className="w-5 h-5" />,
  Deployment: <RefreshCw className="w-5 h-5" />,
  Gaming: <Headphones className="w-5 h-5" />,
  Community: <Users className="w-5 h-5" />,
  Music: <Headphones className="w-5 h-5" />,
  "Backend Service": <Server className="w-5 h-5" />,
  Utilities: <Wrench className="w-5 h-5" />,
  Finances: <BarChart className="w-5 h-5" />,
  Scheduling: <Clock className="w-5 h-5" />,
  Cloud: <Globe className="w-5 h-5" />,
  "Visual Database": <Database className="w-5 h-5" />,
  "ML Ops": <LineChart className="w-5 h-5" />,
  "ETL/ELT": <RefreshCw className="w-5 h-5" />,
  "3D Modelling": <Pencil className="w-5 h-5" />,
  IoT: <Zap className="w-5 h-5" />,
  "Email Marketing": <Mail className="w-5 h-5" />,
  // Add more common category mappings
  business: <BarChart className="w-5 h-5" />,
  finance: <BarChart className="w-5 h-5" />,
  accounting: <BarChart className="w-5 h-5" />,
  invoicing: <FileText className="w-5 h-5" />,
  media: <Film className="w-5 h-5" />,
  storage: <Database className="w-5 h-5" />,
  backup: <Server className="w-5 h-5" />,
  encryption: <LockKeyhole className="w-5 h-5" />,
  containers: <Server className="w-5 h-5" />,
  registry: <Database className="w-5 h-5" />,
  security: <ShieldCheck className="w-5 h-5" />,
  devops: <Wrench className="w-5 h-5" />,
  monitoring: <LineChart className="w-5 h-5" />,
  observability: <BarChart3 className="w-5 h-5" />,
  visualization: <BarChart3 className="w-5 h-5" />,
  collaboration: <Users className="w-5 h-5" />,
  automation: <Settings className="w-5 h-5" />,
  workflow: <Settings className="w-5 h-5" />,
  social: <Users className="w-5 h-5" />,
  messenger: <MessageSquare className="w-5 h-5" />,
  chat: <MessageSquare className="w-5 h-5" />,
  streaming: <Film className="w-5 h-5" />,
  photos: <Film className="w-5 h-5" />,
  photography: <Film className="w-5 h-5" />,
};

// Default colors for categories
const categoryColors = [
  "blue",
  "violet",
  "cyan",
  "green",
  "amber",
  "orange",
  "sky",
  "red",
  "purple",
  "slate",
  "fuchsia",
  "emerald",
];

// Color utility function
const getColorClasses = (color: string) => {
  const colorMap: {
    [key: string]: {
      bg: string;
      text: string;
      darkBg: string;
      darkText: string;
      hover: string;
    };
  } = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      darkBg: "dark:bg-blue-900/30",
      darkText: "dark:text-blue-400",
      hover: "hover:bg-blue-200 dark:hover:bg-blue-900/50",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      darkBg: "dark:bg-amber-900/30",
      darkText: "dark:text-amber-400",
      hover: "hover:bg-amber-200 dark:hover:bg-amber-900/50",
    },
    violet: {
      bg: "bg-violet-100",
      text: "text-violet-600",
      darkBg: "dark:bg-violet-900/30",
      darkText: "dark:text-violet-400",
      hover: "hover:bg-violet-200 dark:hover:bg-violet-900/50",
    },
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      darkBg: "dark:bg-emerald-900/30",
      darkText: "dark:text-emerald-400",
      hover: "hover:bg-emerald-200 dark:hover:bg-emerald-900/50",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
      darkBg: "dark:bg-red-900/30",
      darkText: "dark:text-red-400",
      hover: "hover:bg-red-200 dark:hover:bg-red-900/50",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      darkBg: "dark:bg-purple-900/30",
      darkText: "dark:text-purple-400",
      hover: "hover:bg-purple-200 dark:hover:bg-purple-900/50",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      darkBg: "dark:bg-green-900/30",
      darkText: "dark:text-green-400",
      hover: "hover:bg-green-200 dark:hover:bg-green-900/50",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      darkBg: "dark:bg-orange-900/30",
      darkText: "dark:text-orange-400",
      hover: "hover:bg-orange-200 dark:hover:bg-orange-900/50",
    },
    slate: {
      bg: "bg-slate-100",
      text: "text-slate-600",
      darkBg: "dark:bg-slate-800/50",
      darkText: "dark:text-slate-400",
      hover: "hover:bg-slate-200 dark:hover:bg-slate-800/70",
    },
    cyan: {
      bg: "bg-cyan-100",
      text: "text-cyan-600",
      darkBg: "dark:bg-cyan-900/30",
      darkText: "dark:text-cyan-400",
      hover: "hover:bg-cyan-200 dark:hover:bg-cyan-900/50",
    },
    sky: {
      bg: "bg-sky-100",
      text: "text-sky-600",
      darkBg: "dark:bg-sky-900/30",
      darkText: "dark:text-sky-400",
      hover: "hover:bg-sky-200 dark:hover:bg-sky-900/50",
    },
    fuchsia: {
      bg: "bg-fuchsia-100",
      text: "text-fuchsia-600",
      darkBg: "dark:bg-fuchsia-900/30",
      darkText: "dark:text-fuchsia-400",
      hover: "hover:bg-fuchsia-200 dark:hover:bg-fuchsia-900/50",
    },
  };

  return colorMap[color] || colorMap.blue;
};

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;

  // Filter state
  const [searchResults, setSearchResults] = useState<typeof projects | null>(
    null
  );
  const [activeDifficultyFilters, setActiveDifficultyFilters] = useState<
    string[]
  >([]);
  const [sortOrder, setSortOrder] = useState("stars");

  // Convert slug back to category name (reverse the slug transformation)
  const categoryName = categorySlug.replace(/-/g, " ");

  // Generate categories dynamically from project data
  const allCategories = _.chain(projects)
    .flatMap((project) => project.categories)
    .uniq()
    .map((cat, index) => ({
      name: cat,
      icon: categoryIcons[cat] || <Code className="w-5 h-5" />,
      color: categoryColors[index % categoryColors.length],
      description: `Projects in the ${cat} category`,
    }))
    .value();

  // Find the current category by matching the slug
  const category = allCategories.find(
    (cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === categorySlug
  );

  const colors = category
    ? getColorClasses(category.color)
    : getColorClasses("blue");

  // Filter projects by the current category (matching original category names)
  const baseCategoryProjects = projects.filter((p) =>
    p.categories.some(
      (cat) => cat.toLowerCase().replace(/\s+/g, "-") === categorySlug
    )
  );

  // Difficulty filters based on available projects in this category
  const difficultyFilters: FilterOption[] = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Advanced", label: "Advanced" },
  ];

  // Apply search and filters
  const getFilteredProjects = () => {
    let filteredProjects = searchResults || baseCategoryProjects;

    // Apply difficulty filters
    if (activeDifficultyFilters.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        activeDifficultyFilters.includes(
          project.deployment?.difficulty || "Medium"
        )
      );
    }

    return filteredProjects;
  };

  // Sort projects
  const getSortedProjects = (projectList: typeof projects) => {
    const sorted = [...projectList];
    switch (sortOrder) {
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "stars":
        return sorted.sort((a, b) => {
          const aPopularity = a.popularity || 0;
          const bPopularity = b.popularity || 0;
          return bPopularity - aPopularity;
        });
      case "difficulty-asc":
        const difficultyOrder = { Easy: 1, Medium: 2, Advanced: 3 };
        return sorted.sort((a, b) => {
          const aDiff = difficultyOrder[a.deployment?.difficulty || "Medium"];
          const bDiff = difficultyOrder[b.deployment?.difficulty || "Medium"];
          return aDiff - bDiff;
        });
      case "difficulty-desc":
        const difficultyOrderDesc = { Easy: 3, Medium: 2, Advanced: 1 };
        return sorted.sort((a, b) => {
          const aDiff =
            difficultyOrderDesc[a.deployment?.difficulty || "Medium"];
          const bDiff =
            difficultyOrderDesc[b.deployment?.difficulty || "Medium"];
          return bDiff - aDiff;
        });
      default:
        return sorted;
    }
  };

  const filteredProjects = getFilteredProjects();
  const sortedProjects = getSortedProjects(filteredProjects);

  // Handle search within category
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    const searchResults = matchSorter(baseCategoryProjects, query, {
      keys: [
        { key: "name", threshold: matchSorter.rankings.WORD_STARTS_WITH },
        {
          key: "description",
          threshold: matchSorter.rankings.WORD_STARTS_WITH,
        },
        {
          key: "alternatives.nonSelfHosted",
          threshold: matchSorter.rankings.CONTAINS,
        },
        { key: "language", threshold: matchSorter.rankings.CONTAINS },
        { key: "license", threshold: matchSorter.rankings.CONTAINS },
      ],
    });

    setSearchResults(searchResults);
  };

  // Handle sorting
  const handleSort = (sortValue: string) => {
    setSortOrder(sortValue);
  };

  // Handle filtering
  const handleFilterChange = (filterType: string, values: string[]) => {
    if (filterType === "difficulty") {
      setActiveDifficultyFilters(values);
    }
  };

  // Handle case where category doesn't exist
  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
        <Navbar />
        <div className="container max-w-5xl mx-auto px-4 py-8">
          <Link href="/categories">
            <Button variant="ghost" size="sm" className="mb-6">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Categories
            </Button>
          </Link>

          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mb-4">
              <Info className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Category not found</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              The category you're looking for doesn't exist or may have been
              moved.
            </p>
            <Link href="/categories">
              <Button>Browse All Categories</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />
      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Back to categories link */}
        <Link href="/categories">
          <Button variant="ghost" size="sm" className="mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Categories
          </Button>
        </Link>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6">
            <div
              className={`h-16 w-16 rounded-lg ${colors.bg} ${colors.darkBg} flex items-center justify-center flex-shrink-0`}
            >
              <div className={`${colors.text} ${colors.darkText}`}>
                {category.icon}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2 capitalize">
                {category.name}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4 max-w-2xl">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Star className="h-3 w-3" />
                  {baseCategoryProjects.length} projects
                </Badge>
                <Badge variant="outline">Open Source</Badge>
                <Badge variant="outline">Self-Hostable</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <ProjectFilters
          onSearch={handleSearch}
          onSort={handleSort}
          onFilterChange={handleFilterChange}
          sortValue={sortOrder}
          searchPlaceholder={`Search ${category.name.toLowerCase()} projects...`}
          difficultyFilters={difficultyFilters}
          activeDifficultyFilters={activeDifficultyFilters}
          showCategoryFilters={false}
          showPopularAlternatives={false}
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {sortedProjects.length > 0 ? (
            sortedProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Try adjusting your filters or search query.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchResults(null);
                  setActiveDifficultyFilters([]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Related Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Related Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {allCategories
              .filter((cat) => cat.name !== category.name)
              .slice(0, 8)
              .map((relatedCat) => {
                const catColors = getColorClasses(relatedCat.color);
                const relatedSlug = relatedCat.name
                  .toLowerCase()
                  .replace(/\s+/g, "-");
                const relatedProjectCount = projects.filter((p) =>
                  p.categories.some(
                    (cat) =>
                      cat.toLowerCase().replace(/\s+/g, "-") === relatedSlug
                  )
                ).length;

                return (
                  <Link
                    href={`/categories/${relatedSlug}`}
                    key={relatedCat.name}
                  >
                    <Card
                      className={`cursor-pointer transition-all ${catColors.hover} h-full`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 rounded-md ${catColors.bg} ${catColors.darkBg} flex items-center justify-center`}
                          >
                            <div
                              className={`${catColors.text} ${catColors.darkText}`}
                            >
                              {relatedCat.icon}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm capitalize">
                              {relatedCat.name}
                            </h3>
                            <div className="text-xs text-neutral-500">
                              {relatedProjectCount} projects
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
          </div>
        </div>

        {/* Contribute CTA */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="sm:flex-1">
              <h2 className="text-xl font-bold mb-2 capitalize">
                Know a great {category.name} project?
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Help us grow our collection by suggesting open source{" "}
                {category.name.toLowerCase()} projects for others to discover.
              </p>
            </div>
            <div>
              <Button className="gap-2">
                <GitFork className="h-4 w-4" />
                Suggest a Project
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
