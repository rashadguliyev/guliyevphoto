import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://guliyevphoto.com"),
  title: {
    default: "Guliyev Photo | Dallas Photographer",
    template: "%s | Guliyev Photo",
  },
  description:
    "Cinematic portrait, family, branding, product, and event photography in Dallas-Fort Worth by Rashad Guliyev.",
  keywords: [
    "Dallas photographer",
    "DFW photographer",
    "Dallas portrait photographer",
    "Dallas branding photographer",
    "Dallas event photographer",
  ],
  openGraph: {
    title: "Guliyev Photo | Dallas Photographer",
    description:
      "Cinematic, editorial photography for people and brands in Dallas-Fort Worth.",
    type: "website",
    locale: "en_US",
    siteName: "Guliyev Photo",
  },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
