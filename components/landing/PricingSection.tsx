"use client";

import * as React from "react";
import { Button, Card } from "@/components/ui";
import type { Region } from "@/lib/types";

type Currency = "NGN" | "ZAR" | "GHS" | "KES" | "USD";

function detectCurrency(): Currency {
  // Lightweight locale-based guess
  const locale = typeof navigator !== "undefined" ? navigator.language : "en-US";
  const region = locale.split("-")[1]?.toUpperCase();

  if (region === "ZA") return "ZAR";
  if (region === "GH") return "GHS";
  if (region === "KE") return "KES";
  if (region === "NG") return "NGN";
  return "USD";
}

// Static, *approximate* display rates for credibility UI.
// Replace later with live FX.
const USD_TO: Record<Currency, number> = {
  USD: 1,
  NGN: 1600,
  ZAR: 18.5,
  GHS: 12.5,
  KES: 130,
};

function formatCurrency(amount: number, currency: Currency) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${Math.round(amount).toLocaleString()}`;
  }
}

function formatFounderPrice(region: Region) {
  // Your current pricing logic:
  // Africa: ₦79,000 / year
  // Global: $149 / year
  if (region === "africa") return { label: "₦79,000 / year", usdBase: 49 }; // ~ $49ish display base for FX estimate
  return { label: "$149 / year", usdBase: 149 };
}

export function PricingSection({
  region,
  setRegion,
  busy,
  onJoinWaitlist,
  onFounderCheckout,
}: {
  region: Region;
  setRegion: (r: Region) => void;
  busy: boolean;
  onJoinWaitlist: () => void;
  onFounderCheckout: () => void;
}) {
  const currency = React.useMemo(() => detectCurrency(), []);
  const founder = formatFounderPrice(region);

  const estimatedLocal =
    region === "global"
      ? null
      : currency === "USD"
      ? null
      : formatCurrency(founder.usdBase * USD_TO[currency], currency);

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 pb-10 md:pb-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-app-ink md:text-3xl">
            Founder pricing
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-app-muted md:text-base">
            Two paths: join free, or secure a founding spot with locked founder pricing (as long as you stay subscribed).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-app-muted">Region</span>
          <div className="rounded-2xl border border-app-border bg-white p-1 shadow-[0_1px_0_rgba(17,24,39,0.02)]">
            <button
              onClick={() => setRegion("africa")}
              className={
                "rounded-xl px-3 py-1 text-xs font-semibold transition " +
                (region === "africa" ? "bg-app-accent text-white" : "text-app-muted hover:text-app-ink")
              }
              type="button"
            >
              Africa
            </button>
            <button
              onClick={() => setRegion("global")}
              className={
                "rounded-xl px-3 py-1 text-xs font-semibold transition " +
                (region === "global" ? "bg-app-accent text-white" : "text-app-muted hover:text-app-ink")
              }
              type="button"
            >
              Global
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="p-6 rounded-3xl">
          <div className="text-sm font-bold text-app-ink">Free waitlist</div>
          <div className="mt-2 text-sm text-app-muted">
            Get notified when beta opens. No commitment.
          </div>

          <ul className="mt-4 grid gap-2 text-sm text-app-muted">
            <li>• Early access email</li>
            <li>• Public launch pricing later</li>
            <li>• Best for: “I want to follow along”</li>
          </ul>

          <div className="mt-5">
            <Button onClick={onJoinWaitlist}>Join waitlist</Button>
          </div>
        </Card>

        <Card className="p-6 rounded-3xl">
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm font-bold text-app-ink">Founding member</div>
            <span className="rounded-full bg-[#fff3e6] px-3 py-1 text-xs font-bold text-app-accent">
              Limited
            </span>
          </div>

          <div className="mt-2 text-sm text-app-muted">
            Secure a spot in the first 100 businesses + lock founder pricing.
          </div>

          <div className="mt-4">
            <div className="text-3xl font-semibold tracking-tight text-app-ink">{founder.label}</div>

            {estimatedLocal ? (
              <div className="mt-1 text-xs text-app-muted">
                Estimated in your currency: <span className="font-semibold text-app-ink">≈ {estimatedLocal}</span>
              </div>
            ) : null}

            <div className="mt-1 text-xs text-app-muted">
              Charged annually. Founder rate stays while subscription remains active.
            </div>
          </div>

          <ul className="mt-4 grid gap-2 text-sm text-app-muted">
            <li>• Priority onboarding</li>
            <li>• Direct founder feedback channel</li>
            <li>• Early access to reconciliation features</li>
            <li>• Founder pricing locked</li>
          </ul>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button disabled={busy} onClick={onFounderCheckout}>
              {busy ? "Opening checkout..." : "Secure founder spot"}
            </Button>
            <Button variant="secondary" onClick={onJoinWaitlist} type="button">
              Ask first
            </Button>
          </div>

          <p className="mt-3 text-xs text-app-muted">
            Payments: Paystack (Africa) + Stripe (global cards). Local currency shown is an estimate.
          </p>
        </Card>
      </div>
    </section>
  );
}