"use client";

import React from "react";
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

// Categories with Lucide icons and descriptions - matching the categories page
const categories = [
  {
    name: "Productivity",
    icon: <CheckCircle className="w-5 h-5" />,
    color: "blue",
    count: 42,
    description:
      "Task management, note-taking, document editing and collaboration tools",
    examples: ["Nextcloud", "OnlyOffice", "Standard Notes"],
  },
  {
    name: "File Storage",
    icon: <FolderArchive className="w-5 h-5" />,
    color: "amber",
    count: 18,
    description:
      "Cloud storage, file synchronization, and document management solutions",
    examples: ["Nextcloud", "Seafile", "Syncthing"],
  },
  {
    name: "Communication",
    icon: <MessageSquare className="w-5 h-5" />,
    color: "violet",
    count: 25,
    description:
      "Chat, messaging, video conferencing and team collaboration tools",
    examples: ["Mattermost", "Element", "Jitsi Meet"],
  },
  {
    name: "Development",
    icon: <Wrench className="w-5 h-5" />,
    color: "emerald",
    count: 37,
    description:
      "Code repositories, IDEs, CI/CD platforms and development tools",
    examples: ["Gitea", "GitLab", "Jenkins"],
  },
  {
    name: "Media",
    icon: <Film className="w-5 h-5" />,
    color: "red",
    count: 21,
    description: "Media streaming, photo management, and content libraries",
    examples: ["Jellyfin", "Plex", "Photoprism"],
  },
  {
    name: "Analytics",
    icon: <BarChart3 className="w-5 h-5" />,
    color: "purple",
    count: 14,
    description:
      "Website tracking, dashboards, and business intelligence tools",
    examples: ["Umami", "Metabase", "Grafana"],
  },
  {
    name: "Security",
    icon: <LockKeyhole className="w-5 h-5" />,
    color: "green",
    count: 23,
    description: "Password managers, authentication, and encryption solutions",
    examples: ["Bitwarden", "Vaultwarden", "Authelia"],
  },
  {
    name: "Automation",
    icon: <Settings className="w-5 h-5" />,
    color: "orange",
    count: 19,
    description:
      "Home automation, workflow automation, and scheduled task tools",
    examples: ["Home Assistant", "n8n", "Node-RED"],
  },
  {
    name: "Infrastructure",
    icon: <Server className="w-5 h-5" />,
    color: "slate",
    count: 30,
    description: "Server management, virtualization, and infrastructure tools",
    examples: ["Proxmox", "Docker", "Kubernetes"],
  },
  {
    name: "Databases",
    icon: <Database className="w-5 h-5" />,
    color: "cyan",
    count: 16,
    description:
      "SQL and NoSQL database solutions for storing and retrieving data",
    examples: ["PostgreSQL", "MongoDB", "MariaDB"],
  },
  {
    name: "Web",
    icon: <Globe className="w-5 h-5" />,
    color: "sky",
    count: 27,
    description: "Content management systems, blogs, and web hosting solutions",
    examples: ["WordPress", "Ghost", "Nginx"],
  },
  {
    name: "IoT",
    icon: <Zap className="w-5 h-5" />,
    color: "fuchsia",
    count: 12,
    description:
      "Internet of Things platforms for smart home and connected devices",
    examples: ["Home Assistant", "ESPHome", "Mosquitto"],
  },
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
  const categoryName =
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

  const category = categories.find(
    (cat) => cat.name.toLowerCase() === categorySlug.toLowerCase()
  );
  const colors = category
    ? getColorClasses(category.color)
    : getColorClasses("blue");

  // Filter projects by the current category

  const categoryProjects = projects.filter((p) =>
    p.categories.includes(categorySlug)
  );

  if (categoryProjects.length === 0) {
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
              <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4 max-w-2xl">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Star className="h-3 w-3" />
                  {categoryProjects.length} projects
                </Badge>
                <Badge variant="outline">Open Source</Badge>
                <Badge variant="outline">Self-Hostable</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Filters:
            </span>
            <Badge variant="outline" className="gap-1 cursor-pointer">
              Free Only
              <FilterX className="h-3 w-3 ml-1" />
            </Badge>
            <Badge variant="outline" className="gap-1 cursor-pointer">
              Easy Deployment
              <FilterX className="h-3 w-3 ml-1" />
            </Badge>
            <Button variant="ghost" size="sm" className="h-7 gap-1">
              <SlidersHorizontal className="h-3 w-3" />
              More Filters
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Sort:
            </span>
            <Select defaultValue="stars">
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stars">Most Stars</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="difficulty-asc">Easiest First</SelectItem>
                <SelectItem value="difficulty-desc">Advanced First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {categoryProjects.length > 0 ? (
            categoryProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                We don't have any projects listed for this category yet.
              </p>
              <Button variant="outline" size="sm">
                Request a Project
              </Button>
            </div>
          )}
        </div>

        {/* Alternative Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Related Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories
              .filter((cat) => cat.name !== category.name)
              .slice(0, 4)
              .map((relatedCat) => {
                const catColors = getColorClasses(relatedCat.color);
                return (
                  <Link
                    href={`/categories/${relatedCat.name.toLowerCase()}`}
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
                            <h3 className="font-medium text-sm">
                              {relatedCat.name}
                            </h3>
                            <div className="text-xs text-neutral-500">
                              {relatedCat.count} projects
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
              <h2 className="text-xl font-bold mb-2">
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
    </div>
  );
}
