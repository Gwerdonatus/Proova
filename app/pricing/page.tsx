"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

// ─── NOTE: Update NIGERIA_PRICE to match the value in your waitlist page ──────
// e.g. if your waitlist uses "₦149,000" then set that here.
const REGIONS = [
  {
    id: "nigeria",
    label: "Nigeria",
    flag: "🇳🇬",
    founderPrice: "₦149,000",
    afterPrice: "₦299,000",
    currency: "NGN",
    savings: "₦150,000",
    savingsNote: "Save ₦150,000/year vs standard pricing",
    afterLabel: "₦299,000/yr after launch",
  },
  {
    id: "africa",
    label: "Rest of Africa",
    flag: "🌍",
    founderPrice: "$99",
    afterPrice: "$199",
    currency: "USD",
    savings: "$100",
    savingsNote: "Save $100/year vs standard pricing",
    afterLabel: "$199/yr after launch",
  },
  {
    id: "global",
    label: "Global",
    flag: "🌐",
    founderPrice: "$149",
    afterPrice: "$299",
    currency: "USD",
    savings: "$150",
    savingsNote: "Save $150/year vs standard pricing",
    afterLabel: "$299/yr after launch",
  },
] as const;

type RegionId = (typeof REGIONS)[number]["id"];

const FEATURES = [
  { icon: "🚀", label: "Early access when we launch" },
  { icon: "🤝", label: "Assisted onboarding — store, tracking & reconciliation" },
  { icon: "🔒", label: "Your Founder rate, locked in forever" },
  { icon: "✨", label: "All future features, included" },
];

const FAQS = [
  {
    q: "What happens to my price when new features launch?",
    a: "Nothing. Your Founder rate is locked for the lifetime of your subscription. Every feature Proova ships — attribution models, channel connectors, reporting — is included at no extra charge.",
  },
  {
    q: "Can I upgrade to a higher tier later?",
    a: "Yes, you can always upgrade your plan. However, you cannot retroactively lock a lower regional rate — the Founder price you claim is the one that stays locked.",
  },
  {
    q: "Is there a free plan?",
    a: "Not currently. You can join the free waitlist for an invite when beta opens. Founder Spot holders get priority access and skip the queue.",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="7.5" fill="#6B3FD4" fillOpacity="0.12" />
      <path
        d="M4.5 7.5L6.5 9.5L10.5 5.5"
        stroke="#6B3FD4"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cx("transition-transform duration-200", open ? "rotate-180" : "")}
    >
      <path
        d="M3 6L8 11L13 6"
        stroke="#6E6E73"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b border-[#E5E5EA] last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-[14px] sm:text-[15px] font-medium text-[#1D1D1F]">{q}</span>
        <span className="shrink-0">
          <ChevronIcon open={open} />
        </span>
      </button>
      {open && (
        <div className="pb-4 text-[14px] leading-[1.75] text-[#6E6E73]">{a}</div>
      )}
    </div>
  );
}

