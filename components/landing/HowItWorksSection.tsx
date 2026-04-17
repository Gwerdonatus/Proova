"use client";

import * as React from "react";
import { Card } from "@/components/ui";

// ─── Static data outside component — no new array reference on re-renders ────
const STEPS = [
  {
    meta: "Step 01",
    title: "Create a unique link for each source",
    desc: "Assign a tracked link to every influencer, campaign, or channel you want to measure. Each link is tied to a source, so you always know exactly where traffic came from.",
  },
  {
    meta: "Step 02",
    title: "Every click is recorded instantly",
    desc: "When someone clicks your link, Proova logs it on our servers before redirecting them — so clicks cannot be faked, lost, or quietly blocked. You get a reliable record every time.",
  },
  {
    meta: "Step 03",
    title: "Match clicks to real revenue",
    desc: 'As sales come in, Proova links them back to the clicks that drove them. Revenue starts as "pending" and moves to "confirmed" once the transaction clears — giving you verified proof of what each source actually earned.',
  },
  {
    meta: "Step 04",
    title: "Reconcile payouts with confidence",
    desc: "Import your payout or invoice CSV and compare it against tracked clicks and revenue records. Proova helps you spot mismatches, resolve disputes, and settle faster.",
  },
] as const;

type Step = (typeof STEPS)[number];

// ─── Utilities ────────────────────────────────────────────────────────────────
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

/**
 * Returns TWO values:
 *  - progressRef  → mutable ref, updated on EVERY scroll tick. Zero renders.
 *                   Used by FilamentRibbon to drive SVG directly.
 *  - progress     → throttled React state. Only updates when value shifts >0.008.
 *                   Used by step indicators and dots (cheap re-render, infrequent).
 */
function useSectionScrollProgress(
  ref: React.RefObject<HTMLElement | null>,
  reducedMotion: boolean
) {
  const progressRef = React.useRef(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (reducedMotion) {
      progressRef.current = 1;
      setProgress(1);
      return;
    }

    let raf = 0;
    let lastCommitted = -1;

    const compute = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const start = vh * 0.18;
      const end = vh * 0.82;
      const total = r.height - (end - start) || 1;
      const next = clamp01((start - r.top) / total);

      // Always write mutable ref — zero render cost
      progressRef.current = next;

      // Only trigger React re-render when value shifts meaningfully
      if (Math.abs(next - lastCommitted) > 0.008) {
        lastCommitted = next;
        setProgress(next);
      }
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    const ro = new ResizeObserver(schedule);
    if (ref.current) ro.observe(ref.current);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
    };
  }, [ref, reducedMotion]);

  return { progressRef, progress };
}

function useActiveStepByIntersection(count: number) {
  const stepRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    // setTimeout(0) ensures all ref callbacks have fired before we snapshot them
    const id = setTimeout(() => {
      const els = stepRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!els.length) return;

      const io = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort(
              (a, b) =>
                (b.intersectionRatio || 0) - (a.intersectionRatio || 0)
            )[0];
          if (!visible) return;
          const idx = els.indexOf(visible.target as HTMLDivElement);
          if (idx >= 0) setActive(idx);
        },
        { threshold: [0.35, 0.5, 0.65], rootMargin: "-14% 0px -50% 0px" }
      );

      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }, 0);

    return () => clearTimeout(id);
  }, [count]);

  return { stepRefs, active };
}

function useEntryAnimation() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    // Double rAF: first frame paints opacity-0, second triggers the transition
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setMounted(true));
    });
    return () => cancelAnimationFrame(raf);
  }, []);
  return mounted;
}

// ─── Global entry styles (injected once before paint, ID-guarded) ─────────────
const ENTRY_STYLES = `
  .hiw-root,.hiw-root * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  .hiw-entry {
    opacity: 0;
    transform: translateY(12px);
    will-change: opacity, transform;
  }
  .hiw-entry.hiw-visible {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 360ms cubic-bezier(0.22,1,0.36,1),
                transform 360ms cubic-bezier(0.22,1,0.36,1);
    will-change: auto;
  }
  .hiw-entry-d0.hiw-visible { transition-delay: 0ms; }
  .hiw-entry-d1.hiw-visible { transition-delay: 80ms; }
  .hiw-entry-d2.hiw-visible { transition-delay: 160ms; }
  .hiw-entry-d3.hiw-visible { transition-delay: 240ms; }
`;

