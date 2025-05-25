import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import { ComparePageClient } from "./_components/ComparePageClient";

export const metadata: Metadata = {
  title: "Compare Projects - Side-by-Side Open Source Software Comparison",
  description:
    "Compare self-hosted open source projects side by side. Analyze features, licenses, deployment difficulty, popularity, and more to make informed decisions.",
  keywords: [
    "compare open source software",
    "project comparison",
    "self-hosted comparison",
    "software alternatives comparison",
    "open source evaluation",
    "feature comparison",
    "deployment comparison",
    "license comparison",
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
    canonical: "/compare",
  },
  openGraph: {
    title: "Compare Projects - Side-by-Side Open Source Software Comparison",
    description:
      "Compare self-hosted open source projects side by side to make informed decisions.",
    url: "/compare",
    siteName: "OpenApps",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Compare Projects - Side-by-Side Open Source Software Comparison",
    description:
      "Compare self-hosted open source projects side by side to make informed decisions.",
    creator: "@openapps",
  },
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <ComparePageClient />
      </Suspense>
      <Footer />
    </div>
  );
}
