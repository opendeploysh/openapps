"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, GitCompare } from "lucide-react";
import { projects } from "@/lib/projects";
import { CompareClient } from "./CompareClient";
import { FeatureComparisonServer } from "./FeatureComparisonServer";
import { useSearchParams } from "next/navigation";
import { GitHubEditButton } from "@/components/GitHubEditButton";

// Server component for static header
function CompareHeader() {
  return (
    <>
      {/* Back to home link and edit button */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Button>
        </Link>

        <GitHubEditButton
          filePath="src/app/compare/page.tsx"
          variant="outline"
          size="sm"
        >
          Improve comparison
        </GitHubEditButton>
      </div>

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
    </>
  );
}

function ComparePageContent() {
  const searchParams = useSearchParams();
  const project1Slug = searchParams.get("project1") || undefined;
  const project2Slug = searchParams.get("project2") || undefined;

  // Pre-fetch projects on client
  const availableProjects = projects.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const initialProject1 = project1Slug
    ? projects.find((p) => p.slug === project1Slug) || null
    : null;
  const initialProject2 = project2Slug
    ? projects.find((p) => p.slug === project2Slug) || null
    : null;

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <CompareHeader />

      <Suspense fallback={<div>Loading comparison...</div>}>
        <CompareClient
          availableProjects={availableProjects}
          initialProject1={initialProject1}
          initialProject2={initialProject2}
        >
          {/* Server-side rendered feature comparison */}
          {initialProject1 && initialProject2 && (
            <FeatureComparisonServer
              project1={initialProject1}
              project2={initialProject2}
            />
          )}
        </CompareClient>
      </Suspense>
    </div>
  );
}

export function ComparePageClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComparePageContent />
    </Suspense>
  );
}
