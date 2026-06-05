import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, CheckCircle2, MessageSquare, FileText, ShieldCheck, User } from 'lucide-react';
import type { AuditEvent } from '../data/demoData';

const typeConfig: Record<string, { icon: React.ElementType; color: string; dot: string }> = {
  scan: { icon: ScanLine, color: 'text-blue-600 bg-blue-50', dot: 'bg-blue-500' },
  approval: { icon: CheckCircle2, color: 'text-green-600 bg-green-50', dot: 'bg-green-500' },
  review: { icon: MessageSquare, color: 'text-purple-600 bg-purple-50', dot: 'bg-purple-500' },
  comment: { icon: User, color: 'text-gray-600 bg-gray-100', dot: 'bg-gray-500' },
  disclosure: { icon: FileText, color: 'text-indigo-600 bg-indigo-50', dot: 'bg-indigo-500' },
  risk: { icon: ShieldCheck, color: 'text-yellow-600 bg-yellow-50', dot: 'bg-yellow-500' },
  system: { icon: ScanLine, color: 'text-gray-600 bg-gray-100', dot: 'bg-gray-400' },
};

interface AuditTimelineProps {
  events: AuditEvent[];
  compact?: boolean;
}

export function AuditTimeline({ events, compact = false }: AuditTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-2 bottom-2 w-px bg-gray-100" />

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {events.map((event, idx) => {
            const cfg = typeConfig[event.type] ?? typeConfig.system;
            const Icon = cfg.icon;
            const isNew = idx === 0;

            return (
              <motion.div
                key={event.id}
                initial={isNew ? { opacity: 0, x: -10 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex gap-3 pl-10"
              >
                {/* Dot */}
                <div className={`absolute left-3 top-2 w-2.5 h-2.5 rounded-full border-2 border-white ${cfg.dot} ring-1 ring-gray-100 z-10`} />

                <div className={`flex-1 ${compact ? 'py-1.5' : 'py-2'}`}>
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${cfg.color}`}>
                        <Icon className="h-2.5 w-2.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-800">{event.action}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{event.actor}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 shrink-0">{event.timestamp}</span>
                  </div>
                  {!compact && (
                    <p className="mt-1.5 text-[11px] text-gray-600 leading-relaxed pl-7">{event.detail}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
