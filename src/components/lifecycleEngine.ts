/*
 * Canvas engine for the lifecycle cinematic on the home page.
 *
 * Every particle position is a pure function of (scroll progress, time), so the
 * scene can be scrubbed forwards and backwards without any stored simulation
 * state. The story in progress-space:
 *
 *   0.00 – 0.40  chaos: artifacts swirl in a tangled cloud on the "in" side
 *   0.40 – 0.73  the turn: each particle is staggered into the core intake
 *   0.50 – 0.83  order: particles re-emerge as tidy ledger bars on the "out" side
 *   0.85 – 1.00  the scene dims beneath the closing message
 */

export interface CinematicEngine {
  setRunning(running: boolean): void;
  destroy(): void;
}

interface Vec {
  x: number;
  y: number;
}

interface Particle {
  isChip: boolean;
  risk: boolean;
  isReq: boolean;
  label: string;
  doneLabel: string;
  chipW: number;
  dotR: number;
  color: string;
  orderColor: string;
  baseAng: number;
  baseR: number;
  rot: number;
  w1: number;
  w2: number;
  w3: number;
  w4: number;
  ph1: number;
  ph2: number;
  ph3: number;
  ph4: number;
  a1: number;
  a2: number;
  a3: number;
  a4: number;
  tau: number;
  bendIn: number;
  bendOut: number;
  jitIn: Vec;
  jitOut: Vec;
  slotRow: number;
  slotCol: number;
  orderW: number;
  partners: number[];
}

interface Snapshot {
  x: number;
  y: number;
  phase: 0 | 1 | 2 | 3 | 4; // chaos | intake | absorbed | emerge | settled
  s: number;
}

const T_IN = 0.05;
const T_GAP = 0.018;
const T_OUT = 0.07;

const CHIP_FONT = '600 10px "Inter", system-ui, sans-serif';
const DONE_FONT = '700 10px "Inter", system-ui, sans-serif';

const DOT_COLORS = ['#94a3b8', '#818cf8', '#60a5fa', '#a78bfa', '#f59e0b', '#f87171', '#64748b', '#38bdf8'];
// Ordered bars keep the two streams visible: violet requirements, blue shipping.
const REQ_ORDER_COLORS = ['#6654f1', '#7c6ef5', '#8b5cf6'];
const TECH_ORDER_COLORS = ['#3157f6', '#5a76f8', '#2563eb'];

const RISK_CHIPS = [
  { label: 'retention: 90 → 180d', done: 'retention limit · aligned' },
  { label: 'model → 3rd-party LLM', done: 'model change · reviewed' },
  { label: '+ user data in training', done: 'training data · approved' },
];

// The two halves of the balancing act: obligations to meet, and what teams ship.
const REQ_CHIPS = [
  'EU AI Act · Art. 13', 'GDPR · data minimization', 'model card due',
  'SOC 2 · CC7.1', 'NIST AI RMF', 'DPA · vendor terms',
  'consent language v4', 'internal AI policy', 'audit request Q3',
  'customer commitments', 'transparency report', 'DPIA refresh due',
];

