import { motion } from 'framer-motion';
import type { RiskLevel } from '../data/demoData';

interface RiskBadgeProps {
  risk: RiskLevel;
  pulse?: boolean;
  size?: 'sm' | 'md';
}

const config: Record<RiskLevel, { bg: string; text: string; dot: string; label: string }> = {
  Critical: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', label: 'Critical' },
  High: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500', label: 'High' },
  Medium: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500', label: 'Medium' },
  Low: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', label: 'Low' },
};

export function RiskBadge({ risk, pulse = false, size = 'md' }: RiskBadgeProps) {
  const c = config[risk];
  const sz = size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${sz} ${c.bg} ${c.text} border-current border-opacity-20`}>
      <span className="relative flex h-1.5 w-1.5">
        {pulse && (risk === 'Critical' || risk === 'High') ? (
          <>
            <motion.span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${c.dot}`}
              animate={{ scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${c.dot}`} />
          </>
        ) : (
          <span className={`inline-flex rounded-full h-1.5 w-1.5 ${c.dot}`} />
        )}
      </span>
      {c.label}
    </span>
  );
}
