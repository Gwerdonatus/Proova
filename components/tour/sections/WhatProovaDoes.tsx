"use client";

import * as React from "react";
import { Chip, Reveal } from "../tour-ui";

export function WhatProovaDoes() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Reveal>
        <div className="rounded-[32px] border border-app-border bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="solid">Online</Chip>
            <Chip>Shopify • Stripe • Paystack</Chip>
          </div>

          <div className="mt-4 text-lg font-semibold tracking-tight text-app-ink">
            When payment happens on checkout…
          </div>
          <p className="mt-2 text-sm leading-6 text-app-muted">
            Proova connects checkout revenue to the original click so you can see{" "}
            <span className="font-semibold text-app-ink">confirmed revenue</span> by source, campaign, and influencer.
          </p>

          <div className="mt-5 grid gap-3">
            <div className="rounded-2xl border border-app-border bg-white/70 p-4">
              <div className="text-xs font-semibold text-app-muted">Outcome</div>
              <div className="mt-1 text-sm font-semibold text-app-ink">Revenue attribution you can trust</div>
              <div className="mt-1 text-sm leading-6 text-app-muted">
                Not just traffic — proof that money happened and where it came from.
              </div>
            </div>

            <div className="rounded-2xl border border-app-border bg-white/70 p-4">
              <div className="text-xs font-semibold text-app-muted">Decision</div>
              <div className="mt-1 text-sm font-semibold text-app-ink">Spend with confidence</div>
              <div className="mt-1 text-sm leading-6 text-app-muted">
                Double down on what brings revenue. Cut what doesn’t.
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="rounded-[32px] border border-app-border bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="solid">Off-site</Chip>
            <Chip>DMs • Calls • Transfers • Agents</Chip>
          </div>

          <div className="mt-4 text-lg font-semibold tracking-tight text-app-ink">
            When payment happens later off-site…
          </div>
          <p className="mt-2 text-sm leading-6 text-app-muted">
            If buyers leave your site to chat and pay later, Proova helps reconcile payments back to tracked intent —
            and keeps anything unclear as{" "}
            <span className="font-semibold text-app-ink">Unattributed</span>.
          </p>

          <div className="mt-5 grid gap-3">
            <div className="rounded-2xl border border-app-border bg-white/70 p-4">
              <div className="text-xs font-semibold text-app-muted">Outcome</div>
              <div className="mt-1 text-sm font-semibold text-app-ink">Reconciliation + revenue proof</div>
              <div className="mt-1 text-sm leading-6 text-app-muted">
                Match payments back to intent. Weak matches stay unattributed.
              </div>
            </div>

            <div className="rounded-2xl border border-app-border bg-white/70 p-4">
              <div className="text-xs font-semibold text-app-muted">Accuracy</div>
              <div className="mt-1 text-sm font-semibold text-app-ink">Refund-aware totals</div>
              <div className="mt-1 text-sm leading-6 text-app-muted">
                Refunds are tracked so month totals remain real.
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}