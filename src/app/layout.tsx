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

export const metadata: Metadata = siteMetadataBase();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uk"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark min-h-dvh antialiased`}
    >
      <body className="pointer-events-auto touch-manipulation flex min-h-dvh flex-col antialiased">
        <Providers>{children}</Providers>
        <div
          id="purepdf-portal-root"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[100] [&>*]:pointer-events-auto"
        />
      </body>
    </html>
  );
}
