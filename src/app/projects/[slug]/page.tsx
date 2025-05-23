import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  Github,
  ServerCog,
  Code,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Play,
  Info,
} from "lucide-react";
import { projects } from "@/lib/projects";

import { Navbar } from "@/components/Navbar";
import { ProjectHeader } from "./_components/ProejctHeader";
import { RelatedProjects } from "./_components/RelatedProjects";
import { useCompileFromSlug } from "@/mdx/render-projects";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
        <Navbar />
        <div className="container max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mb-4">
              <Info className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Project not found</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              The project you're looking for doesn't exist or may have been
              moved.
            </p>
            <Link href="/">
              <Button>Browse All Projects</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const mdxData = await useCompileFromSlug(slug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />

      <div className="container max-w-5xl mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Projects
          </Button>
        </Link>

        {/* Project Header */}
        <div className="mb-8">
          <ProjectHeader {...project} />
        </div>

        <img
          loading="lazy"
          src={project.image}
          alt={`${project.name} screenshot`}
          className="w-full rounded-lg my-14 shadow-2xl"
        />

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {mdxData?.content}
        </div>

        {/* Call to action */}
        <Card className="mt-8">
          <CardContent className="py-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Deploy {project.name} in minutes with our managed hosting
                solution
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  Deploy Now
                </Button>
                <Button variant="outline" size="lg" className="gap-2" asChild>
                  <Link
                    href={`https://github.com/${project.github}`}
                    target="_blank"
                  >
                    <Github className="w-5 h-5" />
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Projects */}
        <RelatedProjects
          currentProject={project}
          allProjects={projects}
          maxProjects={3}
        />

        {/* Categories Section */}
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Project Categories</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {project.categories.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <Badge
                    variant="outline"
                    className="text-sm px-3 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
                  >
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
              Click on a category to explore similar projects
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