function useInjectEntryStyles() {
  React.useInsertionEffect(() => {
    const ID = "hiw-entry-styles";
    if (document.getElementById(ID)) return;
    const tag = document.createElement("style");
    tag.id = ID;
    tag.textContent = ENTRY_STYLES;
    document.head.appendChild(tag);
  }, []);
}

// ─── FilamentRibbon ───────────────────────────────────────────────────────────
/**
 * Completely decoupled from React's render cycle.
 *
 * How it works:
 *  1. Takes `progressRef` (mutable ref) instead of a state value.
 *  2. Subscribes to the window scroll event directly — one rAF per scroll tick.
 *  3. Reads progressRef.current and writes --ribbon-p1/p2/p3 directly onto
 *     the SVG element via svgRef — zero React renders, zero reconciliation.
 *  4. SVG paths read those CSS vars via calc() in their style.strokeDashoffset.
 *  5. React.memo with a rigid comparator ensures this never re-renders from
 *     parent state changes.
 */
const FilamentRibbon = React.memo(
  function FilamentRibbon({
    progressRef,
    reducedMotion,
    className,
    mode = "mobile",
  }: {
    progressRef: React.MutableRefObject<number>;
    reducedMotion: boolean;
    className?: string;
    mode?: "mobile" | "desktop";
  }) {
    const uid = React.useId().replace(/:/g, "");
    const svgRef = React.useRef<SVGSVGElement>(null);
    const isDesktop = mode === "desktop";

    const L = 1000;
    const strandCount = isDesktop ? 22 : 15;
    const strandSpread = isDesktop ? 1.18 : 0.82;
    const viewW = isDesktop ? 86 : 50;

    // Memoize geometry so it is never recomputed on a re-render
    const offsets = React.useMemo(
      () =>
        Array.from(
          { length: strandCount },
          (_, i) => (i - (strandCount - 1) / 2) * strandSpread
        ),
      [strandCount, strandSpread]
    );

    const paths = React.useMemo(
      () => ({
        a: isDesktop
          ? "M24 0 C 9 96,38 184,22 292 C 11 392,39 474,24 584 C 13 684,35 782,24 1000"
          : "M18 0 C 7 100,30 180,17 290 C 7 390,30 470,18 580 C 9 680,28 780,18 1000",
        b: isDesktop
          ? "M40 0 C 58 112,20 222,42 334 C 59 448,20 556,40 676 C 54 790,25 892,40 1000"
          : "M24 0 C 38 114,14 220,28 330 C 39 444,15 554,26 676 C 36 790,17 892,25 1000",
        c: isDesktop
          ? "M58 0 C 74 94,29 176,50 286 C 68 392,28 502,54 614 C 70 718,31 826,56 1000"
          : "M31 0 C 42 96,16 176,30 286 C 42 390,18 502,31 612 C 41 716,20 826,31 1000",
      }),
      [isDesktop]
    );

    // Memoize the keyframe CSS string — never rebuilt unless uid changes
    const keyframeCSS = React.useMemo(
      () => `
        @keyframes filamentDrift-${uid}-a {
          0%,100% { transform: translate3d(0px,0px,0); }
          50%      { transform: translate3d(0.8px,-4px,0); }
        }
        @keyframes filamentDrift-${uid}-b {
          0%,100% { transform: translate3d(0px,0px,0); }
          50%      { transform: translate3d(-0.7px,5px,0); }
        }
        @keyframes filamentDrift-${uid}-c {
          0%,100% { transform: translate3d(0px,0px,0); }
          50%      { transform: translate3d(0.9px,-3px,0); }
        }
      `,
      [uid]
    );

    const families = [
      {
        key: "a" as const,
        d: paths.a,
        grad: `${uid}-grad-a`,
        opacity: isDesktop ? 0.95 : 0.92,
        pVar: "--ribbon-p1",
        dur: "8.5s",
      },
      {
        key: "b" as const,
        d: paths.b,
        grad: `${uid}-grad-b`,
        opacity: isDesktop ? 0.72 : 0.68,
        pVar: "--ribbon-p2",
        dur: "9.4s",
      },
      {
        key: "c" as const,
        d: paths.c,
        grad: `${uid}-grad-c`,
        opacity: isDesktop ? 0.88 : 0.84,
        pVar: "--ribbon-p3",
        dur: "10.3s",
      },
    ];

    const leftSizing = isDesktop
      ? "left-[10px] w-[78px] lg:left-[16px] lg:w-[88px]"
      : "left-[8px] w-[50px]";

    // ── Off-React ribbon driver ────────────────────────────────────────────────
    // Subscribes to scroll once. Each tick: reads progressRef, writes 3 CSS
    // vars directly onto the SVG element. React never runs. No reconciliation.
    React.useEffect(() => {
      const svg = svgRef.current;
      if (!svg) return;

      if (reducedMotion) {
        svg.style.setProperty("--ribbon-p1", "1");
        svg.style.setProperty("--ribbon-p2", "1");
        svg.style.setProperty("--ribbon-p3", "1");
        return;
      }

      // Set initial position immediately
      const writeVars = () => {
        const raw = progressRef.current;
        svg.style.setProperty("--ribbon-p1", String(clamp01(raw)));
        svg.style.setProperty(
          "--ribbon-p2",
          String(clamp01(raw * 1.018 - 0.018))
        );
        svg.style.setProperty(
          "--ribbon-p3",
          String(clamp01(raw * 0.985 + 0.012))
        );
      };

      writeVars();

      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(writeVars);
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", onScroll);
      };
    }, [reducedMotion, progressRef]);

    return (
      <div className={cx("absolute top-0 bottom-0", leftSizing, className)}>
        <svg
          ref={svgRef}
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${viewW} 1000`}
          preserveAspectRatio="none"
          aria-hidden="true"
          style={
            {
              willChange: "transform",
              "--ribbon-p1": "0",
              "--ribbon-p2": "0",
              "--ribbon-p3": "0",
            } as React.CSSProperties
          }
        >
          <defs>
            <linearGradient id={`${uid}-grad-a`} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#2F7BFF" />
              <stop offset="55%" stopColor="#4D79FF" />
              <stop offset="100%" stopColor="#5B6CFF" />
            </linearGradient>
            <linearGradient id={`${uid}-grad-b`} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(91,108,255,0.22)" />
              <stop offset="100%" stopColor="rgba(47,123,255,0.70)" />
            </linearGradient>
            <linearGradient id={`${uid}-grad-c`} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#7C4DFF" />
              <stop offset="100%" stopColor="#8A2BFF" />
            </linearGradient>
            <filter id={`${uid}-strand-blur`}>
              <feGaussianBlur
                stdDeviation={isDesktop ? "0.42" : "0.3"}
                result="blur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient
              id={`${uid}-fade-y`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.05" />
              <stop offset="8%" stopColor="white" stopOpacity="1" />
              <stop offset="92%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0.04" />
            </linearGradient>
            <mask id={`${uid}-mask-y`}>
              <rect
                x="0"
                y="0"
                width={viewW}
                height="1000"
                fill={`url(#${uid}-fade-y)`}
              />
            </mask>
          </defs>

          <g mask={`url(#${uid}-mask-y)`}>
            {families.map((family) => (
              <g
                key={family.key}
                filter={`url(#${uid}-strand-blur)`}
                style={{
                  transformOrigin: "50% 50%",
                  willChange: reducedMotion ? "auto" : "transform",
                  animation: reducedMotion
                    ? "none"
                    : `filamentDrift-${uid}-${family.key} ${family.dur} ease-in-out infinite`,
                }}
              >
                {offsets.map((offset, i) => {
                  const center = (strandCount - 1) / 2;
                  const t = 1 - Math.abs(i - center) / center;
                  const strandOpacity =
                    family.opacity * (0.16 + t * 0.78);
                  const strandWidth =
                    (isDesktop ? 0.46 : 0.36) +
                    t * (isDesktop ? 0.52 : 0.42);
                  // Per-strand drawback — replicated accurately in CSS calc
                  const strandOffset = ((1 - t) * 0.04).toFixed(4);

                  return (
                    <path
                      key={`${family.key}-${i}`}
                      d={family.d}
                      transform={`translate(${offset} 0)`}
                      fill="none"
                      stroke={`url(#${family.grad})`}
                      strokeWidth={strandWidth}
                      strokeOpacity={strandOpacity}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength={L}
                      strokeDasharray={L}
                      style={{
                        // CSS custom property drives stroke-dashoffset.
                        // calc replicates: (1 - clamp01(p - strandOffset)) * L
                        // clamp(0,...,L) prevents negative offset artefacts.
                        strokeDashoffset: reducedMotion
                          ? "0"
                          : `calc(clamp(0, ${L} * (1 - var(${family.pVar}) + ${strandOffset}), ${L}))`,
                      }}
                    />
                  );
                })}
              </g>
            ))}
          </g>

          {!reducedMotion && <style>{keyframeCSS}</style>}
        </svg>
      </div>
    );
  },
  // Never re-render from parent state — ribbon is driven by ref + scroll event
  (prev, next) =>
    prev.reducedMotion === next.reducedMotion && prev.mode === next.mode
);

