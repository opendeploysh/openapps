import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Self-Hosting Guide - Deploy Open Source Software on Your Own Infrastructure",
  description:
    "Complete guide to self-hosting open source software. Learn about deployment options, infrastructure requirements, security best practices, and maintenance tips.",
  keywords:
    "self-hosting guide, deploy open source, self-hosted software, home server, private cloud, infrastructure, deployment, docker, kubernetes, VPS hosting",
  openGraph: {
    title:
      "Self-Hosting Guide - Deploy Open Source Software on Your Own Infrastructure",
    description:
      "Complete guide to self-hosting open source software with deployment options and best practices.",
    type: "website",
    url: "/self-host",
  },
  twitter: {
    card: "summary",
    title:
      "Self-Hosting Guide - Deploy Open Source Software on Your Own Infrastructure",
    description:
      "Complete guide to self-hosting open source software with deployment options and best practices.",
  },
  alternates: {
    canonical: "/self-host",
  },
};

export default function SelfHostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
