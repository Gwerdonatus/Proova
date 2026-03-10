"use client";

import * as React from "react";
import { FiLink2, FiActivity, FiCheckCircle, FiShield, FiUsers, FiRefreshCcw } from "react-icons/fi";
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

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr] lg:items-start">
      <Reveal>
        <div className="rounded-[32px] border border-app-border bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="solid">End-to-end flow</Chip>
            <Chip>Click → Revenue → Reporting</Chip>
          </div>

          <div className="mt-4 text-lg font-semibold tracking-tight text-app-ink">
            A simple loop you can explain to your team.
          </div>
          <p className="mt-2 text-sm leading-6 text-app-muted">
            Proova is built to answer one question:{" "}
            <span className="font-semibold text-app-ink">what brought money?</span>
          </p>

          <div className="mt-6 space-y-3">
            {steps.map((s, idx) => (
              <div key={s.k} className="relative rounded-3xl border border-app-border bg-white/70 p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-2xl border border-app-border shadow-soft"
                    style={{ background: THEME.warm }}
                    aria-hidden="true"
                  >
                    <s.icon className="h-[18px] w-[18px] text-app-ink" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-app-muted">{s.k}</span>
                      <div className="text-sm font-semibold text-app-ink">{s.t}</div>
                    </div>
                    <div className="mt-1 text-sm leading-6 text-app-muted">{s.d}</div>
                  </div>
                </div>

                {idx < steps.length - 1 ? (
                  <div className="hidden lg:block absolute -bottom-2 left-7 h-4 w-px bg-app-border" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="rounded-[32px] border border-app-border bg-white p-6 shadow-soft lg:sticky lg:top-24">
          <div className="text-sm font-semibold text-app-ink">In your first 5 minutes</div>
          <p className="mt-2 text-sm leading-6 text-app-muted">
            You’ll see the click feed, confirm revenue, and end with a clean view of{" "}
            <span className="font-semibold text-app-ink">Revenue by Influencer</span>.
          </p>

          <div className="mt-5 grid gap-3">
            <div className="rounded-3xl border border-app-border bg-white/70 p-4">
              <div className="flex items-center gap-2">
                <FiUsers className="h-4 w-4 text-app-ink" />
                <div className="text-sm font-semibold text-app-ink">Revenue by influencer</div>
              </div>
              <div className="mt-1 text-sm leading-6 text-app-muted">Confirmed money — not likes, views, or screenshots.</div>
            </div>

            <div className="rounded-3xl border border-app-border bg-white/70 p-4">
              <div className="flex items-center gap-2">
                <FiShield className="h-4 w-4 text-app-ink" />
                <div className="text-sm font-semibold text-app-ink">Attributed vs Unattributed</div>
              </div>
              <div className="mt-1 text-sm leading-6 text-app-muted">Weak matches stay unattributed. You stay in control.</div>
            </div>

            <div className="rounded-3xl border border-app-border bg-white/70 p-4">
              <div className="flex items-center gap-2">
                <FiRefreshCcw className="h-4 w-4 text-app-ink" />
                <div className="text-sm font-semibold text-app-ink">Refund-aware totals</div>
              </div>
              <div className="mt-1 text-sm leading-6 text-app-muted">Totals remain real even when refunds happen.</div>
            </div>
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