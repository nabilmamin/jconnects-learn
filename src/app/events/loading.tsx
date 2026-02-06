export default function EventsLoading() {
    return (
        <main className="max-w-2xl mx-auto p-8">
            <div className="h-9 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-4 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                ))}
            </div>
        </main>
    );
}
