import { getCurrentUser } from '@/lib/auth';

export default async function AccountPage() {
    const user = await getCurrentUser();

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">My Account</h1>
            <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {user?.name}</p>
                <p><span className="font-medium">Email:</span> {user?.email}</p>
                <p><span className="font-medium">Role:</span> {user?.role}</p>
            </div>
        </div>
    );
}
