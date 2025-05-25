"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  Search,
  ArrowRight,
  AlertTriangle,
  Compass,
  BookOpen,
  Users,
  Code,
  Star,
  Layers,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function NotFoundPageClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />

      <div className="container max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge
              variant="outline"
              className="px-3 py-1 text-xs bg-white dark:bg-neutral-900"
            >
              <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
              404 Error
            </Badge>
          </div>

          {/* Large 404 */}
          <div className="text-8xl md:text-9xl font-bold text-neutral-200 dark:text-neutral-800 mb-4 select-none">
            404
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            The page you're looking for doesn't exist. It might have been moved,
            deleted, or you entered the wrong URL.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline" className="gap-2">
                <Search className="h-4 w-4" />
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/categories">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                    <Layers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Browse Categories</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Discover projects organized by category
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/alternatives">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                    <Compass className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Find Alternatives</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Replace proprietary software with open source
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/self-host">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Self-Hosting Guide</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Learn how to host your own services
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/community">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Join Community</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Connect with fellow open source enthusiasts
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/open-source">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
                    <Code className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Open Source</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Learn about open source philosophy
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/compare">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Compare Projects</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Side-by-side project comparison
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Still Can't Find What You're Looking For?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
            Our community is here to help! Join our discussions or browse our
            comprehensive collection of open source projects to find exactly
            what you need.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/community">
              <Button className="gap-2">
                <Users className="h-4 w-4" />
                Get Help from Community
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <Search className="h-4 w-4" />
                Browse All Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
