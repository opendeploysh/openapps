import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Alternatives - Find Open Source Replacements",
  description:
    "Discover open source and self-hosted alternatives to popular proprietary software. Replace cloud services with privacy-focused solutions you can deploy yourself.",
  keywords:
    "software alternatives, open source alternatives, self-hosted alternatives, proprietary software replacements, privacy software, cloud alternatives, FOSS alternatives",
  openGraph: {
    title: "Software Alternatives - Find Open Source Replacements",
    description:
      "Discover open source and self-hosted alternatives to popular proprietary software.",
    type: "website",
    url: "/alternatives",
  },
  twitter: {
    card: "summary",
    title: "Software Alternatives - Find Open Source Replacements",
    description:
      "Discover open source and self-hosted alternatives to popular proprietary software.",
  },
  alternates: {
    canonical: "/alternatives",
  },
};

export default function AlternativesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
