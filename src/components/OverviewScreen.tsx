import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Shield, Cpu, MessageSquare, Layout,
  TrendingUp, AlertTriangle, CheckCircle, Clock
} from 'lucide-react';
import { demoFeatures, overviewMetrics } from '../data/demoData';
import { RiskBadge } from './RiskBadge';
import { StatusBadge } from './StatusBadge';

interface OverviewScreenProps {
  onOpenReview: (featureId: string) => void;
  onExploreSources: () => void;
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

export function OverviewScreen({ onOpenReview, onExploreSources }: OverviewScreenProps) {
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
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl bg-gradient-to-br from-[#3157F6] to-[#6654F1] p-6 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        <div className="relative">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold leading-tight">
                Keep Friendli's approved intent<br className="hidden sm:block" /> aligned with what ships.
              </h1>
              <p className="mt-2 text-white/75 text-sm max-w-2xl leading-relaxed">
                CodeCounsel turns product, legal, privacy, ML, AI, and design reviews into live system contracts that continuously monitor the Friendli mobile app for material drift.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onOpenReview('smart-profiles')}
                className="flex items-center gap-2 px-4 py-2 bg-white text-[#3157F6] rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors shadow-sm"
              >
                Open Live Review <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onExploreSources}
                className="flex items-center gap-2 px-4 py-2 bg-white/15 text-white border border-white/20 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors"
              >
                Explore Sources
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Live Contracts', value: overviewMetrics.liveContracts },
              { label: 'Material Changes', value: overviewMetrics.activeMaterialChanges, highlight: true },
              { label: 'Auto-Classified', value: overviewMetrics.lowRiskAutoClassified },
              { label: 'Pending Reviews', value: overviewMetrics.pendingReviews, highlight: true },
              { label: 'Source Coverage', value: overviewMetrics.sourceCoverage, suffix: '%' },
              { label: 'Last Scan', value: null, raw: overviewMetrics.lastScanTime },
            ].map((stat, i) => (
              <div key={i} className={`rounded-xl p-3 ${stat.highlight ? 'bg-white/20 border border-white/30' : 'bg-white/10 border border-white/15'}`}>
                <div className="text-xl font-bold">
                  {stat.value !== null ? (
                    <><AnimatedCounter target={stat.value} />{stat.suffix ?? ''}</>
                  ) : stat.raw}
                </div>
                <div className="text-[11px] text-white/65 mt-0.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Feature Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Active Material Changes</h2>
          <span className="text-xs text-gray-400">{overviewMetrics.releaseTrain} · {overviewMetrics.releaseVersion}</span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-3"
        >
          {demoFeatures.map(feature => {
            const Icon = categoryIcon[feature.category] ?? Shield;
            const catColor = categoryColor[feature.category] ?? 'text-gray-600 bg-gray-50';

            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(49,87,246,0.10)' }}
                className="bg-white rounded-2xl border border-gray-100 p-4 cursor-pointer transition-shadow"
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

                <p className="mt-3 text-xs text-gray-600 leading-relaxed line-clamp-2">{feature.driftSummary}</p>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <StatusBadge status={feature.status} size="sm" />
                    <span className="text-[11px] text-gray-400">Owner: {feature.owner}</span>
                  </div>
                  <button
                    className="flex items-center gap-1 text-[#3157F6] text-xs font-semibold hover:text-[#2347e0] transition-colors"
                    onClick={e => { e.stopPropagation(); onOpenReview(feature.id); }}
                  >
                    Open Review <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Source pills */}
                <div className="mt-2.5 flex flex-wrap gap-1.5">
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

      {/* Recent Activity + Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-800">Recent Review Activity</h3>
          </div>
          <div className="space-y-3">
            {[
              { icon: AlertTriangle, color: 'text-red-500 bg-red-50', text: 'Smart Profiles — 5 material changes detected', time: '12 min ago' },
              { icon: AlertTriangle, color: 'text-red-500 bg-red-50', text: 'Plan Assistant — Prompt v7 guardrail removed', time: '12 min ago' },
              { icon: TrendingUp, color: 'text-orange-500 bg-orange-50', text: 'Home Feed experiment expanded beyond scope', time: '1 day ago' },
              { icon: AlertTriangle, color: 'text-orange-500 bg-orange-50', text: 'Nearby Ranking — stale model card flagged', time: '3 days ago' },
              { icon: CheckCircle, color: 'text-green-500 bg-green-50', text: 'Push Notifications — review completed', time: '10 days ago' },
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

        {/* Source Health */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Connected Sources Health</h3>
            <span className="text-xs text-gray-400">96% avg coverage</span>
          </div>
          <div className="space-y-2.5">
            {[
              { name: 'GitHub Mobile Repo', coverage: 98, status: 'Connected', time: '12 min ago' },
              { name: 'Backend Services Repo', coverage: 95, status: 'Connected', time: '12 min ago' },
              { name: 'ML Model Registry', coverage: 92, status: 'Connected', time: '1 hr ago' },
              { name: 'Prompt Registry', coverage: 96, status: 'Connected', time: '45 min ago' },
              { name: 'Figma Designs', coverage: 79, status: 'Connected', time: '3 hrs ago' },
              { name: 'Analytics Tracking Plan', coverage: 82, status: 'Connected', time: '1 hr ago' },
            ].map((src, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${src.coverage > 90 ? 'bg-green-500' : src.coverage > 80 ? 'bg-yellow-500' : 'bg-orange-500'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-gray-700 truncate">{src.name}</span>
                    <span className="text-[10px] text-gray-400 shrink-0">{src.coverage}%</span>
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
