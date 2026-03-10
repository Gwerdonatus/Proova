"use client";

import * as React from "react";
import { Card } from "@/components/ui";

type Step = { meta: string; title: string; desc: string };

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

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

function useSectionScrollProgress(
  ref: React.RefObject<HTMLElement | null>,
  reducedMotion: boolean
) {
  const [p, setP] = React.useState(0);

  React.useEffect(() => {
    if (reducedMotion) {
      setP(1);
      return;
    }

    let raf = 0;

    const compute = () => {
      const el = ref.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      const start = vh * 0.18;
      const end = vh * 0.82;
      const total = r.height - (end - start) || 1;
      const raw = (start - r.top) / total;

      setP(clamp01(raw));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const ro = new ResizeObserver(() => onScroll());
    if (ref.current) ro.observe(ref.current);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
    };
  }, [ref, reducedMotion]);

  return p;
}

function useActiveStepByIntersection(count: number) {
  const stepRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0)
          )[0];

        if (!visible) return;

        const idx = els.indexOf(visible.target as HTMLDivElement);
        if (idx >= 0) setActive(idx);
      },
      {
        threshold: [0.35, 0.5, 0.65],
        rootMargin: "-14% 0px -50% 0px",
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [count]);

  return { stepRefs, active };
}

/**
 * Filament ribbon
 * Many thin strands layered together to form soft flowing ribbon bundles.
 * This replaces the old 3 thick strokes with a more premium thread/fabric look.
 */
function FilamentRibbon({
  progress,
  reducedMotion,
  className,
  mode = "mobile",
}: {
  progress: number;
  reducedMotion: boolean;
  className?: string;
  mode?: "mobile" | "desktop";
}) {
  const uid = React.useId().replace(/:/g, "");
  const isDesktop = mode === "desktop";

  const p1 = clamp01(progress);
  const p2 = clamp01(progress * 1.018 - 0.018);
  const p3 = clamp01(progress * 0.985 + 0.012);

  const L = 1000;
  const dash = (pp: number) => (reducedMotion ? 0 : (1 - pp) * L);

  const strandCount = isDesktop ? 22 : 15;
  const strandSpread = isDesktop ? 1.18 : 0.82;
  const viewW = isDesktop ? 86 : 50;

  const offsets = Array.from({ length: strandCount }, (_, i) => {
    return (i - (strandCount - 1) / 2) * strandSpread;
  });

  const leftSizing = isDesktop
    ? "left-[10px] w-[78px] lg:left-[16px] lg:w-[88px]"
    : "left-[8px] w-[50px]";

  const familyA = isDesktop
    ? `M24 0
       C 9 96, 38 184, 22 292
       C 11 392, 39 474, 24 584
       C 13 684, 35 782, 24 1000`
    : `M18 0
       C 7 100, 30 180, 17 290
       C 7 390, 30 470, 18 580
       C 9 680, 28 780, 18 1000`;

  const familyB = isDesktop
    ? `M40 0
       C 58 112, 20 222, 42 334
       C 59 448, 20 556, 40 676
       C 54 790, 25 892, 40 1000`
    : `M24 0
       C 38 114, 14 220, 28 330
       C 39 444, 15 554, 26 676
       C 36 790, 17 892, 25 1000`;

  const familyC = isDesktop
    ? `M58 0
       C 74 94, 29 176, 50 286
       C 68 392, 28 502, 54 614
       C 70 718, 31 826, 56 1000`
    : `M31 0
       C 42 96, 16 176, 30 286
       C 42 390, 18 502, 31 612
       C 41 716, 20 826, 31 1000`;

  const families = [
    {
      key: "a",
      d: familyA,
      gradient: `${uid}-grad-a`,
      opacity: isDesktop ? 0.95 : 0.92,
      progress: p1,
    },
    {
      key: "b",
      d: familyB,
      gradient: `${uid}-grad-b`,
      opacity: isDesktop ? 0.72 : 0.68,
      progress: p2,
    },
    {
      key: "c",
      d: familyC,
      gradient: `${uid}-grad-c`,
      opacity: isDesktop ? 0.88 : 0.84,
      progress: p3,
    },
  ];

  return (
    <div className={cx("absolute top-0 bottom-0", leftSizing, className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${viewW} 1000`}
        preserveAspectRatio="none"
        aria-hidden="true"
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

          <linearGradient id={`${uid}-fade-y`} x1="0" y1="0" x2="0" y2="1">
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
                animation: reducedMotion
                  ? "none"
                  : `filamentDrift-${uid}-${family.key} ${
                      family.key === "a"
                        ? "8.5s"
                        : family.key === "b"
                        ? "9.4s"
                        : "10.3s"
                    } ease-in-out infinite`,
              }}
            >
              {offsets.map((offset, i) => {
                const center = (strandCount - 1) / 2;
                const t = 1 - Math.abs(i - center) / center;
                const strandOpacity = family.opacity * (0.16 + t * 0.78);
                const strandWidth =
                  (isDesktop ? 0.46 : 0.36) + t * (isDesktop ? 0.52 : 0.42);

                const localProgress = clamp01(family.progress - (1 - t) * 0.04);

                return (
                  <path
                    key={`${family.key}-${i}`}
                    d={family.d}
                    transform={`translate(${offset} 0)`}
                    fill="none"
                    stroke={`url(#${family.gradient})`}
                    strokeWidth={strandWidth}
                    strokeOpacity={strandOpacity}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={L}
                    strokeDasharray={L}
                    strokeDashoffset={dash(localProgress)}
                  />
                );
              })}
            </g>
          ))}
        </g>

        {!reducedMotion && (
          <style>{`
            @keyframes filamentDrift-${uid}-a {
              0%, 100% { transform: translate3d(0px, 0px, 0); }
              50% { transform: translate3d(0.8px, -4px, 0); }
            }
            @keyframes filamentDrift-${uid}-b {
              0%, 100% { transform: translate3d(0px, 0px, 0); }
              50% { transform: translate3d(-0.7px, 5px, 0); }
            }
            @keyframes filamentDrift-${uid}-c {
              0%, 100% { transform: translate3d(0px, 0px, 0); }
              50% { transform: translate3d(0.9px, -3px, 0); }
            }
          `}</style>
        )}
      </svg>
    </div>
  );
}

