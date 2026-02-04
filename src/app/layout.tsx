import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getCurrentUser } from "@/lib/auth";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <nav className="border-b px-8 py-4 flex items-center gap-6">
          {/* Left side - main nav */}
          <Link href="/" className="font-bold">JC Connects</Link>
          <Link href="/events" className="text-gray-600 hover:text-black">Events</Link>

          {/* Right side - auth nav */}
          <div className="ml-auto flex items-center gap-4">
            {user ? (
              <>
                <Link href="/tickets" className="text-gray-600 hover:text-black">My Tickets</Link>
                <Link href="/account" className="text-gray-600 hover:text-black">Account</Link>
                {(user.role === 'coordinator' || user.role === 'admin') && (
                  <Link href="/coordinator" className="text-gray-600 hover:text-black">Coordinator</Link>
                )}
                {user.role === 'admin' && (
                  <Link href="/admin" className="text-gray-600 hover:text-black">Admin</Link>
                )}
                <Link href="/logout" className="text-gray-600 hover:text-black">Logout</Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-black">Login</Link>
                <Link href="/signup" className="py-1 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
