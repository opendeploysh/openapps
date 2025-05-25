"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, GitCompare } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { projects, ProjectMeta } from "@/lib/projects";
import { ProjectSelector } from "./_components/ProjectSelector";
import { BasicInfoComparison } from "./_components/BasicInfoComparison";
import { FeatureComparison } from "./_components/FeatureComparison";
import { QuickComparisons } from "./_components/QuickComparisons";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [project1, setProject1] = useState<ProjectMeta | null>(null);
  const [project2, setProject2] = useState<ProjectMeta | null>(null);

  const availableProjects = projects.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Update URL when projects change
  const updateURL = (proj1: ProjectMeta | null, proj2: ProjectMeta | null) => {
    const params = new URLSearchParams();
    if (proj1) params.set("project1", proj1.slug);
    if (proj2) params.set("project2", proj2.slug);

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newUrl, { scroll: false });
  };

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
    if (project) {
      setProject1(project);
      updateURL(project, project2);
    }
  };

  const handleProject2Select = (slug: string) => {
    const project = projects.find((p) => p.slug === slug);
    if (project) {
      setProject2(project);
      updateURL(project1, project);
    }
  };

  const clearComparison = () => {
    setProject1(null);
    setProject2(null);
    updateURL(null, null);
  };

  const handleQuickComparison = (proj1: ProjectMeta, proj2: ProjectMeta) => {
    setProject1(proj1);
    setProject2(proj2);
    updateURL(proj1, proj2);
  };

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
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <Badge
              variant="outline"
              className="px-3 py-1 text-xs bg-white dark:bg-neutral-900"
            >
              <GitCompare className="h-3 w-3 text-blue-500 mr-1" />
              Compare
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Project Comparison
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-sm">
            Compare cost-effective, privacy-respecting alternatives to popular
            SaaS tools side by side to help you make informed decisions.
          </p>
        </div>

        {/* Project Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
          <ProjectSelector
            title="Select First Project"
            selectedProject={project1}
            excludeProject={project2}
            availableProjects={availableProjects}
            onProjectSelect={handleProject1Select}
          />

          <ProjectSelector
            title="Select Second Project"
            selectedProject={project2}
            excludeProject={project1}
            availableProjects={availableProjects}
            onProjectSelect={handleProject2Select}
          />
        </div>

        {/* Comparison Tables */}
        {project1 && project2 && (
          <div className="space-y-6">
            <BasicInfoComparison
              project1={project1}
              project2={project2}
              onClear={clearComparison}
            />

            <FeatureComparison project1={project1} project2={project2} />
          </div>
        )}

        {/* Quick Comparison Suggestions */}
        {(!project1 || !project2) && (
          <QuickComparisons onSelectComparison={handleQuickComparison} />
        )}
      </div>

      <Footer />
    </div>
  );
}
