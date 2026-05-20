'use client';
import React, { useState, useEffect } from 'react';

export default function OperationalDashboard() {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const pullFeeds = async () => {
    try {
      const call = await fetch('/api/providers');
      const data = await call.json();
      setProviders(data);
    } catch (err) {
      console.error("Statistical query execution timeout:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    pullFeeds();
    const backgroundPulse = setInterval(pullFeeds, 3000); // Fulfills short polling window rule [cite: 122, 126]
    return () => clearInterval(backgroundPulse);
  }, []);

  if (loading) return <div className="p-12 text-center text-sm font-mono tracking-widest text-gray-400">Loading active metric streams...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Provider Metrics Live Dashboard</h1>
        <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full animate-pulse">Live Connections Stable</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {providers.map((provider) => {
          const quotaBalance = provider.monthlyQuota - provider.leadsReceived;
          return (
            <div key={provider.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-bold text-gray-900 text-base">{provider.name}</h2>
                    <span className="text-[10px] font-mono text-gray-400">Profile Index: #{provider.id}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center mb-4">
                  <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg">
                    <span className="text-[9px] font-bold text-gray-400 uppercase block">Received</span>
                    <span className="text-lg font-black text-black">{provider.leadsReceived}</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg">
                    <span className="text-[9px] font-bold text-gray-400 uppercase block">Quota Left</span>
                    <span className={`text-lg font-black ${quotaBalance <= 0 ? 'text-red-600' : 'text-gray-900'}`}>{quotaBalance}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Allocated Stream Log:</span>
                {provider.assignments.length === 0 ? (
                  <span className="text-xs text-gray-400 italic block py-1">No leads assigned yet.</span>
                ) : (
                  <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                    {provider.assignments.map((item: any) => (
                      <div key={item.id} className="text-[10px] bg-gray-50 border border-gray-100 p-2 rounded-md">
                        <span className="font-bold text-gray-800 block">{item.lead.name} ({item.lead.city})</span>
                        <span className="text-gray-400 block font-mono">{item.lead.phone}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}