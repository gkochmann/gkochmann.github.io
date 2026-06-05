import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Server, FileText, Shield, Briefcase,
  Cpu, MessageSquare, Layers, BarChart2, X, ChevronRight,
  CheckCircle, RefreshCw
} from 'lucide-react';
import { connectedSources, type ConnectedSource } from '../data/demoData';

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  server: Server,
  'file-text': FileText,
  shield: Shield,
  briefcase: Briefcase,
  cpu: Cpu,
  'message-square': MessageSquare,
  layers: Layers,
  'bar-chart-2': BarChart2,
};

const typeColor: Record<string, string> = {
  Code: 'text-gray-700 bg-gray-100',
  Document: 'text-blue-700 bg-blue-50',
  ML: 'text-purple-700 bg-purple-50',
  AI: 'text-indigo-700 bg-indigo-50',
  Design: 'text-pink-700 bg-pink-50',
  Analytics: 'text-green-700 bg-green-50',
};

function SourceCard({ source, onClick }: { source: ConnectedSource; onClick: () => void }) {
  const Icon = iconMap[source.icon] ?? FileText;
  const color = typeColor[source.type] ?? 'text-gray-700 bg-gray-100';

  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 p-4 text-left shadow-card transition-shadow w-full"
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-sm text-gray-900 truncate">{source.name}</h3>
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] text-green-600 font-medium">{source.status}</span>
            </div>
          </div>
          <div className="text-[11px] text-gray-400 mt-0.5">{source.type} · Synced {source.lastSynced}</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className="text-base font-bold text-gray-900">{source.coverage}%</div>
          <div className="text-[10px] text-gray-400">Coverage</div>
        </div>
        <div className="text-center">
          <div className="text-base font-bold text-gray-900">{source.linkedRequirements}</div>
          <div className="text-[10px] text-gray-400">Linked reqs</div>
        </div>
        <div className="text-center">
          <div className="text-base font-bold text-gray-900">{source.artifacts.length}</div>
          <div className="text-[10px] text-gray-400">Artifacts</div>
        </div>
      </div>

      {/* Coverage bar */}
      <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${source.coverage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${source.coverage > 90 ? 'bg-green-500' : source.coverage > 80 ? 'bg-yellow-500' : 'bg-orange-500'}`}
        />
      </div>

      <div className="mt-2 flex items-center justify-end">
        <span className="text-[11px] text-[#3157F6] font-medium flex items-center gap-1">
          View details <ChevronRight className="h-3 w-3" />
        </span>
      </div>
    </motion.button>
  );
}

function SourceDetailPanel({ source, onClose }: { source: ConnectedSource; onClose: () => void }) {
  const Icon = iconMap[source.icon] ?? FileText;
  const color = typeColor[source.type] ?? 'text-gray-700 bg-gray-100';

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-gray-100 z-50 flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
              <Icon className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{source.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-600 font-medium">{source.status}</span>
                <span className="text-xs text-gray-400">· {source.lastSynced}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Stats */}
        <div className="px-5 py-4 grid grid-cols-3 gap-3 border-b border-gray-100">
          {[
            { label: 'Coverage', value: `${source.coverage}%` },
            { label: 'Linked requirements', value: source.linkedRequirements },
            { label: 'Artifacts', value: source.artifacts.length },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-gray-900">{stat.value}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Artifacts */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-800">Linked Artifacts</h4>
            <button className="flex items-center gap-1 text-xs text-[#3157F6] font-medium hover:text-[#2347e0]">
              <RefreshCw className="h-3 w-3" /> Sync now
            </button>
          </div>
          <div className="space-y-2">
            {source.artifacts.map(artifact => (
              <div key={artifact.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-card">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-semibold text-gray-800">{artifact.name}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{artifact.type}</div>
                  </div>
                  <span className="text-[10px] text-[#3157F6] bg-blue-50 px-1.5 py-0.5 rounded font-medium shrink-0">Linked</span>
                </div>
                <code className="text-[9px] text-gray-500 bg-gray-50 px-2 py-1 rounded font-mono block mt-2 truncate">
                  {artifact.path}
                </code>
              </div>
            ))}
          </div>

          {/* Fake linked contracts */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Connected Contracts</h4>
            <div className="space-y-1.5">
              {['Smart Profiles', 'Nearby Ranking Model', 'Plan Assistant', 'Home Feed Redesign'].slice(0, 3).map(name => (
                <div key={name} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3157F6]" />
                  <span className="text-xs text-gray-700">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function SourceExplorer() {
  const [selectedSource, setSelectedSource] = useState<ConnectedSource | null>(null);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Source Explorer</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {connectedSources.length} connected sources · 96% average coverage
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {connectedSources.map((source, i) => (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <SourceCard source={source} onClick={() => setSelectedSource(source)} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedSource && (
          <SourceDetailPanel source={selectedSource} onClose={() => setSelectedSource(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
