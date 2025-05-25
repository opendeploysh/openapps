import { Metadata } from "next";
import { OpenSourcePageClient } from "./_components/OpenSourcePageClient";

export const metadata: Metadata = {
  title: "Open Source Philosophy - Why We Believe in Open Source Software",
  description:
    "Learn about our commitment to open source software, the benefits of transparency, community collaboration, and why open source is the future of technology.",
  keywords: [
    "open source philosophy",
    "open source benefits",
    "software transparency",
    "community collaboration",
    "open source movement",
    "free software",
    "open source development",
    "technology freedom",
    "collaborative development",
    "open source advocacy",
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
    canonical: "/open-source",
  },
  openGraph: {
    title: "Open Source Philosophy - Why We Believe in Open Source Software",
    description:
      "Learn about our commitment to open source software and the benefits of transparency and community collaboration.",
    url: "/open-source",
    siteName: "OpenApps",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source Philosophy - Why We Believe in Open Source Software",
    description:
      "Learn about our commitment to open source software and the benefits of transparency and community collaboration.",
    creator: "@openapps",
  },
};

export default function OpenSourcePage() {
  return <OpenSourcePageClient />;
}
