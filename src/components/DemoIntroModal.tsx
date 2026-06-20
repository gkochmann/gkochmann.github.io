import { ArrowRight, MapPin, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface DemoIntroModalProps {
  onClose: () => void;
}

export function DemoIntroModal({ onClose }: DemoIntroModalProps) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-950/35 px-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="w-full max-w-lg rounded-2xl border border-white/70 bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3157F6]/15 bg-[#F4F6FF] px-3 py-1 text-xs font-semibold text-[#3157F6]">
          Friendli demo context
        </div>

        <h2 className="text-xl font-bold leading-tight text-gray-950">
          Friendli is evolving a matching feature.
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Friendli helps people find new friends based on shared routines, nearby places, and
          interests. Their new Smart Profiles feature uses profile details, location signals,
          schedule patterns, and other sensitive data to improve matching.
        </p>

        <div className="mt-5 grid gap-2">
          {[
            { icon: Users, text: 'Product, legal, privacy, and engineering already approved a limited version.' },
            { icon: MapPin, text: 'The live product now includes new data fields and broader data use.' },
            { icon: ShieldCheck, text: 'Follow the demo to see what is live, what changed, and which reviews are needed.' },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-start gap-3 rounded-xl bg-gray-50 px-3 py-2.5">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#3157F6]" />
                <p className="text-xs leading-5 text-gray-600">{item.text}</p>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3157F6] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2347e0]"
        >
          Start demo <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </div>
  );
}
