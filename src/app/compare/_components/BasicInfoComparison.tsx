import { ProjectMeta, projectsWithGitHubData } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { GitFork, Star, X } from "lucide-react";

interface BasicInfoComparisonProps {
  project1: ProjectMeta;
  project2: ProjectMeta;
  onClear: () => void;
}

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

export function BasicInfoComparison({
  project1,
  project2,
  onClear,
}: BasicInfoComparisonProps) {
  const comparisonRows = [
    {
      label: "Categories",
      key: "categories",
      render: (project: ProjectMeta) => (
        <div className="flex flex-wrap gap-1">
          {project.categories.slice(0, 2).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
          {project.categories.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{project.categories.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      label: "License",
      key: "license",
      render: (project: ProjectMeta) => {
        const github = projectsWithGitHubData?.[project.slug] ?? null;
        const license = project.license ?? github?.license?.name ?? "Unknown";
        return <span className="text-sm">{license}</span>;
      },
    },
    {
      label: "Language",
      key: "language",
      render: (project: ProjectMeta) => {
        const github = projectsWithGitHubData?.[project.slug] ?? null;
        const language = project.language ?? github?.language ?? "Unknown";
        return <span className="text-sm">{language}</span>;
      },
    },
    {
      label: "Stars",
      key: "popularity",
      render: (project: ProjectMeta) => {
        const github = projectsWithGitHubData?.[project.slug] ?? null;
        const stars = github?.stargazers_count ?? 0;
        return (
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500" />
            <span className="text-sm">
              {stars.toLocaleString() ?? "Unknown"}
            </span>
          </div>
        );
      },
    },
    {
      label: "Difficulty",
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
      render: (project: ProjectMeta) =>
        project.github ? (
          <Link
            href={`https://github.com/${project.github}`}
            target="_blank"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1"
          >
            <GitFork className="w-3 h-3" />
            GitHub
          </Link>
        ) : (
          <span className="text-neutral-500 text-sm">Unknown</span>
        ),
    },
  ];

  return (
    <Card className="p-0 gap-0">
      <div className="flex justify-between items-center p-4 border-b border-neutral-200 dark:border-neutral-800">
        <h2 className="text-lg font-bold">Basic Information</h2>
        <Button variant="outline" size="sm" onClick={onClear}>
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
              <th className="text-left p-3 font-medium text-neutral-600 dark:text-neutral-400 text-sm">
                Feature
              </th>
              <th className="text-left p-3 font-medium text-sm">
                {project1.name}
              </th>
              <th className="text-left p-3 font-medium text-sm">
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
                    ? "bg-white dark:bg-neutral-950"
                    : "bg-neutral-50/50 dark:bg-neutral-900/20"
                }`}
              >
                <td className="p-3 font-medium text-neutral-600 dark:text-neutral-400 text-sm">
                  {row.label}
                </td>
                <td className="p-3">{row.render(project1)}</td>
                <td className="p-3">{row.render(project2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
