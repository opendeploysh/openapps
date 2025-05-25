import { Metadata } from "next";
import { SelfHostPageClient } from "./_components/SelfHostPageClient";

export const metadata: Metadata = {
  title: "Self-Hosting Guide - Learn How to Host Your Own Software",
  description:
    "Complete guide to self-hosting open source software. Learn about deployment options, security best practices, and how to take control of your digital infrastructure.",
  keywords: [
    "self-hosting guide",
    "self-hosted software",
    "home server",
    "docker deployment",
    "kubernetes hosting",
    "VPS hosting",
    "server administration",
    "self-hosting tutorial",
    "homelab setup",
    "privacy hosting",
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
    canonical: "/self-host",
  },
  openGraph: {
    title: "Self-Hosting Guide - Learn How to Host Your Own Software",
    description:
      "Complete guide to self-hosting open source software. Learn about deployment options and security best practices.",
    url: "/self-host",
    siteName: "OpenApps",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Self-Hosting Guide - Learn How to Host Your Own Software",
    description:
      "Complete guide to self-hosting open source software. Learn about deployment options and security best practices.",
    creator: "@openapps",
  },
};

export default function SelfHostPage() {
  return <SelfHostPageClient />;
}
