'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
}: {
    error: Error & { digest?: string };
}) {
    useEffect(() => {
        // Log the error to console (in production, send to error tracking service)
        console.error('Application error:', error);
    }, [error]);

    return (
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
    );
}
