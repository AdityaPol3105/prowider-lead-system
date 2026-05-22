import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
      
      {/* HERO SECTION */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-medium text-gray-800 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Production-Ready Lead Distribution Engine
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-none mb-6">
          Automated Smart Lead <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 bg-clip-text text-transparent">
            Allocation & Delivery Framework
          </span>
        </h1>
        <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
          A highly consistent mini lead distribution system built to handle strict mandatory routing parameters, 
          deterministic round-robin fair-share logic, and full transactional concurrency protection.
        </p>
      </div>

      {/* CORE CAPABILITIES GRID / ROUTE NAVIGATION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        
        {/* APP CORE MODULE 1: CUSTOMER ENQUIRY FORM */}
        <div className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center font-bold text-base mb-4 text-gray-900 group-hover:scale-105 transition-transform">
              📝
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Public Request Form</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              The external consumer-facing interface used to intake validated lead profiles. Implements robust, 
              database-level compound checks to eliminate duplicate enquiries on identical service lanes.
            </p>
          </div>
          <Link 
            href="/request-service" 
            className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl py-2.5 text-center text-xs font-bold tracking-wide hover:bg-black hover:text-white hover:border-black transition-all"
          >
            Launch Client Form
          </Link>
        </div>

        {/* APP CORE MODULE 2: LIVE METRICS DASHBOARD */}
        <div className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center font-bold text-base mb-4 text-gray-900 group-hover:scale-105 transition-transform">
              📊
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Live Metrics Dashboard</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Real-time administrative display workspace. Utilizes highly reactive background poll cycles 
              to stream current provider workloads, historical assignment chains, and remaining monthly quota margins.
            </p>
          </div>
          <Link 
            href="/dashboard" 
            className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl py-2.5 text-center text-xs font-bold tracking-wide hover:bg-black hover:text-white hover:border-black transition-all"
          >
            Open Live Monitor
          </Link>
        </div>

        {/* APP CORE MODULE 3: SIMULATION & STRESS PANEL */}
        <div className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center font-bold text-base mb-4 text-gray-900 group-hover:scale-105 transition-transform">
              🛠️
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Evaluation Testing Panel</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              A robust simulation engine designed for performance audits. Features instantaneous batch-lead firing loops 
              to verify transactional row locks and duplicate webhook replays for rigorous idempotency checks.
            </p>
          </div>
          <Link 
            href="/test-tools" 
            className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl py-2.5 text-center text-xs font-bold tracking-wide hover:bg-black hover:text-white hover:border-black transition-all"
          >
            Access Stress Tools
          </Link>
        </div>

      </div>

      {/* SYSTEM ARCHITECTURE OVERVIEW SPECIFICATION */}
      <div className="border border-gray-200 bg-white rounded-2xl p-8 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
          Architectural Engineering Safeguards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">Concurrency Defense</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Utilizes native PostgreSQL atomic advisory transaction blocks (`pg_advisory_xact_lock`) to lock 
              allocation state streams. This keeps simultaneously ingested requests orderly and immune to data race conditions.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">Deduplication Integrity</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Enforces a compound database-level unique constraint (`phone_serviceId`) to completely block duplicate customer entries 
              while safely allowing variations across separate branches.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">Idempotent Webhooks</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Tracks payment signatures using a dedicated unique logging schema. Repeated transmissions of the same event ID 
              are intercepted and resolved instantly without duplicating quota resets.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}