// ─── StepDot ──────────────────────────────────────────────────────────────────
function StepDot({ active, done }: { active: boolean; done?: boolean }) {
  return (
    <div
      style={{
        width: 16,
        height: 16,
        flexShrink: 0,
        borderColor:
          active || done
            ? "rgba(91,108,255,0.22)"
            : "rgba(15,23,42,0.10)",
        willChange: active ? "transform" : "auto",
        transform: active ? "scale(1.1)" : "scale(1)",
        transition: "transform 300ms ease",
      }}
      className="flex items-center justify-center rounded-full border bg-white shadow-[0_6px_18px_rgba(15,23,42,0.06)]"
    >
      <div
        style={{
          width: 8,
          height: 8,
          flexShrink: 0,
          borderRadius: "50%",
          background:
            active || done
              ? "linear-gradient(135deg,#2F7BFF 0%,#5B6CFF 45%,#8A2BFF 100%)"
              : "rgba(15,23,42,0.10)",
          transition: "background 300ms ease",
        }}
      />
    </div>
  );
}

// ─── StepGlow ─────────────────────────────────────────────────────────────────
function StepGlow({ active }: { active: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[28px]"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 300ms ease",
        willChange: "opacity",
        background:
          "radial-gradient(circle at top left,rgba(47,123,255,0.10),transparent 30%),radial-gradient(circle at top right,rgba(124,77,255,0.08),transparent 34%),radial-gradient(circle at bottom left,rgba(138,43,255,0.08),transparent 34%)",
      }}
    />
  );
}

