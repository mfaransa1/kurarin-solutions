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
  metadataBase: new URL("https://kurarinsolutions.co.ke"),
  title: {
    default: "Kurarin Solutions | Software, Systems & Digital Products",
    template: "%s | Kurarin Solutions",
  },
  description: "Kurarin Solutions designs and builds custom software, business systems, websites and automation that help organisations work better and grow with confidence.",
  applicationName: "Kurarin Solutions",
  openGraph: {
    type: "website",
    siteName: "Kurarin Solutions",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
