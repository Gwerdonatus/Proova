"use client";

import * as React from "react";
import { Card } from "@/components/ui";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
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

function useInView<T extends Element>(opts?: IntersectionObserverInit) {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: "0px 0px -35% 0px", ...(opts || {}) }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [opts]);

  return { ref, inView };
}

/** Brand colors (from your logo) */
const BRAND = {
  purple: "#9328D1",
  blue: "#1F43DE",
  pink: "#F53040",
  gold: "#FECB12",
};

function Dot({
  active,
  tone,
}: {
  active?: boolean;
  tone: "purple" | "blue" | "pink" | "gold";
}) {
  const bg =
    tone === "purple"
      ? BRAND.purple
      : tone === "blue"
      ? BRAND.blue
      : tone === "pink"
      ? BRAND.pink
      : BRAND.gold;

  return (
    <span
      className={cx(
        "inline-flex h-2.5 w-2.5 rounded-full transition",
        active ? "opacity-100" : "opacity-35"
      )}
      style={{
        background: bg,
        boxShadow: active ? "0 0 0 6px rgba(0,0,0,0.06)" : "none",
      }}
    />
  );
}

function StepPill({
  idx,
  title,
  desc,
  active,
  tone,
}: {
  idx: string;
  title: string;
  desc: string;
  active: boolean;
  tone: "purple" | "blue" | "pink" | "gold";
}) {
  const tint =
    tone === "purple"
      ? "rgba(147,40,209,.10)"
      : tone === "blue"
      ? "rgba(31,67,222,.10)"
      : tone === "pink"
      ? "rgba(245,48,64,.10)"
      : "rgba(254,203,18,.14)";

  return (
    <div
      className={cx(
        "rounded-3xl border border-black/10 bg-white p-4 shadow-soft transition-all duration-500",
        active ? "opacity-100 translate-y-0 ring-2 ring-black/10" : "opacity-80 translate-y-[2px]"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-black/10 text-xs font-bold text-app-ink shadow-soft"
          style={{ background: tint }}
        >
          {idx}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold text-app-ink">{title}</div>
            <Dot active={active} tone={tone} />
          </div>
          <div className="mt-1 text-sm text-app-muted">{desc}</div>
        </div>
      </div>
    </div>
  );
}

/** ✅ No glow, no drift, no shine. Progress reveal only. */
function FlowLine({ progress }: { progress: number }) {
  const p = Math.max(0, Math.min(1, progress));
  const uid = React.useId();
  const clipId = `clip-${uid}`;
  const gradId = `g-${uid}`;

  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-black/5">
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width={100 * p} height="10" />
          </clipPath>

          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={BRAND.purple} stopOpacity="0.9" />
            <stop offset="0.36" stopColor={BRAND.blue} stopOpacity="0.9" />
            <stop offset="0.68" stopColor={BRAND.pink} stopOpacity="0.9" />
            <stop offset="1" stopColor={BRAND.gold} stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* base */}
        <path
          d="M0 5 C 14 1, 32 9, 50 5 S 82 9, 100 5"
          fill="none"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="1.35"
          strokeLinecap="round"
        />

        {/* revealed */}
        <g clipPath={`url(#${clipId})`}>
          <path
            d="M0 5 C 14 1, 32 9, 50 5 S 82 9, 100 5"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="1.65"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

function ChannelChips() {
  const chips = ["Instagram DMs", "TikTok", "WhatsApp", "Phone calls", "Agents", "Telegram", "In-person"];
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <span
          key={c}
          className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-semibold text-app-muted shadow-soft"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

/**
 * ✅ Scroll-activated flow:
 * - each step becomes active only as you scroll down
 * - progress line fills based on active step
 * - no looping, no distracting shine
 */
export function OffsiteAttributionSection() {
  const reducedMotion = usePrefersReducedMotion();

  const steps = React.useMemo(
    () => [
      {
        idx: "01",
        tone: "purple" as const,
        title: "Click is captured (server-side)",
        desc: "A tracked link click is saved before redirect — so the source/campaign/influencer is never lost.",
      },
      {
        idx: "02",
        tone: "blue" as const,
        title: "Conversation moves off-site",
        desc: "The buyer goes to DMs, calls, agents, or chat. You share details, negotiate, confirm intent.",
      },
      {
        idx: "03",
        tone: "pink" as const,
        title: "Payment happens later (transfer/offline)",
        desc: "Money lands outside checkout. Proova keeps the trail so it can be reconciled back to the click.",
      },
      {
        idx: "04",
        tone: "gold" as const,
        title: "Revenue proof + clean reporting",
        desc: "Confirm the sale with evidence, handle refunds, and see revenue by influencer/campaign/source.",
      },
    ],
    []
  );

  // One in-view sensor per step
  const s1 = useInView<HTMLDivElement>({ threshold: 0.35, rootMargin: "0px 0px -40% 0px" });
  const s2 = useInView<HTMLDivElement>({ threshold: 0.35, rootMargin: "0px 0px -40% 0px" });
  const s3 = useInView<HTMLDivElement>({ threshold: 0.35, rootMargin: "0px 0px -40% 0px" });
  const s4 = useInView<HTMLDivElement>({ threshold: 0.35, rootMargin: "0px 0px -40% 0px" });

  const seen = [s1.inView, s2.inView, s3.inView, s4.inView];

  // Determine active step based on scroll position:
  // pick the LAST step that is in view; fallback to first.
  const active = React.useMemo(() => {
    if (reducedMotion) return 3;
    for (let i = seen.length - 1; i >= 0; i--) {
      if (seen[i]) return i;
    }
    return 0;
  }, [seen[0], seen[1], seen[2], seen[3], reducedMotion]);

  const progress = steps.length <= 1 ? 1 : active / (steps.length - 1);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        {/* Left: Story + copy */}
        <div>
          <div className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-app-muted shadow-soft">
            Off-site attribution • the hard part most tools miss
          </div>

          <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-app-ink sm:text-3xl">
            When customers leave your site to pay elsewhere, Proova still shows where revenue came from.
          </h2>

          <p className="mt-3 max-w-xl text-sm text-app-muted sm:text-base">
            This isn’t “WhatsApp tracking.” It works for any off-site flow — Instagram DMs, TikTok, calls, agents,
            Telegram, in-person — anywhere you have to share account details and payment happens later.
          </p>

          <div className="mt-5">
            <ChannelChips />
          </div>

          <div className="mt-6 rounded-[28px] border border-black/10 bg-white/70 p-5 shadow-soft backdrop-blur">
            <div className="text-xs font-semibold text-app-muted">What makes it different</div>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-black/10 bg-white p-4">
                <div className="text-sm font-semibold text-app-ink">We track money, not noise</div>
                <div className="mt-1 text-sm text-app-muted">
                  You’ll see which influencer/campaign actually produced paid revenue — not just clicks.
                </div>
              </div>
              <div className="rounded-3xl border border-black/10 bg-white p-4">
                <div className="text-sm font-semibold text-app-ink">We stay honest</div>
                <div className="mt-1 text-sm text-app-muted">
                  Weak evidence stays unattributed. Refunds are recorded so totals stay real.
                </div>
              </div>
            </div>
          </div>

          {/* Scroll markers (mobile-friendly) */}
          <div className="mt-6 space-y-6 lg:hidden">
            <div ref={s1.ref} />
            <div ref={s2.ref} />
            <div ref={s3.ref} />
            <div ref={s4.ref} />
          </div>
        </div>

        {/* Right: Sticky scroll-activated flow */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-[32px] border border-black/10 bg-white p-5 shadow-soft sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-app-ink">How off-site attribution works</div>
                <div className="mt-1 text-xs text-app-muted">Scroll to advance the steps.</div>
              </div>

              <div className="hidden sm:flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-app-ink shadow-soft">
                Step {steps[active].idx}
                <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
              </div>
            </div>

            <div className="mt-4">
              <FlowLine progress={progress} />
              <div className="mt-2 flex items-center justify-between text-[11px] text-app-muted">
                <span>Capture</span>
                <span>Off-site</span>
                <span>Confirm</span>
              </div>
            </div>

            {/* Desktop scroll anchors live here */}
            <div className="mt-5 space-y-3">
              <div ref={s1.ref}>
                <StepPill {...steps[0]} active={active === 0 || reducedMotion} />
              </div>
              <div ref={s2.ref}>
                <StepPill {...steps[1]} active={active === 1 || reducedMotion} />
              </div>
              <div ref={s3.ref}>
                <StepPill {...steps[2]} active={active === 2 || reducedMotion} />
              </div>
              <div ref={s4.ref}>
                <StepPill {...steps[3]} active={active === 3 || reducedMotion} />
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-black/10 bg-white/70 p-4">
              <div className="text-xs font-semibold text-app-muted">Output</div>
              <div className="mt-1 text-sm font-semibold text-app-ink">Revenue by influencer • campaign • channel</div>
              <div className="mt-1 text-sm text-app-muted">With refunds included — so month-end totals are accurate.</div>
            </div>

            <div className="mt-4 grid gap-2">
              <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm">
                <span className="text-app-muted">Proof trail</span>
                <span className="font-semibold text-app-ink">Click → Payment → Confirmed</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm">
                <span className="text-app-muted">Honesty</span>
                <span className="font-semibold text-app-ink">Attributed vs Unattributed</span>
              </div>
            </div>
          </div>

          <div
            className="mt-4 rounded-[32px] border border-black/10 p-[1px] shadow-soft"
            style={{
              background:
                "linear-gradient(90deg, rgba(147,40,209,0.14), rgba(31,67,222,0.10), rgba(245,48,64,0.10), rgba(254,203,18,0.14))",
            }}
          >
            <div className="rounded-[31px] bg-white p-5">
              <div className="text-sm font-semibold text-app-ink">Works with online too</div>
              <div className="mt-1 text-sm text-app-muted">
                Shopify/Stripe/Paystack checkouts are attributed to the click that led to payment — so you get one clean
                revenue report across online + off-site.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}