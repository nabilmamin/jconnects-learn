import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="max-w-md mx-auto mt-10 text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">
                You don't have permission to view this page.
            </p>
            <Link
                href="/"
                className="text-blue-600 hover:underline"
            >
                Go back home
            </Link>
        </div>
    );
}
