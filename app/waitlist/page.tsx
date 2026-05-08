"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Region, WaitlistLead } from "@/lib/types";
import { Card, Input, Select } from "@/components/ui";

import ReactSelect from "react-select";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getCountries, getCountryCallingCode } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Plan = "waitlist" | "founder";
type Step = 1 | 2 | 3;
type Tier = "nigeria" | "africa" | "global";
type Provider = "paystack" | "paddle";

declare global {
  interface Window {
    Paddle?: {
      Environment: { set: (env: "sandbox" | "production") => void };
      Initialize: (opts: {
        token: string;
        checkout?: { settings?: { displayMode?: "overlay" | "inline"; theme?: "light" | "dark"; locale?: string; allowLogout?: boolean; successUrl?: string } };
      }) => void;
      Checkout: {
        open: (opts: { transactionId: string; settings?: { displayMode?: "overlay" | "inline"; theme?: "light" | "dark"; locale?: string; allowLogout?: boolean; successUrl?: string } }) => void;
      };
    };
    __proovaPaddleInitialized?: boolean;
  }
}

let paddleScriptPromise: Promise<void> | null = null;
function loadPaddleScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Paddle) return Promise.resolve();
  if (paddleScriptPromise) return paddleScriptPromise;
  paddleScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://cdn.paddle.com/paddle/v2/paddle.js"]');
    if (existing) {
      if (window.Paddle) { resolve(); return; }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load Paddle.js")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Paddle.js"));
    document.head.appendChild(script);
  });
  return paddleScriptPromise;
}

const AFRICA_ISO2 = new Set(["DZ","AO","BJ","BW","BF","BI","CM","CV","CF","TD","KM","CG","CD","DJ","EG","GQ","ER","SZ","ET","GA","GM","GH","GN","GW","CI","KE","LS","LR","LY","MG","MW","ML","MR","MU","MA","MZ","NA","NE","NG","RW","ST","SN","SC","SL","SO","ZA","SS","SD","TZ","TG","TN","UG","ZM","ZW"]);

function computeTier(c: string): Tier {
  const u = (c || "").toUpperCase();
  if (!u) return "global";
  if (u === "NG") return "nigeria";
  if (AFRICA_ISO2.has(u)) return "africa";
  return "global";
}
function computeProvider(tier: Tier): Provider { return tier === "nigeria" ? "paystack" : "paddle"; }
function computeRegionFromTier(tier: Tier): Region { return tier === "global" ? "global" : "africa"; }

function regionToIso2(region: string | null): string {
  if (region === "nigeria") return "NG";
  return "";
}

function displayFounderPrice(tier: Tier, hasCountry: boolean, paddleReady: boolean) {
  if (!hasCountry) return { label: "Select your country to see your Founder price", sub: "Regional pricing appears after country selection." };
  if (tier === "nigeria") return { label: "₦79,000 / year", sub: "Founder access • Secure checkout with Paystack" };
  if (!paddleReady) {
    if (tier === "africa") return { label: "$99 / year", sub: "Founder access • Paddle checkout will be enabled shortly" };
    return { label: "$149 / year", sub: "Founder access • Paddle checkout will be enabled shortly" };
  }
  if (tier === "africa") return { label: "$99 / year", sub: "Secure checkout with Paddle" };
  return { label: "$149 / year", sub: "Secure checkout with Paddle" };
}
function displayLaunchMonthlyPrice(tier: Tier, hasCountry: boolean) {
  if (!hasCountry) return { label: "", sub: "" };
  if (tier === "nigeria") return { label: "₦8,000 / month", sub: "Public launch pricing" };
  if (tier === "africa") return { label: "$15 / month", sub: "Public launch pricing" };
  return { label: "$29 / month", sub: "Public launch pricing" };
}
function displayLaunchAnnualPrice(tier: Tier, hasCountry: boolean) {
  if (!hasCountry) return { label: "", sub: "" };
  if (tier === "nigeria") return { label: "₦96,000 / year", sub: "Based on ₦8,000 × 12" };
  if (tier === "africa") return { label: "$180 / year", sub: "Based on $15 × 12" };
  return { label: "$348 / year", sub: "Based on $29 × 12" };
}
function displaySavings(tier: Tier, hasCountry: boolean) {
  if (!hasCountry) return "";
  if (tier === "nigeria") return "Save ₦17,000+ every year";
  if (tier === "africa") return "Save $81 every year";
  return "Save $199 every year";
}
function displayCheckoutSummary(tier: Tier, hasCountry: boolean, paddleReady: boolean) {
  if (!hasCountry) return { label: "Select your country to continue", sub: "" };
  if (tier === "nigeria") return { label: "₦79,000 / year", sub: "Secure checkout • Paystack" };
  if (!paddleReady) {
    if (tier === "africa") return { label: "$99 / year", sub: "Founder checkout • Paddle coming soon" };
    return { label: "$149 / year", sub: "Founder checkout • Paddle coming soon" };
  }
  if (tier === "africa") return { label: "$99 / year", sub: "Secure checkout • Paddle" };
  return { label: "$149 / year", sub: "Secure checkout • Paddle" };
}
function flagEmojiFromISO2(iso2: string) {
  if (!iso2 || iso2.length !== 2) return "";
  const codePoints = [...iso2.toUpperCase()].map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  const input = el.querySelector("input,button,textarea,[tabindex]") as HTMLElement | null;
  input?.focus?.();
}

// ─────────────────────────────────────────
// SOCIAL PROOF DATA
// ─────────────────────────────────────────

const FOUNDERS = [
  { initials: "TO", name: "Temi O.", flag: "🇳🇬", bg: "bg-violet-400" },
  { initials: "CK", name: "Chidi K.", flag: "🇳🇬", bg: "bg-purple-500" },
  { initials: "AN", name: "Amara N.", flag: "🇰🇪", bg: "bg-indigo-400" },
  { initials: "SB", name: "Sade B.", flag: "🇬🇭", bg: "bg-fuchsia-400" },
  { initials: "EJ", name: "Emeka J.", flag: "🇳🇬", bg: "bg-violet-500" },
];
const FOUNDER_COUNT = "900+";

