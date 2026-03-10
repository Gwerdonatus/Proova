"use client";

import * as React from "react";
import {
  FiLink2,
  FiActivity,
  FiCheckCircle,
  FiShield,
  FiUsers,
  FiRefreshCcw,
} from "react-icons/fi";
import { Chip, Reveal } from "../tour-ui";
import { THEME } from "../TourTheme";

export function HowItWorks() {
  const steps = [
    {
      k: "01",
      t: "Create tracking links",
      d: "Set sources, campaigns, and influencers — then generate a link per channel.",
      icon: FiLink2,
    },
    {
      k: "02",
      t: "Capture clicks server-side",
      d: "The click is stored before redirect so the proof doesn’t disappear.",
      icon: FiActivity,
    },
    {
      k: "03",
      t: "Confirm revenue",
      d: "Confirm via checkout integrations or reconcile transfers / DMs / agents.",
      icon: FiCheckCircle,
    },
    {
      k: "04",
      t: "Report honestly",
      d: "Attributed vs Unattributed + refunds included — so numbers stay real.",
      icon: FiShield,
    },
  ];

  const highlights = [
    {
      icon: FiUsers,
      title: "Revenue by influencer",
      desc: "Confirmed money — not likes, views, or screenshots.",
    },
    {
      icon: FiShield,
      title: "Attributed vs Unattributed",
      desc: "Weak matches stay unattributed. You stay in control.",
    },
    {
      icon: FiRefreshCcw,
      title: "Refund-aware totals",
      desc: "Totals remain real even when refunds happen.",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr] lg:items-start">
      <Reveal>
        <div className="rounded-[24px] border border-app-border bg-white p-4 shadow-soft sm:p-5 lg:rounded-[32px] lg:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="solid">End-to-end flow</Chip>
            <Chip>Click → Revenue → Reporting</Chip>
          </div>

          <div className="mt-4 text-[22px] font-semibold leading-[1.15] tracking-tight text-app-ink lg:text-lg">
            A simple loop you can explain to your team.
          </div>

          <p className="mt-2 text-[15px] leading-6 text-app-muted lg:text-sm">
            Proova is built to answer one question:{" "}
            <span className="font-semibold text-app-ink">what brought money?</span>
          </p>

          <div className="mt-5 overflow-hidden rounded-[24px] border border-app-border bg-[rgba(255,255,255,0.72)] lg:mt-6 lg:space-y-3 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent">
            {steps.map((s, idx) => (
              <div
                key={s.k}
                className="
                  relative p-4
                  sm:p-5
                  lg:rounded-3xl lg:border lg:border-app-border lg:bg-white/70
                  lg:p-5
                  border-b border-app-border last:border-b-0
                  lg:border-b lg:last:border-b
                "
              >
                <div className="flex items-start gap-3">
                  <div
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-app-border shadow-soft lg:h-10 lg:w-10"
                    style={{ background: THEME.warm }}
                    aria-hidden="true"
                  >
                    <s.icon className="h-[18px] w-[18px] text-app-ink" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold tracking-[0.12em] text-app-muted">
                        {s.k}
                      </span>
                      <div className="text-[15px] font-semibold leading-5 text-app-ink lg:text-sm">
                        {s.t}
                      </div>
                    </div>

                    <div className="mt-1.5 text-[14px] leading-6 text-app-muted lg:mt-1 lg:text-sm">
                      {s.d}
                    </div>
                  </div>
                </div>

                {idx < steps.length - 1 ? (
                  <div className="absolute -bottom-2 left-7 hidden h-4 w-px bg-app-border lg:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="rounded-[24px] border border-app-border bg-white p-4 shadow-soft sm:p-5 lg:sticky lg:top-24 lg:rounded-[32px] lg:p-6">
          <div className="text-[18px] font-semibold leading-tight text-app-ink lg:text-sm">
            In your first 5 minutes
          </div>

          <p className="mt-2 text-[15px] leading-6 text-app-muted lg:text-sm">
            You’ll see the click feed, confirm revenue, and end with a clean view of{" "}
            <span className="font-semibold text-app-ink">Revenue by Influencer</span>.
          </p>

          <div className="mt-5 overflow-hidden rounded-[24px] border border-app-border bg-[rgba(255,255,255,0.72)] lg:mt-5 lg:grid lg:gap-3 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent">
            {highlights.map((item, idx) => (
              <div
                key={item.title}
                className="
                  p-4
                  lg:rounded-3xl lg:border lg:border-app-border lg:bg-white/70
                  lg:p-4
                  border-b border-app-border last:border-b-0
                  lg:border-b lg:last:border-b
                "
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 shrink-0 text-app-ink" />
                  <div className="text-[15px] font-semibold leading-5 text-app-ink lg:text-sm">
                    {item.title}
                  </div>
                </div>
                <div className="mt-1.5 text-[14px] leading-6 text-app-muted lg:mt-1 lg:text-sm">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Chip>Shopify</Chip>
            <Chip>Paystack</Chip>
            <Chip>Stripe</Chip>
          </div>
        </div>
      </Reveal>
    </div>
  );
}