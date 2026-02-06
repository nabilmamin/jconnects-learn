export default function Loading() {
    return (
        <main className="max-w-2xl mx-auto p-8">
            <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        </main>
    );
}
