import Link from 'next/link';
import { getEvents } from '@/lib/db';

export default async function EventsPage() {
    const events = await getEvents();

    return (
        <main className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Upcoming Dinners</h1>
            {events.length === 0 ? (
                <p className="text-gray-600">No upcoming events.</p>
            ) : (
                <div className="space-y-4">
                    {events.map((event) => {
                        const eventDate = new Date(event.date);
                        const formattedDate = eventDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                        });

                        return (
                            <Link
                                key={event.id}
                                href={`/events/${event.id}`}
                                className="block border rounded-lg p-4 hover:border-blue-500 hover:bg-gray-50"
                            >
                                <h2 className="font-semibold text-lg">
                                    Dinner in {event.city}
                                </h2>
                                <p className="text-gray-600">{formattedDate}</p>
                                <p className="text-blue-600 font-medium">
                                    ${(event.price / 100).toFixed(2)}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            )}
        </main>
    );
}
