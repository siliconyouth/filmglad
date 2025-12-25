import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GLAD - Film",
    template: "%s | GLAD",
  },
  description: "Three truths. One night. No escape. A psychological thriller exploring trauma, desire, and the hungers that never fade.",
  keywords: ["film", "movie", "thriller", "psychological", "drama", "GLAD", "HUNGER", "Serbian film"],
  authors: [{ name: "GLAD Film" }],
  creator: "GLAD Film",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://filmglad.com"),
  openGraph: {
    type: "website",
    locale: "sr_RS",
    alternateLocale: "en_US",
    siteName: "GLAD - Film",
    title: "GLAD - Film",
    description: "Three truths. One night. No escape. Some hungers never fade — they repeat.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GLAD - Film",
    description: "Three truths. One night. No escape.",
    creator: "@gladfilm",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  manifest: "/manifest.json",
  other: {
    "msapplication-TileColor": "#0a0a0a",
    "theme-color": "#0a0a0a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
