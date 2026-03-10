"use client";

import * as React from "react";
import Image from "next/image";
import type { Region, WaitlistLead } from "@/lib/types";
import { Card, Input, Select } from "@/components/ui";

import ReactSelect from "react-select";

// Phone input (flags + country calling codes)
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
      Environment: {
        set: (env: "sandbox" | "production") => void;
      };
      Initialize: (opts: {
        token: string;
        checkout?: {
          settings?: {
            displayMode?: "overlay" | "inline";
            theme?: "light" | "dark";
            locale?: string;
            allowLogout?: boolean;
            successUrl?: string;
          };
        };
      }) => void;
      Checkout: {
        open: (opts: {
          transactionId: string;
          settings?: {
            displayMode?: "overlay" | "inline";
            theme?: "light" | "dark";
            locale?: string;
            allowLogout?: boolean;
            successUrl?: string;
          };
        }) => void;
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
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://cdn.paddle.com/paddle/v2/paddle.js"]'
    );

    if (existing) {
      if (window.Paddle) {
        resolve();
        return;
      }

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

const AFRICA_ISO2 = new Set([
  "DZ","AO","BJ","BW","BF","BI","CM","CV","CF","TD","KM","CG","CD","DJ","EG","GQ","ER","SZ","ET","GA","GM","GH","GN","GW",
  "CI","KE","LS","LR","LY","MG","MW","ML","MR","MU","MA","MZ","NA","NE","NG","RW","ST","SN","SC","SL","SO","ZA","SS","SD",
  "TZ","TG","TN","UG","ZM","ZW",
]);

function computeTier(countryIso2: string): Tier {
  const c = (countryIso2 || "").toUpperCase();
  if (!c) return "global";
  if (c === "NG") return "nigeria";
  if (AFRICA_ISO2.has(c)) return "africa";
  return "global";
}

function computeProvider(tier: Tier): Provider {
  return tier === "nigeria" ? "paystack" : "paddle";
}

function computeRegionFromTier(tier: Tier): Region {
  return tier === "global" ? "global" : "africa";
}

function displayFounderPrice(tier: Tier, hasCountry: boolean, paddleReady: boolean) {
  if (!hasCountry) {
    return {
      label: "Select your country to see your Founder price",
      sub: "Regional pricing appears after country selection.",
    };
  }

  if (tier === "nigeria") {
    return { label: "₦79,000 / year", sub: "Founder access • Secure checkout with Paystack" };
  }

  if (!paddleReady) {
    if (tier === "africa") {
      return { label: "$99 / year", sub: "Founder access • Paddle checkout will be enabled shortly" };
    }
    return { label: "$149 / year", sub: "Founder access • Paddle checkout will be enabled shortly" };
  }

  if (tier === "africa") {
    return { label: "$99 / year", sub: "Founder access • Secure checkout with Paddle" };
  }

  return { label: "$149 / year", sub: "Founder access • Secure checkout with Paddle" };
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

function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-140px] top-[-140px] h-[340px] w-[340px] rounded-full bg-red-500/8 blur-3xl sm:h-[420px] sm:w-[420px]" />
      <div className="absolute right-[-120px] top-[40px] h-[260px] w-[260px] rounded-full bg-blue-500/7 blur-3xl sm:h-[340px] sm:w-[340px]" />
      <div className="absolute bottom-[-140px] left-[15%] h-[260px] w-[260px] rounded-full bg-sky-400/6 blur-3xl sm:h-[320px] sm:w-[320px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.96),rgba(255,255,255,0.985))]" />
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#111111] px-5 text-sm font-semibold text-white",
        "shadow-[0_12px_30px_rgba(17,17,17,0.16)] transition-all duration-200",
        "hover:bg-black hover:shadow-[0_18px_40px_rgba(17,17,17,0.20)] active:translate-y-[1px]",
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none",
        className
      )}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "inline-flex h-12 w-full items-center justify-center rounded-2xl border border-black/10 bg-white px-5 text-sm font-semibold text-app-ink",
        "shadow-[0_8px_18px_rgba(16,24,40,0.04)] transition-all duration-200",
        "hover:border-black/15 hover:bg-[#fcfcfd] active:translate-y-[1px]",
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none",
        className
      )}
    >
      {children}
    </button>
  );
}

function TrustRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-medium text-app-muted sm:text-xs">
      <span>Secure checkout</span>
      <span className="h-1 w-1 rounded-full bg-black/20" />
      <span>Founder pricing locked</span>
      <span className="h-1 w-1 rounded-full bg-black/20" />
      <span>30-day refund after launch</span>
    </div>
  );
}

function Segmented({
  value,
  onChange,
  items,
}: {
  value: string;
  onChange: (v: string) => void;
  items: Array<{ value: string; title: string; desc: string; badge?: string }>;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((it) => {
        const active = it.value === value;

        return (
          <button
            key={it.value}
            type="button"
            onClick={() => onChange(it.value)}
            className={cx(
              "group rounded-[28px] border p-4 text-left transition-all duration-200",
              active
                ? "border-black/15 bg-white shadow-[0_18px_50px_rgba(16,24,40,0.08)] ring-1 ring-black/5"
                : "border-black/8 bg-white hover:border-black/15 hover:bg-white"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-app-ink">{it.title}</div>
                <div className="mt-1 text-xs leading-5 text-app-muted">{it.desc}</div>
              </div>

              {it.badge ? (
                <div className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700">
                  {it.badge}
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-app-muted">
              <span
                className={cx(
                  "inline-flex h-5 w-5 items-center justify-center rounded-full border transition",
                  active ? "border-black bg-black text-white" : "border-black/10 bg-white"
                )}
              >
                {active ? "✓" : ""}
              </span>
              <span className={cx(active ? "font-semibold text-app-ink" : "")}>
                {active ? "Selected" : "Select"}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function StepPills({ step }: { step: Step }) {
  const steps = [
    { n: 1, t: "Choose plan" },
    { n: 2, t: "Contact" },
    { n: 3, t: "Review" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s) => {
        const active = step === (s.n as Step);
        const done = step > (s.n as Step);

        return (
          <div
            key={s.n}
            className={cx(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
              active
                ? "border-black/15 bg-white text-app-ink shadow-[0_10px_24px_rgba(16,24,40,0.06)]"
                : "border-black/10 bg-white text-app-muted",
              done ? "opacity-95" : ""
            )}
          >
            <span
              className={cx(
                "grid h-5 w-5 place-items-center rounded-full text-[11px]",
                active
                  ? "bg-black text-white"
                  : done
                  ? "bg-black/10 text-app-ink"
                  : "bg-black/5 text-app-muted"
              )}
            >
              {done ? "✓" : s.n}
            </span>
            {s.t}
          </div>
        );
      })}
    </div>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-sm font-semibold text-app-ink">{label}</div>
        {hint ? <div className="text-xs text-app-muted">{hint}</div> : null}
      </div>
      {children}
      {error ? <div className="text-xs font-semibold text-red-600">{error}</div> : null}
    </div>
  );
}

function FeatureCard({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[24px] border border-black/8 bg-white p-4 shadow-[0_12px_30px_rgba(16,24,40,0.04)]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-app-muted">{eyebrow}</div>
      <div className="mt-1 text-sm font-semibold text-app-ink">{title}</div>
      <div className="mt-2 text-sm leading-6 text-app-muted">{text}</div>
    </div>
  );
}

export default function WaitlistPage() {
  const [plan, setPlan] = React.useState<Plan>("waitlist");
  const [step, setStep] = React.useState<Step>(1);

  const [name, setName] = React.useState("");
  const [business, setBusiness] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState<string>("");

  const [countryIso2, setCountryIso2] = React.useState<string>("");

  const [monthlyOrders, setMonthlyOrders] = React.useState<WaitlistLead["monthlyOrders"]>("0-50");
  const [payments, setPayments] = React.useState<WaitlistLead["payments"]>("both");
  const [channel, setChannel] = React.useState<WaitlistLead["channel"]>("mixed");
  const [biggestPain, setBiggestPain] = React.useState<WaitlistLead["biggestPain"]>("no_roi");
  const [notes, setNotes] = React.useState("");

  const [busy, setBusy] = React.useState(false);
  const [bannerMsg, setBannerMsg] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string | null>>({});

  const paddleReady = !!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
  const paddleEnv = process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox" ? "sandbox" : "production";

  const hasCountry = !!countryIso2;

  const tier = React.useMemo(() => computeTier(countryIso2), [countryIso2]);
  const region = React.useMemo(() => computeRegionFromTier(tier), [tier]);

  const provider = React.useMemo<Provider | null>(() => {
    if (!hasCountry) return null;
    return computeProvider(tier);
  }, [tier, hasCountry]);

  const founderPrice = React.useMemo(
    () => displayFounderPrice(tier, hasCountry, paddleReady),
    [tier, hasCountry, paddleReady]
  );

  const launchMonthlyPrice = React.useMemo(() => displayLaunchMonthlyPrice(tier, hasCountry), [tier, hasCountry]);
  const launchAnnualPrice = React.useMemo(() => displayLaunchAnnualPrice(tier, hasCountry), [tier, hasCountry]);
  const savings = React.useMemo(() => displaySavings(tier, hasCountry), [tier, hasCountry]);

  const checkoutSummary = React.useMemo(
    () => displayCheckoutSummary(tier, hasCountry, paddleReady),
    [tier, hasCountry, paddleReady]
  );

  const countryOptions = React.useMemo(() => {
    const dn = typeof Intl !== "undefined" ? new Intl.DisplayNames(["en"], { type: "region" }) : null;

    return getCountries()
      .map((iso2) => {
        const name = (dn?.of(iso2) || (en as any)[iso2] || iso2) as string;
        const flag = flagEmojiFromISO2(iso2);
        const calling = getCountryCallingCode(iso2 as any);
        return {
          value: iso2,
          label: `${flag} ${name}`,
          meta: { name, calling },
        };
      })
      .sort((a, b) => a.meta.name.localeCompare(b.meta.name));
  }, []);

  function setFieldError(key: string, msg: string | null) {
    setErrors((prev) => ({ ...prev, [key]: msg }));
  }

  function clearErrors() {
    setErrors({});
    setBannerMsg(null);
  }

  function next() {
    setBannerMsg(null);
    setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setBannerMsg(null);
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function ensurePaddleInitialized() {
    if (!paddleReady) {
      throw new Error("Paddle checkout is not configured yet.");
    }

    await loadPaddleScript();

    if (!window.Paddle) {
      throw new Error("Paddle.js did not load");
    }

    if (!window.__proovaPaddleInitialized) {
      if (paddleEnv === "sandbox") {
        window.Paddle.Environment.set("sandbox");
      }

      window.Paddle.Initialize({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN as string,
        checkout: {
          settings: {
            displayMode: "overlay",
            theme: "light",
            locale: "en",
            allowLogout: true,
          },
        },
      });

      window.__proovaPaddleInitialized = true;
    }
  }

  async function openPaddleCheckout(transactionId: string) {
    await ensurePaddleInitialized();

    if (!window.Paddle) {
      throw new Error("Paddle is unavailable");
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (typeof window !== "undefined" ? window.location.origin : "");

    window.Paddle.Checkout.open({
      transactionId,
      settings: {
        displayMode: "overlay",
        theme: "light",
        locale: "en",
        allowLogout: true,
        successUrl: `${baseUrl}/founder/success?provider=paddle&transaction_id=${encodeURIComponent(transactionId)}`,
      },
    });
  }

  function validateContact(intent: Plan) {
    const e: Record<string, string> = {};

    if (!name.trim()) e.name = "Please enter your name.";
    if (!email.trim()) e.email = "Please enter your email.";
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) e.email = "Please enter a valid email.";

    if (intent === "founder" && !countryIso2) e.country = "Please select your country to continue.";

    if (whatsapp?.trim() && !isValidPhoneNumber(whatsapp)) {
      e.whatsapp = "Please enter a valid WhatsApp number (with country code).";
    }

    setErrors(Object.keys(e).length ? e : {});
    if (!Object.keys(e).length) return null;

    const first = Object.keys(e)[0];
    setStep(2);
    setTimeout(() => {
      scrollToId(
        first === "name"
          ? "fld-name"
          : first === "email"
          ? "fld-email"
          : first === "country"
          ? "fld-country"
          : "fld-whatsapp"
      );
    }, 60);

    return "Please fix the highlighted fields.";
  }

  async function submit(intent: Plan) {
    clearErrors();

    const err = validateContact(intent);
    if (err) {
      setBannerMsg(err);
      return;
    }

    const lead: WaitlistLead = {
      name: name.trim(),
      business: business.trim() || undefined,
      email: email.trim(),
      whatsapp: whatsapp?.trim() || undefined,

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
      const r = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lead, intent }),
      });

      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Failed to submit");

      if (intent === "waitlist") {
        window.location.href = "/thanks";
        return;
      }

      const cr = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: lead.email,
          name: lead.name,
          whatsapp: lead.whatsapp,
          country: countryIso2,
          intent: "founder",
        }),
      });

      const cd = await cr.json();
      if (!cr.ok) throw new Error(cd?.error || "Checkout failed");

      if (cd?.provider === "paystack") {
        if (!cd?.url) throw new Error("Paystack checkout URL missing.");
        window.location.href = cd.url;
        return;
      }

      if (cd?.provider === "paddle") {
        if (!paddleReady) {
          throw new Error("Paddle checkout is not configured yet. Please join the founder list and we’ll notify you as soon as checkout is live.");
        }

        if (!cd?.transactionId) {
          throw new Error("Paddle transaction ID missing.");
        }

        await openPaddleCheckout(cd.transactionId);
        setBusy(false);
        return;
      }

      throw new Error("Unknown checkout provider.");
    } catch (e: any) {
      setBannerMsg(e?.message || "Something went wrong.");
      setBusy(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const selectStyles = React.useMemo(() => {
    return {
      control: (base: any, state: any) => ({
        ...base,
        borderRadius: 18,
        borderColor: errors.country ? "#dc2626" : state.isFocused ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.10)",
        boxShadow: state.isFocused ? "0 0 0 4px rgba(59,130,246,0.08)" : "none",
        padding: "4px 6px",
        minHeight: 50,
        backgroundColor: "white",
      }),
      menu: (base: any) => ({
        ...base,
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 20px 44px rgba(0,0,0,0.14)",
        border: "1px solid rgba(0,0,0,0.08)",
        background: "white",
      }),
      option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isSelected ? "rgba(59,130,246,0.08)" : state.isFocused ? "rgba(59,130,246,0.05)" : "white",
        color: "rgba(0,0,0,0.88)",
        padding: "12px 12px",
        fontWeight: state.isSelected ? 700 : 600,
      }),
      placeholder: (base: any) => ({ ...base, color: "rgba(0,0,0,0.40)", fontWeight: 600 }),
      singleValue: (base: any) => ({ ...base, color: "rgba(0,0,0,0.88)", fontWeight: 700 }),
      indicatorsContainer: (base: any) => ({ ...base, paddingRight: 8 }),
    };
  }, [errors.country]);

  const providerLabel =
    !provider
      ? "Select country"
      : provider === "paystack"
      ? "Paystack"
      : paddleReady
      ? "Paddle"
      : "Paddle soon";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fcfcfd] text-app-ink">
      <AmbientBackground />

      <div className="relative mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_12px_30px_rgba(16,24,40,0.06)]">
              <Image src="/proova.png" alt="Proova" width={56} height={56} className="h-full w-full object-contain" priority />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-app-ink">Proova</div>
              <div className="text-xs text-app-muted">Founder waitlist</div>
            </div>
          </a>

          <div className="hidden sm:flex items-center gap-3">
            <div className="text-xs text-app-muted">Secure checkout</div>
            <div className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-app-ink shadow-[0_8px_20px_rgba(16,24,40,0.04)]">
              {providerLabel}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:items-start">
          <div className="relative">
            <div className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-app-muted shadow-[0_8px_20px_rgba(16,24,40,0.04)]">
              Revenue proof for WhatsApp, Instagram, and social commerce
            </div>

            <h1 className="mt-5 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-app-ink sm:text-4xl lg:text-5xl">
              Join Proova — and finally prove what actually made you money.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-app-muted sm:text-base">
              Track clicks, match them to real money, reconcile transfers and checkouts, and finally know which
              influencer, campaign, or source actually drove revenue.
            </p>

            <div className="mt-6">
              <StepPills step={step} />
            </div>

            <div className="mt-7 rounded-[32px] border border-black/8 bg-white p-5 shadow-[0_24px_60px_rgba(16,24,40,0.08)] sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-lg">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">
                    Founder access
                  </div>
                  <div className="mt-2 text-xl font-semibold text-app-ink sm:text-2xl">
                    Lock your rate before public pricing starts.
                  </div>
                  <div className="mt-3 text-sm leading-6 text-app-muted">
                    Early access, direct support, setup help, and your Founder rate stays locked while you stay subscribed.
                  </div>
                </div>

                <div className="inline-flex w-fit rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                  Limited founder cohort
                </div>
              </div>

              <div className="mt-5 grid gap-3 rounded-[28px] border border-black/8 bg-[#fbfbfc] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <div className="text-xs font-semibold text-app-muted">Founder pricing</div>
                  <div className="mt-1 text-2xl font-semibold tracking-tight text-app-ink sm:text-3xl">
                    {founderPrice.label}
                  </div>
                  <div className="mt-1 text-sm text-app-muted">{founderPrice.sub}</div>

                  {hasCountry ? (
                    <div className="mt-3 space-y-2">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <div className="text-sm text-app-muted">
                          After launch:{" "}
                          <span className="font-semibold text-app-ink line-through decoration-black/25">
                            {launchAnnualPrice.label}
                          </span>
                        </div>
                        <div className="text-sm text-app-muted">
                          ({launchMonthlyPrice.label})
                        </div>
                      </div>

                      <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 w-fit">
                        {savings}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 text-sm text-app-muted">
                      Select your country on the form to reveal your exact Founder price, after-launch price, and savings.
                    </div>
                  )}
                </div>

                <div className="grid gap-2 sm:justify-items-end">
                  <div className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-app-ink">
                    Locked rate
                  </div>
                  <div className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-app-ink">
                    30-day refund after launch
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <FeatureCard
                  eyebrow="Onboarding"
                  title="Setup help"
                  text="We help you implement the tracking and reconciliation flow so you can start seeing proof faster."
                />
                <FeatureCard
                  eyebrow="Revenue proof"
                  title="Attribution you can trust"
                  text="Know what actually drove paid orders — not just clicks, views, or influencer claims."
                />
                <FeatureCard
                  eyebrow="Support"
                  title="Founder feedback access"
                  text="You get a direct line for feedback and priority support while the product evolves."
                />
              </div>
            </div>
          </div>

          <Card className="rounded-[32px] border border-black/8 bg-white p-5 shadow-[0_28px_70px_rgba(16,24,40,0.10)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-app-ink">Join Proova</div>
                <div className="mt-1 text-xs text-app-muted">Step {step} of 3</div>
              </div>

              <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_8px_20px_rgba(16,24,40,0.04)]">
                <Image src="/proova.png" alt="Proova" width={56} height={56} className="h-full w-full object-contain" priority />
              </div>
            </div>

            {bannerMsg ? (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
                {bannerMsg}
              </div>
            ) : null}

            <div className="mt-5 space-y-5">
              {step === 1 ? (
                <>
                  <div className="text-sm font-semibold text-app-ink">Choose your path</div>

                  <Segmented
                    value={plan}
                    onChange={(v) => setPlan(v as Plan)}
                    items={[
                      {
                        value: "waitlist",
                        title: "Free waitlist",
                        desc: "Get invited when beta opens. No payment today.",
                      },
                      {
                        value: "founder",
                        title: "Founder access",
                        desc: "Priority onboarding, locked annual pricing, and direct support.",
                        badge: "Limited",
                      },
                    ]}
                  />

                  {plan === "founder" ? (
                    <div className="overflow-hidden rounded-[28px] border border-black/8 bg-[#fbfbfc] shadow-[0_12px_30px_rgba(16,24,40,0.05)]">
                      <div className="p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">
                              Founder pricing
                            </div>
                            <div className="mt-1 text-2xl font-semibold tracking-tight text-app-ink">
                              {founderPrice.label}
                            </div>
                            <div className="mt-1 text-sm text-app-muted">
                              {hasCountry
                                ? "Your personal Founder rate based on your country."
                                : "Select your country in the next step to reveal your exact Founder price."}
                            </div>
                          </div>

                          <div className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-app-ink">
                            Keep this rate
                          </div>
                        </div>

                        {hasCountry ? (
                          <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl border border-black/8 bg-white p-3">
                              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-app-muted">
                                Today
                              </div>
                              <div className="mt-1 text-sm font-semibold text-app-ink">{founderPrice.label}</div>
                            </div>

                            <div className="rounded-2xl border border-black/8 bg-white p-3">
                              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-app-muted">
                                After launch
                              </div>
                              <div className="mt-1 text-sm font-semibold text-app-ink line-through decoration-black/25">
                                {launchAnnualPrice.label}
                              </div>
                              <div className="mt-1 text-xs text-app-muted">{launchMonthlyPrice.label}</div>
                            </div>

                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
                              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                                Your savings
                              </div>
                              <div className="mt-1 text-sm font-semibold text-emerald-700">{savings}</div>
                            </div>
                          </div>
                        ) : null}
                      </div>

                      <div className="border-t border-black/8 p-4">
                        <ul className="grid gap-2 text-sm text-app-muted">
                          <li>• Lock your Founder rate before public monthly pricing starts</li>
                          <li>• Priority onboarding and setup help</li>
                          <li>• Direct founder feedback channel and early feature access</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-[28px] border border-black/8 bg-[#fbfbfc] p-4 shadow-[0_12px_30px_rgba(16,24,40,0.04)]">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">Free waitlist</div>
                      <ul className="mt-3 grid gap-2 text-sm text-app-muted">
                        <li>• Early access invite when beta opens</li>
                        <li>• Product updates and launch announcements</li>
                        <li>• Optional onboarding call when spots open</li>
                      </ul>
                    </div>
                  )}

                  <div className="pt-2">
                    <PrimaryButton
                      onClick={() => {
                        clearErrors();
                        next();
                      }}
                    >
                      Continue
                    </PrimaryButton>

                    <div className="mt-3">
                      <TrustRow />
                    </div>

                    <div className="mt-3 text-center text-xs text-app-muted">
                      You can switch between Free and Founder anytime before checkout.
                    </div>
                  </div>
                </>
              ) : null}

              {step === 2 ? (
                <>
                  <div className="text-sm font-semibold text-app-ink">Contact details</div>

                  <div id="fld-name">
                    <Field label="Name" error={errors.name}>
                      <Input
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setFieldError("name", null);
                        }}
                        placeholder="Your name"
                        className={cx(errors.name ? "ring-2 ring-red-200 border-red-200" : "")}
                      />
                    </Field>
                  </div>

                  <div id="fld-email">
                    <Field label="Email (required)" hint="We send your invite here" error={errors.email}>
                      <Input
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setFieldError("email", null);
                        }}
                        placeholder="you@company.com"
                        type="email"
                        className={cx(errors.email ? "ring-2 ring-red-200 border-red-200" : "")}
                      />
                    </Field>
                  </div>

                  <div id="fld-country">
                    <Field
                      label="Country"
                      hint={plan === "founder" ? "Required for Founder checkout" : "Optional for free waitlist"}
                      error={errors.country}
                    >
                      <ReactSelect
                        instanceId="country"
                        value={countryIso2 ? countryOptions.find((o) => o.value === countryIso2) : null}
                        onChange={(opt: any) => {
                          const v = opt?.value || "";
                          setCountryIso2(v);
                          if (errors.country) setFieldError("country", null);
                        }}
                        options={countryOptions as any}
                        placeholder="Search your country…"
                        isClearable
                        isSearchable
                        styles={selectStyles as any}
                        formatOptionLabel={(opt: any) => (
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{opt.label}</span>
                            <span className="text-xs opacity-60">+{opt.meta?.calling}</span>
                          </div>
                        )}
                      />
                    </Field>
                  </div>

                  <div id="fld-whatsapp">
                    <Field
                      label="WhatsApp (recommended)"
                      hint="Faster onboarding + updates"
                      error={errors.whatsapp}
                    >
                      <div
                        className={cx(
                          "rounded-2xl border bg-white px-3 py-2 shadow-[0_8px_20px_rgba(16,24,40,0.03)]",
                          errors.whatsapp ? "border-red-200 ring-2 ring-red-200" : "border-black/10"
                        )}
                      >
                        <PhoneInput
                          international
                          defaultCountry={(countryIso2 || "NG") as any}
                          value={whatsapp}
                          onChange={(v) => {
                            setWhatsapp(v || "");
                            if (errors.whatsapp) setFieldError("whatsapp", null);
                          }}
                          placeholder="Enter WhatsApp number"
                        />
                      </div>
                      <div className="mt-2 text-xs text-app-muted">
                        This helps us confirm onboarding and reach you faster.
                      </div>
                    </Field>
                  </div>

                  {plan === "founder" && hasCountry ? (
                    <div className="overflow-hidden rounded-[28px] border border-black/8 bg-[#fbfbfc] shadow-[0_12px_30px_rgba(16,24,40,0.05)]">
                      <div className="p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">
                              Checkout preview
                            </div>
                            <div className="mt-1 text-lg font-semibold text-app-ink">{checkoutSummary.label}</div>
                            <div className="mt-1 text-xs text-app-muted">{checkoutSummary.sub}</div>

                            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-app-muted">
                              <span>After launch:</span>
                              <span className="font-semibold text-app-ink line-through decoration-black/25">
                                {launchAnnualPrice.label}
                              </span>
                              <span>({launchMonthlyPrice.label})</span>
                            </div>
                          </div>

                          <div className="grid gap-2 sm:justify-items-end">
                            <div className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-app-ink">
                              {provider === "paystack" ? "Paystack" : paddleReady ? "Paddle" : "Paddle soon"}
                            </div>
                            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                              {savings}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <Field label="Business (optional)">
                    <Input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Brand / store name" />
                  </Field>

                  <div className="rounded-[28px] border border-black/8 bg-[#fbfbfc] p-4 shadow-[0_12px_30px_rgba(16,24,40,0.04)]">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">Why we ask this</div>
                    <div className="mt-2 text-sm leading-6 text-app-muted">
                      We onboard in small batches. These details help us prioritise businesses that are ready to
                      measure ROI clearly.
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <SecondaryButton onClick={back} disabled={busy}>
                      Back
                    </SecondaryButton>
                    <PrimaryButton
                      disabled={busy}
                      onClick={() => {
                        clearErrors();
                        const err = validateContact(plan);
                        if (err) return setBannerMsg(err);
                        next();
                      }}
                    >
                      Continue
                    </PrimaryButton>
                  </div>
                </>
              ) : null}

              {step === 3 ? (
                <>
                  <div className="text-sm font-semibold text-app-ink">Review & finish</div>

                  <div className="grid gap-3">
                    <div className="rounded-[28px] border border-black/8 bg-[#fbfbfc] p-4 shadow-[0_12px_30px_rgba(16,24,40,0.04)]">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">Selected plan</div>
                      <div className="mt-1 text-sm font-semibold text-app-ink">
                        {plan === "founder" ? "Founder access" : "Free waitlist"}
                      </div>

                      {plan === "founder" ? (
                        <div className="mt-2 space-y-1 text-sm text-app-muted">
                          <div>
                            {checkoutSummary.label} • Pay via {provider === "paystack" ? "Paystack" : paddleReady ? "Paddle" : "Paddle soon"}
                          </div>
                          {hasCountry ? (
                            <div>
                              After launch:{" "}
                              <span className="font-semibold text-app-ink line-through decoration-black/25">
                                {launchAnnualPrice.label}
                              </span>{" "}
                              <span>({launchMonthlyPrice.label})</span>
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div className="mt-2 text-sm text-app-muted">No payment today.</div>
                      )}
                    </div>

                    <div className="rounded-[28px] border border-black/8 bg-[#fbfbfc] p-4 shadow-[0_12px_30px_rgba(16,24,40,0.04)]">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">
                        Optional details for onboarding
                      </div>

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
                            <option value="no_roi">I can’t prove ROI by influencer/campaign</option>
                            <option value="influencer_claims">Influencers claim results I can’t verify</option>
                            <option value="unattributed_transfers">Transfers come in with no reference</option>
                            <option value="refund_confusion">Refunds make my totals confusing</option>
                            <option value="other">Other</option>
                          </Select>
                        </Field>

                        <Field label="Notes (optional)">
                          <Input
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="e.g., 20 influencers/month, mostly Instagram"
                          />
                        </Field>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-app-muted">
                    By continuing, you agree to receive onboarding updates. No spam.
                  </div>

                  <div className="flex gap-2 pt-2">
                    <SecondaryButton onClick={back} disabled={busy}>
                      Back
                    </SecondaryButton>
                    <PrimaryButton onClick={() => submit(plan)} disabled={busy}>
                      {busy
                        ? plan === "founder"
                          ? "Opening checkout..."
                          : "Submitting..."
                        : plan === "founder"
                        ? "Proceed to secure checkout"
                        : "Join waitlist"}
                    </PrimaryButton>
                  </div>

                  <div className="mt-3">
                    <TrustRow />
                  </div>

                  <div className="rounded-[28px] border border-black/8 bg-[#fbfbfc] p-4 shadow-[0_12px_30px_rgba(16,24,40,0.04)]">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-app-muted">What happens next</div>
                    <div className="mt-2 text-sm leading-6 text-app-muted">
                      {plan === "founder"
                        ? "You’ll be redirected to secure checkout. After payment, you’ll receive Founder confirmation and a link to book your onboarding call."
                        : "We’ll reach out before beta opens. Founder users get priority onboarding and locked pricing."}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </Card>
        </div>

        <div className="h-10 sm:h-14" />
      </div>
    </main>
  );
}