// ─── DesktopStickyPanel ───────────────────────────────────────────────────────
function DesktopStickyPanel({ activeMeta }: { activeMeta: string }) {
  return (
    // translateZ(0) promotes to its own compositor layer — no repaint on scroll
    <div
      className="relative overflow-hidden rounded-[30px] border border-app-border bg-white/88 p-5 shadow-soft backdrop-blur"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-6 top-0 h-24 w-24 rounded-full bg-[#2F7BFF]/7 blur-3xl" />
        <div className="absolute right-0 top-10 h-24 w-24 rounded-full bg-[#7C4DFF]/7 blur-3xl" />
        <div className="absolute bottom-0 left-12 h-24 w-24 rounded-full bg-[#8A2BFF]/6 blur-3xl" />
      </div>

      <div className="relative">
        <div className="inline-flex items-center rounded-full border border-black/8 bg-white/70 px-3 py-1 text-[11px] font-semibold text-app-muted">
          How Proova works
        </div>
        <div className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-app-muted">
          Flow
        </div>
        <div className="mt-2 text-xl font-semibold tracking-tight text-app-ink">
          Clicks → Proof → Reconciliation
        </div>
        <p className="mt-3 text-sm leading-relaxed text-app-muted">
          Follow the scroll. As each step becomes active, the filament
          ribbons continue downward and the revenue story unfolds in order.
        </p>

        <div className="mt-5 rounded-2xl border border-black/8 bg-white/78 px-4 py-3">
          <div className="text-[11px] font-semibold text-app-muted">
            Current step
          </div>
          {/* Fixed min-height prevents layout shift on label swap */}
          <div
            className="mt-1 text-sm font-semibold text-app-ink"
            style={{ minHeight: "1.25rem" }}
          >
            {activeMeta}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {(
            ["Source tracking", "Revenue proof", "CSV matching"] as const
          ).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/8 bg-white/82 px-3 py-1 text-[11px] font-semibold text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Shared step card ─────────────────────────────────────────────────────────
function StepCard({
  s,
  isActive,
  isDone,
  cardRef,
  stepIdx,
  reducedMotion,
  dotOffset,
  textSize,
}: {
  s: Step;
  isActive: boolean;
  isDone: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
  stepIdx: number;
  reducedMotion: boolean;
  dotOffset: string;
  textSize: string;
}) {
  return (
    <div ref={cardRef} className="relative">
      <div className={`absolute ${dotOffset} top-6`}>
        <StepDot active={isActive} done={isDone} />
      </div>
      <div
        style={{
          willChange: isActive ? "transform" : "auto",
          transform:
            isActive && !reducedMotion
              ? "translateY(-1px) scale(1.01)"
              : "translateY(0) scale(1)",
          transition: "transform 300ms cubic-bezier(0.22,1,0.36,1)",
        }}
        onMouseEnter={(e) => {
          if (!isActive)
            (e.currentTarget as HTMLElement).style.transform =
              "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          if (!isActive)
            (e.currentTarget as HTMLElement).style.transform =
              "translateY(0)";
        }}
      >
        <Card
          className={cx(
            "relative overflow-hidden rounded-[28px] border border-app-border bg-white/92 p-5",
            isActive
              ? "shadow-[0_14px_40px_rgba(15,23,42,0.08)] ring-1 ring-[#5B6CFF]/14"
              : ""
          )}
        >
          <StepGlow active={isActive} />
          <div className="relative text-xs font-semibold text-app-muted">
            {s.meta}
          </div>
          <div
            className={`relative mt-2 ${textSize} font-semibold tracking-tight text-app-ink`}
          >
            {s.title}
          </div>
          <div className="relative mt-2 text-sm leading-relaxed text-app-muted">
            {s.desc}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── HowItWorksSection ────────────────────────────────────────────────────────
export function HowItWorksSection() {
  useInjectEntryStyles();

  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const mounted = useEntryAnimation();

  const { progressRef, progress } = useSectionScrollProgress(
    sectionRef,
    reducedMotion
  );
  const { stepRefs, active } = useActiveStepByIntersection(STEPS.length);

  // Helper to build entry-animation class string
  const e = (delay: number) =>
    cx("hiw-entry", `hiw-entry-d${delay}`, mounted && "hiw-visible");

  return (
    <section
      ref={sectionRef}
      className="hiw-root relative mx-auto max-w-6xl px-4 pb-12 sm:px-6 md:pb-16 lg:px-8"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 sm:h-44">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/38 to-white/88" />
        <div className="absolute left-[8%] top-1 h-24 w-24 rounded-full bg-[#2F7BFF]/8 blur-3xl" />
        <div className="absolute right-[10%] top-6 h-24 w-24 rounded-full bg-[#8A2BFF]/8 blur-3xl" />
      </div>

      {/* ── Header ── */}
      <div className={cx("relative pt-8 sm:pt-10 md:pt-12", e(0))}>
        <div className="inline-flex items-center rounded-full border border-black/8 bg-white/72 px-3 py-1 text-[11px] font-semibold text-app-muted backdrop-blur">
          How Proova works
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-app-ink md:text-3xl">
          From click to proof
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-app-muted md:text-base">
          A smoother revenue trail for modern selling — especially when
          customers move into WhatsApp, transfers, or other off-site
          payment flows.
        </p>
      </div>

      {/* ── Mobile ── */}
      <div className={cx("relative mt-8 md:hidden", e(1))}>
        {/* Single backdrop-blur on the outermost container only */}
        <div className="relative overflow-hidden rounded-[32px] border border-app-border bg-white/72 p-4 shadow-soft backdrop-blur">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-18px] top-[12%] h-28 w-28 rounded-full bg-[#2F7BFF]/7 blur-3xl" />
            <div className="absolute right-[-12px] top-[24%] h-28 w-28 rounded-full bg-[#7C4DFF]/7 blur-3xl" />
            <div className="absolute bottom-[8%] left-[28%] h-28 w-28 rounded-full bg-[#8A2BFF]/6 blur-3xl" />
          </div>

          <div className="relative flex items-center justify-between gap-3">
            <div className="text-xs font-semibold text-app-muted">Flow</div>
            <div className="text-xs text-app-muted">
              {/* Fixed width prevents layout shift on label swap */}
              <span
                className="font-semibold text-app-ink"
                style={{ minWidth: "3.5rem", display: "inline-block" }}
              >
                {STEPS[active]?.meta}
              </span>
              <span className="mx-2 text-black/20">•</span>
              <span>Scroll to follow</span>
            </div>
          </div>

          <div className="relative mt-5">
            <FilamentRibbon
              progressRef={progressRef}
              reducedMotion={reducedMotion}
              mode="mobile"
            />
            <div className="space-y-4 pl-14">
              {STEPS.map((s, idx) => (
                <StepCard
                  key={s.title}
                  s={s}
                  isActive={idx === active}
                  isDone={idx < active}
                  stepIdx={idx}
                  reducedMotion={reducedMotion}
                  dotOffset="-left-[40px]"
                  textSize="text-[15px]"
                  cardRef={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                />
              ))}
            </div>
            <div className="mt-5 pl-14 text-xs text-app-muted">
              Result: a clean line from traffic to verified revenue.
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className={cx("relative mt-9 hidden md:block", e(1))}>
        <div className="grid grid-cols-[280px_minmax(0,1fr)] gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">

          {/* Sticky panel — translateZ(0) avoids repaint on scroll */}
          <div
            className={cx("sticky top-24 self-start", e(2))}
            style={{ transform: "translateZ(0)" }}
          >
            <DesktopStickyPanel
              activeMeta={STEPS[active]?.meta ?? "Step 01"}
            />
          </div>

          {/* Steps panel — single backdrop-blur at this level only */}
          <div
            className={cx(
              "relative overflow-hidden rounded-[32px] border border-app-border bg-white/72 p-5 shadow-soft backdrop-blur lg:p-6",
              e(3)
            )}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-[-18px] top-[12%] h-28 w-28 rounded-full bg-[#2F7BFF]/7 blur-3xl" />
              <div className="absolute right-[-12px] top-[24%] h-28 w-28 rounded-full bg-[#7C4DFF]/7 blur-3xl" />
              <div className="absolute bottom-[8%] left-[28%] h-28 w-28 rounded-full bg-[#8A2BFF]/6 blur-3xl" />
            </div>

            <div className="relative flex items-center justify-between gap-3">
              <div className="text-xs font-semibold text-app-muted">Flow</div>
              <div className="text-xs text-app-muted">
                <span
                  className="font-semibold text-app-ink"
                  style={{ minWidth: "3.5rem", display: "inline-block" }}
                >
                  {STEPS[active]?.meta}
                </span>
                <span className="mx-2 text-black/20">•</span>
                <span>Scroll to follow</span>
              </div>
            </div>

            <div className="relative mt-5">
              <FilamentRibbon
                progressRef={progressRef}
                reducedMotion={reducedMotion}
                mode="desktop"
              />
              <div className="space-y-5 pl-24 lg:pl-28">
                {STEPS.map((s, idx) => (
                  <div key={s.title} className="max-w-[720px]">
                    <StepCard
                      s={s}
                      isActive={idx === active}
                      isDone={idx < active}
                      stepIdx={idx}
                      reducedMotion={reducedMotion}
                      dotOffset="-left-[58px] lg:-left-[62px]"
                      textSize="text-base"
                      cardRef={(el) => {
                        stepRefs.current[idx] = el;
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 pl-24 text-xs text-app-muted lg:pl-28">
                Result: a clean line from traffic to verified revenue.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}