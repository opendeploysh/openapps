"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  HardDrive,
  ChevronLeft,
  ArrowRight,
  Server,
  Shield,
  Database,
  CloudRain,
  Clock,
  Cpu,
  CheckCircle,
  TerminalSquare,
  MonitorSmartphone,
  AlertCircle,
  LineChart,
  Flower,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function SelfHostPageClient() {
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
              <HardDrive className="h-3 w-3 text-blue-500 mr-1" /> Self-Hosting
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">Take Control of Your Data</h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            Learn how to self-host open source alternatives to popular services.
            Our comprehensive guides will help you deploy and maintain your own
            infrastructure.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Server className="h-4 w-4" />
              Deployment Guides
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Shield className="h-4 w-4" />
              Security Best Practices
            </Button>
          </div>
        </div>

        {/* Self-Hosting Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Why Self-Host?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 border-0">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-800/30 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Data Privacy</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Keep your data private and secure on your own servers. No
                  third-party can access or monetize your information.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10 border-0">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-800/30 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Full Control</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Customize your services exactly how you want them. No feature
                  limitations or restrictions imposed by service providers.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 border-0">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-800/30 flex items-center justify-center mb-4">
                  <CloudRain className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Vendor Lock-in</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Free yourself from subscription fees and service shutdowns.
                  Your services run as long as you want them to.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Deployment Options */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Deployment Options</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Docker",
                icon: <Flower className="h-6 w-6 text-blue-500" />,
                difficulty: "Easy",
                description:
                  "Containerized deployments with Docker and Docker Compose for simple setup",
              },
              {
                name: "Kubernetes",
                icon: <LineChart className="h-6 w-6 text-indigo-500" />,
                difficulty: "Advanced",
                description:
                  "Scale your deployments with Kubernetes for enterprise-grade infrastructure",
              },
              {
                name: "Bare Metal",
                icon: <Cpu className="h-6 w-6 text-orange-500" />,
                difficulty: "Medium",
                description:
                  "Direct installation on physical servers for maximum performance",
              },
              {
                name: "Cloud VPS",
                icon: <CloudRain className="h-6 w-6 text-teal-500" />,
                difficulty: "Easy",
                description:
                  "Deploy on cloud providers like AWS, DigitalOcean, or Linode",
              },
            ].map((option, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    {option.icon}
                    <div>
                      <h3 className="font-medium">{option.name}</h3>
                      <Badge
                        variant={
                          option.difficulty === "Easy"
                            ? "outline"
                            : option.difficulty === "Medium"
                            ? "secondary"
                            : "default"
                        }
                        className="text-xs"
                      >
                        {option.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {option.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-3 gap-1 h-8"
                  >
                    <ArrowRight className="h-3 w-3" />
                    View Guides
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Guides */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Popular Self-Hosting Guides
          </h2>

          <div className="space-y-4">
            {[
              {
                title: "Setting up Nextcloud with Docker",
                level: "Beginner",
                time: "15 min",
                description:
                  "A complete guide to deploying Nextcloud on Docker with persistent storage and HTTPS",
              },
              {
                title: "Secure Bitwarden Installation on a VPS",
                level: "Intermediate",
                time: "30 min",
                description:
                  "Deploy Bitwarden password manager with proper security configurations and backup strategy",
              },
              {
                title: "High-Availability Gitea Deployment with Kubernetes",
                level: "Advanced",
                time: "60 min",
                description:
                  "Scale your git server with Kubernetes for enterprise-grade availability and performance",
              },
            ].map((guide, idx) => (
              <Card
                key={idx}
                className="hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-3/4 p-5">
                    <h3 className="font-medium text-lg mb-1">{guide.title}</h3>
                    <div className="flex items-center gap-4 mb-3">
                      <Badge
                        variant={
                          guide.level === "Beginner"
                            ? "outline"
                            : guide.level === "Intermediate"
                            ? "secondary"
                            : "default"
                        }
                        className="text-xs"
                      >
                        {guide.level}
                      </Badge>
                      <span className="text-xs text-neutral-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {guide.time}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {guide.description}
                    </p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-800 sm:w-1/4 p-4 flex flex-row sm:flex-col items-center justify-center gap-2">
                    <Button size="sm" className="gap-1 h-8 w-full">
                      <TerminalSquare className="h-3 w-3" />
                      View Tutorial
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 h-8 w-full"
                    >
                      <MonitorSmartphone className="h-3 w-3" />
                      Live Demo
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button className="gap-2">
              Browse All Guides
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mb-16 bg-neutral-100 dark:bg-neutral-800/50 rounded-lg p-8">
          <div className="flex items-start gap-4">
            <div className="mt-1 bg-amber-100 dark:bg-amber-900/50 rounded-full p-2 flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">
                Before You Begin Self-Hosting
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                While self-hosting is rewarding, it comes with responsibilities.
                Make sure you understand:
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Basic server administration concepts
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    The importance of regular backups and maintenance
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Security best practices to keep your services safe
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Networking basics including DNS and port forwarding
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" size="sm" className="gap-2">
                  Self-Hosting Prerequisites Guide
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Need help call to action */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">
            Need Help with Self-Hosting?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-6">
            Our community is ready to help you with your self-hosting journey.
            Join the discussion or hire an expert for personalized assistance.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="gap-2">
              Join Community
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2">
              Hire an Expert
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
