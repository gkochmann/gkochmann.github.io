import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrainCircuit, MessageSquare, Cpu, X, ChevronRight,
  FileText, AlertTriangle, CheckCircle, Code2
} from 'lucide-react';
import { demoModels, type DemoModel } from '../data/demoData';
import { RiskBadge } from './RiskBadge';
import { useDeepBrand } from './CompanyContext';

const kindColor: Record<string, string> = {
  'Traditional ML': 'text-purple-700 bg-purple-50',
  GenAI: 'text-indigo-700 bg-indigo-50',
};

const statusColor: Record<string, string> = {
  Aligned: 'text-green-600 bg-green-50 border-green-200',
  'Drift Detected': 'text-orange-600 bg-orange-50 border-orange-200',
  'Review Required': 'text-red-600 bg-red-50 border-red-200',
};

const docStatusColor: Record<string, string> = {
  Current: 'text-green-600 bg-green-50',
  Stale: 'text-orange-600 bg-orange-50',
  Missing: 'text-red-600 bg-red-50',
};

function ModelCard({ model, onClick }: { model: DemoModel; onClick: () => void }) {
  const Icon = model.kind === 'GenAI' ? MessageSquare : Cpu;

  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 p-4 text-left shadow-card transition-shadow w-full h-full flex flex-col"
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${kindColor[model.kind]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-sm text-gray-900 truncate">{model.name}</h3>
            <RiskBadge risk={model.risk} size="sm" />
          </div>
          <div className="text-[11px] text-gray-400 mt-0.5">{model.kind} · {model.version} · {model.owner}</div>
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-600 leading-relaxed line-clamp-2">{model.purpose}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {model.impactTags.map(tag => (
          <span key={tag} className="px-1.5 py-0.5 bg-gray-50 border border-gray-100 rounded text-[10px] text-gray-500 font-medium">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-3 flex items-center justify-between">
        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${statusColor[model.status]}`}>
          {model.status}
        </span>
        <span className="text-[11px] text-[#3157F6] font-medium flex items-center gap-1">
          View details <ChevronRight className="h-3 w-3" />
        </span>
      </div>
    </motion.button>
  );
}

function ModelDetailPanel({ model, onClose }: { model: DemoModel; onClose: () => void }) {
  const Icon = model.kind === 'GenAI' ? MessageSquare : Cpu;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-x-0 top-[57px] bottom-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3 }}
        className="fixed right-0 top-[57px] bottom-0 w-full max-w-md bg-white border-l border-gray-100 z-50 flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${kindColor[model.kind]}`}>
              <Icon className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{model.name}</h3>
              <div className="text-xs text-gray-400 mt-0.5">{model.kind} · {model.version} · Owner: {model.owner}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColor[model.status]}`}>
              {model.status}
            </span>
            <RiskBadge risk={model.risk} size="sm" />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1.5">What It Does</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{model.purpose}</p>
          </div>

          <div className={`rounded-xl border p-3 ${model.status === 'Aligned' ? 'bg-gray-50 border-gray-100' : 'bg-orange-50 border-orange-200'}`}>
            <div className="flex items-start gap-2">
              {model.status === 'Aligned'
                ? <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-green-600" />
                : <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-orange-600" />}
              <div>
                <div className="text-xs font-bold text-gray-800">Decision Impact</div>
                <p className="text-[11px] mt-0.5 leading-relaxed text-gray-600">{model.decisionImpact}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5 text-gray-400" /> Where It Appears In Code
            </h4>
            <div className="space-y-2">
              {model.codeLocations.map(loc => (
                <div key={loc.path} className="bg-white border border-gray-100 rounded-xl p-3 shadow-card">
                  <code className="text-[10px] text-gray-700 bg-gray-50 px-2 py-1 rounded font-mono block truncate">
                    {loc.path}
                  </code>
                  <p className="text-[11px] text-gray-500 mt-1.5">{loc.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Governance</h4>
            <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-card">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <FileText className="h-3.5 w-3.5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-gray-800">{model.governanceDoc}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Last review: {model.lastGovernanceReview}</div>
                  </div>
                </div>
                <span className={`shrink-0 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${docStatusColor[model.governanceDocStatus]}`}>
                  {model.governanceDocStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function ModelsScreen() {
  const models = useDeepBrand(demoModels);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedModel = models.find(m => m.id === selectedId) ?? null;

  const needsReview = models.filter(m => m.status !== 'Aligned').length;

  return (
    <div className="flex-1 overflow-y-auto p-6" data-tour="models-screen">
      <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-[#3157F6]" /> Models
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Every ML and AI model in production, where it runs in the code, and what decisions it influences.
          </p>
        </div>
        <div className="flex gap-3">
          {[
            { label: 'Models in production', value: models.length },
            { label: 'Need review', value: needsReview, alert: true },
            { label: 'Automated decisions monitored', value: 12 },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 px-4 py-2.5 text-center shadow-card">
              <div className={`text-lg font-bold ${stat.alert && stat.value > 0 ? 'text-red-600' : 'text-gray-900'}`}>{stat.value}</div>
              <div className="text-[10px] text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {models.map((model, i) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <ModelCard model={model} onClick={() => setSelectedId(model.id)} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedModel && (
          <ModelDetailPanel model={selectedModel} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
