'use client';
import React, { useState } from 'react';

export default function TestingPanel() {
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const pushLog = (text: string) => setTerminalLogs(prev => [`[${new Date().toLocaleTimeString()}] ${text}`, ...prev]);

  const runResetWebhook = async (forcedId?: string) => {
    const targetId = forcedId || `evt_dev_${Math.random().toString(36).substring(2, 11)}`;
    try {
      const call = await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: targetId })
      });
      const data = await call.json();
      pushLog(`[Webhook Request Handled] Id: ${targetId} -> Status: ${call.status}. Result: ${JSON.stringify(data)}`);
    } catch (err) {
      pushLog(`Exception thrown processing webhook.`);
    }
  };

  const executeIdempotencyStress = async () => {
    const staticId = `evt_idempotent_stress_${Date.now()}`;
    pushLog(`Firing 5 parallel webhooks with duplicate Event ID: ${staticId}...`);
    await Promise.all(Array.from({ length: 5 }).map(() => runResetWebhook(staticId))); // Call 5 times simultaneously [cite: 134]
  };

  const executeConcurrencyStress = async () => {
    pushLog("Firing 10 simultaneous lead generation requests into /api/leads at the exact same millisecond...");
    
    const operationalPayloads = Array.from({ length: 10 }).map((_, i) => ({
      name: `Stress Target ${i + 1}`,
      phone: `99900000${10 + i}`, // Avoid primary unique phone constraints [cite: 90]
      city: "Pune",
      serviceId: "service_1",
      description: "Automated batch stress test payload submission."
    }));

    await Promise.all(
      operationalPayloads.map(async (payload) => {
        try {
          const call = await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const res = await call.json();
          pushLog(`[Batch Lead Output] Phone: ${payload.phone} Status: ${call.status} -> Assigned to: ${JSON.stringify(res.assignedTo || res.error)}`);
        } catch (err) {
          pushLog(`Subcomponent inside execution transaction batch timed out.`);
        }
      })
    ); // Triggers 10 leads instantly [cite: 135]
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6">
      <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Assignment Evaluation Control Panel</h1>
      <p className="text-sm text-gray-400 mb-8">Execute specialized testing parameters to verify backend correctness and architecture handling boundaries.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border border-gray-200 p-5 rounded-xl bg-white shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">Reset Provider Quota</h3>
            <p className="text-xs text-gray-400 mb-4">Triggers a simulation webhook payment message to clear out allocation statistics back down to initial scales.</p>
          </div>
          <button onClick={() => runResetWebhook()} className="w-full bg-black text-white text-xs font-bold py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Reset Quota
          </button>
        </div>

        <div className="border border-gray-200 p-5 rounded-xl bg-white shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">Test Webhook Idempotency</h3>
            <p className="text-xs text-gray-400 mb-4">Replays the exact same webhook payload 5 times concurrently. The quota must update only once.</p>
          </div>
          <button onClick={executeIdempotencyStress} className="w-full bg-amber-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-amber-700 transition-colors">
            Call Webhook 5x
          </button>
        </div>

        <div className="border border-gray-200 p-5 rounded-xl bg-white shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">Test Lead Concurrency</h3>
            <p className="text-xs text-gray-400 mb-4">Submits 10 separate lead generation requests at the exact same millisecond to test transaction locks.</p>
          </div>
          <button onClick={executeConcurrencyStress} className="w-full bg-indigo-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Generate 10 Leads Instantly
          </button>
        </div>
      </div>

      <div className="bg-gray-950 rounded-xl p-4 border border-gray-800 shadow-inner">
        <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">Live Execution Console Feed:</h3>
        <div className="h-64 overflow-y-auto font-mono text-[11px] text-emerald-400 space-y-1 p-2 bg-gray-900 rounded border border-gray-800 scrollbar-thin">
          {terminalLogs.length === 0 ? (
            <span className="text-gray-600 italic">Logs will cascade here as evaluation events occur...</span>
          ) : (
            terminalLogs.map((log, index) => <p key={index}>{log}</p>)
          )}
        </div>
      </div>
    </div>
  );
}