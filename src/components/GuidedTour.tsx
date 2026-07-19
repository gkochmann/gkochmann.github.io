import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Sparkles } from 'lucide-react';
import { useCompany } from './CompanyContext';

type NavSection = 'overview' | 'live-reviews' | 'contracts' | 'sources' | 'models' | 'audit' | 'settings';

interface TourStep {
  id: string;
  section: NavSection;
  /** data-tour attribute of the element to spotlight; null centers the card. */
  target: string | null;
  placement: 'right' | 'left' | 'bottom';
  title: string;
  body: (company: string) => React.ReactNode;
}

const steps: TourStep[] = [
  {
    id: 'flagged-feature',
    section: 'overview',
    target: 'primary-review-card',
    placement: 'right',
    title: 'A new feature has been flagged',
    body: company => (
      <>
        {company} is developing Automated Decision Making V1, a new feature that automates matching decisions.
        CodeCounsel scanned the code under development and <strong>flagged a critical change</strong>: the
        implementation now collects new personal data and uses AI in ways that{' '}
        <strong>could impact user privacy</strong> — beyond what was originally approved.
      </>
    ),
  },
  {
    id: 'approved-column',
    section: 'live-reviews',
    target: 'approved-column',
    placement: 'right',
    title: 'What was approved',
    body: company => (
      <>
        This column comes from {company}'s approved sources. <strong>A source is a connected document or
        system</strong> — here it's the <strong>approved legal documentation from your team</strong>: the Privacy
        Impact Assessment, legal memos, and disclosure copy. Each card is a requirement your legal and privacy
        teams signed off on.
      </>
    ),
  },
  {
    id: 'live-column',
    section: 'live-reviews',
    target: 'live-column',
    placement: 'right',
    title: 'What is actually live',
    body: () => (
      <>
        This column is <strong>pulled from the actual codebase</strong> as the product is being developed. Compare
        the two: retention doubled from 90 to 180 days, a device ID appeared in the AI feature pipeline, and new
        data fields were added — <strong>none of it approved</strong>. That gap is why this issue is being
        escalated.
      </>
    ),
  },
  {
    id: 'resolution',
    section: 'live-reviews',
    target: 'review-column',
    placement: 'left',
    title: 'Resolving the gap',
    body: () => (
      <>
        The right side is <strong>your resolution path</strong>. Each change is listed with its severity, and
        suggested reviewers are already matched to the issue. From here you can start a review, request
        clarification from engineering, draft an updated disclosure, or accept the risk with a justification —{' '}
        <strong>every action lands in the audit trail</strong>.
      </>
    ),
  },
  {
    id: 'tabs-overview',
    section: 'live-reviews',
    target: 'sidebar-nav',
    placement: 'right',
    title: 'The rest of the workspace',
    body: () => (
      <>
        Everything you just saw lives in these tabs. <strong>All of the connected sources can be viewed in the
        Sources tab</strong>. Contracts turns approvals into <strong>rules that are monitored
        continuously</strong>. History keeps the full record of approvals, detected changes, and decisions.
      </>
    ),
  },
  {
    id: 'models-tab',
    section: 'models',
    target: 'models-screen',
    placement: 'left',
    title: 'Explore your models',
    body: company => (
      <>
        The Models tab inventories <strong>every ML and AI model {company} runs</strong> — where each appears in
        the code, and what it influences: automated ranking and matching decisions, pricing for sponsored
        placement, and content enforcement. Use it to make sure <strong>every model is operating the way it was
        approved to</strong>.
      </>
    ),
  },
  {
    id: 'finish',
    section: 'models',
    target: null,
    placement: 'right',
    title: 'You\'re all set',
    body: company => (
      <>
        That's the guided tour. The rest of the workspace is yours to explore — open a model, dig into the
        Automated Decision Making V1 review, or browse {company}'s sources and contracts.
      </>
    ),
  },
];