const TECH_CHIPS = [
  'new model deployed', 'prompt updated', 'new data source',
  'feature → EU rollout', 'vendor LLM added', 'agent: new tool access',
  'fine-tune started', 'chatbot ramp 50%', 'API opened to partners',
  'telemetry expanded', 'RAG index rebuilt', 'eval suite changed',
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeInCubic = (t: number) => t * t * t;
const easeOutCubic = (t: number) => 1 - (1 - t) * (1 - t) * (1 - t);

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

export function createCinematicEngine(
  canvas: HTMLCanvasElement,
  getProgress: () => number,
): CinematicEngine {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return { setRunning: () => undefined, destroy: () => undefined };
  }

  let W = 0;
  let H = 0;
  let dpr = 1;
  let portrait = false;
  let particles: Particle[] = [];
  let chipIndexes: number[] = [];
  let totalRows = 0;
  let cols = 0;
  let raf = 0;
  let running = false;
  let destroyed = false;
  const t0 = performance.now();

  function build() {
    const rand = mulberry32(7);
    const small = W < 700;
    const chipCount = small ? 13 : 21;
    const dotCount = small ? 28 : 54;
    cols = small ? 6 : 10;

    particles = [];
    chipIndexes = [];

    const reqPool = [...REQ_CHIPS];
    const techPool = [...TECH_CHIPS];
    ctx!.font = CHIP_FONT;

    const total = RISK_CHIPS.length + chipCount + dotCount;
    for (let i = 0; i < total; i += 1) {
      const risk = i < RISK_CHIPS.length;
      const isChip = i < RISK_CHIPS.length + chipCount;
      let isReq = false;
      let label = '';
      let doneLabel = '';
      if (risk) {
        label = RISK_CHIPS[i].label;
        doneLabel = RISK_CHIPS[i].done;
      } else if (isChip) {
        isReq = (i - RISK_CHIPS.length) % 2 === 0;
        const pool = isReq ? reqPool : techPool;
        if (pool.length === 0) pool.push(...(isReq ? REQ_CHIPS : TECH_CHIPS));
        label = pool.splice(Math.floor(rand() * pool.length), 1)[0];
      } else {
        isReq = rand() > 0.5;
      }

      particles.push({
        isChip,
        risk,
        isReq,
        label,
        doneLabel,
        chipW: isChip ? ctx!.measureText(label).width + 22 : 0,
        dotR: 2 + rand() * 2.6,
        color: DOT_COLORS[Math.floor(rand() * DOT_COLORS.length)],
        orderColor: risk
          ? '#21a67a'
          : isReq
            ? REQ_ORDER_COLORS[Math.floor(rand() * REQ_ORDER_COLORS.length)]
            : TECH_ORDER_COLORS[Math.floor(rand() * TECH_ORDER_COLORS.length)],
        baseAng: rand() * Math.PI * 2,
        baseR: 0.18 + Math.sqrt(rand()) * 0.82,
        rot: (rand() > 0.5 ? 1 : -1) * (0.04 + rand() * 0.1),
        w1: 0.35 + rand() * 0.5,
        w2: 0.6 + rand() * 0.7,
        w3: 0.35 + rand() * 0.5,
        w4: 0.6 + rand() * 0.7,
        ph1: rand() * Math.PI * 2,
        ph2: rand() * Math.PI * 2,
        ph3: rand() * Math.PI * 2,
        ph4: rand() * Math.PI * 2,
        a1: 0.08 + rand() * 0.12,
        a2: 0.04 + rand() * 0.07,
        a3: 0.08 + rand() * 0.12,
        a4: 0.04 + rand() * 0.07,
        tau: risk ? 0.4 + i * 0.027 : 0.415 + rand() * 0.245,
        bendIn: (rand() > 0.5 ? 1 : -1) * (26 + rand() * 62),
        bendOut: (rand() > 0.5 ? 1 : -1) * (18 + rand() * 44),
        jitIn: { x: (rand() - 0.5) * 40, y: (rand() - 0.5) * 44 },
        jitOut: { x: (rand() - 0.5) * 14, y: (rand() - 0.5) * 16 },
        slotRow: 0,
        slotCol: 0,
        orderW: risk ? 30 : isChip ? 22 + rand() * 16 : 10 + rand() * 12,
        partners: [],
      });
      if (isChip) chipIndexes.push(i);
    }

    // Slots fill in absorption order so the ledger writes itself row by row.
    const nonRisk = particles
      .map((pt, idx) => ({ pt, idx }))
      .filter(e => !e.pt.risk)
      .sort((a, b) => a.pt.tau - b.pt.tau);
    nonRisk.forEach((e, seq) => {
      e.pt.slotRow = RISK_CHIPS.length + Math.floor(seq / cols);
      e.pt.slotCol = seq % cols;
    });
    particles.forEach((pt, idx) => {
      if (pt.risk) {
        pt.slotRow = idx;
        pt.slotCol = 0;
      }
    });
    totalRows = RISK_CHIPS.length + Math.ceil(nonRisk.length / cols);

    // Tangle lines run between requirements and shipped work — the tension the
    // governance role is trying to hold together by hand.
    const reqIdx = chipIndexes.filter(i => particles[i].isReq && !particles[i].risk);
    const techIdx = chipIndexes.filter(i => !particles[i].isReq || particles[i].risk);
    for (const idx of chipIndexes) {
      const pool = particles[idx].isReq && !particles[idx].risk ? techIdx : reqIdx;
      if (pool.length === 0) continue;
      const a = pool[Math.floor(rand() * pool.length)];
      const b = pool[Math.floor(rand() * pool.length)];
      particles[idx].partners = [a, b].filter(x => x !== idx);
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    W = rect.width;
    H = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    portrait = H > W * 1.05;
    build();
  }

  interface Geometry {
    core: Vec;
    coreIn: Vec;
    coreOut: Vec;
    chaosC: Vec;
    sx: number;
    sy: number;
    region: { x0: number; x1: number; y0: number; y1: number };
  }

  function geometry(p: number): Geometry {
    const drain = smooth(0.34, 0.52, p);
    if (portrait) {
      return {
        core: { x: W * 0.5, y: H * 0.47 },
        coreIn: { x: W * 0.5, y: H * 0.47 - 92 },
        coreOut: { x: W * 0.5, y: H * 0.47 + 92 },
        chaosC: { x: W * 0.5, y: H * lerp(0.25, 0.3, drain) },
        sx: W * 0.33,
        sy: H * 0.11,
        region: { x0: W * 0.07, x1: W * 0.93, y0: H * 0.58, y1: H * 0.72 },
      };
    }
    // The cloud starts high while the section scrolls into view, then settles to
    // center as the pin engages — so it is visible right below the hero on load.
    const settle = smooth(0, 0.12, p);
    return {
      core: { x: W * 0.5, y: H * 0.47 },
      coreIn: { x: W * 0.5 - 108, y: H * 0.47 },
      coreOut: { x: W * 0.5 + 108, y: H * 0.47 },
      chaosC: { x: W * lerp(0.375, 0.3, drain), y: H * lerp(0.38, 0.47, settle) },
      sx: W * 0.24,
      sy: H * 0.33,
      region: { x0: W * 0.575, x1: W * 0.945, y0: H * 0.16, y1: H * 0.82 },
    };
  }

  function chaosPos(pt: Particle, t: number, p: number, g: Geometry): Vec {
    const ramp = 0.55 + 0.45 * smooth(0, 0.12, p);
    const contract = 1 - 0.5 * smooth(0.4, 0.6, p);
    const theta = pt.baseAng + t * pt.rot + p * 0.5;
    const wx = Math.sin(t * pt.w1 + pt.ph1) * pt.a1 + Math.sin(t * pt.w2 + pt.ph2) * pt.a2;
    const wy = Math.cos(t * pt.w3 + pt.ph3) * pt.a3 + Math.sin(t * pt.w4 + pt.ph4) * pt.a4;
    return {
      x: g.chaosC.x + (Math.cos(theta) * pt.baseR + wx) * g.sx * ramp * contract,
      y: g.chaosC.y + (Math.sin(theta) * pt.baseR + wy) * g.sy * ramp * contract,
    };
  }

  function slotPos(pt: Particle, g: Geometry): Vec {
    const regW = g.region.x1 - g.region.x0;
    const regH = g.region.y1 - g.region.y0;
    const rowH = regH / Math.max(totalRows, 1);
    const colW = regW / cols;
    return {
      x: pt.risk ? g.region.x0 + 4 : g.region.x0 + colW * pt.slotCol + 4,
      y: g.region.y0 + rowH * (pt.slotRow + 0.5),
    };
  }

  function snapshot(pt: Particle, t: number, p: number, g: Geometry): Snapshot {
    if (p < pt.tau) {
      const c = chaosPos(pt, t, p, g);
      return { x: c.x, y: c.y, phase: 0, s: 0 };
    }
    if (p < pt.tau + T_IN) {
      const s = (p - pt.tau) / T_IN;
      const from = chaosPos(pt, t, p, g);
      const to = { x: g.coreIn.x + pt.jitIn.x, y: g.coreIn.y + pt.jitIn.y };
      const e = easeInCubic(s);
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const len = Math.hypot(dx, dy) || 1;
      const arc = Math.sin(s * Math.PI) * pt.bendIn;
      return {
        x: lerp(from.x, to.x, e) + (-dy / len) * arc,
        y: lerp(from.y, to.y, e) + (dx / len) * arc,
        phase: 1,
        s,
      };
    }
    if (p < pt.tau + T_IN + T_GAP) {
      return { x: g.core.x, y: g.core.y, phase: 2, s: 0 };
    }
    const emergeStart = pt.tau + T_IN + T_GAP;
    const slot = slotPos(pt, g);
    if (p < emergeStart + T_OUT) {
      const s = (p - emergeStart) / T_OUT;
      const from = { x: g.coreOut.x + pt.jitOut.x, y: g.coreOut.y + pt.jitOut.y };
      const e = easeOutCubic(s);
      const dx = slot.x - from.x;
      const dy = slot.y - from.y;
      const len = Math.hypot(dx, dy) || 1;
      const arc = Math.sin(s * Math.PI) * pt.bendOut;
      return {
        x: lerp(from.x, slot.x, e) + (-dy / len) * arc,
        y: lerp(from.y, slot.y, e) + (dx / len) * arc,
        phase: 3,
        s,
      };
    }
    return { x: slot.x, y: slot.y, phase: 4, s: 1 };
  }

  function drawChip(pt: Particle, snap: Snapshot, t: number, alpha: number) {
    const c = ctx!;
    const scale = snap.phase === 1 ? 1 - 0.45 * easeInCubic(snap.s) : 1;
    const h = 22;
    c.save();
    c.translate(snap.x, snap.y);
    c.scale(scale, scale);
    c.globalAlpha = alpha;

    if (pt.risk && snap.phase === 0) {
      const halo = 26 + 5 * Math.sin(t * 2.4 + pt.ph1 * 4);
      const grd = c.createRadialGradient(0, 0, 2, 0, 0, halo);
      grd.addColorStop(0, 'rgba(239, 68, 68, 0.18)');
      grd.addColorStop(1, 'rgba(239, 68, 68, 0)');
      c.fillStyle = grd;
      c.beginPath();
      c.arc(0, 0, halo, 0, Math.PI * 2);
      c.fill();
    }

    roundRect(c, -pt.chipW / 2, -h / 2, pt.chipW, h, 7);
    c.fillStyle = 'rgba(255, 255, 255, 0.94)';
    c.fill();
    c.lineWidth = 1;
    c.strokeStyle = pt.risk ? '#fca5a5' : pt.isReq ? '#d6d0f5' : '#d9deed';
    c.stroke();

    c.beginPath();
    c.arc(-pt.chipW / 2 + 9, 0, 2.4, 0, Math.PI * 2);
    c.fillStyle = pt.risk ? '#ef4444' : pt.isReq ? '#6654f1' : pt.color;
    c.fill();

    c.font = CHIP_FONT;
    c.textBaseline = 'middle';
    c.textAlign = 'left';
    c.fillStyle = pt.risk ? '#b91c1c' : pt.isReq ? '#4c3fa8' : '#3f4a5f';
    c.fillText(pt.label, -pt.chipW / 2 + 16, 1);
    c.restore();
  }

  function drawOrdered(pt: Particle, snap: Snapshot, t: number, alpha: number) {
    const c = ctx!;
    const grow = snap.phase === 3 ? 0.3 + 0.7 * easeOutCubic(snap.s) : 1;
    const w = pt.orderW * grow;
    const h = pt.risk ? 10 : pt.isChip ? 9 : 7;
    const shimmer = snap.phase === 4 ? 0.86 + 0.14 * Math.sin(t * 1.6 + pt.slotRow + pt.slotCol) : 1;
    c.globalAlpha = alpha * shimmer;
    roundRect(c, snap.x, snap.y - h / 2, w, h, h / 2);
    c.fillStyle = pt.orderColor;
    c.fill();

    if (pt.risk && snap.phase === 4) {
      const cx = snap.x + w + 12;
      c.strokeStyle = '#16a34a';
      c.lineWidth = 2;
      c.lineCap = 'round';
      c.beginPath();
      c.moveTo(cx - 3.5, 0.5 + snap.y);
      c.lineTo(cx - 1, 3 + snap.y);
      c.lineTo(cx + 4, -3 + snap.y);
      c.stroke();
      c.font = DONE_FONT;
      c.textAlign = 'left';
      c.textBaseline = 'middle';
      c.fillStyle = '#15803d';
      c.fillText(pt.doneLabel, cx + 10, snap.y + 1);
    }
    c.globalAlpha = 1;
  }

  function frame(now: number) {
    if (destroyed) return;
    raf = requestAnimationFrame(frame);
    if (W === 0 || H === 0) return;

    const p = clamp01(getProgress());
    const t = (now - t0) / 1000;
    const g = geometry(p);
    const c = ctx!;

    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, W, H);

    const sceneAlpha =
      (0.55 + 0.45 * smooth(0, 0.1, p)) * (1 - 0.88 * smooth(0.845, 0.925, p));
    if (sceneAlpha <= 0.01) return;
    c.globalAlpha = sceneAlpha;

    const snaps: Snapshot[] = particles.map(pt => snapshot(pt, t, p, g));

    // Ledger guide lines draw on as the ordered side fills.
    const orderAmount = clamp01((p - 0.47) / 0.33);
    if (orderAmount > 0) {
      const regW = g.region.x1 - g.region.x0;
      const rowH = (g.region.y1 - g.region.y0) / Math.max(totalRows, 1);
      for (let r = 0; r < totalRows; r += 1) {
        const rowProg = clamp01((orderAmount * 1.25 - r / Math.max(totalRows, 1)) * 2.2);
        if (rowProg <= 0) continue;
        const y = g.region.y0 + rowH * (r + 0.5);
        c.globalAlpha = sceneAlpha * 0.9 * rowProg;
        c.strokeStyle = 'rgba(49, 87, 246, 0.13)';
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(g.region.x0 - 6, y);
        c.lineTo(g.region.x0 - 6 + regW * easeOutCubic(rowProg), y);
        c.stroke();
        c.beginPath();
        c.arc(g.region.x0 - 6, y, 2, 0, Math.PI * 2);
        c.fillStyle = 'rgba(49, 87, 246, 0.35)';
        c.fill();
      }
      c.globalAlpha = sceneAlpha;
    }

    // Tangled dependency lines between chips while both ends are in chaos.
    const lineAlpha = smooth(0.03, 0.13, p) * (1 - smooth(0.4, 0.54, p));
    if (lineAlpha > 0.01) {
      for (const idx of chipIndexes) {
        const pt = particles[idx];
        const sa = snaps[idx];
        if (sa.phase > 1) continue;
        for (const j of pt.partners) {
          const sb = snaps[j];
          if (sb.phase > 1) continue;
          const hot = pt.risk || particles[j].risk;
          c.globalAlpha = sceneAlpha * lineAlpha * (hot ? 0.3 : 0.13);
          c.strokeStyle = hot ? '#ef4444' : '#64748b';
          c.lineWidth = 1;
          const mx = (sa.x + sb.x) / 2 + Math.sin(t * 0.7 + idx) * 34;
          const my = (sa.y + sb.y) / 2 + Math.cos(t * 0.6 + j) * 34;
          c.beginPath();
          c.moveTo(sa.x, sa.y);
          c.quadraticCurveTo(mx, my, sb.x, sb.y);
          c.stroke();
        }
      }
      c.globalAlpha = sceneAlpha;
    }

    // Intake glow while particles pour into the core.
    let glow = 0;
    for (let i = 0; i < particles.length; i += 1) {
      if (snaps[i].phase === 1 && snaps[i].s > 0.5) glow += (snaps[i].s - 0.5) * 2;
    }
    if (glow > 0.05) {
      const intensity = Math.min(0.32, glow * 0.045);
      const grd = c.createRadialGradient(g.coreIn.x, g.coreIn.y, 4, g.coreIn.x, g.coreIn.y, 90);
      grd.addColorStop(0, `rgba(49, 87, 246, ${intensity})`);
      grd.addColorStop(1, 'rgba(49, 87, 246, 0)');
      c.fillStyle = grd;
      c.beginPath();
      c.arc(g.coreIn.x, g.coreIn.y, 90, 0, Math.PI * 2);
      c.fill();
    }

    // Lingering chaos dims once the turn is underway, shifting focus to the order side.
    const chaosDim = 1 - 0.45 * smooth(0.52, 0.72, p);

    // Particles: dots first, labelled chips on top, ordered bars last.
    for (let i = 0; i < particles.length; i += 1) {
      const pt = particles[i];
      const snap = snaps[i];
      if (snap.phase === 2) continue;
      if (snap.phase >= 3) {
        drawOrdered(pt, snap, t, sceneAlpha * (snap.phase === 3 ? 0.25 + 0.75 * snap.s : 1));
        continue;
      }
      if (!pt.isChip) {
        const fade = snap.phase === 1 ? 1 - 0.4 * snap.s : 1;
        c.globalAlpha = sceneAlpha * 0.6 * fade * chaosDim;
        c.beginPath();
        c.arc(snap.x, snap.y, pt.dotR * (snap.phase === 1 ? 1 - 0.4 * snap.s : 1), 0, Math.PI * 2);
        c.fillStyle = pt.color;
        c.fill();
      }
    }
    c.globalAlpha = sceneAlpha;
    for (const idx of chipIndexes) {
      const snap = snaps[idx];
      if (snap.phase > 1) continue;
      drawChip(particles[idx], snap, t, sceneAlpha * chaosDim * (snap.phase === 1 ? 1 - 0.25 * snap.s : 0.97));
    }

    c.globalAlpha = 1;
  }

  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas);
  resize();

  return {
    setRunning(next: boolean) {
      if (destroyed || next === running) return;
      running = next;
      if (running) {
        raf = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(raf);
      }
    },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    },
  };
}
