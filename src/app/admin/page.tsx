import { getCurrentUser } from '@/lib/auth';

export default async function AdminPage() {
    const user = await getCurrentUser();

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <p className="text-gray-600 mb-4">
                Welcome, {user?.name}. You have full admin access.
            </p>
            <p className="text-sm text-gray-500">
                Your role: {user?.role}
            </p>
        </div>
    );
}
