import { Metadata } from "next";
import { CategoriesPageClient } from "./_components/CategoriesPageClient";

export const metadata: Metadata = {
  title: "Open Source Projects by Category - Browse Software Categories",
  description:
    "Discover self-hostable open source projects organized by category. Find the perfect software solution for your needs across dozens of categories.",
  keywords: [
    "open source categories",
    "software categories",
    "self-hosted projects",
    "project categories",
    "open source software",
    "developer tools",
    "communication software",
    "database software",
    "security tools",
    "automation tools",
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
    canonical: "/categories",
  },
  openGraph: {
    title: "Open Source Projects by Category - Browse Software Categories",
    description:
      "Discover self-hostable open source projects organized by category. Find the perfect software solution for your needs.",
    url: "/categories",
    siteName: "OpenApps",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source Projects by Category - Browse Software Categories",
    description:
      "Discover self-hostable open source projects organized by category.",
    creator: "@openapps",
  },
};

export default function CategoriesPage() {
  return <CategoriesPageClient />;
}
