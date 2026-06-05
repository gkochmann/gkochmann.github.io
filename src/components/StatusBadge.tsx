import type { FeatureStatus } from '../data/demoData';

interface StatusBadgeProps {
  status: FeatureStatus;
  size?: 'sm' | 'md';
}

const config: Record<FeatureStatus, { bg: string; text: string; label: string }> = {
  'Aligned': { bg: 'bg-green-50 border-green-200', text: 'text-green-700', label: 'Aligned' },
  'Drift Detected': { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700', label: 'Drift Detected' },
  'Review Required': { bg: 'bg-red-50 border-red-200', text: 'text-red-700', label: 'Review Required' },
  'Review Created': { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', label: 'Review Created' },
  'Review Complete': { bg: 'bg-green-50 border-green-200', text: 'text-green-700', label: 'Review Complete' },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const c = config[status];
  const sz = size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-xs';
  return (
    <span className={`inline-flex items-center rounded-full font-medium border ${sz} ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}
