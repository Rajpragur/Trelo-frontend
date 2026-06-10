import type { Metadata } from "next";
import { Geist, Geist_Mono, Anonymous_Pro } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anonymousPro = Anonymous_Pro({
  variable: "--font-anonymous-pro",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Trelo — Trust Middleware for AI Agents",
  description:
    "Deterministic runtime safety and security layer for AI agents. Stop infinite loops, block duplicate payments, prevent security attacks, and slash token waste by 40-70%. One line of code. pip install trelo.",
  openGraph: {
    title: "Trelo — Trust Middleware for AI Agents",
    description:
      "Stop infinite loops, block duplicate payments, prevent security attacks. pip install trelo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anonymousPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
