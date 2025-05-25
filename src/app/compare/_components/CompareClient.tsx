"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ProjectMeta } from "@/lib/projects";
import { ProjectSelector } from "./ProjectSelector";
import { BasicInfoComparison } from "./BasicInfoComparison";
import { QuickComparisons } from "./QuickComparisons";

interface CompareClientProps {
  availableProjects: ProjectMeta[];
  initialProject1: ProjectMeta | null;
  initialProject2: ProjectMeta | null;
  children?: React.ReactNode;
}

export function CompareClient({
  availableProjects,
  initialProject1,
  initialProject2,
  children,
}: CompareClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [project1, setProject1] = useState<ProjectMeta | null>(initialProject1);
  const [project2, setProject2] = useState<ProjectMeta | null>(initialProject2);

  // Update URL when projects change
  const updateURL = (proj1: ProjectMeta | null, proj2: ProjectMeta | null) => {
    const params = new URLSearchParams();
    if (proj1) params.set("project1", proj1.slug);
    if (proj2) params.set("project2", proj2.slug);

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newUrl, { scroll: false });
  };

  const handleProject1Select = (slug: string) => {
    const project = availableProjects.find((p) => p.slug === slug);
    if (project) {
      setProject1(project);
      updateURL(project, project2);
    }
  };

  const handleProject2Select = (slug: string) => {
    const project = availableProjects.find((p) => p.slug === slug);
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
    <>
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

          {children}
        </div>
      )}

      {/* Quick Comparison Suggestions */}
      {(!project1 || !project2) && (
        <QuickComparisons onSelectComparison={handleQuickComparison} />
      )}
    </>
  );
}
