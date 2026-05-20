'use client';
import React, { useState } from 'react';

export default function PublicForm() {
  const [form, setForm] = useState({ name: '', phone: '', city: '', serviceId: 'service_1', description: '' });
  const [log, setLog] = useState({ status: 'idle', message: '' });

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLog({ status: 'loading', message: 'Processing submission filters...' });

    try {
      const call = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const res = await call.json();

      if (!call.ok) throw new Error(res.error || 'Transmission failed.');

      setLog({ status: 'success', message: `Lead allocated successfully! Targets assigned: ${res.assignedTo.join(', ')}` });
      setForm({ name: '', phone: '', city: '', serviceId: 'service_1', description: '' });
    } catch (err: any) {
      setLog({ status: 'error', message: err.message });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h1 className="text-xl font-bold tracking-tight text-gray-900 mb-6">Submit Service Enquiry</h1>
      <form onSubmit={handleDispatch} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Customer Name</label>
          <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Phone Number</label>
          <input type="text" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">City</label>
          <input type="text" required value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Service Requested</label>
          <select value={form.serviceId} onChange={e => setForm({...form, serviceId: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:outline-blue-500">
            <option value="service_1">Service 1</option>
            <option value="service_2">Service 2</option>
            <option value="service_3">Service 3</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Task Details</label>
          <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 text-sm h-20 focus:outline-blue-500" />
        </div>
        <button type="submit" disabled={log.status === 'loading'} className="w-full bg-black text-white rounded-lg p-2.5 font-semibold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50">
          Submit Lead
        </button>
      </form>
      {log.message && (
        <div className={`mt-4 p-3 rounded-lg text-xs font-medium ${log.status === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : log.status === 'error' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-gray-50 text-gray-600'}`}>
          {log.message}
        </div>
      )}
    </div>
  );
}