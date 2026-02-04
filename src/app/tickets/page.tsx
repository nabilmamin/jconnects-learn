import { getCurrentUser } from '@/lib/auth';

export default async function TicketsPage() {
    const user = await getCurrentUser();

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">My Tickets</h1>
            <p className="text-gray-600">
                Welcome, {user?.name}. You have no tickets yet.
            </p>
        </div>
    );
}
