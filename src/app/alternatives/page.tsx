"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  ChevronLeft,
  Shield,
  Code,
  Globe,
  Star,
  Users,
  Zap,
  Github,
  ExternalLink,
  CheckCircle,
  ArrowRightLeft,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";

// Popular services and their categories for the alternatives showcase
const popularServices = [
  {
    name: "Google Workspace",
    category: "Productivity & Collaboration",
    description: "Email, docs, drive, and collaboration tools",
    alternatives: ["Nextcloud", "OnlyOffice", "Collabora Online"],
    color: "blue",
  },
  {
    name: "Dropbox",
    category: "File Storage",
    description: "Cloud file storage and synchronization",
    alternatives: ["Nextcloud", "Seafile", "Syncthing"],
    color: "green",
  },
  {
    name: "Slack",
    category: "Team Communication",
    description: "Team messaging and collaboration platform",
    alternatives: ["Mattermost", "Rocket.Chat", "Element"],
    color: "purple",
  },
  {
    name: "GitHub",
    category: "Code Repository",
    description: "Git repository hosting and collaboration",
    alternatives: ["Gitea", "Forgejo", "GitLab"],
    color: "amber",
  },
  {
    name: "1Password",
    category: "Password Management",
    description: "Password manager and secure vault",
    alternatives: ["Bitwarden", "KeePass", "Passbolt"],
    color: "red",
  },
  {
    name: "Netflix",
    category: "Media Streaming",
    description: "Video streaming and media server",
    alternatives: ["Jellyfin", "Plex", "Emby"],
    color: "cyan",
  },
  {
    name: "Zoom",
    category: "Video Conferencing",
    description: "Video meetings and webinars",
    alternatives: ["Jitsi Meet", "BigBlueButton", "Element"],
    color: "indigo",
  },
  {
    name: "Trello",
    category: "Project Management",
    description: "Kanban boards and project organization",
    alternatives: ["Kanboard", "Wekan", "Focalboard"],
    color: "teal",
  },
];

// Color utility function
const getColorClasses = (color: string) => {
  const colorMap: { [key: string]: string } = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    green:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    purple:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    amber:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    cyan: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
    indigo:
      "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
    teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
  };
  return colorMap[color] || colorMap.blue;
};

export default function AlternativesPage() {
  // Get featured alternatives projects
  const featuredAlternatives = projects
    .filter(
      (project) =>
        project.alternatives?.nonSelfHosted &&
        project.alternatives.nonSelfHosted.length > 0
    )
    .slice(0, 6);

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

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge
              variant="outline"
              className="px-3 py-1 text-xs bg-white dark:bg-neutral-900"
            >
              <ArrowRightLeft className="h-3 w-3 text-blue-500 mr-1" />
              Alternatives
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Open Source Alternatives
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8">
            Replace proprietary services with powerful, self-hosted open source
            alternatives. Take control of your data while enjoying the same
            features and functionality.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Shield className="h-4 w-4" />
              Browse Alternatives
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Code className="h-4 w-4" />
              Self-Hosting Guide
            </Button>
          </div>
        </div>

        {/* Why Choose Alternatives */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Why Choose Open Source Alternatives?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-800/30 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Privacy & Control
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Your data stays on your servers. No tracking, no data mining,
                  no vendor lock-in.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-800/30 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Cost Effective</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Eliminate recurring subscription fees. Pay only for your
                  infrastructure.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-800/30 flex items-center justify-center mx-auto mb-4">
                  <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Customizable</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Modify and extend functionality to match your exact needs and
                  requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Popular Service Alternatives */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">
            Popular Service Alternatives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularServices.map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-12 w-12 rounded-lg flex items-center justify-center ${getColorClasses(
                        service.color
                      )}`}
                    >
                      <ExternalLink className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {service.name}
                      </h3>
                      <Badge variant="outline" className="text-xs mb-2">
                        {service.category}
                      </Badge>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                        {service.description}
                      </p>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                          Open Source Alternatives:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {service.alternatives.map((alt, altIndex) => (
                            <Badge
                              key={altIndex}
                              variant="secondary"
                              className="text-xs"
                            >
                              {alt}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Alternative Projects */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              Featured Alternative Projects
            </h2>
            <Link href="/">
              <Button variant="outline" size="sm">
                View All Projects
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAlternatives.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        </div>

        {/* Categories by Use Case */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Browse by Use Case</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "Productivity",
                icon: <CheckCircle className="h-5 w-5" />,
                count: "25+",
              },
              {
                name: "Communication",
                icon: <Users className="h-5 w-5" />,
                count: "15+",
              },
              {
                name: "Development",
                icon: <Code className="h-5 w-5" />,
                count: "30+",
              },
              {
                name: "Media",
                icon: <Star className="h-5 w-5" />,
                count: "12+",
              },
              {
                name: "Security",
                icon: <Shield className="h-5 w-5" />,
                count: "18+",
              },
              {
                name: "Analytics",
                icon: <Zap className="h-5 w-5" />,
                count: "10+",
              },
              {
                name: "Storage",
                icon: <Globe className="h-5 w-5" />,
                count: "8+",
              },
              {
                name: "Automation",
                icon: <ArrowRight className="h-5 w-5" />,
                count: "14+",
              },
            ].map((category, index) => (
              <Link
                key={index}
                href={`/categories/${category.name.toLowerCase()}`}
              >
                <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-2">
                      <div className="text-blue-600 dark:text-blue-400">
                        {category.icon}
                      </div>
                    </div>
                    <h3 className="font-medium text-sm mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {category.count} alternatives
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-xl p-8 mb-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Make the Switch?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Start your journey to digital independence. Our comprehensive
              guides and community support make it easy to deploy and maintain
              your own services.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/self-host">
                <Button size="lg" className="gap-2">
                  <Shield className="h-4 w-4" />
                  Self-Hosting Guide
                </Button>
              </Link>
              <Link href="/community">
                <Button size="lg" variant="outline" className="gap-2">
                  <Users className="h-4 w-4" />
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                150+
              </div>
              <p className="text-sm text-neutral-500">Open Source Projects</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                50+
              </div>
              <p className="text-sm text-neutral-500">Service Categories</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                100%
              </div>
              <p className="text-sm text-neutral-500">Free & Open Source</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                24/7
              </div>
              <p className="text-sm text-neutral-500">Community Support</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
