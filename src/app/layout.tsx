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
  title: {
    default: "OSS Finder - Self-Hostable Open Source Alternatives",
    template: "%s | OSS Finder",
  },
  description:
    "Discover and explore self-hostable open-source alternatives to popular proprietary software. Find secure, privacy-focused solutions you can deploy on your own infrastructure.",
  keywords: [
    "open source",
    "self-hosted",
    "alternatives",
    "privacy",
    "software",
    "self-hostable",
    "FOSS",
    "free software",
    "private cloud",
    "home server",
    "docker",
    "deployment",
  ],
  authors: [{ name: "OSS Finder", url: "https://ossfinder.com" }],
  creator: "OSS Finder",
  publisher: "OSS Finder",
  metadataBase: new URL("https://ossfinder.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ossfinder.com",
    siteName: "OSS Finder",
    title: "OSS Finder - Self-Hostable Open Source Alternatives",
    description:
      "Discover and explore self-hostable open-source alternatives to popular proprietary software.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OSS Finder - Self-Hostable Open Source Alternatives",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OSS Finder - Self-Hostable Open Source Alternatives",
    description:
      "Discover and explore self-hostable open-source alternatives to popular proprietary software.",
    images: ["/og-image.png"],
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
  category: "Technology",
  applicationName: "OSS Finder",
  referrer: "origin-when-cross-origin",
  verification: {
    google: "your-google-site-verification-code",
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
