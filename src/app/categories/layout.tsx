import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories - Browse Open Source Projects by Category",
  description:
    "Explore open source and self-hostable projects organized by categories. Find productivity tools, development software, communication platforms, and more.",
  keywords:
    "open source categories, self-hosted software categories, project categories, software types, development tools, productivity software",
  openGraph: {
    title: "Categories - Browse Open Source Projects by Category",
    description:
      "Explore open source and self-hostable projects organized by categories.",
    type: "website",
    url: "/categories",
  },
  twitter: {
    card: "summary",
    title: "Categories - Browse Open Source Projects by Category",
    description:
      "Explore open source and self-hostable projects organized by categories.",
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
