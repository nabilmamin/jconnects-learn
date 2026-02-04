import { getEventById } from '@/lib/db';
import { notFound } from 'next/navigation';
import { BuyTicketButton } from './BuyTicketButton';

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function EventDetailPage({ params }: PageProps) {
    const { id } = await params;
    const event = await getEventById(id);

    if (!event) {
        notFound();
    }

    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <main className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-2">Dinner in {event.city}</h1>
            <p className="text-gray-600 mb-6">{formattedDate}</p>

            <div className="border rounded-lg p-6 mb-6">
                <h2 className="font-semibold mb-2">Event Details</h2>
                <p className="text-gray-600">
                    Join us for a dinner with interesting people in {event.city}, {event.state}.
                    You'll be seated at a table with other guests for great conversation and food.
                </p>
            </div>

            <div className="border rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold">Ticket Price</h2>
                        <p className="text-2xl font-bold">
                            ${(event.price / 100).toFixed(2)}
                        </p>
                    </div>
                    <BuyTicketButton eventId={event.id} />
                </div>
            </div>
        </main>
    );
}
