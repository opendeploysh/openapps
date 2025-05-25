"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Github,
  ChevronLeft,
  ArrowRight,
  Code,
  Users,
  Globe,
  Handshake,
  BookOpen,
  GitFork,
  Star,
  Eye,
  GitBranch,
  Rocket,
  History,
  BugPlay,
  FileCode,
  Coffee,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const projects = [
  {
    name: "Nextcloud",
    category: "File Storage & Productivity",
    stars: "23k",
    description:
      "A self-hosted productivity platform and file sharing solution.",
    image: "NC",
    language: "PHP",
    repoUrl: "https://github.com/nextcloud/server",
  },
  {
    name: "Bitwarden",
    category: "Security",
    stars: "31k",
    description: "A secure and open-source password management solution.",
    image: "BW",
    language: "C#",
    repoUrl: "https://github.com/bitwarden/server",
  },
  {
    name: "Gitea",
    category: "Development",
    stars: "38k",
    description: "A painless self-hosted Git service.",
    image: "GT",
    language: "Go",
    repoUrl: "https://github.com/go-gitea/gitea",
  },
  {
    name: "Home Assistant",
    category: "IoT & Automation",
    stars: "62k",
    description: "Open source home automation platform running on Python.",
    image: "HA",
    language: "Python",
    repoUrl: "https://github.com/home-assistant/core",
  },
  {
    name: "Jellyfin",
    category: "Media",
    stars: "19k",
    description: "A Free Software Media System that puts you in control.",
    image: "JF",
    language: "C#",
    repoUrl: "https://github.com/jellyfin/jellyfin",
  },
  {
    name: "Mattermost",
    category: "Communication",
    stars: "25k",
    description: "An open source platform for secure collaboration.",
    image: "MM",
    language: "Go",
    repoUrl: "https://github.com/mattermost/mattermost-server",
  },
];

export function OpenSourcePageClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />

      <div className="container max-w-5xl mx-auto px-4 py-8">
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
              <Github className="h-3 w-3 text-neutral-700 dark:text-neutral-300 mr-1" />{" "}
              Open Source
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Build the Future Together</h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            Explore powerful open source alternatives to proprietary software.
            Contribute to projects that respect user freedom and control.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Code className="h-4 w-4" />
              Browse Projects
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <GitFork className="h-4 w-4" />
              How to Contribute
            </Button>
          </div>
        </div>

        {/* Open Source Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Open Source Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-neutral-50 dark:bg-neutral-900 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Freedom</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  The freedom to run, copy, distribute, study, change and
                  improve the software for any purpose.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-50 dark:bg-neutral-900 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Community</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Collaborative development by diverse contributors working
                  together to create better software.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-50 dark:bg-neutral-900 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <Handshake className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Transparency</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Full visibility into software operation through openly shared
                  code, fostering trust and security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Open Source Projects */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Featured Open Source Projects
            </h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, idx) => (
              <Card
                key={idx}
                className="hover:shadow-md transition-shadow overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                        {project.image}
                      </div>
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <div className="text-xs text-neutral-500">
                          {project.category}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <Star className="h-3 w-3" />
                      {project.stars}
                    </Badge>
                  </div>

                  <div className="p-4">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      {project.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs">
                        {project.language}
                      </Badge>
                      <Button variant="ghost" size="sm" className="gap-1 h-8">
                        <Github className="h-3 w-3" />
                        View Repo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button className="gap-2">
              Explore All Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* How to Contribute */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Ways to Contribute</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="border border-neutral-200 dark:border-neutral-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <Code className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Code Contributions
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      Submit bug fixes, implement new features, or improve
                      existing functionality through pull requests.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <GitBranch className="h-4 w-4 text-indigo-500" />
                        <span>Fork the repository</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <BugPlay className="h-4 w-4 text-indigo-500" />
                        <span>Fix bugs or add features</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <FileCode className="h-4 w-4 text-indigo-500" />
                        <span>Submit pull requests</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-neutral-200 dark:border-neutral-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 flex-shrink-0">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Documentation</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      Help improve guides, tutorials, and API documentation to
                      make projects more accessible.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <Eye className="h-4 w-4 text-teal-500" />
                        <span>Review existing documentation</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <Rocket className="h-4 w-4 text-teal-500" />
                        <span>Create tutorials and guides</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <History className="h-4 w-4 text-teal-500" />
                        <span>Translate content to other languages</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" className="gap-2">
              Contribution Guidelines
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Support Open Source */}
        <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/10 rounded-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Support Open Source</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-6">
            There are many ways to support open source beyond direct
            contributions. Every little bit helps!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Card className="bg-white/50 dark:bg-neutral-900/50 border-0">
              <CardContent className="p-4 text-center">
                <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mx-auto mb-3">
                  <Star className="h-5 w-5" />
                </div>
                <h3 className="font-medium mb-2">Star Projects</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Star repositories you find useful to increase their visibility
                  in the community.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-neutral-900/50 border-0">
              <CardContent className="p-4 text-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-3">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="font-medium mb-2">Spread the Word</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Tell others about your favorite open source alternatives to
                  proprietary software.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-neutral-900/50 border-0">
              <CardContent className="p-4 text-center">
                <div className="h-10 w-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 mx-auto mb-3">
                  <Coffee className="h-5 w-5" />
                </div>
                <h3 className="font-medium mb-2">Donate</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Support project maintainers with financial contributions to
                  fund ongoing development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Join the Movement */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Join the Open Source Movement
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-6">
            Whether you&apos;re a developer, designer, writer, or enthusiast,
            there&apos;s a place for you in the open source community.
          </p>

          <Button size="lg" className="gap-2">
            Get Started Today
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
