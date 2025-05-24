import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Projects - Side-by-Side Open Source Software Comparison",
  description:
    "Compare self-hosted open source projects side by side. Analyze features, licenses, deployment difficulty, popularity, and more to make informed decisions.",
  keywords:
    "compare open source software, project comparison, self-hosted comparison, software alternatives comparison, open source evaluation",
  openGraph: {
    title: "Compare Projects - Side-by-Side Open Source Software Comparison",
    description:
      "Compare self-hosted open source projects side by side to make informed decisions.",
    type: "website",
    url: "/compare",
  },
  twitter: {
    card: "summary",
    title: "Compare Projects - Side-by-Side Open Source Software Comparison",
    description:
      "Compare self-hosted open source projects side by side to make informed decisions.",
  },
  alternates: {
    canonical: "/compare",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
