import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-xl mx-auto mt-24 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm text-center">
      <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Prowider Lead Distribution System</h1>
      <p className="text-sm text-gray-400 mb-8">Internship Evaluation Project Matrix</p>
      
      <div className="space-y-3">
        <Link href="/request-service" className="block w-full bg-black text-white rounded-xl py-3 text-sm font-semibold hover:bg-gray-800 transition-all">
          Go to Public Request Form
        </Link>
        <Link href="/dashboard" className="block w-full border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
          Open Live Metrics Dashboard
        </Link>
        <Link href="/test-tools" className="block w-full border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
          Open Evaluation Testing Panel
        </Link>
      </div>
    </div>
  );
}