import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  'Connecting to Friendli workspace...',
  'Scanning GitHub Mobile Repo...',
  'Scanning Backend Services...',
  'Indexing ML Model Registry...',
  'Indexing Prompt Registry...',
  'Comparing against approved documents...',
  'Classifying material changes...',
  'Scan complete — 7 material changes detected',
];

interface LoadingScreenProps {
  onDone: () => void;
}

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const total = 1400;
    const stepDuration = total / steps.length;

    const stepTimer = setInterval(() => {
      setStepIndex(prev => {
        const next = prev + 1;
        if (next >= steps.length) {
          clearInterval(stepTimer);
        }
        return Math.min(next, steps.length - 1);
      });
    }, stepDuration);

    const progTimer = setInterval(() => {
      setProgress(prev => {
        const next = prev + 100 / (total / 16);
        return Math.min(next, 100);
      });
    }, 16);

    const doneTimer = setTimeout(onDone, total + 200);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 bg-[#F4F6FF] flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center max-w-sm w-full px-8"
      >
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3157F6] to-[#6654F1] flex items-center justify-center shadow-lg mb-5">
          <span className="text-white font-extrabold text-2xl">CC</span>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-1">CodeCounsel</h1>
        <p className="text-sm text-gray-500 mb-8">Friendli Production Workspace</p>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-[#3157F6] to-[#6654F1] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status text */}
        <div className="h-5 flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className={`text-xs text-center font-medium ${
                stepIndex === steps.length - 1 ? 'text-[#3157F6]' : 'text-gray-400'
              }`}
            >
              {steps[stepIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Scanning animation */}
        <div className="mt-8 flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-[#3157F6] rounded-full"
              animate={{
                height: ['8px', '20px', '8px'],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
