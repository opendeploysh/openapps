"use client";

import { useState } from "react";
import {
  getLicenseInfo,
  getProjectsForLicense,
  getCategoryColor,
} from "@/lib/licenses";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scale, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export function LicensesPageClient() {
  const [selectedLicense, setSelectedLicense] = useState<string | null>(null);
  const [searchQuery] = useState("");

  const licenseData = getLicenseInfo();
  const filteredLicenses = licenseData.filter(
    (license) =>
      license.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedProjects = selectedLicense
    ? getProjectsForLicense(selectedLicense)
    : [];

  if (selectedLicense) {
    const license = licenseData.find((l) => l.key === selectedLicense);
    if (!license) return null;

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
        <Navbar />
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedLicense(null)}
              className="mb-3 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all licenses
            </Button>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                <Scale className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{license.name}</h1>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge
                    className={getCategoryColor(license.category || "Other")}
                  >
                    {license.category}
                  </Badge>
                  {license.isOSI && (
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-600"
                    >
                      OSI Approved
                    </Badge>
                  )}
                  {license.spdx_id && (
                    <Badge variant="secondary">{license.spdx_id}</Badge>
                  )}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  {license.count} projects use this license
                </p>
                {license.url && (
                  <Link
                    href={license.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View License Text
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              Projects using {license.name} ({selectedProjects.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedProjects.map((project) => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />
      <div className="container mx-auto px-4 py-10 my-10 max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
            <Scale className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Licenses</h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Explore licensing requirements and find projects that match your
            needs.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">
            OSI Approved Licenses (
            {filteredLicenses.filter((license) => license.isOSI).length})
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {filteredLicenses
              .filter((license) => license.isOSI)
              .map((license) => (
                <div
                  key={license.key}
                  className="flex items-center cursor-pointer gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 p-2 rounded"
                  onClick={() => setSelectedLicense(license.key)}
                >
                  <div className="shrink-0">{license.name}</div>
                  <div className="flex-1 border-t" />
                  <div className="shrink-0 text-sm text-neutral-600 dark:text-neutral-400">
                    {license.count} projects
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Non-OSI Approved Licenses Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">
            Non-OSI Approved Licenses (
            {filteredLicenses.filter((license) => !license.isOSI).length})
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {filteredLicenses
              .filter((license) => !license.isOSI)
              .map((license) => (
                <div
                  key={license.key}
                  className="flex items-center cursor-pointer gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 p-2 rounded"
                  onClick={() => setSelectedLicense(license.key)}
                >
                  <div className="shrink-0">{license.name}</div>
                  <div className="flex-1 border-t" />
                  <div className="shrink-0 text-sm text-neutral-600 dark:text-neutral-400">
                    {license.count} projects
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
