'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Global error boundary - catches errors in the root layout
 *
 * This is a fallback for when error.tsx can't catch the error
 * (e.g., errors in layout.tsx itself).
 *
 * Note: This must define its own <html> and <body> tags because
 * the root layout may have failed.
 */

export default function GlobalError({
    error,
}: {
    error: Error & { digest?: string };
}) {
    useEffect(() => {
        console.error('Global error:', error);
    }, [error]);

    return (
        <html>
            <body>
                <main className="max-w-2xl mx-auto p-8 text-center">
                    <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
                    <p className="text-gray-600 mb-6">
                        We encountered an unexpected error.
                    </p>
                    <Link
                        href="/"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Go Home
                    </Link>
                </main>
            </body>
        </html>
    );
}
