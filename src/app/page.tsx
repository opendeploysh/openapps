"use client";

import { useState } from "react";
import Image from "next/image";
import { SearchBar } from "@/components/SearchBar";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  FolderArchive,
  MessageSquare,
  Wrench,
  Film,
  BarChart3,
  LockKeyhole,
  Settings,
  ArrowRight,
  BookOpen,
  Filter,
  ArrowUpDown,
  SlidersHorizontal,
  Container,
  Search,
  Github,
  Compass,
  HardDrive,
  Layout,
  Heart,
  Menu,
  ChevronDown,
  Star,
  Sparkles,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ProjectMeta, projects } from "@/lib/projects";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// type SoftwareProject = {
//   name: string;
//   description: string;
//   stars: string;
//   language: string;
//   alternatives?: string[];
//   deploymentDifficulty?: "Easy" | "Medium" | "Advanced";
//   categories?: string[];
//   price?: {
//     free?: boolean;
//     startingAt?: string;
//     supportPlans?: Array<{ name: string; price: string }>;
//   };
//   deployOptions?: Array<{ name: string; url: string }>;
//   serviceDeployment?: {
//     available: boolean;
//     cost: string;
//     setupFee?: string;
//   };
//   managedSolution?: {
//     available: boolean;
//     name: string;
//     url: string;
//     cost: string;
//   };
// };

