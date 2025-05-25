import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenApps - Discover. Compare. Deploy.",
  description:
    "Find cost-effective, privacy-respecting alternatives to popular SaaS tools. Compare features, and deploy them yourself or through our managed services.",
  keywords: [
    "self-hosted",
    "open source",
    "software alternatives",
    "privacy-focused",
    "docker",
    "kubernetes",
    "homelab",
    "SaaS alternatives",
    "cost-effective",
    "managed services",
  ],
  authors: [{ name: "OpenApps", url: "https://openapps.sh" }],
  creator: "OpenApps",
  publisher: "OpenApps",
  metadataBase: new URL("https://openapps.sh"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OpenApps - Discover. Compare. Deploy.",
    description:
      "Find cost-effective, privacy-respecting alternatives to popular SaaS tools. Compare features, and deploy them yourself or through our managed services.",
    url: "https://openapps.sh",
    siteName: "OpenApps",
    locale: "en_US",
    type: "website",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
