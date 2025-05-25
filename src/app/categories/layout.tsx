import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories - Browse Open Source Projects by Category",
  description:
    "Explore open source and self-hostable projects organized by tags. Find productivity tools, development software, communication platforms, and more.",
  keywords:
    "open source tags, self-hosted software tags, project tags, software types, development tools, productivity software",
  openGraph: {
    title: "Categories - Browse Open Source Projects by Category",
    description:
      "Explore open source and self-hostable projects organized by tags.",
    type: "website",
    url: "/categories",
  },
  twitter: {
    card: "summary",
    title: "Categories - Browse Open Source Projects by Category",
    description:
      "Explore open source and self-hostable projects organized by tags.",
  },
  alternates: {
    canonical: "/categories",
  },
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
