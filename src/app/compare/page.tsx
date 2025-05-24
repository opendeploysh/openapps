"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  GitFork,
  Star,
  Calendar,
  Users,
  Shield,
  Code,
  ExternalLink,
  CheckCircle,
  X,
  ArrowRight,
  GitCompare,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { projects, ProjectMeta } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const [project1, setProject1] = useState<ProjectMeta | null>(null);
  const [project2, setProject2] = useState<ProjectMeta | null>(null);

  const availableProjects = projects.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Pre-select projects from URL parameters
  useEffect(() => {
    const project1Slug = searchParams.get("project1");
    const project2Slug = searchParams.get("project2");

    if (project1Slug) {
      const proj1 = projects.find((p) => p.slug === project1Slug);
      if (proj1) setProject1(proj1);
    }

    if (project2Slug) {
      const proj2 = projects.find((p) => p.slug === project2Slug);
      if (proj2) setProject2(proj2);
    }
  }, [searchParams]);

  const handleProject1Select = (slug: string) => {
    const project = projects.find((p) => p.slug === slug);
    if (project) setProject1(project);
  };

  const handleProject2Select = (slug: string) => {
    const project = projects.find((p) => p.slug === slug);
    if (project) setProject2(project);
  };

  const clearComparison = () => {
    setProject1(null);
    setProject2(null);
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "Unknown";
    }
  };

  const comparisonRows = [
    {
      label: "Project Name",
      key: "name",
      render: (project: ProjectMeta) => (
        <div className="font-semibold text-lg">{project.name}</div>
      ),
    },
    {
      label: "Description",
      key: "description",
      render: (project: ProjectMeta) => (
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          {project.description}
        </div>
      ),
    },
    {
      label: "Categories",
      key: "categories",
      render: (project: ProjectMeta) => (
        <div className="flex flex-wrap gap-1">
          {project.categories.slice(0, 3).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
          {project.categories.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.categories.length - 3} more
            </Badge>
          )}
        </div>
      ),
    },
    {
      label: "License",
      key: "license",
      render: (project: ProjectMeta) => (
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-neutral-500" />
          <span>{project.license || "Unknown"}</span>
        </div>
      ),
    },
    {
      label: "Language",
      key: "language",
      render: (project: ProjectMeta) => (
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-neutral-500" />
          <span>{project.language || "Unknown"}</span>
        </div>
      ),
    },
    {
      label: "Popularity",
      key: "popularity",
      render: (project: ProjectMeta) => (
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>{project.popularity?.toLocaleString() || "Unknown"}</span>
        </div>
      ),
    },
    {
      label: "Deployment Difficulty",
      key: "deploymentDifficulty",
      render: (project: ProjectMeta) => (
        <Badge className={getDifficultyColor(project.deployment?.difficulty)}>
          {project.deployment?.difficulty || "Unknown"}
        </Badge>
      ),
    },
    {
      label: "Repository",
      key: "repository",
      render: (project: ProjectMeta) => (
        <div className="flex items-center gap-2">
          <GitFork className="w-4 h-4 text-neutral-500" />
          {project.github ? (
            <Link
              href={`https://github.com/${project.github}`}
              target="_blank"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              GitHub
            </Link>
          ) : (
            <span className="text-neutral-500">Unknown</span>
          )}
        </div>
      ),
    },
    {
      label: "Alternatives To",
      key: "alternatives",
      render: (project: ProjectMeta) => (
        <div className="space-y-1">
          {project.alternatives?.nonSelfHosted &&
          project.alternatives.nonSelfHosted.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {project.alternatives.nonSelfHosted
                .slice(0, 3)
                .map((alt, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {alt}
                  </Badge>
                ))}
              {project.alternatives.nonSelfHosted.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{project.alternatives.nonSelfHosted.length - 3} more
                </Badge>
              )}
            </div>
          ) : (
            <span className="text-neutral-500 text-sm">None specified</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />

      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Back to home link */}
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge
              variant="outline"
              className="px-3 py-1 text-xs bg-white dark:bg-neutral-900"
            >
              <GitCompare className="h-3 w-3 text-blue-500 mr-1" />
              Compare
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Project Comparison
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Compare two self-hosted projects side by side to help you make
            informed decisions.
          </p>
        </div>

        {/* Project Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Project 1 Selection */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Select First Project</h3>
              <Select
                onValueChange={handleProject1Select}
                value={project1?.slug || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a project..." />
                </SelectTrigger>
                <SelectContent>
                  {availableProjects
                    .filter((p) => p.slug !== project2?.slug)
                    .map((project) => (
                      <SelectItem key={project.slug} value={project.slug}>
                        {project.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {project1 && (
                <div className="mt-4">
                  <ProjectCard {...project1} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Project 2 Selection */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Select Second Project</h3>
              <Select
                onValueChange={handleProject2Select}
                value={project2?.slug || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a project..." />
                </SelectTrigger>
                <SelectContent>
                  {availableProjects
                    .filter((p) => p.slug !== project1?.slug)
                    .map((project) => (
                      <SelectItem key={project.slug} value={project.slug}>
                        {project.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {project2 && (
                <div className="mt-4">
                  <ProjectCard {...project2} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        {project1 && project2 && (
          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="flex justify-between items-center p-6 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="text-xl font-bold">Detailed Comparison</h2>
                <Button variant="outline" size="sm" onClick={clearComparison}>
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800">
                      <th className="text-left p-4 font-medium text-neutral-600 dark:text-neutral-400">
                        Feature
                      </th>
                      <th className="text-left p-4 font-medium">
                        {project1.name}
                      </th>
                      <th className="text-left p-4 font-medium">
                        {project2.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, index) => (
                      <tr
                        key={row.key}
                        className={`border-b border-neutral-100 dark:border-neutral-800 ${
                          index % 2 === 0
                            ? "bg-neutral-50/50 dark:bg-neutral-900/20"
                            : ""
                        }`}
                      >
                        <td className="p-4 font-medium text-neutral-600 dark:text-neutral-400">
                          {row.label}
                        </td>
                        <td className="p-4">{row.render(project1)}</td>
                        <td className="p-4">{row.render(project2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Comparison Suggestions */}
        {!project1 || !project2 ? (
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Popular Comparisons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    project1: "nextcloud",
                    project2: "seafile",
                    label: "Nextcloud vs Seafile",
                  },
                  {
                    project1: "bitwarden",
                    project2: "vaultwarden",
                    label: "Bitwarden vs Vaultwarden",
                  },
                  {
                    project1: "gitea",
                    project2: "forgejo",
                    label: "Gitea vs Forgejo",
                  },
                  {
                    project1: "jellyfin",
                    project2: "plex",
                    label: "Jellyfin vs Plex",
                  },
                ].map((comparison, index) => {
                  const proj1 = projects.find(
                    (p) => p.slug === comparison.project1
                  );
                  const proj2 = projects.find(
                    (p) => p.slug === comparison.project2
                  );

                  if (!proj1 || !proj2) return null;

                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 justify-start"
                      onClick={() => {
                        setProject1(proj1);
                        setProject2(proj2);
                      }}
                    >
                      <div className="text-left">
                        <div className="font-medium">{comparison.label}</div>
                        <div className="text-xs text-neutral-500 mt-1">
                          Compare {proj1.name} and {proj2.name}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}
