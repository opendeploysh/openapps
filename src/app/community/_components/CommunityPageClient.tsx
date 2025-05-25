"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Container,
  Heart,
  MessageSquare,
  Github,
  Users,
  ChevronLeft,
  ArrowRight,
  Star,
  GitFork,
  MessageCircle,
  Zap,
  User,
  CheckCircle,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function CommunityPageClient() {
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
              <Heart className="h-3 w-3 text-rose-500 mr-1" /> Community
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Join the Open Source Community
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            Connect with fellow open-source enthusiasts, share your experiences,
            get help with self-hosting, and contribute to projects that matter.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Join Discord
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              GitHub Discussions
            </Button>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">5,200+</div>
              <p className="text-sm text-neutral-500">Community Members</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">12K+</div>
              <p className="text-sm text-neutral-500">Forum Posts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <GitFork className="h-6 w-6 text-teal-500 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">320+</div>
              <p className="text-sm text-neutral-500">Project Contributions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="h-6 w-6 text-amber-500 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">890+</div>
              <p className="text-sm text-neutral-500">Successful Deployments</p>
            </CardContent>
          </Card>
        </div>

        {/* Discussion Forums */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Community Discussions</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "How to optimize Nextcloud for performance?",
                category: "Self-Hosting",
                replies: 24,
                author: "cloudmaster",
                time: "2 hours ago",
              },
              {
                title: "Setting up Gitea CI/CD pipeline with Drone",
                category: "DevOps",
                replies: 16,
                author: "devopsninja",
                time: "5 hours ago",
              },
              {
                title: "Best practices for Bitwarden security",
                category: "Security",
                replies: 37,
                author: "securityfirst",
                time: "1 day ago",
              },
            ].map((discussion, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium hover:text-blue-600 cursor-pointer">
                        {discussion.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {discussion.category}
                        </Badge>
                        <span className="text-xs text-neutral-500">
                          {discussion.replies} replies
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-neutral-500">
                      <div className="flex items-center justify-end">
                        <User className="h-3 w-3 mr-1" />
                        <span>{discussion.author}</span>
                      </div>
                      <div className="text-xs mt-1">{discussion.time}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" className="gap-2">
              Browse More Discussions
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Community Contributors */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Community Contributors</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Johnson",
                role: "Core Contributor",
                avatar: "AJ",
                contributions: 156,
                bio: "Full-stack developer focused on self-hosted analytics solutions",
              },
              {
                name: "Sophia Chen",
                role: "Documentation Lead",
                avatar: "SC",
                contributions: 89,
                bio: "Technical writer and open source advocate with a passion for clear guides",
              },
              {
                name: "Marcus Williams",
                role: "Security Expert",
                avatar: "MW",
                contributions: 127,
                bio: "Cybersecurity specialist helping make self-hosting more secure for everyone",
              },
            ].map((contributor, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg mb-3">
                      {contributor.avatar}
                    </div>
                    <h3 className="font-medium text-lg">{contributor.name}</h3>
                    <p className="text-sm text-neutral-500 mb-2">
                      {contributor.role}
                    </p>
                    <Badge variant="secondary" className="mb-3">
                      <Star className="h-3 w-3 mr-1" />
                      {contributor.contributions} contributions
                    </Badge>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {contributor.bio}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Stay Connected</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-6">
            Subscribe to our newsletter for the latest community news, project
            updates, and self-hosting tips.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white dark:bg-neutral-800"
            />
            <Button className="gap-1">
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 text-sm text-neutral-500">
            <CheckCircle className="inline-block h-3 w-3 mr-1" />
            We respect your privacy. Unsubscribe anytime.
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
