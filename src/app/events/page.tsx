import { getEvents } from '@/lib/db';

export default async function EventsPage() {
    const events = await getEvents();

    return (
        <main className="min-h-screen p-8">
            <h1 className="text-3xl font-bold">Upcoming Dinners</h1>
            <div className="font-mono text-sm">
                {JSON.stringify(events, null, 2)}
            </div>
        </main>
    )
}