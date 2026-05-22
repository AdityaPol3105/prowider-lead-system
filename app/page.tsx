'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [activeTab, setActiveTab] = useState('routing');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-400 selection:bg-indigo-500/30 selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* GLOBAL BACKGROUND GLOWS & GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[60%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A] border border-white/5 text-xs font-medium text-gray-300 mb-6 backdrop-blur-md shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-white font-semibold">Engine Update:</span> Prisma 7 Data Layer Configured
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
          Distribute Leads Instantly. <br />
          <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            Scale Without Chaos.
          </span>
        </h1>
        
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Automatically assign, track, and manage incoming service leads with intelligent routing, 
          round-robin allocation, database-level deduplication, and real-time operational streams[cite: 6, 8, 53, 76, 90, 114].
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link 
            href="/request-service" 
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-bold text-sm rounded-xl hover:bg-neutral-200 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 group"
          >
            Launch Public Request Form [cite: 81, 82]
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] hover:bg-[#1A1A1A] text-white border border-white/10 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Open Live Dashboard [cite: 110, 111]
          </Link>
        </div>

        {/* INTERACTIVE DASHBOARD PREVIEW MOCKUP (Attio/Linear Style) */}
        <div className="relative mx-auto max-w-5xl bg-[#111111]/80 border border-white/10 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl p-1 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          
          {/* Mockup Header Mac Buttons */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#161616]/60 border-b border-white/5 rounded-t-xl">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-neutral-800" />
              <div className="w-3 h-3 rounded-full bg-neutral-800" />
              <div className="w-3 h-3 rounded-full bg-neutral-800" />
            </div>
            <div className="text-[11px] font-mono tracking-wider text-gray-500 bg-[#0A0A0A] px-4 py-1 rounded-md border border-white/5">
              prowider-lead-engine v7.8.0
            </div>
            <div className="w-12" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 min-h-[380px] text-left">
            {/* Mockup Sidebar */}
            <div className="p-4 border-r border-white/5 bg-[#0D0D0D]/50 space-y-1">
              <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase block px-2 mb-2">Simulated Modules</span>
              <button onClick={() => setActiveTab('routing')} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${activeTab === 'routing' ? 'bg-white/5 text-white shadow-sm border border-white/5' : 'text-gray-500 hover:text-gray-300'}`}>
                🎯 Automated Lead Allocation [cite: 8]
              </button>
              <button onClick={() => setActiveTab('concurrency')} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${activeTab === 'concurrency' ? 'bg-white/5 text-white shadow-sm border border-white/5' : 'text-gray-500 hover:text-gray-300'}`}>
                🔒 Concurrency Row Locks [cite: 17, 107]
              </button>
              <button onClick={() => setActiveTab('idempotency')} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${activeTab === 'idempotency' ? 'bg-white/5 text-white shadow-sm border border-white/5' : 'text-gray-500 hover:text-gray-300'}`}>
                ⚡ Webhook Idempotency [cite: 18, 138]
              </button>
              <div className="pt-8 px-2">
                <Link href="/test-tools" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 underline underline-offset-4">
                  Open Verification Tools [cite: 128, 130] →
                </Link>
              </div>
            </div>

            {/* Mockup Content Panel */}
            <div className="p-6 md:col-span-3 bg-[#111111]/40 flex flex-col justify-between">
              {activeTab === 'routing' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white tracking-tight">Deterministic Lead Distribution Framework</h4>
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 font-mono font-semibold">Active Engine</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Incoming consumer service requests instantly initiate the transaction mapping process[cite: 6, 7]. The core framework computes required system assignments using a non-random, persistent round-robin indexing array[cite: 70, 75, 76, 77].
                  </p>
                  <div className="border border-white/5 rounded-xl bg-[#0A0A0A] p-4 font-mono text-[11px] text-gray-300 space-y-2 shadow-inner">
                    <div className="text-gray-500">// Evaluated Rule Structure Example</div>
                    <div><span className="text-purple-400">Service 1:</span> Mandatory: <span className="text-cyan-400">[Provider 1]</span> + Fair Rotation: <span className="text-amber-400">[Providers 2, 3, 4]</span> [cite: 65, 72]</div>
                    <div><span className="text-purple-400">Service 2:</span> Mandatory: <span className="text-cyan-400">[Provider 5]</span> + Fair Rotation: <span className="text-amber-400">[Providers 6, 7, 8]</span> [cite: 66, 73]</div>
                    <div><span className="text-purple-400">Service 3:</span> Mandatory: <span className="text-cyan-400">[Provider 1, 4]</span> + Fair Rotation: <span className="text-amber-400">[Providers 2, 3, 5, 6, 7, 8]</span> [cite: 67, 74]</div>
                  </div>
                </div>
              )}

              {activeTab === 'concurrency' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white tracking-tight">Transactional Concurrency Isolation</h4>
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-mono font-semibold">ACID Guarded</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    To eliminate allocation anomalies or race conditions during simultaneous request peaks[cite: 17, 27, 54, 107], the pipeline deploys a strict PostgreSQL advisory block. Incoming calls wait inside an orderly transactional queue[cite: 107].
                  </p>
                  <div className="border border-white/5 rounded-xl bg-[#0A0A0A] p-4 font-mono text-[11px] text-emerald-400 space-y-1 shadow-inner">
                    <p className="text-gray-500">// Transactional Thread Synchronization</p>
                    <p>await tx.$executeRawUnsafe(`SELECT pg_advisory_xact_lock(${"{"}lockId{"}"})`);</p>
                    <p className="text-gray-400">// Concurrent threads queue orderly. Quota overrides safely averted[cite: 105, 107].</p>
                  </div>
                </div>
              )}

              {activeTab === 'idempotency' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white tracking-tight">Webhook Idempotency Tracking Logs</h4>
                    <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20 font-mono font-semibold">Deduplicated</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Administrative triggers use atomic processing records[cite: 137, 139]. If a subscription webhook is replayed or re-transmitted multiple times over the network [cite: 131, 134, 138], the database drops duplicate side effects immediately[cite: 138].
                  </p>
                  <div className="border border-white/5 rounded-xl bg-[#0A0A0A] p-4 font-mono text-[11px] text-gray-400 space-y-1 shadow-inner">
                    <p><span className="text-gray-500">IF</span> trackingSignature <span className="text-purple-400">EXISTS</span> <span className="text-gray-500">THEN</span></p>
                    <p className="text-cyan-400">  RETURN Status(200) // Skipping duplicate loop securely [cite: 138]</p>
                    <p><span className="text-gray-500">END IF</span></p>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
                <span>Database: Supabase PostgreSQL</span>
                <span>ORM Layer: Prisma 7 (v7.8.0)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REASSURANCE LOGO MARQUEE ZONE */}
      <section className="border-y border-white/5 bg-[#0D0D0D]/40 backdrop-blur-sm py-8 text-center text-xs font-mono tracking-widest uppercase text-gray-600">
        Trusted by high-performance systems and automated sales execution frameworks[cite: 29, 116].
      </section>

      {/* HIGH-END FEATURE CAPABILITIES GRID */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
            Engineered for Precision Allocation [cite: 13, 26]
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Every layer of this distribution architecture is tailored for transactional performance, correctness, and reliability under concurrency stress[cite: 19, 20, 27, 109].
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#111111]/60 border border-white/5 rounded-2xl p-6 relative group overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
            <div className="text-xl mb-4">🎯</div>
            <h3 className="text-sm font-bold text-white mb-2">Smart Round-Robin Allocation [cite: 69]</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Distributes workloads evenly across candidate subsets after satisfying mandatory assignment flags[cite: 50, 51, 70]. Pointers persist structurally in database state tables[cite: 77, 108].
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111111]/60 border border-white/5 rounded-2xl p-6 relative group overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
            <div className="text-xl mb-4">🛡️</div>
            <h3 className="text-sm font-bold text-white mb-2">Duplicate Lead Prevention [cite: 89]</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Enforces unique compound database indices (`phone_serviceId`) to block matching contact submissions on identical request channels[cite: 90, 97].
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#111111]/60 border border-white/5 rounded-2xl p-6 relative group overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
            <div className="text-xl mb-4">📊</div>
            <h3 className="text-sm font-bold text-white mb-2">Real-Time Data Feeds [cite: 15]</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Powers responsive layout interfaces using automated background client short-polling metrics[cite: 126]. Dashboards stay current without needing full browser reloads[cite: 11, 118].
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE COMPREHENSIVE WORKFLOW STEPS */}
      <section className="max-w-5xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-xl font-bold text-white tracking-tight mb-12">Distribution Pipeline Lifecycle [cite: 45]</h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
          {[
            { step: "01", label: "Ingestion", desc: "Customer submits form / API payload[cite: 6]." },
            { step: "02", label: "Deduplication", desc: "Database blocks duplicate numbers[cite: 90, 97]." },
            { step: "03", label: "Row Lock", desc: "Advisory transaction lock prevents race states[cite: 17, 107]." },
            { step: "04", label: "Allocation", desc: "Mandatory and Round-Robin targets map[cite: 50, 51, 70]." },
            { step: "05", label: "Stream", desc: "Provider dashboard re-polls and updates instantly[cite: 11, 53, 118]." }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#111111]/40 border border-white/5 p-4 rounded-xl text-left flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="font-mono text-xs font-bold text-indigo-400 block mb-2">{item.step}</span>
                <h4 className="text-xs font-bold text-white mb-1">{item.label}</h4>
              </div>
              <p className="text-[11px] text-gray-500 leading-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CONVERSATIONAL CALL TO ACTION PANEL */}
      <section className="max-w-4xl mx-auto px-6 pb-28 text-center relative">
        <div className="absolute inset-0 bg-indigo-500/5 rounded-3xl blur-2xl pointer-events-none" />
        <div className="bg-[#111111]/90 border border-white/10 rounded-3xl p-12 relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Ready to Evaluate the Lead Distribution Engine? [cite: 4, 12]</h2>
          <p className="text-xs text-gray-400 max-w-lg mx-auto mb-8">
            Switch to the testing platform module to verify strict business allocation correctness, data consistency, and idempotency benchmarks[cite: 13, 14, 18].
          </p>
          <div className="flex justify-center">
            <Link 
              href="/test-tools" 
              className="px-8 py-3 bg-white text-black font-bold text-sm rounded-xl hover:bg-neutral-200 transition-all shadow-lg"
            >
              Launch Core Testing Panel [cite: 128, 130]
            </Link>
          </div>
        </div>
      </section>

      {/* LUXURY MINIMAL PLATFORM FOOTER */}
      <footer className="border-t border-white/5 bg-[#0A0A0A] py-8 text-center text-[11px] font-mono text-gray-600">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>Prowider Assignment Submission Suite</span>
          <span>© 2026 Aditya — Built for Engineering Correctness[cite: 1, 20].</span>
        </div>
      </footer>

    </div>
  );
}