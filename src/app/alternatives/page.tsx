import { Metadata } from "next"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  ChevronLeft,
  Shield,
  Code,
  Globe,
  Star,
  Users,
  Zap,
  CheckCircle,
  ArrowRightLeft,
} from "lucide-react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { projects } from "@/lib/projects"
import { Filters } from "@/components/filters"
import { AlternativesPageProjects } from "./_components/AlternativesPageProjects"
import { HostingType } from "@/lib/hosting-type"
import { FilterProvider } from "@/components/filters/CompoundFilters"
export const metadata: Metadata = {
  title: "Open Source Alternatives - Replace Proprietary Software",
  description:
    "Replace proprietary services with powerful, self-hosted open source alternatives. Take control of your data while enjoying the same features and functionality.",
  keywords: [
    "open source alternatives",
    "self-hosted software",
    "proprietary software replacement",
    "privacy-focused alternatives",
    "SaaS alternatives",
    "open source projects",
    "self-hosting",
    "data privacy",
    "vendor lock-in",
    "cost-effective software",
  ],
  authors: [{ name: "OpenApps" }],
  creator: "OpenApps",
  publisher: "OpenApps",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/alternatives",
  },
  openGraph: {
    title: "Open Source Alternatives - Replace Proprietary Software",
    description:
      "Replace proprietary services with powerful, self-hosted open source alternatives. Take control of your data while enjoying the same features and functionality.",
    url: "/alternatives",
    siteName: "OpenApps",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source Alternatives - Replace Proprietary Software",
    description: "Replace proprietary services with powerful, self-hosted open source alternatives.",
    creator: "@openapps",
  },
}

const allProjects = projects.filter((project) => project.hostingType === HostingType.CloudOnly)

export default function AlternativesPage() {
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
            <Badge variant="outline" className="px-3 py-1 text-xs bg-white dark:bg-neutral-900">
              <ArrowRightLeft className="h-3 w-3 text-blue-500 mr-1" />
              Alternatives
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Open Source Alternatives</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8">
            Replace proprietary services with powerful, self-hosted open source alternatives. Take control of your data
            while enjoying the same features and functionality.
          </p>
        </div>

        {/* Why Choose Alternatives */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Open Source Alternatives?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-800/30 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Privacy & Control</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Your data stays on your servers. No tracking, no data mining, no vendor lock-in.
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
                  Eliminate recurring subscription fees. Pay only for your infrastructure.
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
                  Modify and extend functionality to match your exact needs and requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Wrap the content with the Filter Provider */}
        <FilterProvider projects={allProjects}>
          <AlternativesPageProjects />
        </FilterProvider>

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
              <Link key={index} href={`/categories/${category.name.toLowerCase()}`}>
                <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-2">
                      <div className="text-blue-600 dark:text-blue-400">{category.icon}</div>
                    </div>
                    <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-neutral-500">{category.count} alternatives</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
