import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { systemContracts } from '../data/demoData';
import { RiskBadge } from './RiskBadge';
import { StatusBadge } from './StatusBadge';

export function SystemContractsTable() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');

  const filters = ['All', 'Drift Detected', 'Review Required', 'Aligned'];

  const filtered = systemContracts.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.productArea.toLowerCase().includes(search.toLowerCase()) ||
      c.owner.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || c.driftStatus === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">System Contracts</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {systemContracts.length} live contracts monitoring Friendli Mobile App
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-48 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search contracts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3157F6]/20"
          />
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
          <Filter className="h-3.5 w-3.5 text-gray-400 ml-2" />
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                filter === f ? 'bg-[#3157F6] text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {['Contract', 'Product Area', 'Source Docs', 'Implementation', 'Last Scan', 'Status', 'Owner', 'Risk'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((contract, i) => (
                <motion.tr
                  key={contract.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-gray-900">{contract.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-600 whitespace-nowrap">{contract.productArea}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {contract.sourceDocs.slice(0, 2).map(doc => (
                        <span key={doc} className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-600 whitespace-nowrap">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded font-mono">
                      {contract.implementationSource}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] text-gray-500 whitespace-nowrap">{contract.lastScan}</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={contract.driftStatus} size="sm" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center">
                        <span className="text-white text-[9px] font-bold">{contract.owner[0]}</span>
                      </div>
                      <span className="text-xs text-gray-700 whitespace-nowrap">{contract.owner}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <RiskBadge risk={contract.risk} size="sm" pulse={contract.risk === 'Critical'} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-gray-400 text-sm">
            No contracts match your search.
          </div>
        )}

        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {systemContracts.length} contracts</span>
          <span className="text-xs text-gray-400">Last full scan: 12 min ago</span>
        </div>
      </div>
    </div>
  );
}
