type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function EventDetailPage({ params }: PageProps) {
    const { id } = await params;

    return (
        <main className="min-h-screen p-8">
            <h1 className="text-3xl font-bold">Event Details</h1>
            <p className="mt-4">You are viewing event: {id}</p>
        </main>
    );
}