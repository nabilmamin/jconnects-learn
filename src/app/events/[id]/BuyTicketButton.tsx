"use client";

import { useState } from 'react';

type BuyTicketButtonProps = {
    eventId: string;
};

export function BuyTicketButton({ eventId }: BuyTicketButtonProps) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleBuy() {
        setLoading(true);
        setError('');

        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId, quantity }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error);
            setLoading(false);
            return;
        }

        // Redirect to Stripe Checkout
        window.location.href = data.url;
    }

    return (
        <div className="flex items-center gap-4">
            <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-md px-3 py-2"
            >
                <option value={1}>1 ticket</option>
                <option value={2}>2 tickets</option>
            </select>
            <button
                onClick={handleBuy}
                disabled={loading}
                className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
                {loading ? 'Loading...' : 'Buy'}
            </button>
            {error && (
                <p className="text-red-600 text-sm">{error}</p>
            )}
        </div>
    );
}
