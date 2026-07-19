import { useState } from 'react';
import { ArrowRight, Building2, Compass, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export type DemoMode = 'tour' | 'explore';

interface DemoIntroModalProps {
  onStart: (companyName: string, mode: DemoMode) => void;
}

export function DemoIntroModal({ onStart }: DemoIntroModalProps) {
  const [companyName, setCompanyName] = useState('');
  const [mode, setMode] = useState<DemoMode>('tour');

  const displayName = companyName.trim() || 'Friendli';

  return (
    <div className="fixed inset-x-0 top-[57px] bottom-0 z-[80] flex items-center justify-center bg-gray-950/35 px-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="w-full max-w-lg rounded-2xl border border-white/70 bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3157F6]/15 bg-[#F4F6FF] px-3 py-1 text-xs font-semibold text-[#3157F6]">
          CodeCounsel demo context
        </div>

        <h2 className="text-xl font-bold leading-tight text-gray-950">
          {displayName} is developing a new feature for automated decision making.
        </h2>

        <div className="mt-5">
          <label htmlFor="demo-company-name" className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-gray-400" /> Make it yours — enter your company name
          </label>
          <input
            id="demo-company-name"
            type="text"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            placeholder="Friendli"
            maxLength={40}
            className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3157F6]/20 focus:border-[#3157F6]/40"
          />
          <p className="mt-1 text-[10px] text-gray-400">The demo will use this name everywhere. Leave blank to keep Friendli.</p>
        </div>

        <div className="mt-4">
          <div className="text-xs font-semibold text-gray-700 mb-1.5">How would you like to start?</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                id: 'tour' as DemoMode,
                icon: Sparkles,
                title: 'Guided walkthrough',
                desc: 'A hands-on tour of the flagged Automated Decision Making V1 change, step by step.',
                badge: 'Recommended',
              },
              {
                id: 'explore' as DemoMode,
                icon: Compass,
                title: 'Explore on my own',
                desc: 'Jump straight into the workspace and browse at your own pace.',
              },
            ].map(option => {
              const Icon = option.icon;
              const isSelected = mode === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setMode(option.id)}
                  className={`relative rounded-xl border p-3 text-left transition-all ${
                    isSelected
                      ? 'border-[#3157F6] bg-[#F4F6FF] ring-1 ring-[#3157F6]/30'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  {option.badge && (
                    <span className="absolute -top-2 right-2 rounded-full bg-[#3157F6] px-2 py-0.5 text-[9px] font-bold text-white">
                      {option.badge}
                    </span>
                  )}
                  <Icon className={`h-4 w-4 ${isSelected ? 'text-[#3157F6]' : 'text-gray-400'}`} />
                  <div className={`mt-1.5 text-xs font-bold ${isSelected ? 'text-[#3157F6]' : 'text-gray-800'}`}>
                    {option.title}
                  </div>
                  <p className="mt-0.5 text-[10px] leading-4 text-gray-500">{option.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => onStart(displayName, mode)}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3157F6] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2347e0]"
        >
          {mode === 'tour' ? 'Start guided tour' : 'Start exploring'} <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </div>
  );
}
