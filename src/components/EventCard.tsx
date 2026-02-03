import Link from "next/link";

type EventCardProps = {
    id: number;
    title: string;
    date: string;
    spotsLeft: number;
}

export default function EventCard({ id, title, date, spotsLeft }: EventCardProps) {
    return (
        <Link href={`/events/${id}`}>
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-simubold text-lg">{title}</h3>
            <p className="text-gray-600">{date}</p>
            <p className="text-sm mt-2">
                {spotsLeft > 0 ? `${spotsLeft} spots left`: "Sold out"}
            </p>
        </div>
        </Link>
    )
}