interface GuidedTourProps {
  onNavigate: (section: NavSection) => void;
  onFinish: () => void;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const CARD_WIDTH = 340;
const GAP = 16;

export function GuidedTour({ onNavigate, onFinish }: GuidedTourProps) {
  const { name: company } = useCompany();
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [ready, setReady] = useState(false);
  const pollRef = useRef<number | null>(null);

  const step = steps[stepIndex];

  const measure = useCallback(() => {
    if (!step.target) {
      setRect(null);
      setReady(true);
      return true;
    }
    const el = document.querySelector(`[data-tour="${step.target}"]`);
    if (!el) return false;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return false;
    setRect({ top: r.top - 8, left: r.left - 8, width: r.width + 16, height: r.height + 16 });
    setReady(true);
    return true;
  }, [step.target]);

  useEffect(() => {
    setReady(false);
    onNavigate(step.section);

    // The section may need to mount and animate in before the target exists.
    let attempts = 0;
    const poll = () => {
      if (measure() || attempts > 60) return;
      attempts += 1;
      pollRef.current = window.setTimeout(poll, 50);
    };
    pollRef.current = window.setTimeout(poll, 150);

    return () => {
      if (pollRef.current) window.clearTimeout(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex]);

  useEffect(() => {
    const handle = () => measure();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, [measure]);

  const isLast = stepIndex === steps.length - 1;

  function cardStyle(): React.CSSProperties {
    if (!rect) {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let left: number;
    if (step.placement === 'right') {
      left = rect.left + rect.width + GAP;
    } else if (step.placement === 'left') {
      left = rect.left - CARD_WIDTH - GAP;
    } else {
      left = rect.left;
    }
    left = Math.max(16, Math.min(left, vw - CARD_WIDTH - 16));
    let top = step.placement === 'bottom' ? rect.top + rect.height + GAP : rect.top;
    top = Math.max(16, Math.min(top, vh - 260));
    return { top, left };
  }

  return (
    <div className="fixed inset-0 z-[90]">
      {/* Backdrop with spotlight cutout */}
      {ready && rect ? (
        <motion.div
          initial={false}
          animate={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute rounded-2xl pointer-events-none"
          style={{ boxShadow: '0 0 0 9999px rgba(3, 7, 30, 0.55)', border: '2px solid rgba(255,255,255,0.9)' }}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-950/55" />
      )}

      {/* Tour card */}
      <AnimatePresence mode="wait">
        {ready && (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute rounded-2xl border border-white/70 bg-white p-5 shadow-2xl"
            style={{ width: CARD_WIDTH, ...cardStyle() }}
          >
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#3157F6]/15 bg-[#F4F6FF] px-2.5 py-1 text-[10px] font-semibold text-[#3157F6]">
                <Sparkles className="h-3 w-3" /> Guided tour · {stepIndex + 1} of {steps.length}
              </div>
              <button onClick={onFinish} className="p-1 rounded-lg hover:bg-gray-100" aria-label="Skip tour">
                <X className="h-3.5 w-3.5 text-gray-400" />
              </button>
            </div>

            <h3 className="mt-3 text-base font-bold text-gray-950">{step.title}</h3>
            <p className="mt-1.5 text-xs leading-5 text-gray-600">{step.body(company)}</p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {steps.map((s, i) => (
                  <div
                    key={s.id}
                    className={`h-1.5 rounded-full transition-all ${i === stepIndex ? 'w-4 bg-[#3157F6]' : 'w-1.5 bg-gray-200'}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                {stepIndex > 0 && (
                  <button
                    onClick={() => setStepIndex(i => i - 1)}
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                )}
                <button
                  onClick={() => (isLast ? onFinish() : setStepIndex(i => i + 1))}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#3157F6] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2347e0]"
                >
                  {isLast ? 'Start exploring' : 'Next'} {!isLast && <ArrowRight className="h-3 w-3" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
