import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Github, Play, Info, GitCompare } from "lucide-react";
import { projects } from "@/lib/projects";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectHeader } from "./_components/ProejctHeader";
import { RelatedProjects } from "./_components/RelatedProjects";
import { useCompileFromSlug } from "@/mdx/render-projects";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import {
  GitHubEditButton,
  GitHubViewButton,
} from "@/components/GitHubEditButton";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const title = `${project.name} - Cost-Effective SaaS Alternative`;
  const description = `${project.description} Deploy ${project.name} as a privacy-respecting alternative to popular SaaS tools. Compare features and choose self-hosted or managed deployment.`;

  return {
    title,
    description,
    keywords: [
      project.name.toLowerCase(),
      `${project.name.toLowerCase()} self-hosted`,
      `${project.name.toLowerCase()} open source`,
      `${project.name.toLowerCase()} deployment`,
      `${project.name.toLowerCase()} docker`,
      `${project.name.toLowerCase()} installation`,
      project.category.toLowerCase(),
      ...project.tags.map((cat) => cat.toLowerCase()),
      ...(project.language ? [project.language.toLowerCase()] : []),
      ...(project.license ? [project.license.toLowerCase()] : []),
      "self-hosted",
      "open source",
      "privacy",
      "deployment",
    ].join(", "),
    authors: [{ name: "OpenApps" }],
    openGraph: {
      title,
      description,
      type: "article",
      url: `/projects/${project.slug}`,
      images: project.heroImage
        ? [
            {
              url: project.heroImage,
              width: 1200,
              height: 630,
              alt: `${project.name} screenshot`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.heroImage ? [project.heroImage] : undefined,
    },
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

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
        <Footer />
      </div>
    );
  }

  const mdxData = await useCompileFromSlug(slug);

  // Determine the project file path based on category and slug
  const projectFilePath = `projects/${project.category
    .toLowerCase()
    .replace(/\s+/g, "-")}/${slug}.mdx`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />

      <div className="container max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Button>
          </Link>

          <div className="flex gap-2">
            <GitHubViewButton
              filePath={projectFilePath}
              variant="ghost"
              size="sm"
            />
            <GitHubEditButton
              filePath={projectFilePath}
              variant="outline"
              size="sm"
            >
              Improve this page
            </GitHubEditButton>
          </div>
        </div>

        {/* Project Header */}
        <div className="mb-8">
          <ProjectHeader {...project} />
        </div>

        {project.heroImage && (
          <img
            loading="lazy"
            src={project.heroImage}
            alt={`${project.name} screenshot`}
            className="w-full rounded-lg my-14 shadow-2xl"
          />
        )}

        <div className="prose prose-neutral dark:prose-invert max-w-none mt-14">
          {mdxData?.content}
        </div>

        {/* Content improvement notice */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Help improve this content
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                Found an error or want to add more information about{" "}
                {project.name}? You can edit this page directly on GitHub.
              </p>
              <GitHubEditButton
                filePath={projectFilePath}
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Edit this page
              </GitHubEditButton>
            </div>
          </div>
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
                <Button variant="outline" size="lg" className="gap-2" asChild>
                  <Link href={`/compare?project1=${project.slug}`}>
                    <GitCompare className="w-5 h-5" />
                    Compare Projects
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
              {project.tags.map((category) => (
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

      <Footer />
    </div>
  );
}
