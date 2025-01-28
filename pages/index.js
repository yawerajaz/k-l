import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Kashmir Living</title>
      </Head>

      {/* Hero Section */}
      <header className="bg-blue-800 text-white py-20 px-4">
        <h1 className="text-4xl font-bold text-center">
          Explore. Connect. Thrive – Your Gateway to Kashmir
        </h1>
        <div className="flex justify-center mt-8 gap-4">
          <Link href="/tourism" className="bg-white text-blue-800 px-6 py-2 rounded">
            Tourism Guides
          </Link>
          <Link href="/marketplace" className="bg-white text-blue-800 px-6 py-2 rounded">
            Marketplace
          </Link>
        </div>
      </header>
    </div>
  );
}