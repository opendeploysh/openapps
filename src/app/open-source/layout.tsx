import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Source Software - Benefits, Philosophy, and Community",
  description:
    "Discover the benefits of open source software, understand the philosophy behind FOSS, and learn about the thriving community of developers and users.",
  keywords:
    "open source software, FOSS, free software, open source benefits, open source philosophy, open source community, transparency, security, privacy",
  openGraph: {
    title: "Open Source Software - Benefits, Philosophy, and Community",
    description:
      "Discover the benefits of open source software and the philosophy behind FOSS.",
    type: "website",
    url: "/open-source",
  },
  twitter: {
    card: "summary",
    title: "Open Source Software - Benefits, Philosophy, and Community",
    description:
      "Discover the benefits of open source software and the philosophy behind FOSS.",
  },
  alternates: {
    canonical: "/open-source",
  },
};

export default function OpenSourceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
