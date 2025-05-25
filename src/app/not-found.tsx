import { Metadata } from "next";
import { NotFoundPageClient } from "./_components/NotFoundPageClient";

export const metadata: Metadata = {
  title: "Page Not Found - 404 Error",
  description:
    "The page you're looking for doesn't exist. Browse our collection of open source projects or return to the homepage to find what you need.",
  keywords: [
    "404 error",
    "page not found",
    "open source projects",
    "self-hosted software",
    "navigation help",
  ],
  authors: [{ name: "OpenApps" }],
  creator: "OpenApps",
  publisher: "OpenApps",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Page Not Found - 404 Error",
    description:
      "The page you're looking for doesn't exist. Browse our collection of open source projects or return to the homepage.",
    url: "/404",
    siteName: "OpenApps",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Page Not Found - 404 Error",
    description:
      "The page you're looking for doesn't exist. Browse our collection of open source projects or return to the homepage.",
    creator: "@openapps",
  },
};

export default function NotFoundPage() {
  return <NotFoundPageClient />;
}