function StepDot({ active, done }: { active: boolean; done?: boolean }) {
  return (
    <div
      className={cx(
        "flex h-4 w-4 items-center justify-center rounded-full border bg-white shadow-[0_6px_18px_rgba(15,23,42,0.06)] transition-all duration-300",
        active ? "scale-110" : ""
      )}
      style={{
        borderColor:
          active || done ? "rgba(91,108,255,0.22)" : "rgba(15,23,42,0.10)",
      }}
    >
      <div
        className="h-2 w-2 rounded-full"
        style={{
          background:
            active || done
              ? "linear-gradient(135deg, #2F7BFF 0%, #5B6CFF 45%, #8A2BFF 100%)"
              : "rgba(15,23,42,0.10)",
        }}
      />
    </div>
  );
}

function StepGlow({ active }: { active: boolean }) {
  return (
    <div
      className={cx(
        "pointer-events-none absolute inset-0 rounded-[28px] transition-opacity duration-300",
        active ? "opacity-100" : "opacity-0"
      )}
      style={{
        background:
          "radial-gradient(circle at top left, rgba(47,123,255,0.10), transparent 30%), radial-gradient(circle at top right, rgba(124,77,255,0.08), transparent 34%), radial-gradient(circle at bottom left, rgba(138,43,255,0.08), transparent 34%)",
      }}
    />
  );
}

