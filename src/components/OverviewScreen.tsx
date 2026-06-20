import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Shield, Cpu, MessageSquare, Layout,
  CheckCircle
} from 'lucide-react';
import { demoFeatures, overviewMetrics } from '../data/demoData';
import { RiskBadge } from './RiskBadge';
import { StatusBadge } from './StatusBadge';

interface OverviewScreenProps {
  onOpenReview: (featureId: string) => void;
}

function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{count}</>;
}

const categoryIcon: Record<string, React.ElementType> = {
  Privacy: Shield,
  'Traditional ML': Cpu,
  GenAI: MessageSquare,
  Design: Layout,
};

const categoryColor: Record<string, string> = {
  Privacy: 'text-red-600 bg-red-50',
  'Traditional ML': 'text-purple-600 bg-purple-50',
  GenAI: 'text-blue-600 bg-blue-50',
  Design: 'text-indigo-600 bg-indigo-50',
};

export function OverviewScreen({ onOpenReview }: OverviewScreenProps) {
  const primaryFeature = demoFeatures[0];
  const supportingFeatures = [demoFeatures[1], demoFeatures[3]];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Product story */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl bg-gradient-to-br from-[#3157F6] to-[#6654F1] p-6 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        <div className="relative">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="rounded-2xl border border-white/20 bg-white/12 px-5 py-4 backdrop-blur-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-white/65">Workspace</div>
              <h1 className="text-2xl font-bold leading-tight">
                Friendli Production Workspace
              </h1>
              <p className="mt-2 text-white/75 text-sm max-w-2xl leading-relaxed">
                Friendli is a new social media app that helps people find new friends based on shared routines, nearby places, and interests.
              </p>
            </div>
          </div>

          {/* Summary row */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { label: 'Reviews Needed', value: 3, highlight: true },
              { label: 'Changes Found', value: overviewMetrics.activeMaterialChanges, highlight: true },
              { label: 'Coverage', value: overviewMetrics.sourceCoverage, suffix: '%' },
              { label: 'Sources Connected', value: 9 },
              { label: 'Contracts Formed', value: overviewMetrics.liveContracts },
            ].map((stat, i) => (
              <div key={i} className={`rounded-xl p-3 ${stat.highlight ? 'bg-white/20 border border-white/30' : 'bg-white/10 border border-white/15'}`}>
                <div className="text-xl font-bold">
                  <><AnimatedCounter target={stat.value} />{stat.suffix ?? ''}</>
                </div>
                <div className="text-[11px] text-white/65 mt-0.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Primary review */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Reviews Needed</h2>
          <span className="text-xs text-gray-400">Start with Smart Profiles</span>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-3"
        >
          {[primaryFeature, ...supportingFeatures].map((feature, index) => {
            const Icon = categoryIcon[feature.category] ?? Shield;
            const catColor = categoryColor[feature.category] ?? 'text-gray-600 bg-gray-50';
            const isPrimary = index === 0;

            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(49,87,246,0.10)' }}
                className={`bg-white rounded-2xl border p-4 cursor-pointer transition-shadow ${isPrimary ? 'border-[#3157F6]/20 lg:row-span-3' : 'border-gray-100'}`}
                onClick={() => onOpenReview(feature.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${catColor}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{feature.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{feature.category} · {feature.productArea}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <RiskBadge risk={feature.risk} pulse />
                  </div>
                </div>

                <p className={`mt-3 text-xs text-gray-600 leading-relaxed ${isPrimary ? '' : 'line-clamp-2'}`}>
                  {isPrimary
                    ? 'Smart Profiles is approved for limited profile data, personalization, and 90 day retention. The live product now includes new data fields, analytics use, and longer retention.'
                    : feature.driftSummary}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <StatusBadge status={feature.status} size="sm" />
                    <span className="text-[11px] text-gray-400">Owner: {feature.owner}</span>
                  </div>
                  <button
                    className="flex items-center gap-1 text-[#3157F6] text-xs font-semibold hover:text-[#2347e0] transition-colors"
                    onClick={e => { e.stopPropagation(); onOpenReview(feature.id); }}
                  >
                    Review <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {feature.approvedDocs.slice(0, 3).map(doc => (
                    <span key={doc} className="px-1.5 py-0.5 bg-gray-50 border border-gray-100 rounded text-[10px] text-gray-500 font-medium">
                      {doc}
                    </span>
                  ))}
                  {feature.approvedDocs.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-gray-400">+{feature.approvedDocs.length - 3} more</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Sources + contracts summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <h3 className="text-sm font-semibold text-gray-800">Sources CodeCounsel Used</h3>
          </div>
          <div className="space-y-3">
            {[
              { icon: CheckCircle, color: 'text-blue-600 bg-blue-50', text: 'Product plan and approved requirements', time: 'PRD v3.2' },
              { icon: CheckCircle, color: 'text-blue-600 bg-blue-50', text: 'Privacy review and disclosure copy', time: 'Approved Apr 15' },
              { icon: CheckCircle, color: 'text-blue-600 bg-blue-50', text: 'Mobile code, backend services, and analytics plan', time: 'Scanned 12 min ago' },
              { icon: CheckCircle, color: 'text-blue-600 bg-blue-50', text: 'Data governance and retention policy', time: 'Policy v4' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.color}`}>
                    <Icon className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-700 leading-snug">{item.text}</div>
                  </div>
                  <div className="text-[10px] text-gray-400 shrink-0 mt-0.5">{item.time}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Contracts Watching The Product</h3>
            <span className="text-xs text-gray-400">{overviewMetrics.liveContracts} live contracts</span>
          </div>
          <div className="space-y-2.5">
            {[
              { name: 'Profile Data Collection', coverage: 100, status: 'Needs review' },
              { name: 'Profile Data Use', coverage: 100, status: 'Needs review' },
              { name: 'Disclosure Coverage', coverage: 82, status: 'Partial' },
              { name: 'Retention Policy', coverage: 50, status: 'Changed' },
            ].map((src, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${src.coverage > 90 ? 'bg-green-500' : src.coverage > 80 ? 'bg-yellow-500' : 'bg-orange-500'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-gray-700 truncate">{src.name}</span>
                    <span className="text-[10px] text-gray-400 shrink-0">{src.status}</span>
                  </div>
                  <div className="mt-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${src.coverage}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                      className={`h-full rounded-full ${src.coverage > 90 ? 'bg-green-500' : src.coverage > 80 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
