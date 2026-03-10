"use client";

import * as React from "react";
import { FiCheckCircle, FiClock, FiUsers } from "react-icons/fi";
import { Reveal, BrownSurface, DividerLine, Chip } from "../tour-ui";

export function IntegrationsAndStatus() {
  const live = [
    "Shopify integration (orders + checkout metadata)",
    "Stripe integration (payments + refunds)",
    "Paystack integration",
    "Server-side click capture before redirect",
    "Influencer tracking links + reference codes",
    "Event feed (click proof)",
    "Attributed vs Unattributed (no fake conversions)",
    "Bank import (CSV / statements) for reconciliation",
    "Refund-aware totals (net stays real)",
    "Manual resolution for unattributed payments",
  ];

  const includedAtLaunch = [
    "Bank linking (Open Banking / Plaid / Africa providers)",
    "Chargebacks (tracked separately from refunds)",
    "Attribution window controls (7/14/30/custom)",
    "Multi-touch attribution (first/last/linear options)",
    "Cross-device improvements (deterministic matching options)",
    "Status page + uptime monitoring",
  ];

  const later = [
    "Influencer analytics (ROI, conversion rate, refund rate, rankings)",
    "Paid ads attribution (UTMs + cost import + ROAS)",
    "Team roles & permissions",
    "Multi-store / multi-brand workspaces",
    "Forecasting + smart insights",
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-3 items-stretch">
      <Reveal>
        <div className="rounded-[32px] border border-app-border bg-white p-6 shadow-soft h-full">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="h-4 w-4 text-app-ink" />
            <div className="text-sm font-semibold text-app-ink">Live today</div>
          </div>

          <p className="mt-2 text-sm leading-6 text-app-muted">
            The revenue-proof loop is live — designed for online + off-site flows.
          </p>

          <div className="mt-5 space-y-2 text-sm text-app-muted">
            {live.map((x) => (
              <div key={x} className="flex items-start gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-app-border" />
                {x}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <BrownSurface className="h-full">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <FiClock className="h-4 w-4" style={{ color: "rgba(255,255,255,0.92)" }} />
              <div className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.92)" }}>
                Included at launch
              </div>
            </div>
            <Chip tone="solid">Waitlist builds this</Chip>
          </div>

          <p className="mt-2 text-sm leading-6" style={{ color: "rgba(255,255,255,0.78)" }}>
            These ship before we go live — the features serious merchants expect.
          </p>

          <DividerLine />

          <div className="space-y-2">
            {includedAtLaunch.map((x) => (
              <div key={x} className="flex items-start gap-2">
                <FiClock className="mt-[2px] h-4 w-4" style={{ color: "rgba(255,255,255,0.78)" }} />
                <div className="text-sm leading-6" style={{ color: "rgba(255,255,255,0.78)" }}>
                  {x}
                </div>
              </div>
            ))}
          </div>
        </BrownSurface>
      </Reveal>

      <Reveal delay={240}>
        <div className="rounded-[32px] border border-app-border bg-white p-6 shadow-soft h-full">
          <div className="flex items-center gap-2">
            <FiUsers className="h-4 w-4 text-app-ink" />
            <div className="text-sm font-semibold text-app-ink">Later roadmap</div>
          </div>

          <p className="mt-2 text-sm leading-6 text-app-muted">
            Nice-to-haves that expand reporting and scale teams.
          </p>

          <div className="mt-5 space-y-2 text-sm text-app-muted">
            {later.map((x) => (
              <div key={x} className="flex items-start gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-app-border" />
                {x}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}