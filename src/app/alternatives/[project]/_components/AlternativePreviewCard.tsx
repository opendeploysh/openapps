import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Star, ArrowRight } from "lucide-react"
import { getProjectLogo, ProjectMeta, projectsWithGitHubData } from "@/lib/projects"

interface AlternativePreviewCardProps {
  project: ProjectMeta
  ContentPreview?: React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
}

export const AlternativePreviewCard: React.FC<AlternativePreviewCardProps> = ({ project, ContentPreview }) => {
  const githubData = projectsWithGitHubData[project.slug]
  const logo = getProjectLogo(project.slug)
  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="p-0">
        <div className="flex items-center gap-4 p-6 pb-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center border">
            {logo ? (
              <img src={logo} alt={`${project.name} logo`} className="w-8 h-8 rounded" />
            ) : (
              <Code className="w-6 h-6 text-neutral-500" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{project.name}</h3>
            <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              {githubData?.stargazers_count && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  <span>{githubData.stargazers_count.toLocaleString()}</span>
                </div>
              )}
              {project.license && (
                <Badge variant="outline" className="text-xs">
                  {project.license}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Hero image if available */}
        {project.heroImage && (
          <div className="px-6">
            <img
              src={project.heroImage}
              alt={`${project.name} screenshot`}
              className="w-full h-48 object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        )}

        {/* Content preview with fade */}
        <div className="px-6">
          <div className="relative">
            <div className="text-neutral-600 dark:text-neutral-400 h-[350px] overflow-hidden">
              <div className="prose prose-sm dark:prose-invert max-w-none">{ContentPreview}</div>
            </div>
            {/* Fade overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-neutral-950 via-white/80 dark:via-neutral-950/80 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Read more link */}
        <div className="px-6 pb-6 bg-white dark:bg-neutral-950">
          <Link href={`/projects/${project.slug}`}>
            <Button variant="ghost" className="w-full justify-between group">
              Read more about {project.name}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
