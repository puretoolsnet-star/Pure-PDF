import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/app/providers";
import { siteMetadataBase } from "@/lib/seo/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  ...siteMetadataBase(),
  verification: {
    google: "NdLL2m61xfnzABPwz5qAmkk0vhEL4f_5eVvJjZynJ5U",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uk"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark min-h-dvh antialiased`}
    >
      <body className="touch-manipulation flex min-h-dvh flex-col antialiased">
        <Providers>{children}</Providers>
        {/* Portal host: display:contents in globals.css — no full-screen hit layer */}
        <div id="purepdf-portal-root" />
      </body>
    </html>
  );
}
