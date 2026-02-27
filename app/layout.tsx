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
  title: "Rijin V Reji — React.js Developer & Frontend Engineer",
  description:
    "Portfolio of Rijin V Reji — a React.js developer and frontend engineer specializing in Next.js, TypeScript, and modern web experiences. Based in Kerala, India.",
  keywords: [
    "React Developer",
    "Next.js Developer",
    "Frontend Engineer",
    "Rijin V Reji",
    "Web Developer Kerala",
    "TypeScript",
    "JavaScript",
  ],
  openGraph: {
    title: "Rijin V Reji — React.js Developer",
    description:
      "Building high-performance, accessible, and beautiful web applications with React.js, Next.js, and modern web technologies.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
