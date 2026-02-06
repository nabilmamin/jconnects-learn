import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="max-w-2xl mx-auto p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
            <p className="text-gray-600 mb-6">
                The page you&apos;re looking for doesn&apos;t exist.
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
