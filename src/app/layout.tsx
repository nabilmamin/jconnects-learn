import type { Metadata } from "next";
import Link from "next/link";
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
  title: "JC Connects",
  description: "Weekly dinners in Jersey City",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b px-8 py-4 flex gap-6">
          <Link href="/" className="font-bold">JC Connects</Link>
          <Link href="/events" className="text-gray-600 hover:text-black">Events</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
