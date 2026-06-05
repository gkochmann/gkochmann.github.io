import { useState } from 'react';
import { motion } from 'framer-motion';
import { globalAuditEvents, demoFeatures } from '../data/demoData';
import { AuditTimeline } from './AuditTimeline';
import { Filter } from 'lucide-react';

export function AuditScreen() {
  const [typeFilter, setTypeFilter] = useState('All');

  const allEvents = [
    ...globalAuditEvents,
    ...demoFeatures.flatMap(f => f.auditTrail),
  ].sort((a, b) => b.id.localeCompare(a.id));

  const types = ['All', 'scan', 'approval', 'review', 'comment', 'disclosure', 'risk'];
  const filtered = typeFilter === 'All' ? allEvents : allEvents.filter(e => e.type === typeFilter);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Global Audit Trail</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          All events across the Friendli workspace — {allEvents.length} total events
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Filter className="h-3.5 w-3.5 text-gray-400" />
        {types.map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border capitalize
              ${typeFilter === t
                ? 'bg-[#3157F6] text-white border-[#3157F6]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-card p-5"
      >
        <AuditTimeline events={filtered} />
      </motion.div>
    </div>
  );
}
