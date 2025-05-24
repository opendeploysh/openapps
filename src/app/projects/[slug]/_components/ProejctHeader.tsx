import React from "react";
import Image from "next/image";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import {
  Star,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  GitFork,
  Eye,
  Heart,
  Github,
  Globe,
} from "lucide-react";
import {
  getProjectPopularity,
  ProjectMeta,
  projects,
  projectsWithGitHubData,
} from "@/lib/projects";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import Link from "next/link";

const difficultyColors = {
  Easy: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20",
  Medium:
    "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20",
  Advanced: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20",
};

const difficultyIcons = {
  Easy: <CheckCircle className="w-4 h-4" />,
  Medium: <AlertCircle className="w-4 h-4" />,
  Advanced: <Shield className="w-4 h-4" />,
};

export const ProjectHeader: React.FC<ProjectMeta> = (project) => {
  const githubData = projectsWithGitHubData[project.slug];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <img
            src={project.logo}
            alt={project.name}
            className="object-cover rounded-lg w-10 h-10"
          />
          <h1 className="text-3xl font-bold">{project.name}</h1>
        </div>
        <div className="flex gap-2">
          {project.github && (
            <a
              href={`https://github.com/${project.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}
          {project.websiteUrl && (
            <>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
              >
                <Globe className="w-4 h-4" />
                Website
              </a>
            </>
          )}
          {project.discord && (
            <>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <a
                href={project.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
              >
                <SiDiscord className="w-4 h-4" />
                Discord
              </a>
            </>
          )}
        </div>
      </div>

      <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {project.description}
      </p>

      <div className="grid grid-cols-3 gap-8 text-sm">
        <div className="space-y-2">
          <div className="font-semibold">Self-hosted alternative to:</div>
          <div className="flex flex-wrap gap-2">
            {project.alternatives.nonSelfHosted?.map((alternative) => {
              const project = projects.find(
                (p) => p.slug.toLowerCase() === alternative.toLowerCase()
              );
              if (!project) return null;
              return (
                <Link
                  href={`/projects/${project.slug}`}
                  key={alternative}
                  className={badgeVariants({
                    variant: "outline",
                    className: "text-sm flex items-center gap-2",
                  })}
                >
                  <img
                    src={project.logo}
                    alt={project?.name}
                    className="rounded-full"
                  />
                  {project?.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="space-y-2">
          <div className="font-semibold">Repository activity:</div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              Stars
            </div>

            <div className="border-t flex-grow" />
            <span className="font-medium">
              {githubData.stargazers_count?.toLocaleString() ?? 0}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4 text-green-500" />
              Forks
            </div>

            <div className="border-t flex-grow" />
            <span className="font-medium">
              {githubData.forks?.toLocaleString() ?? 0}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-purple-500" />
              Watchers
            </div>

            <div className="border-t flex-grow" />
            <span className="font-medium">
              {githubData.subscribers_count?.toLocaleString() ?? 0}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Open Issues
            </div>

            <div className="border-t flex-grow" />
            <span className="font-medium">
              {githubData.open_issues_count?.toLocaleString() ?? 0}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-500" />
              Last commit
            </div>

            <div className="border-t flex-grow" />
            <span className="font-medium">
              {githubData.lastCommitDate
                ? formatDistanceToNow(new Date(githubData.lastCommitDate), {
                    addSuffix: true,
                  })
                : "Unknown"}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="font-semibold">Details:</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">Estimated Popularity</div>

            <div className="border-t flex-grow" />
            <span className="font-medium">
              {getProjectPopularity(project.slug)}{" "}
              <span className="text-xs text-muted-foreground">/ 100</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span>License</span>
            </div>

            <div className="border-t flex-grow" />
            <span className="font-medium">
              {project.license ?? githubData.license?.spdx_id ?? "Proprietary"}
            </span>
          </div>
          {project.deployment && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span>Deployment Difficulty</span>
              </div>

              <div className="border-t flex-grow" />
              <span className="font-medium flex items-center gap-1">
                {difficultyIcons[project.deployment.difficulty]}
                <span>{project.deployment.difficulty}</span>
              </span>
            </div>
          )}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span>Language</span>
            </div>

            <div className="border-t flex-grow" />
            <span className="font-medium">{githubData.language}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