// ─────────────────────────────────────────
// SOCIAL PROOF ROW — used on desktop panel & mobile
// ─────────────────────────────────────────

function SocialProofRow({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isDark = variant === "dark";
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2.5">
        {FOUNDERS.map((f, i) => (
          <div
            key={i}
            title={`${f.flag} ${f.name}`}
            className={cx(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border-2 text-[11px] font-bold",
              f.bg,
              isDark ? "border-[#4c1d95] text-white" : "border-white text-white",
              "shadow-sm"
            )}
          >
            {f.initials}
          </div>
        ))}
      </div>
      <div className={cx("text-sm leading-tight", isDark ? "text-white/70" : "text-app-muted")}>
        <span className={cx("font-bold", isDark ? "text-white" : "text-app-ink")}>{FOUNDER_COUNT}</span> founders joined
        <div className="mt-0.5 flex flex-wrap gap-x-1.5 gap-y-0.5">
          {FOUNDERS.slice(0, 3).map((f, i) => (
            <span key={i} className="text-[11px]">{f.flag} {f.name.split(" ")[0]}</span>
          ))}
          <span className="text-[11px]">& more</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// UI ATOMS
// ─────────────────────────────────────────

function PrimaryButton({ children, onClick, disabled, type = "button", className }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; type?: "button" | "submit"; className?: string }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cx("inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#111111] px-5 text-sm font-semibold text-white", "shadow-[0_12px_30px_rgba(17,17,17,0.16)] transition-all duration-200", "hover:bg-black hover:shadow-[0_18px_40px_rgba(17,17,17,0.20)] active:translate-y-[1px]", "disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none", className)}>
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, disabled, className }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; className?: string }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cx("inline-flex h-12 w-full items-center justify-center rounded-2xl border border-black/10 bg-white px-5 text-sm font-semibold text-app-ink", "shadow-[0_8px_18px_rgba(16,24,40,0.04)] transition-all duration-200", "hover:border-black/15 hover:bg-[#fcfcfd] active:translate-y-[1px]", "disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none", className)}>
      {children}
    </button>
  );
}

