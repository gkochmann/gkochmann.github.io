import { useEffect, useRef } from 'react';
import {
  motion, MotionValue, useReducedMotion, useScroll, useSpring, useTransform,
} from 'framer-motion';
import {
  AlertTriangle, ArrowRight, BellRing, Calendar, CheckCircle, ChevronDown, Sparkles,
} from 'lucide-react';
import { LogoMark } from './LogoMark';
import { createCinematicEngine } from './lifecycleEngine';

type Window4 = [number, number, number, number];

interface FadeProps {
  p: MotionValue<number>;
  at: Window4;
  y?: number;
  className?: string;
  children: React.ReactNode;
}

function Fade({ p, at, y = 26, className, children }: FadeProps) {
  const opacity = useTransform(p, at, [0, 1, 1, 0]);
  const yv = useTransform(p, at, [y, 0, 0, -y]);
  return (
    <motion.div className={className} style={{ opacity, y: yv, willChange: 'transform, opacity' }}>
      {children}
    </motion.div>
  );
}

function Counter({ p, to, at }: { p: MotionValue<number>; to: number; at: [number, number] }) {
  const raw = useTransform(p, at, [0, to]);
  const text = useTransform(raw, v => Math.round(v).toLocaleString());
  return <motion.span>{text}</motion.span>;
}

interface ToastProps {
  p: MotionValue<number>;
  at: Window4;
  className: string;
  children: React.ReactNode;
}

/** Risk toasts pop up during the drift act, then get pulled into the core at the turn. */
function RiskToast({ p, at, className, children }: ToastProps) {
  const opacity = useTransform(p, at, [0, 1, 1, 0]);
  const x = useTransform(p, [at[2], at[3]], [0, 130]);
  const scale = useTransform(p, [at[2], at[3]], [1, 0.75]);
  return (
    <motion.div className={className} style={{ opacity, x, scale, willChange: 'transform, opacity' }}>
      <AlertTriangle aria-hidden="true" />
      {children}
    </motion.div>
  );
}

const RAIL_ACTS = ['Balance', 'Drift', 'Collect', 'Align'];

function RailDot({ p, index, label }: { p: MotionValue<number>; index: number; label: string }) {
  const start = index * 0.24 + 0.04;
  const active = useTransform(p, [start, start + 0.04], [0.25, 1]);
  const scale = useTransform(p, [start, start + 0.04], [1, 1.25]);
  return (
    <div className="cc-cine-rail-step" style={{ top: `${(index / (RAIL_ACTS.length - 1)) * 100}%` }}>
      <motion.span className="cc-cine-rail-label" style={{ opacity: active }}>{label}</motion.span>
      <motion.span className="cc-cine-rail-dot" style={{ opacity: active, scale }} />
    </div>
  );
}

