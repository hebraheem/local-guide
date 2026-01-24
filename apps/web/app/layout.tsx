import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { QueryProvider } from "@/context/query-provider";
import { getLocale } from "@/src/lib/i18n/detect";
import { getTheme } from "@/src/lib/theme/detect";
import React from "react";
import { ROOT_LAYOUT_HEADER_HEIGHT } from "@/constant/variables";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Local Guide - Get Help. Give Help. Build Community.",
  description:
    "Connect with local helpers in your community for services, support, and friendship. Get translation, city tours, study help, and more.",
  manifest: "/manifest.json",
  keywords: [
    "local guide",
    "community help",
    "translation",
    "city tours",
    "local services",
    "helper network",
    "community support",
  ],
  authors: [{ name: "Local Guide Team" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Local Guide",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    apple: [
      { url: "../public/icon-192x192.png", sizes: "192x192" },
      { url: "../public/icon-512x512.png", sizes: "512x512" },
    ],
  },
  openGraph: {
    title: "Local Guide - Connect with Local Helpers",
    description:
      "Get help with translation, city tours, study help, and more from your local community",
    type: "website",
    siteName: "Local Guide",
  },
  twitter: {
    card: "summary_large_image",
    title: "Local Guide - Connect with Local Helpers",
    description:
      "Get help with translation, city tours, study help, and more from your local community",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const theme = await getTheme();

  return (
    <html lang={locale} className={theme === "dark" ? "dark" : undefined}>
      <head>
        <meta name="theme-color" content="#4f46e5" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <title>Your Local Guide</title>
      </head>
      <body
        className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
        style={{ "--header-h": `${ROOT_LAYOUT_HEADER_HEIGHT}px` } as any}
      >
        <QueryProvider>
          <main>{children}</main>
          {/*<PWAInstaller />*/}
        </QueryProvider>
      </body>
    </html>
  );
}