export default function Home() {
  const [searchResults, setSearchResults] = useState<null | ProjectMeta[]>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("relevance");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Categories with Lucide icons
  const categories = [
    { name: "Productivity", icon: <CheckCircle className="w-3 h-3" /> },
    { name: "File Storage", icon: <FolderArchive className="w-3 h-3" /> },
    { name: "Communication", icon: <MessageSquare className="w-3 h-3" /> },
    { name: "Development", icon: <Wrench className="w-3 h-3" /> },
    { name: "Media", icon: <Film className="w-3 h-3" /> },
    { name: "Analytics", icon: <BarChart3 className="w-3 h-3" /> },
    { name: "Security", icon: <LockKeyhole className="w-3 h-3" /> },
    { name: "Automation", icon: <Settings className="w-3 h-3" /> },
  ];

  const handleSearch = (query: string) => {
    setActiveFilter(null);
    // In a real app, this would call an API to search for projects
    console.log(`Searching for: ${query}`);

    // Mock search results for demonstration
    const filteredProjects = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.alternatives?.some((alt) =>
          alt.toLowerCase().includes(query.toLowerCase())
        ) ||
        project.categories?.some((category) =>
          category.toLowerCase().includes(query.toLowerCase())
        )
    );

    setSearchResults(filteredProjects);
  };

  const handleCategoryFilter = (categoryName: string) => {
    setActiveFilter(categoryName);

    const filteredProjects = projects.filter((project) =>
      project.categories?.includes(categoryName)
    );

    setSearchResults(filteredProjects);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      {/* Navbar */}
      <nav className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 sticky top-0 z-40">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex h-14 items-center justify-between">
            {/* Logo and brand */}
            <div className="flex items-center gap-1">
              <div className="mr-1 flex items-center justify-center h-8 w-8 rounded-md bg-blue-600">
                <Container className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-black dark:text-white">Deploy</span>
                <span className="text-blue-600">Plane</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 gap-1.5">
                    <Compass className="h-4 w-4" />
                    Discover
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[220px]">
                  <DropdownMenuLabel>Discover</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded flex items-center justify-center bg-blue-100 dark:bg-blue-900">
                      <CheckCircle className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span>Featured Alternatives</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded flex items-center justify-center bg-teal-100 dark:bg-teal-900">
                      <ArrowUpDown className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                    </div>
                    <span>Trending Projects</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded flex items-center justify-center bg-amber-100 dark:bg-amber-900">
                      <Star className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span>Most Popular</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded flex items-center justify-center bg-violet-100 dark:bg-violet-900">
                      <Sparkles className="h-3 w-3 text-violet-600 dark:text-violet-400" />
                    </div>
                    <span>Recently Added</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Search className="h-4 w-4 mr-1" />
                    <span>Advanced Search</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 gap-1.5">
                    <Layout className="h-4 w-4" />
                    Categories
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[220px]">
                  <DropdownMenuLabel>Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/categories" className="w-full">
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <div className="h-5 w-5 rounded flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                        <Layout className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>All Categories</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={`/categories/${category.name.toLowerCase()}`}
                      className="w-full"
                    >
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <div className="h-5 w-5 rounded flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                          {category.icon}
                        </div>
                        <span>{category.name}</span>
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/self-host">
                <Button variant="ghost" size="sm" className="h-9 gap-1.5">
                  <HardDrive className="h-4 w-4" />
                  Self-Host
                </Button>
              </Link>
              <Link href="/open-source">
                <Button variant="ghost" size="sm" className="h-9 gap-1.5">
                  <Github className="h-4 w-4" />
                  Open Source
                </Button>
              </Link>
              <Link href="/community">
                <Button variant="ghost" size="sm" className="h-9 gap-1.5">
                  <Heart className="h-4 w-4" />
                  Community
                </Button>
              </Link>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
                <Search className="h-4 w-4" />
              </Button>
              <Button size="sm" className="h-9 hidden md:flex">
                Deploy Now
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-[280px] bg-white dark:bg-neutral-900 shadow-xl p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1">
                <div className="mr-1 flex items-center justify-center h-8 w-8 rounded-md bg-blue-600">
                  <Container className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-lg">
                  <span className="text-black dark:text-white">Deploy</span>
                  <span className="text-blue-600">Plane</span>
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-10 gap-2"
              >
                <Compass className="h-4 w-4" />
                Discover
              </Button>

              <div className="pl-8 space-y-1 my-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8 text-sm"
                >
                  Featured Alternatives
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8 text-sm"
                >
                  Trending Projects
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8 text-sm"
                >
                  Most Popular
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8 text-sm"
                >
                  Recently Added
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-10 gap-2"
              >
                <Layout className="h-4 w-4" />
                Categories
              </Button>

              <div className="pl-8 space-y-1 my-2">
                <Link href="/categories" className="w-full">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start h-8 text-sm gap-2"
                  >
                    <Layout className="h-3 w-3" />
                    All Categories
                  </Button>
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/categories/${category.name.toLowerCase()}`}
                    className="w-full"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start h-8 text-sm gap-2"
                    >
                      {category.icon}
                      {category.name}
                    </Button>
                  </Link>
                ))}
              </div>

              <Link href="/self-host" className="w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-10 gap-2"
                >
                  <HardDrive className="h-4 w-4" />
                  Self-Host
                </Button>
              </Link>

              <Link href="/open-source" className="w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-10 gap-2"
                >
                  <Github className="h-4 w-4" />
                  Open Source
                </Button>
              </Link>

              <Link href="/community" className="w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-10 gap-2"
                >
                  <Heart className="h-4 w-4" />
                  Community
                </Button>
              </Link>
            </div>

            <div className="mt-6">
              <Button className="w-full">Deploy Now</Button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 py-4 max-w-5xl">
        {/* Header Section */}
        <header className="flex flex-col items-center text-center mb-8 relative py-20">
          {/* Background elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-blue-500/5 blur-xl"></div>
            <div className="absolute top-1/2 -right-16 w-40 h-40 rounded-full bg-blue-500/5 blur-2xl"></div>
            <div className="absolute -bottom-10 left-1/3 w-32 h-32 rounded-full bg-blue-500/5 blur-xl"></div>
          </div>

          <div className="mb-6">
            <div className="inline-block relative">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                <span className="text-black dark:text-white">Deploy</span>Plane
              </h1>
            </div>

            <p className="text-sm uppercase tracking-widest text-neutral-400 mb-4">
              Your Deployment & Management Companion
            </p>

            <div className="max-w-2xl mx-auto space-y-3">
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                Find, deploy, and manage self-hosted alternatives.
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                Easy deployment · Hosting options · Full control
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-center text-sm text-neutral-500 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-900/50 rounded-full px-4 py-1.5 shadow-sm mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>
              {projects.length}+ open source alternatives available for
              deployment
            </span>
          </div>

          {/* Visual elements */}
          <div className="flex gap-8 items-center justify-center">
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 to-transparent"></div>
            <div className="flex border border-neutral-200 dark:border-neutral-800 rounded-full px-4 py-1 text-xs">
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                Powered by
              </span>
              <span className="ml-1.5">Podlify</span>
            </div>
            <div className="w-16 h-1 rounded-full bg-gradient-to-l from-blue-500 to-transparent"></div>
          </div>
        </header>

        {/* Search Section */}
        <section className="mb-4">
          <div>
            <div className="flex gap-2 mb-3 items-center">
              <div className="flex-1">
                <SearchBar onSearch={handleSearch} />
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Select
                  defaultValue="relevance"
                  onValueChange={(value) => setSortOrder(value)}
                >
                  <SelectTrigger className="h-10 w-[140px]">
                    <div className="flex items-center gap-1">
                      <ArrowUpDown className="h-3.5 w-3.5 text-neutral-500" />
                      <SelectValue placeholder="Sort by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="stars">Most Stars</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="difficulty-asc">
                      Easiest First
                    </SelectItem>
                    <SelectItem value="difficulty-desc">
                      Advanced First
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 flex-shrink-0"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="bg-neutral-50 dark:bg-neutral-900/50 p-3 rounded-md mb-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => {
                      setActiveFilter(null);
                      setShowFilters(false);
                    }}
                  >
                    Clear all
                  </Button>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mr-1">
                    Categories:
                  </span>
                  {categories.map((category) => (
                    <Badge
                      key={category.name}
                      variant={
                        activeFilter === category.name ? "default" : "secondary"
                      }
                      className="px-2 py-0.5 text-sm cursor-pointer flex items-center gap-1"
                      onClick={() => handleCategoryFilter(category.name)}
                    >
                      <div className="w-3 h-3">{category.icon}</div>
                      {category.name}
                    </Badge>
                  ))}
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mr-1">
                    Popular alternatives to:
                  </span>
                  {["Google Drive", "Slack", "GitHub", "Plex", "LastPass"].map(
                    (tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="px-2 py-0.5 text-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        onClick={() => handleSearch(tag)}
                      >
                        {tag}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Search Results */}
        {searchResults && (
          <section className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">
                {searchResults.length > 0
                  ? activeFilter
                    ? `${activeFilter} (${searchResults.length})`
                    : `Search Results (${searchResults.length})`
                  : "No alternatives found"}
              </h2>
              {activeFilter && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveFilter(null)}
                  className="gap-1"
                >
                  <Filter className="w-4 h-4" />
                  Clear Filter
                </Button>
              )}
            </div>
            {searchResults.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {searchResults.map((project) => (
                  <ProjectCard key={project.name} {...project} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Featured Projects Section */}
        <section className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>

        {/* Deployment Guide Section - Enhanced CTA */}
        <section className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-lg overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234f46e5' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: "20px 20px",
              }}
            ></div>
          </div>

          <div className="relative p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <div className="space-y-4">
              <div className="inline-block text-blue-600 dark:text-blue-400 bg-white dark:bg-blue-900/50 rounded-full px-3 py-1 text-xs font-medium mb-1 shadow-sm">
                Getting Started Guide
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white">
                New to Self-Hosting?
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300">
                Self-hosting gives you complete control over your data and
                applications, but it doesn't have to be complicated. Our
                step-by-step guides make it easy to get started.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-1 mt-0.5">
                    <svg
                      className="w-3 h-3 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Learn the basics of self-hosting and deployment options
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-1 mt-0.5">
                    <svg
                      className="w-3 h-3 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Understand security best practices for your instances
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-1 mt-0.5">
                    <svg
                      className="w-3 h-3 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Get resources for backups, monitoring, and maintenance
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button size="sm" className="h-9">
                  Read Our Guides
                  <BookOpen className="w-3.5 h-3.5 ml-1.5" />
                </Button>
                <Button size="sm" variant="outline" className="h-9">
                  Join Community
                </Button>
              </div>
            </div>

            {/* Right side - Visual content */}
            <div className="hidden md:block bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-lg">
              <div className="border-b border-neutral-200 dark:border-neutral-700 py-3 px-4 flex items-center">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    Self-Hosting Guide
                  </div>
                </div>
              </div>
              <div className="p-4 text-xs font-mono text-left text-neutral-700 dark:text-neutral-300 h-[250px] overflow-hidden">
                <div className="text-green-600 dark:text-green-400 mb-1">
                  $ sudo docker run -d \
                </div>
                <div className="text-neutral-500 pl-4 mb-1">
                  --name nextcloud \
                </div>
                <div className="text-neutral-500 pl-4 mb-1">-p 8080:80 \</div>
                <div className="text-neutral-500 pl-4 mb-1">
                  -v nextcloud:/var/www/html \
                </div>
                <div className="text-neutral-500 pl-4 mb-1">nextcloud</div>
                <div className="text-green-600 dark:text-green-400 mt-3">
                  $ docker ps
                </div>
                <div className="text-neutral-500 pl-4 mt-1 whitespace-nowrap">
                  CONTAINER ID: 7a9ec52d1b2c
                </div>
                <div className="text-blue-500 pl-4 mt-1">
                  STATUS: Up 2 minutes
                </div>
                <div className="mt-2 pl-2 text-green-600 dark:text-green-700 animate-pulse">
                  Successfully deployed!{" "}
                  <span className="animate-blink">▌</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-8 rounded-lg overflow-hidden relative border border-neutral-200 dark:border-neutral-800">
          <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-900/40"></div>

          <div className="relative py-8 px-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>

            <h2 className="text-xl md:text-2xl font-bold mb-2 text-neutral-800 dark:text-white">
              Can't find what you're looking for?
            </h2>

            <p className="mb-6 text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
              We're constantly adding new self-hostable alternatives. Submit a
              request and our team will help find or build the perfect solution
              for your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="sm" className="h-9">
                Submit Request
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
              <Button size="sm" variant="outline" className="h-9">
                Browse All Solutions
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-500">
              <span>Average response time:</span>
              <span className="font-medium">Under 24 hours</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-4">
              <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
                <div className="text-white font-bold text-xs">
                  <Container className="w-4 h-4" />
                </div>
              </div>
              <div className="text-sm font-medium">Podlify</div>
            </div>

            <div className="flex space-x-6 mb-6">
              <a
                href="#"
                className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                Contact
              </a>
            </div>

            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              <p>© {new Date().getFullYear()} Podlify. All rights reserved.</p>
              <p className="mt-1">
                Dedicated to privacy, open source, and digital sovereignty.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