function TrustRow({ tier }: { tier?: Tier }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-medium text-app-muted sm:text-xs">
        <span className="flex items-center gap-1">
          <svg width="11" height="12" viewBox="0 0 11 12" fill="none" className="opacity-50">
            <rect x="1" y="5" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M3.5 5V3.5a2 2 0 0 1 4 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Secure checkout
        </span>
        <span className="h-1 w-1 rounded-full bg-black/20" />
        <span>Founder pricing locked</span>
        <span className="h-1 w-1 rounded-full bg-black/20" />
        <span>30-day refund after launch</span>
      </div>
      <div className="flex items-center justify-center gap-3">
        {(!tier || tier === "nigeria") && (
          <div className="flex items-center gap-1.5 rounded-xl border border-black/8 bg-white px-3 py-1.5 shadow-[0_4px_12px_rgba(16,24,40,0.04)]">
            <svg width="14" height="14" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#00C3F7"/><path d="M10 28V12h12c4.4 0 7 2.2 7 6s-2.6 6-7 6H15v4H10zm5-8h6.5c1.7 0 2.5-.7 2.5-2s-.8-2-2.5-2H15v4z" fill="white"/></svg>
            <span className="text-[10px] font-semibold text-app-ink">Paystack</span>
          </div>
        )}
        {(!tier || tier !== "nigeria") && (
          <div className="flex items-center gap-1.5 rounded-xl border border-black/8 bg-white px-3 py-1.5 shadow-[0_4px_12px_rgba(16,24,40,0.04)]">
            <svg width="14" height="14" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#0A0A0A"/><ellipse cx="20" cy="20" rx="10" ry="10" stroke="#55E5A0" strokeWidth="5"/><ellipse cx="20" cy="20" rx="4" ry="4" fill="#55E5A0"/></svg>
            <span className="text-[10px] font-semibold text-app-ink">Paddle</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 rounded-xl border border-black/8 bg-white px-3 py-1.5 shadow-[0_4px_12px_rgba(16,24,40,0.04)]">
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><path d="M6 0L1 2v4c0 3.3 2.1 6.4 5 7 2.9-.6 5-3.7 5-7V2L6 0z" fill="#22c55e"/><path d="M4 7l1.5 1.5L8 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-[10px] font-semibold text-app-ink">256-bit SSL</span>
        </div>
      </div>
    </div>
  );
}

function Segmented({ value, onChange, items }: { value: string; onChange: (v: string) => void; items: Array<{ value: string; title: string; desc: string; badge?: string }> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button key={it.value} type="button" onClick={() => onChange(it.value)} className={cx("group rounded-[28px] border p-4 text-left transition-all duration-200", active ? "border-black/15 bg-white shadow-[0_18px_50px_rgba(16,24,40,0.08)] ring-1 ring-black/5" : "border-black/8 bg-white hover:border-black/15 hover:bg-white")}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-app-ink">{it.title}</div>
                <div className="mt-1 text-xs leading-5 text-app-muted">{it.desc}</div>
              </div>
              {it.badge ? <div className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700">{it.badge}</div> : null}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-app-muted">
              <span className={cx("inline-flex h-5 w-5 items-center justify-center rounded-full border transition", active ? "border-black bg-black text-white" : "border-black/10 bg-white")}>
                {active ? "✓" : ""}
              </span>
              <span className={cx(active ? "font-semibold text-app-ink" : "")}>{active ? "Selected" : "Select"}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function StepPills({ step }: { step: Step }) {
  const steps = [{ n: 1, t: "Choose plan" }, { n: 2, t: "Contact" }, { n: 3, t: "Review" }];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s) => {
        const active = step === (s.n as Step);
        const done = step > (s.n as Step);
        return (
          <div key={s.n} className={cx("inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition", active ? "border-black/15 bg-white text-app-ink shadow-[0_10px_24px_rgba(16,24,40,0.06)]" : "border-black/10 bg-white text-app-muted", done ? "opacity-95" : "")}>
            <span className={cx("grid h-5 w-5 place-items-center rounded-full text-[11px]", active ? "bg-black text-white" : done ? "bg-black/10 text-app-ink" : "bg-black/5 text-app-muted")}>
              {done ? "✓" : s.n}
            </span>
            {s.t}
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string | null; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-sm font-semibold text-app-ink">{label}</div>
        {hint ? <div className="text-xs text-app-muted">{hint}</div> : null}
      </div>
      {children}
      {error ? <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1"/><path d="M6 4v3M6 8.5v.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>{error}</div> : null}
    </div>
  );
}

function FromPricingBanner({ region, onDismiss }: { region: string | null; onDismiss: () => void }) {
  const regionLabel = region === "nigeria" ? "🇳🇬 Nigeria" : region === "africa" ? "🌍 Africa" : null;
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 shadow-[0_4px_16px_rgba(16,185,129,0.08)] animate-in fade-in slide-in-from-top-2 duration-300">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-emerald-600">
        <path d="M8 1l1.8 3.6L14 5.7l-3 2.9.7 4.1L8 10.8l-3.7 1.9L5 8.6 2 5.7l4.2-.6L8 1z" fill="currentColor"/>
      </svg>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-emerald-800">
          Founder spot reserved{regionLabel ? ` · ${regionLabel} pricing` : ""}
        </div>
        <div className="mt-0.5 text-xs text-emerald-700">Fill in your details below and we'll take you straight to checkout.</div>
      </div>
      <button type="button" onClick={onDismiss} className="shrink-0 text-emerald-500 hover:text-emerald-700 transition">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────
// DESKTOP LEFT COLUMN — warm orange mesh gradient panel
// ─────────────────────────────────────────

function DesktopLeftColumn({ tier }: { tier: Tier | null }) {
  const features = [
    {
      title: "Attribution that actually works",
      desc: "See exactly which influencer, ad, or campaign drove each sale.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      ),
    },
    {
      title: "Built for African commerce",
      desc: "Handles transfers, mixed payments, and WhatsApp orders seamlessly.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ),
    },
    {
      title: "Founder pricing, locked forever",
      desc: "Pay once a year at today's rate. Never worry about price hikes.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
    },
  ];

  // Purple gradient, lighter in the middle — no white
  const meshGradient = [
    "radial-gradient(ellipse at 10% 10%, rgba(109,40,217,0.95) 0%, transparent 55%)",
    "radial-gradient(ellipse at 90% 5%,  rgba(124,58,237,0.90) 0%, transparent 50%)",
    "radial-gradient(ellipse at 5%  90%, rgba(76,29,149,0.90)  0%, transparent 50%)",
    "radial-gradient(ellipse at 92% 88%, rgba(109,40,217,0.85) 0%, transparent 50%)",
    "#6d28d9",
  ].join(", ");

  return (
    <div className="hidden lg:block lg:sticky lg:top-8">
      <div
        className="relative overflow-hidden rounded-[32px] p-8 xl:p-10"
        style={{
          background: meshGradient,
          minHeight: "calc(100vh - 5rem)",
        }}
      >
        {/* Soft noise texture for depth */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Bloom orbs in warm orange tones */}
          <div className="absolute -right-12 -top-12 h-72 w-72 rounded-full bg-purple-400/25 blur-[80px]" />
          <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-violet-600/30 blur-[72px]" />
          <div className="absolute bottom-[20%] right-[5%] h-44 w-44 rounded-full bg-purple-300/20 blur-[56px]" />
          <div className="absolute left-[5%] top-[38%] h-36 w-36 rounded-full bg-indigo-400/20 blur-[52px]" />
          {/* Dot grid — very subtle */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots2" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.4" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots2)"/>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between" style={{ minHeight: "calc(100vh - 9rem)" }}>

          {/* ── Top nav row: logo left, Pricing button right ── */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm transition group-hover:bg-white/18">
                  <Image src="/proova.png" alt="Proova" width={40} height={40} className="h-full w-full object-contain" priority />
                </div>
                <span className="text-base font-semibold tracking-tight text-white">Proova</span>
              </Link>

              {/* Pricing button */}
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm transition hover:bg-white/18 hover:text-white"
              >
                Pricing
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-70">
                  <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-[3.5rem] xl:text-[4.5rem] font-semibold tracking-tighter leading-[0.92] text-white">
                <span className="block font-extralight text-white/35 tracking-tight">Join</span>
                <span className="block mt-1 text-white">Proova.</span>
              </h1>
              <p className="text-base xl:text-lg text-white/60 leading-relaxed max-w-xs">
                Finally know which channel, influencer, or campaign actually made you money.
              </p>
            </div>

            {/* Feature cards — glassmorphism */}
            <div className="space-y-2.5">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm transition hover:bg-white/[0.10]"
                >
                  <div className="mt-0.5 shrink-0 text-white/75">
                    {f.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{f.title}</div>
                    <div className="mt-0.5 text-xs leading-5 text-white/50">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: social proof */}
          <div className="space-y-4 pt-8">
            <div className="h-px bg-white/10" />
            <SocialProofRow variant="dark" />
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Accepting Founder spots · Limited availability
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────

export default function WaitlistPage() {
  const router = useRouter();

  const [plan, setPlan] = React.useState<Plan>("waitlist");
  const [step, setStep] = React.useState<Step>(1);

  const [fromPricing, setFromPricing] = React.useState(false);
  const [urlRegion, setUrlRegion] = React.useState<string | null>(null);
  const [showFromPricingBanner, setShowFromPricingBanner] = React.useState(false);

  const [name, setName] = React.useState("");
  const [business, setBusiness] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState<string>("");
  const [phoneCountry, setPhoneCountry] = React.useState<string | undefined>(undefined);
  const [countryIso2, setCountryIso2] = React.useState<string>("");
  const [monthlyOrders, setMonthlyOrders] = React.useState<WaitlistLead["monthlyOrders"]>("0-50");
  const [payments, setPayments] = React.useState<WaitlistLead["payments"]>("both");
  const [channel, setChannel] = React.useState<WaitlistLead["channel"]>("mixed");
  const [biggestPain, setBiggestPain] = React.useState<WaitlistLead["biggestPain"]>("no_roi");
  const [notes, setNotes] = React.useState("");

  const [busy, setBusy] = React.useState(false);
  const [bannerMsg, setBannerMsg] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string | null>>({});

  const formCardRef = React.useRef<HTMLDivElement | null>(null);
  const stepOneRef = React.useRef<HTMLDivElement | null>(null);
  const stepTwoRef = React.useRef<HTMLDivElement | null>(null);
  const stepThreeRef = React.useRef<HTMLDivElement | null>(null);
  const nameInputRef = React.useRef<HTMLInputElement | null>(null);

  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(null);
  React.useEffect(() => { setPortalTarget(document.body); }, []);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan");
    const regionParam = params.get("region");

    if (planParam === "founder") {
      setFromPricing(true);
      setShowFromPricingBanner(true);
      setPlan("founder");
      setUrlRegion(regionParam);

      const iso2 = regionToIso2(regionParam);
      if (iso2) {
        setCountryIso2(iso2);
        setPhoneCountry(iso2);
      }

      setStep(2);

      window.setTimeout(() => {
        formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => nameInputRef.current?.focus(), 200);
      }, 120);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paddleReady = !!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
  const paddleEnv = process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox" ? "sandbox" : "production";
  const hasCountry = !!countryIso2;

  const tier = React.useMemo(() => computeTier(countryIso2), [countryIso2]);
  const region = React.useMemo(() => computeRegionFromTier(tier), [tier]);
  const provider = React.useMemo<Provider | null>(() => { if (!hasCountry) return null; return computeProvider(tier); }, [tier, hasCountry]);

  const founderPrice = React.useMemo(() => displayFounderPrice(tier, hasCountry, paddleReady), [tier, hasCountry, paddleReady]);
  const launchMonthlyPrice = React.useMemo(() => displayLaunchMonthlyPrice(tier, hasCountry), [tier, hasCountry]);
  const launchAnnualPrice = React.useMemo(() => displayLaunchAnnualPrice(tier, hasCountry), [tier, hasCountry]);
  const savings = React.useMemo(() => displaySavings(tier, hasCountry), [tier, hasCountry]);
  const checkoutSummary = React.useMemo(() => displayCheckoutSummary(tier, hasCountry, paddleReady), [tier, hasCountry, paddleReady]);

  const countryOptions = React.useMemo(() => {
    const dn = typeof Intl !== "undefined" ? new Intl.DisplayNames(["en"], { type: "region" }) : null;
    return getCountries()
      .map((iso2) => {
        const name = (dn?.of(iso2) || (en as Record<string, string>)[iso2] || iso2) as string;
        const flag = flagEmojiFromISO2(iso2);
        const calling = getCountryCallingCode(iso2 as Parameters<typeof getCountryCallingCode>[0]);
        return { value: iso2, label: `${flag} ${name}`, meta: { name, calling } };
      })
      .sort((a, b) => a.meta.name.localeCompare(b.meta.name));
  }, []);

  const selectStyles = React.useMemo(() => ({
    control: (base: any, state: any) => ({
      ...base,
      borderRadius: 18,
      borderColor: errors.country ? "#dc2626" : state.isFocused ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.10)",
      boxShadow: state.isFocused ? "0 0 0 4px rgba(59,130,246,0.08)" : "none",
      padding: "4px 6px",
      minHeight: 50,
      backgroundColor: "white",
      cursor: "pointer",
      "&:hover": { borderColor: "rgba(0,0,0,0.20)" },
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: 18,
      overflow: "hidden",
      boxShadow: "0 20px 44px rgba(0,0,0,0.14)",
      border: "1px solid rgba(0,0,0,0.08)",
      background: "white",
      zIndex: 9999,
    }),
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    menuList: (base: any) => ({ ...base, padding: "6px", maxHeight: 280 }),
    option: (base: any, state: any) => ({
      ...base,
      borderRadius: 12,
      backgroundColor: state.isSelected ? "rgba(17,17,17,0.08)" : state.isFocused ? "rgba(17,17,17,0.04)" : "transparent",
      color: "rgba(0,0,0,0.88)",
      padding: "10px 12px",
      fontWeight: state.isSelected ? 700 : 500,
      cursor: "pointer",
    }),
    placeholder: (base: any) => ({ ...base, color: "rgba(0,0,0,0.38)", fontWeight: 500 }),
    singleValue: (base: any) => ({ ...base, color: "rgba(0,0,0,0.88)", fontWeight: 600 }),
    indicatorsContainer: (base: any) => ({ ...base, paddingRight: 8 }),
    dropdownIndicator: (base: any) => ({ ...base, color: "rgba(0,0,0,0.40)", "&:hover": { color: "rgba(0,0,0,0.70)" } }),
    clearIndicator: (base: any) => ({ ...base, color: "rgba(0,0,0,0.35)", "&:hover": { color: "rgba(0,0,0,0.70)" } }),
  }), [errors.country]);

  const providerLabel = !provider ? "Select country" : provider === "paystack" ? "Paystack" : paddleReady ? "Paddle" : "Paddle soon";

  function setFieldError(key: string, msg: string | null) { setErrors((prev) => ({ ...prev, [key]: msg })); }
  function clearErrors() { setErrors({}); setBannerMsg(null); }

  function scrollFormIntoView(target?: HTMLElement | null) {
    const el = target || formCardRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function focusFirstFieldForStep(nextStep: Step) {
    window.setTimeout(() => {
      if (nextStep === 2) { nameInputRef.current?.focus(); return; }
      if (nextStep === 3) { const s = document.querySelector("select") as HTMLSelectElement | null; s?.focus(); }
    }, 120);
  }

  function next() {
    setBannerMsg(null);
    setStep((prev) => { const n = prev < 3 ? ((prev + 1) as Step) : prev; focusFirstFieldForStep(n); return n; });
  }
  function back() {
    setBannerMsg(null);
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));
  }

  React.useEffect(() => {
    const target = step === 1 ? stepOneRef.current : step === 2 ? stepTwoRef.current : stepThreeRef.current;
    const t = window.setTimeout(() => scrollFormIntoView(target), 80);
    return () => window.clearTimeout(t);
  }, [step]);

  async function ensurePaddleInitialized() {
    if (!paddleReady) throw new Error("Paddle checkout is not configured yet.");
    await loadPaddleScript();
    if (!window.Paddle) throw new Error("Paddle.js did not load");
    if (!window.__proovaPaddleInitialized) {
      if (paddleEnv === "sandbox") window.Paddle.Environment.set("sandbox");
      window.Paddle.Initialize({ token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN as string, checkout: { settings: { displayMode: "overlay", theme: "light", locale: "en", allowLogout: true } } });
      window.__proovaPaddleInitialized = true;
    }
  }

  async function openPaddleCheckout(transactionId: string) {
    await ensurePaddleInitialized();
    if (!window.Paddle) throw new Error("Paddle is unavailable");
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : "");
    window.Paddle.Checkout.open({ transactionId, settings: { displayMode: "overlay", theme: "light", locale: "en", allowLogout: true, successUrl: `${baseUrl}/founder/success?provider=paddle&transaction_id=${encodeURIComponent(transactionId)}` } });
  }

  function isWhatsappEmpty(val: string) {
    if (!val) return true;
    const digits = val.replace(/\D/g, "");
    return digits.length < 7;
  }

  function handleCountryChange(opt: any) {
    const v = opt?.value || "";
    setCountryIso2(v);
    if (errors.country) setFieldError("country", null);
    setPhoneCountry(v || undefined);
  }

  function validateContact(intent: Plan) {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!email.trim()) e.email = "Please enter your email.";
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) e.email = "Please enter a valid email.";
    if (intent === "founder" && !countryIso2) e.country = "Please select your country to continue.";
    if (!isWhatsappEmpty(whatsapp) && !isValidPhoneNumber(whatsapp)) {
      e.whatsapp = "Number looks incomplete — include the full country code, or clear the field to skip.";
    }
    setErrors(Object.keys(e).length ? e : {});
    if (!Object.keys(e).length) return null;
    const first = Object.keys(e)[0];
    setStep(2);
    window.setTimeout(() => {
      scrollToId(first === "name" ? "fld-name" : first === "email" ? "fld-email" : first === "country" ? "fld-country" : "fld-whatsapp");
    }, 80);
    return "Please fix the highlighted fields.";
  }

  async function submit(intent: Plan) {
    clearErrors();
    const err = validateContact(intent);
    if (err) { setBannerMsg(err); return; }

    const lead: WaitlistLead = {
      name: name.trim(),
      business: business.trim() || undefined,
      email: email.trim(),
      whatsapp: isWhatsappEmpty(whatsapp) ? undefined : whatsapp.trim(),
      country: countryIso2 || undefined,
      region,
      monthlyOrders,
      payments,
      channel,
      biggestPain,
      notes: notes.trim() || undefined,
      tier,
      provider: provider || undefined,
      plan: intent === "founder" ? "founder_annual" : "waitlist",
    };

    setBusy(true);
    try {
      const r = await fetch("/api/waitlist", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lead, intent }) });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Failed to submit");

      if (intent === "waitlist") { router.push("/thanks", { scroll: false }); return; }

      const cr = await fetch("/api/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: lead.email, name: lead.name, whatsapp: lead.whatsapp, country: countryIso2, intent: "founder" }) });
      const cd = await cr.json();
      if (!cr.ok) throw new Error(cd?.error || "Checkout failed");

      if (cd?.provider === "paystack") {
        if (!cd?.url) throw new Error("Paystack checkout URL missing.");
        window.location.href = cd.url;
        return;
      }
      if (cd?.provider === "paddle") {
        if (!paddleReady) throw new Error("Paddle checkout is not configured yet. Please join the founder list and we'll notify you as soon as checkout is live.");
        if (!cd?.transactionId) throw new Error("Paddle transaction ID missing.");
        await openPaddleCheckout(cd.transactionId);
        setBusy(false);
        return;
      }
      throw new Error("Unknown checkout provider.");
    } catch (e: any) {
      setBannerMsg(e?.message || "Something went wrong.");
      setBusy(false);
      scrollFormIntoView(formCardRef.current);
    }
  }

  return (
    <main className="relative min-h-screen bg-[#F5F5F7] text-app-ink">

      {/* Ambient orbs — desktop background only */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute right-[-10%] top-[-10%] h-[60vw] w-[60vw] max-h-[800px] max-w-[800px] rounded-full bg-violet-500/[0.04] blur-[100px]" />
        <div className="absolute left-[-5%] bottom-[-5%] h-[40vw] w-[40vw] max-h-[500px] max-w-[500px] rounded-full bg-indigo-500/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-5 sm:px-6 lg:px-6 lg:py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12">

          {/* ── LEFT COLUMN: Desktop gradient panel ─────────────── */}
          <div className="lg:col-span-5 xl:col-span-5">
            <DesktopLeftColumn tier={hasCountry ? tier : null} />
          </div>

          {/* ── RIGHT COLUMN: Form ────────────────────────────────── */}
          <div className="lg:col-span-7 xl:col-span-7">

            {/* Mobile nav — unchanged */}
            <div className="flex items-center justify-between gap-4 pb-8 lg:hidden">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_8px_20px_rgba(16,24,40,0.06)]">
                  <Image src="/proova.png" alt="Proova" width={40} height={40} className="h-full w-full object-contain" priority />
                </div>
                <span className="text-sm font-semibold tracking-tight text-app-ink">Proova</span>
              </Link>

              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-app-muted shadow-[0_4px_12px_rgba(16,24,40,0.04)]">
                  {providerLabel}
                </div>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-app-ink shadow-[0_4px_12px_rgba(16,24,40,0.04)] transition hover:border-black/20"
                >
                  View pricing
                </Link>
              </div>
            </div>

            {/* Mobile header — unchanged */}
            <div className="mb-6 lg:hidden">
              <div className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-app-muted shadow-[0_4px_12px_rgba(16,24,40,0.04)] mb-4">
                Founder waitlist
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-app-ink sm:text-3xl">
                Join Proova
              </h1>
              <p className="mt-2 text-sm leading-6 text-app-muted max-w-sm">
                Finally know which channel, influencer, or campaign actually made you money.
              </p>
            </div>

            {/* Desktop header */}
            <div className="hidden lg:block mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-app-muted shadow-[0_4px_12px_rgba(16,24,40,0.04)] mb-4">
                    Founder waitlist
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-app-ink">
                    {step === 1 ? "Choose your plan" : step === 2 ? "Contact details" : "Review & finish"}
                  </h2>
                </div>
                <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_8px_20px_rgba(16,24,40,0.04)]">
                  <Image src="/proova.png" alt="Proova" width={48} height={48} className="h-full w-full object-contain" priority />
                </div>
              </div>
            </div>

            {/* Step pills — sticky on both mobile AND desktop */}
            <div className="sticky top-3 z-20 mb-5 rounded-2xl bg-[#F5F5F7]/90 px-1 py-1.5 shadow-[0_4px_16px_rgba(16,24,40,0.06)] backdrop-blur supports-[backdrop-filter]:bg-[#F5F5F7]/80">
              <StepPills step={step} />
            </div>

            {/* Form card */}
            <Card ref={formCardRef} className="rounded-[32px] border border-black/8 bg-white p-5 shadow-[0_28px_70px_rgba(16,24,40,0.10)] sm:p-6 lg:p-8">

              {/* Mobile card header */}
              <div className="flex items-start justify-between gap-4 lg:hidden">
                <div>
                  <div className="text-sm font-semibold text-app-ink">
                    {step === 1 ? "Choose your plan" : step === 2 ? "Contact details" : "Review & finish"}
                  </div>
                  <div className="mt-1 text-xs text-app-muted">Step {step} of 3</div>
                </div>
                <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_8px_20px_rgba(16,24,40,0.04)]">
                  <Image src="/proova.png" alt="Proova" width={40} height={40} className="h-full w-full object-contain" priority />
                </div>
              </div>

              {/* From-pricing banner */}
              {showFromPricingBanner && (
                <div className="mt-4">
                  <FromPricingBanner region={urlRegion} onDismiss={() => setShowFromPricingBanner(false)} />
                </div>
              )}

              {/* Error banner */}
              {bannerMsg && (
                <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-red-600"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v4M8 10.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  <div className="text-sm font-semibold text-red-700">{bannerMsg}</div>
                </div>
              )}

              <div className="mt-5 space-y-5">

                {/* ── STEP 1 ─────────────────────────────────────────── */}
                {step === 1 && (
                  <div ref={stepOneRef} className="scroll-mt-24">
                    <Segmented
                      value={plan}
                      onChange={(v) => setPlan(v as Plan)}
                      items={[
                        { value: "waitlist", title: "Free waitlist", desc: "Get invited when beta opens. No payment today." },
                        { value: "founder", title: "Founder access", desc: "Priority onboarding, locked annual pricing, and direct support.", badge: "Limited" },
                      ]}
                    />

                    {plan === "founder" ? (
                      <div className="mt-4 overflow-hidden rounded-[24px] border border-black/8 bg-[#fbfbfc]">
                        <div className="p-4 lg:p-5">
                          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">Founder pricing</div>
                          <div className="mt-1 text-xl font-semibold tracking-tight text-app-ink">{founderPrice.label}</div>
                          <div className="mt-1 text-sm text-app-muted">{hasCountry ? "Your personal Founder rate based on your country." : "Select your country in the next step to reveal your exact price."}</div>
                          {hasCountry && (
                            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                              <div className="rounded-2xl border border-black/8 bg-white p-3">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-app-muted">Today</div>
                                <div className="mt-1 text-sm font-semibold text-app-ink">{founderPrice.label}</div>
                              </div>
                              <div className="rounded-2xl border border-black/8 bg-white p-3">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-app-muted">After launch</div>
                                <div className="mt-1 text-sm font-semibold text-app-ink line-through decoration-black/25">{launchAnnualPrice.label}</div>
                              </div>
                              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700">Savings</div>
                                <div className="mt-1 text-sm font-semibold text-emerald-700">{savings}</div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="border-t border-black/8 p-4 lg:p-5">
                          <ul className="grid gap-2 text-sm text-app-muted">
                            <li>• Lock your Founder rate before public monthly pricing starts</li>
                            <li>• Priority onboarding and personal setup help</li>
                            <li>• Direct founder feedback channel and early feature access</li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 rounded-[24px] border border-black/8 bg-[#fbfbfc] p-4 lg:p-5">
                        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">Free waitlist</div>
                        <ul className="mt-3 grid gap-2 text-sm text-app-muted">
                          <li>• Early access invite when beta opens</li>
                          <li>• Product updates and launch announcements</li>
                          <li>• Optional onboarding call when spots open</li>
                        </ul>
                      </div>
                    )}

                    <div className="sticky bottom-0 z-20 -mx-5 mt-5 border-t border-black/8 bg-white/95 px-5 pb-5 pt-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-2">
                      <PrimaryButton onClick={() => { clearErrors(); next(); }}>Continue →</PrimaryButton>
                      <div className="mt-3"><TrustRow tier={tier} /></div>
                      <div className="mt-3 text-center text-xs text-app-muted">You can switch between Free and Founder anytime before checkout.</div>
                    </div>
                  </div>
                )}

                {/* ── STEP 2 ─────────────────────────────────────────── */}
                {step === 2 && (
                  <div ref={stepTwoRef} className="scroll-mt-24">
                    <div className="flex items-center justify-between gap-3 lg:hidden">
                      <div className="text-sm font-semibold text-app-ink">Contact details</div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className={cx(
                          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition",
                          plan === "founder"
                            ? "border-red-200 bg-red-50 text-red-700 hover:border-red-300"
                            : "border-black/10 bg-white text-app-muted hover:border-black/20"
                        )}
                      >
                        {plan === "founder" ? "Founder access" : "Free waitlist"}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-60">
                          <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>

                    <div className="hidden lg:flex lg:items-center lg:justify-between lg:mb-5">
                      <div className="text-sm font-semibold text-app-ink">Contact details</div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className={cx(
                          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                          plan === "founder"
                            ? "border-red-200 bg-red-50 text-red-700 hover:border-red-300"
                            : "border-black/10 bg-white text-app-muted hover:border-black/20"
                        )}
                      >
                        {plan === "founder" ? "Founder access" : "Free waitlist"}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-60">
                          <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>

                    <div className="mt-5 space-y-5">
                      <div id="fld-name">
                        <Field label="Name" error={errors.name}>
                          <Input ref={nameInputRef} value={name} onChange={(e) => { setName(e.target.value); if (errors.name) setFieldError("name", null); }} placeholder="Your full name" autoComplete="name" className={cx(errors.name ? "border-red-300 ring-2 ring-red-100" : "")} />
                        </Field>
                      </div>

                      <div id="fld-email">
                        <Field label="Email" hint="We send your invite here" error={errors.email}>
                          <Input value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setFieldError("email", null); }} placeholder="you@company.com" type="email" inputMode="email" autoComplete="email" className={cx(errors.email ? "border-red-300 ring-2 ring-red-100" : "")} />
                        </Field>
                      </div>

                      <div id="fld-country">
                        <Field label="Country" hint={plan === "founder" ? "Required for checkout" : "Optional"} error={errors.country}>
                          <ReactSelect
                            instanceId="country-select"
                            value={countryIso2 ? countryOptions.find((o) => o.value === countryIso2) : null}
                            onChange={handleCountryChange}
                            options={countryOptions as any}
                            placeholder="Search or tap to select…"
                            isClearable
                            isSearchable
                            styles={selectStyles as any}
                            menuPortalTarget={portalTarget}
                            menuPosition="fixed"
                            formatOptionLabel={(opt: any) => (
                              <div className="flex items-center justify-between gap-3">
                                <span className="font-semibold">{opt.label}</span>
                                <span className="text-xs font-medium text-app-muted">+{opt.meta?.calling}</span>
                              </div>
                            )}
                          />
                          <div className="mt-1.5 text-xs text-app-muted">
                            {plan === "founder" ? "Sets your regional Founder price and payment provider." : "Helps tailor your onboarding."}
                          </div>
                        </Field>
                      </div>

                      <div id="fld-whatsapp">
                        <Field label="WhatsApp" hint="Recommended — skip if you prefer" error={errors.whatsapp}>
                          <div className={cx(
                            "relative rounded-2xl border bg-white px-3 py-2 shadow-[0_8px_20px_rgba(16,24,40,0.03)] transition-all duration-150",
                            errors.whatsapp ? "border-red-300 ring-2 ring-red-100"
                              : countryIso2 && isWhatsappEmpty(whatsapp) ? "border-blue-200 ring-2 ring-blue-500/10"
                              : "border-black/10 focus-within:border-black/25 focus-within:ring-2 focus-within:ring-blue-500/10"
                          )}>
                            <PhoneInput
                              international
                              country={phoneCountry as any}
                              onCountryChange={(c: any) => setPhoneCountry(c || undefined)}
                              value={whatsapp}
                              onChange={(v) => { setWhatsapp(v || ""); if (errors.whatsapp) setFieldError("whatsapp", null); }}
                              placeholder={countryIso2 ? "Enter your number" : "Select country first, or type here"}
                            />
                            {!isWhatsappEmpty(whatsapp) && (
                              <button
                                type="button"
                                onClick={() => { setWhatsapp(""); setPhoneCountry(countryIso2 || undefined); setFieldError("whatsapp", null); }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-app-muted transition hover:bg-black/5 hover:text-app-ink"
                              >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                              </button>
                            )}
                          </div>
                          <div className="mt-1.5 text-xs text-app-muted">
                            {countryIso2 && isWhatsappEmpty(whatsapp)
                              ? `${flagEmojiFromISO2(countryIso2)} Country code pre-filled — just type your number.`
                              : !isWhatsappEmpty(whatsapp) ? "We only use this for onboarding updates."
                              : "Speeds up onboarding — completely optional."}
                          </div>
                        </Field>
                      </div>

                      {plan === "founder" && hasCountry && (
                        <div className="overflow-hidden rounded-[24px] border border-black/8 bg-[#fbfbfc]">
                          <div className="p-4 lg:p-5">
                            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">Checkout preview</div>
                            <div className="mt-1 text-lg font-semibold text-app-ink">{checkoutSummary.label}</div>
                            <div className="mt-1 text-xs text-app-muted">{checkoutSummary.sub}</div>
                            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-app-muted">
                              <span>After launch:</span>
                              <span className="font-semibold text-app-ink line-through decoration-black/25">{launchAnnualPrice.label}</span>
                              <span>({launchMonthlyPrice.label})</span>
                              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">{savings}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <Field label="Business name" hint="Optional">
                        <Input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Brand or store name" autoComplete="organization" />
                      </Field>
                    </div>

                    <div className="sticky bottom-0 z-20 -mx-5 mt-5 border-t border-black/8 bg-white/95 px-5 pb-5 pt-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-2">
                      <div className="flex gap-2">
                        <SecondaryButton onClick={back} disabled={busy}>← Back</SecondaryButton>
                        <PrimaryButton disabled={busy} onClick={() => { clearErrors(); const err = validateContact(plan); if (err) { setBannerMsg(err); return; } next(); }}>
                          Continue →
                        </PrimaryButton>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 3 ─────────────────────────────────────────── */}
                {step === 3 && (
                  <div ref={stepThreeRef} className="scroll-mt-24">
                    <div className="mt-1 grid gap-3">
                      <div className="rounded-[24px] border border-black/8 bg-[#fbfbfc] p-4 lg:p-5">
                        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">Selected plan</div>
                        <div className="mt-1 text-sm font-semibold text-app-ink">{plan === "founder" ? "Founder access" : "Free waitlist"}</div>
                        {plan === "founder" ? (
                          <div className="mt-2 space-y-1 text-sm text-app-muted">
                            <div>{checkoutSummary.label} · {provider === "paystack" ? "Paystack" : paddleReady ? "Paddle" : "Paddle soon"}</div>
                            {hasCountry && <div>After launch: <span className="font-semibold text-app-ink line-through decoration-black/25">{launchAnnualPrice.label}</span> ({launchMonthlyPrice.label})</div>}
                          </div>
                        ) : (
                          <div className="mt-2 text-sm text-app-muted">No payment today.</div>
                        )}
                        <div className="mt-3 border-t border-black/6 pt-3 grid gap-1">
                          <div className="text-xs text-app-muted"><span className="font-semibold text-app-ink">{name}</span> · {email}</div>
                          {countryIso2 && <div className="text-xs text-app-muted">{flagEmojiFromISO2(countryIso2)} {countryOptions.find(o => o.value === countryIso2)?.meta.name}</div>}
                          {!isWhatsappEmpty(whatsapp) && <div className="text-xs text-app-muted">WhatsApp: {whatsapp}</div>}
                          <button type="button" onClick={() => setStep(2)} className="mt-1 w-fit text-xs font-semibold text-blue-600 underline underline-offset-2 hover:text-blue-700">Edit details</button>
                        </div>
                      </div>

                      <div className="rounded-[24px] border border-black/8 bg-[#fbfbfc] p-4 lg:p-5">
                        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">Optional — helps us tailor onboarding</div>
                        <div className="mt-3 grid gap-3">
                          <Field label="Monthly orders">
                            <Select value={monthlyOrders} onChange={(e) => setMonthlyOrders(e.target.value as any)}>
                              <option value="0-50">0–50</option>
                              <option value="50-200">50–200</option>
                              <option value="200+">200+</option>
                            </Select>
                          </Field>
                          <Field label="Where do you close sales?">
                            <Select value={channel} onChange={(e) => setChannel(e.target.value as any)}>
                              <option value="mixed">Mix (website + DMs)</option>
                              <option value="whatsapp">Mostly WhatsApp</option>
                              <option value="dms">Mostly DMs (IG/TikTok)</option>
                              <option value="email">Mostly email/calls</option>
                            </Select>
                          </Field>
                          <Field label="How do customers pay?">
                            <Select value={payments} onChange={(e) => setPayments(e.target.value as any)}>
                              <option value="both">Mix (transfer + cards)</option>
                              <option value="transfer">Mostly transfers</option>
                              <option value="cards">Mostly cards/checkout</option>
                            </Select>
                          </Field>
                          <Field label="Biggest attribution pain">
                            <Select value={biggestPain} onChange={(e) => setBiggestPain(e.target.value as any)}>
                              <option value="no_roi">I can't prove ROI by influencer/campaign</option>
                              <option value="influencer_claims">Influencers claim results I can't verify</option>
                              <option value="unattributed_transfers">Transfers come in with no reference</option>
                              <option value="refund_confusion">Refunds make my totals confusing</option>
                              <option value="other">Other</option>
                            </Select>
                          </Field>
                          <Field label="Notes" hint="Optional">
                            <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g., 20 influencers/month, mostly Instagram" />
                          </Field>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-app-muted">By continuing, you agree to receive onboarding updates. No spam, ever.</div>

                    <div className="sticky bottom-0 z-20 -mx-5 mt-5 border-t border-black/8 bg-white/95 px-5 pb-5 pt-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-2">
                      <div className="flex gap-2">
                        <SecondaryButton onClick={back} disabled={busy}>← Back</SecondaryButton>
                        <PrimaryButton onClick={() => submit(plan)} disabled={busy}>
                          {busy
                            ? plan === "founder" ? "Opening checkout…" : "Submitting…"
                            : plan === "founder" ? "Proceed to checkout →" : "Join waitlist →"}
                        </PrimaryButton>
                      </div>
                      <div className="mt-4"><TrustRow tier={tier} /></div>
                    </div>

                    <div className="mt-4 rounded-[24px] border border-black/8 bg-[#fbfbfc] p-4 lg:p-5">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">What happens next</div>
                      <div className="mt-2 text-sm leading-6 text-app-muted">
                        {plan === "founder"
                          ? "You'll be redirected to secure checkout. After payment, you'll receive Founder confirmation and a link to book your onboarding call."
                          : "We'll reach out before beta opens. Founder users get priority onboarding and locked pricing."}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </Card>

            {/* ── MOBILE SOCIAL PROOF — below form card, mobile only ── */}
            <div className="mt-6 lg:hidden">
              <div className="rounded-[24px] border border-black/8 bg-white p-4 shadow-[0_8px_24px_rgba(16,24,40,0.06)]">
                <SocialProofRow variant="light" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}