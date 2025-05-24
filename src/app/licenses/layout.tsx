import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Source Licenses - Understanding Software Licenses",
  description:
    "Learn about different open source licenses used by self-hosted projects. Compare MIT, GPL, Apache, BSD licenses and understand their implications for your deployments.",
  keywords:
    "open source licenses, MIT license, GPL license, Apache license, BSD license, software licensing, FOSS licenses, copyleft, permissive licenses",
  openGraph: {
    title: "Open Source Licenses - Understanding Software Licenses",
    description:
      "Learn about different open source licenses used by self-hosted projects.",
    type: "website",
    url: "/licenses",
  },
  twitter: {
    card: "summary",
    title: "Open Source Licenses - Understanding Software Licenses",
    description:
      "Learn about different open source licenses used by self-hosted projects.",
  },
  alternates: {
    canonical: "/licenses",
  },
};

export default function LicensesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
