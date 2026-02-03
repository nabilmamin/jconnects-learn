
import Link from "next/link";

export default function Home() {

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">JC Connects</h1>
      <p className="text-gray-600 mt-2">Weekly Dinners in Jersey City</p>


      <Link href="/events"
      className="mt-8 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
        View Upcoming Dinners
      </Link>
    </main>
  );
}
