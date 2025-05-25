import { Metadata } from "next";
import { LicensesPageClient } from "./_components/LicensesPageClient";

export const metadata: Metadata = {
  title: "Open Source Licenses Guide - Understanding Software Licenses",
  description:
    "Learn about different open source licenses including MIT, GPL, Apache, and more. Understand license compatibility and choose the right license for your project.",
  keywords: [
    "open source licenses",
    "software licenses",
    "MIT license",
    "GPL license",
    "Apache license",
    "BSD license",
    "license compatibility",
    "copyleft licenses",
    "permissive licenses",
    "software licensing",
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
    canonical: "/licenses",
  },
  openGraph: {
    title: "Open Source Licenses Guide - Understanding Software Licenses",
    description:
      "Learn about different open source licenses and understand license compatibility for your projects.",
    url: "/licenses",
    siteName: "OpenApps",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source Licenses Guide - Understanding Software Licenses",
    description:
      "Learn about different open source licenses and understand license compatibility for your projects.",
    creator: "@openapps",
  },
};

export default function LicensesPage() {
  return <LicensesPageClient />;
}
