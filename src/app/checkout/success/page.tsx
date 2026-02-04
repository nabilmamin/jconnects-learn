import Link from 'next/link';

export default function CheckoutSuccessPage() {
    return (
        <div className="max-w-md mx-auto mt-10 text-center">
            <h1 className="text-2xl font-bold mb-4 text-green-600">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">
                Thank you for your purchase. You'll receive a confirmation email shortly.
            </p>
            <div className="space-x-4">
                <Link
                    href="/tickets"
                    className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    View My Tickets
                </Link>
                <Link
                    href="/events"
                    className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Browse Events
                </Link>
            </div>
        </div>
    );
}