function DesktopStickyPanel({
  activeMeta,
}: {
  activeMeta: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[30px] border border-app-border bg-white/88 p-5 shadow-soft backdrop-blur">
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
          Follow the scroll. As each step becomes active, the filament ribbons
          continue downward and the revenue story unfolds in order.
        </p>

        <div className="mt-5 rounded-2xl border border-black/8 bg-white/78 px-4 py-3">
          <div className="text-[11px] font-semibold text-app-muted">
            Current step
          </div>
          <div className="mt-1 text-sm font-semibold text-app-ink">
            {activeMeta}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-black/8 bg-white/82 px-3 py-1 text-[11px] font-semibold text-gray-800">
            Source tracking
          </span>
          <span className="rounded-full border border-black/8 bg-white/82 px-3 py-1 text-[11px] font-semibold text-gray-800">
            Revenue proof
          </span>
          <span className="rounded-full border border-black/8 bg-white/82 px-3 py-1 text-[11px] font-semibold text-gray-800">
            CSV matching
          </span>
        </div>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  const steps: Step[] = [
    {
      meta: "Step 01",
      title: "Create a unique link for each source",
      desc:
        "Assign a tracked link to every influencer, campaign, or channel you want to measure. Each link is tied to a source, so you always know exactly where traffic came from.",
    },
    {
      meta: "Step 02",
      title: "Every click is recorded instantly",
      desc:
        "When someone clicks your link, Proova logs it on our servers before redirecting them — so clicks cannot be faked, lost, or quietly blocked. You get a reliable record every time.",
    },
    {
      meta: "Step 03",
      title: "Match clicks to real revenue",
      desc:
        'As sales come in, Proova links them back to the clicks that drove them. Revenue starts as "pending" and moves to "confirmed" once the transaction clears — giving you verified proof of what each source actually earned.',
    },
    {
      meta: "Step 04",
      title: "Reconcile payouts with confidence",
      desc:
        "Import your payout or invoice CSV and compare it against tracked clicks and revenue records. Proova helps you spot mismatches, resolve disputes, and settle faster.",
    },
  ];

  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = React.useRef<HTMLElement | null>(null);

  const progress = useSectionScrollProgress(sectionRef, reducedMotion);
  const { stepRefs, active } = useActiveStepByIntersection(steps.length);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-4 pb-12 sm:px-6 md:pb-16 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 sm:h-44">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/38 to-white/88" />
        <div className="absolute left-[8%] top-1 h-24 w-24 rounded-full bg-[#2F7BFF]/8 blur-3xl" />
        <div className="absolute right-[10%] top-6 h-24 w-24 rounded-full bg-[#8A2BFF]/8 blur-3xl" />
      </div>

      <div className="relative pt-8 sm:pt-10 md:pt-12">
        <div className="inline-flex items-center rounded-full border border-black/8 bg-white/72 px-3 py-1 text-[11px] font-semibold text-app-muted backdrop-blur">
          How Proova works
        </div>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-app-ink md:text-3xl">
          From click to proof
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-app-muted md:text-base">
          A smoother revenue trail for modern selling — especially when
          customers move into WhatsApp, transfers, or other off-site payment
          flows.
        </p>
      </div>

      <div className="relative mt-8 md:hidden">
        <div className="relative overflow-hidden rounded-[32px] border border-app-border bg-white/72 p-4 shadow-soft backdrop-blur">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-18px] top-[12%] h-28 w-28 rounded-full bg-[#2F7BFF]/7 blur-3xl" />
            <div className="absolute right-[-12px] top-[24%] h-28 w-28 rounded-full bg-[#7C4DFF]/7 blur-3xl" />
            <div className="absolute bottom-[8%] left-[28%] h-28 w-28 rounded-full bg-[#8A2BFF]/6 blur-3xl" />
          </div>

          <div className="relative flex items-center justify-between gap-3">
            <div className="text-xs font-semibold text-app-muted">Flow</div>
            <div className="text-xs text-app-muted">
              <span className="font-semibold text-app-ink">
                {steps[active]?.meta}
              </span>
              <span className="mx-2 text-black/20">•</span>
              <span>Scroll to follow</span>
            </div>
          </div>

          <div className="relative mt-5">
            <FilamentRibbon
              progress={progress}
              reducedMotion={reducedMotion}
              mode="mobile"
            />

            <div className="space-y-4 pl-14">
              {steps.map((s, idx) => {
                const isActive = idx === active;
                const isDone = idx < active;

                return (
                  <div
                    key={s.title}
                    ref={(el) => {
                      stepRefs.current[idx] = el;
                    }}
                    className="relative"
                  >
                    <div className="absolute -left-[40px] top-6">
                      <StepDot active={isActive} done={isDone} />
                    </div>

                    <div
                      className={cx(
                        "transition-transform duration-300 ease-out",
                        isActive ? "will-change-transform" : ""
                      )}
                      style={
                        isActive && !reducedMotion
                          ? { transform: "translateY(-1px) scale(1.01)" }
                          : undefined
                      }
                    >
                      <Card
                        className={cx(
                          "relative overflow-hidden rounded-[28px] border border-app-border bg-white/92 p-5",
                          "transition-all duration-300 ease-out",
                          isActive
                            ? "shadow-[0_14px_40px_rgba(15,23,42,0.08)] ring-1 ring-[#5B6CFF]/14"
                            : "hover:-translate-y-0.5 hover:shadow-soft"
                        )}
                      >
                        <StepGlow active={isActive} />

                        <div className="relative text-xs font-semibold text-app-muted">
                          {s.meta}
                        </div>

                        <div className="relative mt-2 text-[15px] font-semibold tracking-tight text-app-ink">
                          {s.title}
                        </div>

                        <div className="relative mt-2 text-sm leading-relaxed text-app-muted">
                          {s.desc}
                        </div>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pl-14 text-xs text-app-muted">
              Result: a clean line from traffic to verified revenue.
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-9 hidden md:block">
        <div className="grid grid-cols-[280px_minmax(0,1fr)] gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
          <div className="sticky top-24 self-start">
            <DesktopStickyPanel activeMeta={steps[active]?.meta ?? "Step 01"} />
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-app-border bg-white/72 p-5 shadow-soft backdrop-blur lg:p-6">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-[-18px] top-[12%] h-28 w-28 rounded-full bg-[#2F7BFF]/7 blur-3xl" />
              <div className="absolute right-[-12px] top-[24%] h-28 w-28 rounded-full bg-[#7C4DFF]/7 blur-3xl" />
              <div className="absolute bottom-[8%] left-[28%] h-28 w-28 rounded-full bg-[#8A2BFF]/6 blur-3xl" />
            </div>

            <div className="relative flex items-center justify-between gap-3">
              <div className="text-xs font-semibold text-app-muted">Flow</div>
              <div className="text-xs text-app-muted">
                <span className="font-semibold text-app-ink">
                  {steps[active]?.meta}
                </span>
                <span className="mx-2 text-black/20">•</span>
                <span>Scroll to follow</span>
              </div>
            </div>

            <div className="relative mt-5">
              <FilamentRibbon
                progress={progress}
                reducedMotion={reducedMotion}
                mode="desktop"
              />

              <div className="space-y-5 pl-24 lg:pl-28">
                {steps.map((s, idx) => {
                  const isActive = idx === active;
                  const isDone = idx < active;

                  return (
                    <div
                      key={s.title}
                      ref={(el) => {
                        stepRefs.current[idx] = el;
                      }}
                      className="relative max-w-[720px]"
                    >
                      <div className="absolute -left-[58px] top-7 lg:-left-[62px]">
                        <StepDot active={isActive} done={isDone} />
                      </div>

                      <div
                        className={cx(
                          "transition-transform duration-300 ease-out",
                          isActive ? "will-change-transform" : ""
                        )}
                        style={
                          isActive && !reducedMotion
                            ? { transform: "translateY(-1px) scale(1.01)" }
                            : undefined
                        }
                      >
                        <Card
                          className={cx(
                            "relative overflow-hidden rounded-[28px] border border-app-border bg-white/94 p-6",
                            "transition-all duration-300 ease-out",
                            isActive
                              ? "shadow-[0_16px_44px_rgba(15,23,42,0.08)] ring-1 ring-[#5B6CFF]/14"
                              : "hover:-translate-y-0.5 hover:shadow-soft"
                          )}
                        >
                          <StepGlow active={isActive} />

                          <div className="relative text-xs font-semibold text-app-muted">
                            {s.meta}
                          </div>

                          <div className="relative mt-2 text-base font-semibold tracking-tight text-app-ink">
                            {s.title}
                          </div>

                          <div className="relative mt-2 text-sm leading-relaxed text-app-muted">
                            {s.desc}
                          </div>
                        </Card>
                      </div>
                    </div>
                  );
                })}
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