import { ArrowLeft, MonitorSmartphone } from 'lucide-react';
import { motion } from 'framer-motion';

interface DemoMobileNoticeProps {
  onBackHome: () => void;
}

export function DemoMobileNotice({ onBackHome }: DemoMobileNoticeProps) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#F4F6FF] px-4">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="w-full max-w-sm rounded-2xl border border-white/70 bg-white p-6 text-center shadow-2xl"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F6FF]">
          <MonitorSmartphone className="h-6 w-6 text-[#3157F6]" />
        </div>

        <h2 className="text-lg font-bold leading-tight text-gray-950">
          Not optimized for mobile
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Open in desktop to view the demo.
        </p>

        <button
          onClick={onBackHome}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3157F6] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2347e0]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </button>
      </motion.div>
    </div>
  );
}