function StaticStory() {
  return (
    <section className="cc-cine-static" aria-label="How CodeCounsel balances AI requirements with what teams actually ship">
      <div className="cc-page">
        <div className="cc-section-heading">
          <span>The balancing act, reconciled</span>
          <h2>Requirements on one side. Shipping on the other. You in the middle.</h2>
        </div>
        <div className="cc-cine-static-grid">
          <div className="cc-cine-static-panel">
            <h3>The balancing act</h3>
            <p>Regulations, frameworks, and policies on one side — new models, prompts, and data sources on the other. Connecting them by hand is where things slip.</p>
            <div className="cc-cine-static-chips">
              <span className="req">EU AI Act · Art. 13</span>
              <span>new model deployed</span>
              <span className="req">GDPR · data minimization</span>
              <span className="risk">retention: 90 → 180d</span>
              <span>new data source</span>
              <span className="req">internal AI policy</span>
            </div>
          </div>
          <div className="cc-cine-static-panel core">
            <LogoMark className="h-10 w-10" />
            <h3>CodeCounsel</h3>
            <p>Collects all the facts: every requirement and every technical change in one record, matched to each other — and re-checked continuously on every release.</p>
          </div>
          <div className="cc-cine-static-panel">
            <h3>Continuous alignment</h3>
            <ul>
              <li><CheckCircle /> retention limit · aligned</li>
              <li><CheckCircle /> model change · reviewed</li>
              <li><CheckCircle /> training data · approved</li>
              <li><CheckCircle /> evidence · audit-ready</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LifecycleCinematic() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.35 });

  const coreOpacity = useTransform(p, [0.38, 0.44, 0.845, 0.9], [0, 1, 1, 0]);
  const coreScale = useTransform(p, [0.38, 0.46, 0.845, 0.9], [0.6, 1, 1, 1.12]);
  const shockScale = useTransform(p, [0.4, 0.54], [0.15, 2.8]);
  const shockOpacity = useTransform(p, [0.4, 0.425, 0.54], [0, 0.5, 0]);
  const finalOpacity = useTransform(p, [0.85, 0.905], [0, 1]);
  const finalY = useTransform(p, [0.85, 0.905], [34, 0]);
  const finalPointer = useTransform(p, v => (v > 0.87 ? 'auto' : 'none'));

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (reduced || !canvas || !section) return;

    const engine = createCinematicEngine(canvas, () => p.get());
    const io = new IntersectionObserver(
      entries => engine.setRunning(entries[0]?.isIntersecting ?? false),
      { rootMargin: '120px' },
    );
    io.observe(section);
    return () => {
      io.disconnect();
      engine.destroy();
    };
  }, [reduced, p]);

  if (reduced) {
    return <StaticStory />;
  }

  return (
    <section
      ref={sectionRef}
      className="cc-cine"
      aria-label="How CodeCounsel balances AI requirements with what teams actually ship, continuously"
    >
      <div className="cc-cine-sticky">
        <canvas ref={canvasRef} className="cc-cine-canvas" aria-hidden="true" />

        <div className="cc-cine-overlay">
          {/* Act 1 — the balancing act */}
          <div className="cc-cine-slot cc-slot-story">
            <Fade p={p} at={[-1, -0.9, 0.1, 0.14]}>
              <span className="cc-cine-overline">The AI governance balancing act</span>
              <h3>Your job: Enable the business to use AI with confidence.</h3>
              <p>The EU AI Act. GDPR. Frameworks, internal policies, customer commitments. You own every requirement.</p>
            </Fade>
          </div>
          <div className="cc-cine-slot cc-slot-story">
            <Fade p={p} at={[0.13, 0.165, 0.235, 0.27]}>
              <span className="cc-cine-overline">Meanwhile, in engineering</span>
              <h3>Their job: keep shipping.</h3>
              <p>New models, new prompts, new data sources, new features — every sprint changes the product you signed off on.</p>
            </Fade>
          </div>
          <div className="cc-cine-slot cc-slot-story">
            <Fade p={p} at={[0.26, 0.295, 0.36, 0.4]}>
              <span className="cc-cine-overline cc-warn">Caught in the middle</span>
              <h3>Which changes touch which requirements?</h3>
              <p>A model swap here, a new data source there. Connecting each change to its obligations by hand — that&apos;s where things slip.</p>
            </Fade>
          </div>

          {/* Live counters showing both sides of the balance */}
          <div className="cc-cine-slot cc-slot-stats">
            <Fade p={p} at={[0.125, 0.155, 0.3, 0.34]} y={18}>
              <div className="cc-cine-stats">
                <span><b><Counter p={p} to={214} at={[0.13, 0.3]} /></b> product changes</span>
                <span><b><Counter p={p} to={31} at={[0.13, 0.3]} /></b> active requirements</span>
                <span><b><Counter p={p} to={12} at={[0.13, 0.3]} /></b> policy updates</span>
                <span><b><Counter p={p} to={6} at={[0.13, 0.3]} /></b> new AI vendors</span>
                <span className="cc-stat-risk"><b>1</b> governance team connecting it all</span>
              </div>
            </Fade>
          </div>

          {/* Drifting risk toasts, absorbed at the turn */}
          <RiskToast p={p} at={[0.25, 0.275, 0.4, 0.46]} className="cc-cine-toast cc-toast-1">
            <code>retention: 90 → 180 days</code>
          </RiskToast>
          <RiskToast p={p} at={[0.275, 0.3, 0.4, 0.46]} className="cc-cine-toast cc-toast-2">
            <code>model → third-party LLM</code>
          </RiskToast>
          <RiskToast p={p} at={[0.3, 0.325, 0.4, 0.46]} className="cc-cine-toast cc-toast-3">
            <code>training data += user content</code>
          </RiskToast>

          {/* Act 2 — the turn */}
          <motion.div className="cc-cine-shock" style={{ scale: shockScale, opacity: shockOpacity }} aria-hidden="true" />
          <motion.div className="cc-cine-core" style={{ opacity: coreOpacity, scale: coreScale }}>
            <span className="cc-cine-core-ring" aria-hidden="true" />
            <LogoMark className="h-11 w-11" />
            <strong>CodeCounsel</strong>
            <small>One connected record</small>
          </motion.div>
          <div className="cc-cine-slot cc-slot-top">
            <Fade p={p} at={[0.405, 0.45, 0.53, 0.575]} y={20}>
              <span className="cc-cine-overline"><Sparkles aria-hidden="true" /> The turn</span>
              <h3>CodeCounsel collects all the facts.</h3>
              <p>Requirements on one side, what&apos;s actually shipping on the other — finally in the same record.</p>
            </Fade>
          </div>

          {/* Act 3 — alignment emerges */}
          <div className="cc-cine-slot cc-slot-order">
            <Fade p={p} at={[0.555, 0.6, 0.655, 0.7]}>
              <span className="cc-cine-overline">Requirements meet reality</span>
              <h3>Every technical change, matched to its requirements.</h3>
              <div className="cc-cine-mini">
                <span className="ok">Requirement · 90-day retention</span>
                <ArrowRight aria-hidden="true" />
                <span className="warn">Shipping · 180 days</span>
              </div>
            </Fade>
          </div>
          <div className="cc-cine-slot cc-slot-order">
            <Fade p={p} at={[0.675, 0.72, 0.78, 0.825]}>
              <span className="cc-cine-overline">Continuously — not once a year</span>
              <h3>Every release re-checked, so alignment holds.</h3>
              <div className="cc-cine-mini route">
                <BellRing aria-hidden="true" />
                <span>AI Governance Lead</span>
                <em>evidence attached</em>
                <CheckCircle aria-hidden="true" />
              </div>
            </Fade>
          </div>

          {/* Finale */}
          <div className="cc-cine-slot cc-slot-final">
          <motion.div
            className="cc-cine-final"
            style={{ opacity: finalOpacity, y: finalY, pointerEvents: finalPointer }}
          >
            <span className="cc-cine-overline"><Sparkles aria-hidden="true" /> CodeCounsel</span>
            <h3>From constant change to continuous alignment.</h3>
            <p>Requirements and reality, reconciled on every release — with the evidence to prove it.</p>
            <div className="cc-cine-final-chips">
              <span><CheckCircle aria-hidden="true" /> Every source connected</span>
              <span><CheckCircle aria-hidden="true" /> Changes matched to requirements</span>
              <span><CheckCircle aria-hidden="true" /> Continuously verified</span>
            </div>
            <div className="cc-cine-final-actions">
              <a href="/demo" className="cc-btn cc-btn-primary">
                View demo <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://calendly.com/olivermschwartz/30min"
                target="_blank"
                rel="noreferrer"
                className="cc-btn cc-btn-secondary"
              >
                Schedule a call <Calendar className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
          </div>

          {/* Progress rail */}
          <div className="cc-cine-rail" aria-hidden="true">
            <div className="cc-cine-rail-track">
              <motion.div className="cc-cine-rail-fill" style={{ scaleY: p }} />
            </div>
            {RAIL_ACTS.map((label, i) => (
              <RailDot key={label} p={p} index={i} label={label} />
            ))}
          </div>

          {/* Scroll hint */}
          <div className="cc-cine-slot cc-slot-hint">
            <Fade p={p} at={[-1, -0.9, 0.04, 0.07]} y={0}>
              <div className="cc-cine-hint">
                <span>Scroll to watch it happen</span>
                <ChevronDown aria-hidden="true" />
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
}
