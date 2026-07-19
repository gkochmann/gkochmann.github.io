import { ArrowRight, BrainCircuit, Database, FileText, GitCompare, LayoutDashboard, Settings, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBrand } from './CompanyContext';

type NavSection = 'overview' | 'live-reviews' | 'contracts' | 'sources' | 'models' | 'audit' | 'settings';

interface TabContextPopupProps {
  section: NavSection;
  onClose: () => void;
}

const tabContext: Record<NavSection, {
  title: string;
  body: string;
  icon: React.ElementType;
}> = {
  overview: {
    title: 'Product Overview',
    body: 'Friendli is running Automated Decision Making V1, a new feature that automates matching decisions using profile details, location signals, and routine data. Start here to see what CodeCounsel found in the live product.',
    icon: LayoutDashboard,
  },
  sources: {
    title: 'Sources',
    body: 'These are the documents and systems CodeCounsel checked for Automated Decision Making V1, including the product plan, privacy review, code, analytics plan, and disclosures.',
    icon: Database,
  },
  contracts: {
    title: 'Contracts',
    body: 'Contracts turn Friendli approvals into rules CodeCounsel can monitor, such as which data Automated Decision Making V1 may collect, how it may be used, and how long it may be retained.',
    icon: FileText,
  },
  'live-reviews': {
    title: 'Reviews',
    body: 'Friendli\'s new Automated Decision Making V1 feature is collecting new data compared with what was originally approved. This view shows what was approved, what is being deployed now, and what needs review.',
    icon: GitCompare,
  },
  models: {
    title: 'Models',
    body: 'Models shows every ML and AI model Friendli runs in production, where each one appears in the code, and what it influences — automated ranking, matching, pricing, and content enforcement.',
    icon: BrainCircuit,
  },
  audit: {
    title: 'History',
    body: 'History records the Automated Decision Making V1 approval, the changes CodeCounsel detected, and any review decisions so Friendli can explain what happened later.',
    icon: Clock,
  },
  settings: {
    title: 'Settings',
    body: 'Settings show how a team like Friendli would manage connected systems, reviewer routing, risk thresholds, and workspace configuration.',
    icon: Settings,
  },
};

export function TabContextPopup({ section, onClose }: TabContextPopupProps) {
  const brand = useBrand();
  const context = tabContext[section];
  const Icon = context.icon;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-gray-950/20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4F6FF] text-[#3157F6]">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-950">{context.title}</h2>
            <p className="mt-1.5 text-sm leading-6 text-gray-600">{brand(context.body)}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3157F6] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2347e0]"
        >
          Continue demo <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </div>
  );
}
