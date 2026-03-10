"use client";

import * as React from "react";
import {
  FiUsers,
  FiCheckCircle,
  FiRefreshCcw,
  FiShield,
  FiActivity,
  FiPlayCircle,
} from "react-icons/fi";
import { Chip, FeaturePill, BrownSurface, DividerLine } from "../tour-ui";
import { THEME } from "../TourTheme";

function getYouTubeEmbedUrl(input: string) {
  const value = input.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) {
    return `https://www.youtube-nocookie.com/embed/${value}?rel=0&modestbranding=1&playsinline=1`;
  }

  if (value.includes("youtu.be/")) {
    const id = value.split("youtu.be/")[1]?.split(/[?&]/)[0];
    if (id) {
      return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;
    }
  }

  if (value.includes("youtube.com/watch")) {
    try {
      const url = new URL(value);
      const id = url.searchParams.get("v");
      if (id) {
        return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;
      }
    } catch {}
  }

  if (value.includes("/embed/")) return value;

  return "";
}

function VideoFrame({
  title,
  youtube,
}: {
  title: string;
  youtube: string;
}) {
  const embedUrl = getYouTubeEmbedUrl(youtube);

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-app-border bg-[#0D0D0D] shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-black/20 to-transparent" />

      <div className="border-b border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <div className="ml-2 truncate text-[11px] font-medium tracking-wide text-white/70">
            Proova walkthrough
          </div>
        </div>
      </div>

      <div className="relative aspect-[16/10] w-full sm:aspect-video">
        {embedUrl ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedUrl}
            title={title}
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-white/70">
            Invalid YouTube link
          </div>
        )}
      </div>
    </div>
  );
}

export function TourHero() {
  const fullDemoYoutube = "https://youtu.be/T738Fx_dlYY?si=plqNev0miYdOgLDH";

  return (
    <section className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start xl:gap-10">
      <div className="order-2 lg:order-1">
        <div className="flex flex-wrap gap-2">
          <Chip tone="solid">Revenue proof</Chip>
          <Chip>Online + off-site payments</Chip>
          <Chip>Refund-aware totals</Chip>
        </div>

        <h1 className="mt-5 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl xl:text-[2.9rem] xl:leading-[1.05]">
          See which influencer actually produced confirmed revenue — not just traffic.
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-app-muted sm:text-base sm:leading-7">
          Proova tracks clicks and confirms real payments across checkout and offline buying flows,
          so you can see what actually produced revenue and keep reporting honest.
        </p>

        <div className="mt-5 rounded-[28px] border border-app-border bg-white/75 p-4 shadow-soft backdrop-blur sm:p-5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-app-muted">
            Start here
          </div>
          <div className="mt-2 text-sm font-semibold text-app-ink sm:text-[15px]">
            Watch the full walkthrough first
          </div>
          <div className="mt-1.5 text-sm leading-6 text-app-muted">
            In a few minutes, you’ll see how links are created, how clicks are captured,
            how offline payments are reconciled, and how revenue appears inside the dashboard.
          </div>
        </div>

        <div className="mt-6 grid gap-3 auto-rows-fr sm:grid-cols-2">
          <FeaturePill
            mark="ON"
            icon={FiCheckCircle}
            title="Online payments"
            desc="Confirm revenue through checkout integrations and tie it back to the click that started it."
          />
          <FeaturePill
            mark="OF"
            icon={FiUsers}
            title="Offline payments"
            desc="Reconcile transfers and DM sales back to intent. Weak matches stay unattributed."
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#videos"
            className="inline-flex items-center gap-2 rounded-full bg-app-ink px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:opacity-90"
          >
            <FiPlayCircle className="h-4 w-4" />
            Watch short clips
          </a>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <div className="rounded-[32px] border border-app-border bg-white/85 p-3 shadow-soft backdrop-blur sm:p-4">
          <div className="mb-3 flex items-start justify-between gap-3 px-1 sm:px-2">
            <div>
              <div className="text-sm font-semibold text-app-ink sm:text-[15px]">
                Full product walkthrough
              </div>
              <div className="mt-1 text-xs leading-5 text-app-muted sm:text-[13px]">
                Best place to understand the full Proova flow end to end.
              </div>
            </div>

            <div className="hidden rounded-full border border-app-border bg-white px-3 py-1 text-[11px] font-semibold text-app-ink shadow-soft sm:inline-flex">
              Main video
            </div>
          </div>

          <VideoFrame title="Proova full walkthrough" youtube={fullDemoYoutube} />
        </div>

        <div className="mt-5">
          <BrownSurface>
            <div className="text-sm font-semibold" style={{ color: THEME.darkText }}>
              What you get today
            </div>
            <p className="mt-2 text-sm leading-6" style={{ color: THEME.darkMuted }}>
              A clean revenue view designed for real-world buying journeys.
            </p>

            <DividerLine />

            <div className="space-y-3">
              {[
                { t: "Revenue by influencer", d: "Know who generated confirmed money.", icon: FiUsers },
                { t: "Refund-aware totals", d: "Refunds are tracked so totals stay accurate.", icon: FiRefreshCcw },
                { t: "Honest attribution", d: "Attributed vs Unattributed — no pretending.", icon: FiShield },
                { t: "Reconciliation-ready", d: "Built for transfers, DMs, and agent flows.", icon: FiActivity },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-3xl border p-4"
                  style={{
                    borderColor: THEME.darkBorder,
                    background: "rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <x.icon className="h-4 w-4" style={{ color: THEME.darkText }} />
                    <div className="text-sm font-semibold" style={{ color: THEME.darkText }}>
                      {x.t}
                    </div>
                  </div>
                  <div className="mt-1 text-sm leading-6" style={{ color: THEME.darkMuted }}>
                    {x.d}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Shopify", "Paystack", "Stripe"].map((x) => (
                <span
                  key={x}
                  className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold"
                  style={{
                    borderColor: THEME.darkBorder,
                    background: "rgba(255,255,255,0.06)",
                    color: THEME.darkText,
                  }}
                >
                  {x}
                </span>
              ))}
            </div>
          </BrownSurface>
        </div>
      </div>
    </section>
  );
}