export default function PricingPage() {
  const [selected, setSelected] = React.useState<RegionId | null>(null);
  const region = REGIONS.find((r) => r.id === selected) ?? null;

  return (
    <main className="min-h-screen bg-white font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Segoe_UI',sans-serif] text-[#1D1D1F]">

      {/* ── TOP NAV ── */}
      <header className="sticky top-0 z-40 border-b border-[#E5E5EA] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center overflow-hidden rounded-[10px] border border-[#E5E5EA] bg-white shadow-sm">
              <Image
                src="/proova.png"
                alt="Proova"
                width={32}
                height={32}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <span className="text-[15px] font-semibold text-[#1D1D1F]">Proova</span>
          </Link>

          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 rounded-full bg-[#6B3FD4] px-4 py-2 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-[#5B32B8] hover:shadow-[0_8px_20px_rgba(107,63,212,0.22)]"
          >
            Claim Founder Spot
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 pb-20">

        {/* ════ HERO ════ */}
        <div className="pt-14 sm:pt-20 pb-10 sm:pb-14 text-center">
          {/* Pre-badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6B3FD4]/20 bg-[#F3E8FF] px-3.5 py-1.5 text-[12px] font-semibold text-[#6B3FD4] mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6B3FD4] animate-pulse" />
            Pre-launch · Limited Founder Spots
          </div>

          <h1 className="text-[36px] sm:text-[52px] lg:text-[58px] font-semibold tracking-tight leading-[1.05] text-[#1D1D1F]">
            Founder Pricing.<br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #6B3FD4 0%, #2B6DE8 55%, #5BB8F5 100%)",
              }}
            >
              Locked in forever.
            </span>
          </h1>

          <p className="mt-5 mx-auto max-w-xl text-[16px] sm:text-[18px] leading-[1.65] text-[#6E6E73]">
            One-time decision. Pay your market rate, keep it forever
            while you stay subscribed.
          </p>
        </div>

        {/* ════ REGION SELECTOR ════ */}
        <div className="max-w-lg mx-auto mb-8 sm:mb-10">
          <p className="text-[13px] font-semibold uppercase tracking-widest text-[#6E6E73] text-center mb-4">
            Where does your business operate?
          </p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7] p-2">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                className={cx(
                  "flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 sm:py-3.5 text-center transition-all duration-200",
                  selected === r.id
                    ? "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.10)] border border-[#6B3FD4]/15"
                    : "hover:bg-white/60"
                )}
              >
                <span className="text-[22px] sm:text-[26px]">{r.flag}</span>
                <span
                  className={cx(
                    "text-[12px] sm:text-[13px] font-medium leading-tight",
                    selected === r.id ? "text-[#6B3FD4]" : "text-[#3D3D3F]"
                  )}
                >
                  {r.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ════ PRICING CARD ════ */}
        {!region && (
          <div className="max-w-lg mx-auto rounded-3xl border-2 border-dashed border-[#E5E5EA] bg-[#FAFAFA] p-10 sm:p-12 text-center">
            <div className="text-[36px] mb-3">☝️</div>
            <p className="text-[15px] text-[#6E6E73] font-medium">
              Select your region above to see your Founder pricing
            </p>
          </div>
        )}

        {region && (
          <div
            className="max-w-lg mx-auto rounded-3xl border border-[#6B3FD4]/20 bg-white p-6 sm:p-8 shadow-[0_8px_40px_rgba(107,63,212,0.10),0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-300 animate-[fadeSlideUp_0.25s_ease_forwards]"
            style={{
              // Subtle gradient top border effect
              background:
                "linear-gradient(white, white) padding-box, linear-gradient(135deg, #6B3FD4 0%, #2B6DE8 60%, #5BB8F5 100%) border-box",
              border: "1.5px solid transparent",
            }}
          >
            {/* Region label */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="text-[22px]">{region.flag}</span>
                <div>
                  <div className="text-[12px] font-semibold uppercase tracking-widest text-[#6E6E73]">
                    {region.label}
                  </div>
                  <div className="text-[12px] text-[#6E6E73]">Founder Spot</div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3E8FF] px-3 py-1.5 text-[11px] font-semibold text-[#6B3FD4]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6B3FD4]" />
                Limited spots
              </span>
            </div>

            {/* Price */}
            <div className="mb-2">
              <div className="flex items-end gap-3">
                <span
                  className="text-[52px] sm:text-[60px] font-bold tracking-tight leading-none bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #6B3FD4 0%, #2B6DE8 100%)",
                  }}
                >
                  {region.founderPrice}
                </span>
                <span className="text-[16px] text-[#6E6E73] mb-2 font-medium">/year</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[14px] text-[#9E9E9E] line-through">
                  {region.afterLabel}
                </span>
                <span className="inline-flex items-center rounded-full bg-[#FFF7E6] px-2.5 py-0.5 text-[12px] font-semibold text-[#E8451C]">
                  {region.savingsNote}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-[#F0F0F5]" />

            {/* Features */}
            <div className="mb-7 space-y-3.5">
              {FEATURES.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <span className="shrink-0">
                    <CheckIcon />
                  </span>
                  <span className="text-[14px] sm:text-[15px] text-[#3D3D3F]">
                    {f.icon} {f.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/waitlist"
              className="group flex w-full items-center justify-center gap-2.5 rounded-2xl py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_12px_30px_rgba(107,63,212,0.25)]"
              style={{
                background:
                  "linear-gradient(135deg, #6B3FD4 0%, #2B6DE8 100%)",
              }}
            >
              Claim your Founder Spot
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}

        {/* ── Pricing note ── */}
        <p className="mt-5 text-center text-[13px] text-[#9E9E9E] leading-[1.7]">
          Pricing is region-matched to local market conditions.{" "}
          <span className="text-[#6E6E73]">All tiers include identical features and support.</span>
        </p>

        {/* ════ FAQ ════ */}
        <div className="mt-16 sm:mt-20 max-w-2xl mx-auto">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-[#1D1D1F] mb-1 text-center">
            Common questions
          </h2>
          <p className="text-[14px] text-[#6E6E73] text-center mb-8">
            Everything you need to know about Founder pricing.
          </p>
          <div className="rounded-2xl border border-[#E5E5EA] bg-white px-5 sm:px-7 divide-y-0">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-8 rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7] p-5 sm:p-6 text-center">
            <p className="text-[14px] text-[#6E6E73] mb-3">
              Still have questions? We're happy to help.
            </p>
            <a
              href="mailto:hello@proova.app"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6B3FD4] hover:underline"
            >
              hello@proova.app
            </a>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}