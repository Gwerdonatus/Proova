"use client";

import * as React from "react";
import Image from "next/image";
import { Card } from "@/components/ui";
import { FiImage } from "react-icons/fi";
import { PremiumShotFrame } from "../tour-ui";

export function ScreenshotSection() {
  const shots = [
    {
      n: "1",
      t: "Dashboard (overview)",
      d: "Proof-based totals plus the top sources and influencers driving revenue.",
      src: "/Tor/dashboard0.jpeg",
      bullets: [
        "Totals show Confirmed, Refunded, Net (real money), and Unattributed.",
        "The leaders section highlights top influencers + top sources bringing revenue.",
        "Month + currency controls keep reporting clean and comparable.",
      ],
    },
    {
      n: "2",
      t: "Event feed (click proof)",
      d: "Every tracked click is stored with time and ref — the core proof layer for reconciliation.",
      src: "/Tor/event.jpeg",
      bullets: [
        "This is the foundation: tracked clicks by influencer, campaign, source, and ref.",
        "Clicks are saved server-side before redirect so the proof doesn’t disappear.",
        "These events are what you reconcile revenue against later.",
      ],
    },
    {
      n: "3",
      t: "Revenue proof",
      d: "Attributed payments matched to tracked clicks — plus refund reconciliation when needed.",
      src: "/Tor/revenue.jpeg",
      bullets: [
        "Default view shows Attributed revenue (matched to a tracked click).",
        "Toggle to Unattributed and search by ref/sender/narration to resolve unclear payments.",
        "Refund button reconciles totals so the dashboard stays honest.",
      ],
    },
    {
      n: "4",
      t: "Setup (Sources + Campaigns)",
      d: "Organize tracking before links — sources are channels, campaigns are experiments.",
      src: "/Tor/campaign.jpeg",
      bullets: [
        "Sources = where traffic comes from (IG, TikTok, WhatsApp, etc.) + Type (Ads/Organic/Inbound).",
        "Campaigns group links + revenue under a specific marketing push.",
        "This structure keeps everything organized as volume grows.",
      ],
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FiImage className="h-4 w-4 text-app-ink" />
            <h2 className="text-2xl font-semibold tracking-tight text-app-ink md:text-3xl">Screenshots</h2>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-app-muted md:text-base">
            A quick visual walk-through of the workflow: setup → clicks → revenue proof → reporting.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {shots.map((x, idx) => (
          <Card key={x.t} className="rounded-3xl border border-app-border bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-app-ink">{x.t}</div>
                <div className="mt-1 text-sm leading-6 text-app-muted">{x.d}</div>
              </div>

              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-app-border bg-white">
                <span className="text-xs font-bold text-app-ink">{x.n}</span>
              </div>
            </div>

            <div className="mt-4">
              <PremiumShotFrame>
                <div className="overflow-hidden rounded-[22px] border border-app-border bg-black/5">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={x.src}
                      alt={`Proova screenshot ${idx + 1}`}
                      fill
                      sizes="(min-width: 1024px) 520px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="mt-3 rounded-2xl border border-app-border bg-white/70 p-4">
                  <div className="text-xs font-semibold text-app-muted">What you’re seeing</div>
                  <ul className="mt-2 space-y-1 text-sm leading-6 text-app-muted">
                    {x.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-app-border" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </PremiumShotFrame>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}