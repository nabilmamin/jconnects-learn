"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        setLoading(true);

        await fetch('/api/auth/logout', {
            method: 'POST',
        });

        router.push('/');
        router.refresh();
    }

    return (
        <div className="max-w-md mx-auto mt-10 text-center">
            <h1 className="text-2xl font-bold mb-6">Log Out</h1>
            <p className="mb-6 text-gray-600">Are you sure you want to log out?</p>
            <div className="space-x-4">
                <button
                    onClick={() => router.back()}
                    className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400"
                >
                    {loading ? 'Logging out...' : 'Log Out'}
                </button>
            </div>
        </div>
    );
}
