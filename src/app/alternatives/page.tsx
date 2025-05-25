import { Metadata } from "next";
import { AlternativesPageClient } from "./_components/AlternativesPageClient";

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
    description:
      "Replace proprietary services with powerful, self-hosted open source alternatives.",
    creator: "@openapps",
  },
};

export default function AlternativesPage() {
  return <AlternativesPageClient />;
}
