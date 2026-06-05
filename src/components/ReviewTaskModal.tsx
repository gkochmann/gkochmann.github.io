import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useToast } from './ToastProvider';

interface ReviewTaskModalProps {
  featureName: string;
  suggestedReviewers: string[];
  onClose: () => void;
  onCreated: (reviewers: string[], note: string, priority: string) => void;
}

const allReviewers = [
  'Privacy Counsel', 'Product Counsel', 'ML Governance', 'AI Governance',
  'Security', 'Design Lead', 'Product Manager', 'Engineering Lead', 'Data Science Lead',
];

const priorities = ['Low', 'Medium', 'High', 'Critical'];

export function ReviewTaskModal({ featureName, suggestedReviewers, onClose, onCreated }: ReviewTaskModalProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set(suggestedReviewers));
  const [note, setNote] = useState('');
  const [priority, setPriority] = useState('High');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  function toggle(r: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(r)) next.delete(r); else next.add(r);
      return next;
    });
  }

  function handleSubmit() {
    setSubmitted(true);
    setTimeout(() => {
      onCreated([...selected], note, priority);
      showToast('Review task created successfully', 'success');
      onClose();
    }, 1400);
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
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md z-10"
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Review task created</h3>
              <p className="text-sm text-gray-500 mt-1">{[...selected].join(', ')} have been notified.</p>
            </motion.div>
          ) : (
            <motion.div key="form">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-gray-900">Start Review Task</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{featureName}</p>
                </div>
                <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              <div className="px-5 py-4 space-y-4">
                {/* Reviewers */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-2 block">Assign reviewers</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {allReviewers.map(r => {
                      const isSelected = selected.has(r);
                      const isSuggested = suggestedReviewers.includes(r);
                      return (
                        <button
                          key={r}
                          onClick={() => toggle(r)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs text-left transition-all
                            ${isSelected
                              ? 'bg-[#3157F6] border-[#3157F6] text-white'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`}
                        >
                          <div className={`w-3 h-3 rounded border-2 shrink-0 flex items-center justify-center
                            ${isSelected ? 'border-white bg-white' : 'border-gray-300'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-[#3157F6] rounded-sm" />}
                          </div>
                          <span className="truncate">{r}</span>
                          {isSuggested && !isSelected && (
                            <span className="ml-auto text-[9px] text-[#3157F6] font-bold shrink-0">Suggested</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-2 block">Priority</label>
                  <div className="flex gap-2">
                    {priorities.map(p => (
                      <button
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`flex-1 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all
                          ${priority === p
                            ? p === 'Critical' ? 'bg-red-500 border-red-500 text-white'
                            : p === 'High' ? 'bg-orange-500 border-orange-500 text-white'
                            : p === 'Medium' ? 'bg-yellow-500 border-yellow-500 text-white'
                            : 'bg-green-500 border-green-500 text-white'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-2 block">Review note <span className="font-normal text-gray-400">(optional)</span></label>
                  <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="Add context or instructions for reviewers..."
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#3157F6]/20 focus:border-[#3157F6]/40 text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <div className="text-xs text-gray-400">
                  SLA: <span className="text-orange-600 font-medium">Due in 2 days</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={onClose} className="btn-secondary text-sm py-2">Cancel</button>
                  <button
                    onClick={handleSubmit}
                    disabled={selected.size === 0}
                    className="btn-primary text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Review Task
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
