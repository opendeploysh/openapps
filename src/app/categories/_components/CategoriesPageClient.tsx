"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/projects";
import {
  Layout,
  ChevronLeft,
  MessageSquare,
  Wrench,
  Film,
  BarChart3,
  LockKeyhole,
  Settings,
  Zap,
  Server,
  Database,
  Globe,
  Search,
  ArrowRight,
  Clock,
  ShieldCheck,
  Smartphone,
  FileText,
  RefreshCw,
  BarChart,
  Code,
  LineChart,
  Pencil,
  Mail,
  Users,
  Keyboard,
  Headphones,
  MoveRight,
  Info,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  GitHubEditButton,
  GitHubContributeButton,
} from "@/components/GitHubEditButton";
import _ from "lodash";

// Icon mapping for tags
const categoryIcons: Record<string, React.ReactNode> = {
  "Developer Tools": <Code className="w-4 h-4" />,
  Communication: <MessageSquare className="w-4 h-4" />,
  Database: <Database className="w-4 h-4" />,
  Cybersecurity: <ShieldCheck className="w-4 h-4" />,
  "E-commerce": <Smartphone className="w-4 h-4" />,
  Automation: <Settings className="w-4 h-4" />,
  Documentation: <FileText className="w-4 h-4" />,
  Video: <Film className="w-4 h-4" />,
  Analytics: <BarChart3 className="w-4 h-4" />,
  Notetaking: <Pencil className="w-4 h-4" />,
  Design: <Pencil className="w-4 h-4" />,
  CMS: <Globe className="w-4 h-4" />,
  "Social Media": <Users className="w-4 h-4" />,
  "Project Management": <Clock className="w-4 h-4" />,
  "Auth & SSO": <LockKeyhole className="w-4 h-4" />,
  "Internal Tools": <Wrench className="w-4 h-4" />,
  "Product Management": <RefreshCw className="w-4 h-4" />,
  "Password Managers": <LockKeyhole className="w-4 h-4" />,
  CRM: <Users className="w-4 h-4" />,
  "Enterprise Search": <Search className="w-4 h-4" />,
  "API Platform": <Code className="w-4 h-4" />,
  "Platform as a Service": <Server className="w-4 h-4" />,
  Monitoring: <LineChart className="w-4 h-4" />,
  Deployment: <RefreshCw className="w-4 h-4" />,
  Gaming: <Headphones className="w-4 h-4" />,
  Community: <Users className="w-4 h-4" />,
  Music: <Headphones className="w-4 h-4" />,
  "Backend Service": <Server className="w-4 h-4" />,
  Utilities: <Wrench className="w-4 h-4" />,
  Finances: <BarChart className="w-4 h-4" />,
  Scheduling: <Clock className="w-4 h-4" />,
  Cloud: <Globe className="w-4 h-4" />,
  "Visual Database": <Database className="w-4 h-4" />,
  "ML Ops": <LineChart className="w-4 h-4" />,
  "ETL/ELT": <RefreshCw className="w-4 h-4" />,
  "3D Modelling": <Pencil className="w-4 h-4" />,
  IoT: <Zap className="w-4 h-4" />,
  "Email Marketing": <Mail className="w-4 h-4" />,
};

// Default colors for tags
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
  "blue",
  "cyan",
  "green",
  "slate",
  "violet",
  "amber",
  "emerald",
  "blue",
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
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-600",
      darkBg: "dark:bg-indigo-900/30",
      darkText: "dark:text-indigo-400",
      hover: "hover:bg-indigo-200 dark:hover:bg-indigo-900/50",
    },
    gray: {
      bg: "bg-gray-100",
      text: "text-gray-600",
      darkBg: "dark:bg-gray-900/30",
      darkText: "dark:text-gray-400",
      hover: "hover:bg-gray-200 dark:hover:bg-gray-800/50",
    },
  };

  return colorMap[color] || colorMap.blue;
};

export function CategoriesPageClient() {
  const sortedCategories = useMemo(() => {
    const categoryCount = _.chain(projects)
      .flatMap((project) => project.tags)
      .countBy()
      .value();

    return _.chain(categoryCount)
      .entries()
      .map(([name, count]) => ({
        name,
        count,
        icon: categoryIcons[name] || <Code className="w-4 h-4" />,
        color:
          categoryColors[Math.floor(Math.random() * categoryColors.length)],
      }))
      .orderBy(["count"], ["desc"])
      .value();
  }, []);

  const mainCats = sortedCategories.slice(0, 20);
  const additionalCats = sortedCategories.slice(20);

  // Group main tags into 2 columns
  const mainCategoriesGrouped = _.chunk(
    mainCats,
    Math.ceil(mainCats.length / 2)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />
      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Back to home link and edit button */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge
              variant="outline"
              className="px-3 py-1 text-xs bg-white dark:bg-neutral-900"
            >
              <Layout className="h-3 w-3 text-neutral-700 dark:text-neutral-300 mr-1" />
              Categories
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Open Source Projects by Category
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-6">
            Discover self-hostable open source projects organized by category.
            Browse through {sortedCategories.length} different categories with{" "}
            {projects.length} total projects.
          </p>
        </div>

        {/* Main Categories Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Top Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {mainCategoriesGrouped.map((categoryGroup, groupIndex) => (
              <div key={groupIndex} className="space-y-6">
                {categoryGroup.map((category) => (
                  <Link
                    href={`/categories/${category.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/&/g, "and")}`}
                    key={category.name}
                    className="block"
                  >
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-md flex items-center justify-center ${
                            getColorClasses(category.color).bg
                          } ${getColorClasses(category.color).darkBg}`}
                        >
                          <div
                            className={`${
                              getColorClasses(category.color).text
                            } ${getColorClasses(category.color).darkText}`}
                          >
                            {category.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {category.name}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {category.count} projects
                        </Badge>
                        <MoveRight className="h-4 w-4 text-neutral-400 dark:text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Categories */}
        {additionalCats.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">More Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {additionalCats.map((category) => (
                <Link
                  href={`/categories/${category.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/&/g, "and")}`}
                  key={category.name}
                  className="block"
                >
                  <div className="flex items-center justify-between group p-3 rounded-md border border-neutral-200 dark:border-neutral-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center ${
                          getColorClasses(category.color).bg
                        } ${getColorClasses(category.color).darkBg}`}
                      >
                        <div
                          className={`${getColorClasses(category.color).text} ${
                            getColorClasses(category.color).darkText
                          }`}
                        >
                          {category.icon}
                        </div>
                      </div>
                      <h3 className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Contribution section */}
        <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                Missing a category?
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                Categories are automatically generated from project tags. To add
                a new category, contribute a project with new tags or suggest
                improvements to existing projects.
              </p>
              <div className="flex gap-2">
                <GitHubContributeButton
                  variant="default"
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Add a project
                </GitHubContributeButton>
                <GitHubEditButton
                  filePath="src/lib/categories.ts"
                  variant="outline"
                  size="sm"
                  className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-600 dark:text-green-300 dark:hover:bg-green-900/30"
                >
                  Edit categories
                </GitHubEditButton>
              </div>
            </div>
          </div>
        </div>

        {/* Request new category */}
        <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 text-center mb-8">
          <h2 className="text-xl font-bold mb-2">
            Can't find what you're looking for?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-4">
            If you need a specific category that's not listed here, let us know
            and we'll consider adding it to our collection.
          </p>
          <GitHubContributeButton size="sm" className="gap-1">
            Request a Category
          </GitHubContributeButton>
        </div>
      </div>
      <Footer />
    </div>
  );
}
