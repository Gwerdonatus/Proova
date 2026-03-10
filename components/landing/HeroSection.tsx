"use client";

import * as React from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/78 px-3 py-3 backdrop-blur">
      <div className="text-[15px] font-semibold tracking-tight text-gray-900">
        {value}
      </div>
      <div className="mt-1 text-[11px] leading-tight text-gray-500">{label}</div>
    </div>
  );
}

function ProofChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-gray-800 shadow-[0_1px_0_rgba(0,0,0,0.03)] backdrop-blur">
      {children}
    </span>
  );
}

export function HeroSection({
  onJoinWaitlist,
  onWatchDemo,
  onViewPricing,
}: {
  onJoinWaitlist: () => void;
  onWatchDemo: () => void;
  onViewPricing: () => void;
}) {
  return (
    <section className="relative z-10 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="py-7 sm:py-14 lg:py-16">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
            {/* LEFT */}
            <div className="max-w-[720px]">
              {/* Top badge */}
              <div className="inline-flex items-center rounded-full border border-black/10 bg-white/80 px-4 py-1.5 text-[11px] font-medium text-gray-700 shadow-soft backdrop-blur sm:text-xs">
                Track ads + influencers → confirm real revenue
              </div>

              {/* ================= MOBILE HERO ================= */}
              <div className="mt-4 sm:hidden">
                <div className="relative overflow-hidden rounded-[30px] border border-black/10 bg-white/78 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                  {/* soft ambient color wash */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-10 top-0 h-28 w-28 rounded-full bg-[#FF2D2D]/10 blur-2xl" />
                    <div className="absolute right-[-8px] top-8 h-24 w-24 rounded-full bg-[#2F7BFF]/10 blur-2xl" />
                    <div className="absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-[#8A2BFF]/10 blur-2xl" />
                  </div>

                  <div className="relative">
                    {/* eyebrow */}
                    <div className="inline-flex items-center rounded-full border border-[#8A2BFF]/15 bg-[#8A2BFF]/6 px-3 py-1 text-[11px] font-semibold text-gray-700">
                      Revenue proof for modern commerce
                    </div>

                    {/* headline */}
                    <h1 className="mt-3 text-[31px] font-semibold leading-[1.03] tracking-[-0.03em] text-gray-900">
                      Know what actually
                      <span className="block bg-gradient-to-r from-[#111827] via-[#2F7BFF] to-[#8A2BFF] bg-clip-text text-transparent">
                        made you money
                      </span>
                    </h1>

                    {/* copy */}
                    <p className="mt-3 max-w-[32ch] text-[14px] leading-relaxed text-gray-600">
                      Proova tracks the click, keeps the reference, and helps you
                      reconcile real payments — even when the sale moves into
                      WhatsApp or bank transfer.
                    </p>

                    {/* mini stats */}
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <MiniStat label="Track clicks" value="Source" />
                      <MiniStat label="Group campaigns" value="Campaign" />
                      <MiniStat label="Measure sellers" value="Influencer" />
                    </div>

                    {/* feature chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <ProofChip>Server-side capture</ProofChip>
                      <ProofChip>Pending → Confirmed</ProofChip>
                      <ProofChip>CSV reconciliation</ProofChip>
                    </div>

                    {/* CTA row */}
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={onWatchDemo}
                        className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-4 py-3 text-[13px] font-semibold text-white transition hover:opacity-95 active:scale-[0.99]"
                      >
                        Watch demo
                      </button>

                      <button
                        type="button"
                        onClick={onViewPricing}
                        className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/85 px-4 py-3 text-[13px] font-semibold text-gray-900 transition hover:bg-white active:scale-[0.99]"
                      >
                        View pricing
                      </button>
                    </div>

                    {/* bottom trust row */}
                    <div className="mt-4 flex items-center justify-between rounded-2xl border border-black/8 bg-white/70 px-3 py-3">
                      <div>
                        <div className="text-[12px] font-semibold text-gray-900">
                          Online + offline attribution
                        </div>
                        <div className="mt-0.5 text-[11px] text-gray-500">
                          Built for payments that do not finish on-site
                        </div>
                      </div>
                      <div className="ml-3 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                        Revenue proof
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= DESKTOP / TABLET ================= */}
              <div className="hidden sm:block">
                <h1 className="mt-4 text-balance text-[32px] font-semibold leading-[1.08] tracking-tight text-gray-900 sm:text-[40px] md:text-[48px] lg:text-[52px]">
                  Know exactly where your revenue came from — even when the sale
                  happens offline.
                </h1>

                <p className="mt-4 max-w-[640px] text-pretty text-[15px] leading-relaxed text-gray-600 sm:text-[16px]">
                  Proova tracks clicks from ads and influencers, then reconciles
                  real payments (online + bank/CSV). See what actually made money
                  across{" "}
                  <span className="font-medium text-gray-900">
                    USD, EUR, GBP, NGN, ZAR, and KES.
                  </span>
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <ProofChip>Server-side click capture</ProofChip>
                  <ProofChip>Revenue proof (pending → confirmed)</ProofChip>
                  <ProofChip>Transfer reconciliation via CSV</ProofChip>
                </div>
              </div>
            </div>

            {/* RIGHT: space for ribbons on desktop */}
            <div className="hidden md:block">
              <div className="h-[260px] lg:h-[360px] xl:h-[420px]" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="pb-6 sm:pb-7">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </section>
  );
}