import { Metadata } from "next";
import { CommunityPageClient } from "./_components/CommunityPageClient";

export const metadata: Metadata = {
  title: "Community - Join the Open Source Self-Hosting Community",
  description:
    "Connect with fellow self-hosters, share knowledge, get support, and contribute to the open source community. Join our Discord, GitHub discussions, and more.",
  keywords: [
    "open source community",
    "self-hosting community",
    "developer community",
    "Discord server",
    "GitHub discussions",
    "community support",
    "open source contributors",
    "self-hosting help",
    "tech community",
    "homelab community",
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
    canonical: "/community",
  },
  openGraph: {
    title: "Community - Join the Open Source Self-Hosting Community",
    description:
      "Connect with fellow self-hosters, share knowledge, get support, and contribute to the open source community.",
    url: "/community",
    siteName: "OpenApps",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Community - Join the Open Source Self-Hosting Community",
    description:
      "Connect with fellow self-hosters, share knowledge, get support, and contribute to the open source community.",
    creator: "@openapps",
  },
};

export default function CommunityPage() {
  return <CommunityPageClient />;
}
