import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';
import { useToast } from './ToastProvider';
import type { RiskLevel } from '../data/demoData';

interface MarkLowRiskModalProps {
  featureName: string;
  currentRisk: RiskLevel;
  onClose: () => void;
  onAccepted: (justification: string) => void;
}

const riskDowngrade: Record<RiskLevel, RiskLevel> = {
  Critical: 'High',
  High: 'Medium',
  Medium: 'Low',
  Low: 'Low',
};

export function MarkLowRiskModal({ featureName, currentRisk, onClose, onAccepted }: MarkLowRiskModalProps) {
  const [justification, setJustification] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const { showToast } = useToast();
  const newRisk = riskDowngrade[currentRisk];

  function handleAccept() {
    if (!justification.trim()) return;
    setConfirmed(true);
    setTimeout(() => {
      onAccepted(justification);
      showToast('Risk accepted with justification', 'info');
      onClose();
    }, 1000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-sm z-10"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-yellow-50 rounded-xl flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Accept Risk</h3>
              <p className="text-xs text-gray-500">{featureName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
            <p className="text-xs text-yellow-800">
              This will reduce the risk level from <strong>{currentRisk}</strong> to <strong>{newRisk}</strong> and add a justification to the audit trail.
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 mb-2 block">
              Justification <span className="text-red-500">*</span>
            </label>
            <textarea
              value={justification}
              onChange={e => setJustification(e.target.value)}
              placeholder="Explain why this drift is acceptable risk..."
              rows={4}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500/40 text-gray-700 placeholder-gray-400"
            />
            <p className="text-[10px] text-gray-400 mt-1">Required — this will be recorded in the audit trail.</p>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-gray-100 flex gap-2 justify-end">
          <button onClick={onClose} className="btn-secondary text-sm py-2">Cancel</button>
          <button
            onClick={handleAccept}
            disabled={!justification.trim() || confirmed}
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl text-sm font-medium hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {confirmed ? 'Accepted!' : 'Accept Risk'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
