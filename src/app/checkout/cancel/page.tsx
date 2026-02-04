import Link from 'next/link';

export default function CheckoutCancelPage() {
    return (
        <div className="max-w-md mx-auto mt-10 text-center">
            <h1 className="text-2xl font-bold mb-4">Payment Cancelled</h1>
            <p className="text-gray-600 mb-6">
                Your payment was cancelled. No charges were made.
            </p>
            <Link
                href="/events"
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Back to Events
            </Link>
        </div>
    );
}
