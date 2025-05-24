import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community - Join the Open Source and Self-Hosting Community",
  description:
    "Connect with other open source enthusiasts and self-hosting advocates. Share knowledge, get help, contribute to projects, and discuss privacy-focused solutions.",
  keywords:
    "open source community, self-hosting community, FOSS community, contribute to open source, open source collaboration, privacy community, developer community",
  openGraph: {
    title: "Community - Join the Open Source and Self-Hosting Community",
    description:
      "Connect with other open source enthusiasts and self-hosting advocates.",
    type: "website",
    url: "/community",
  },
  twitter: {
    card: "summary",
    title: "Community - Join the Open Source and Self-Hosting Community",
    description:
      "Connect with other open source enthusiasts and self-hosting advocates.",
  },
  alternates: {
    canonical: "/community",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
