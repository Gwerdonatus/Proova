"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

const C = {
  bg:          "#F5F5F7",
  surface:     "#FFFFFF",
  dark:        "#111111",
  text:        "#1d1d1f",
  sub:         "#6e6e73",
  muted:       "#a1a1a6",
  border:      "#d2d2d7",
  borderLight: "#e8e8ed",
  accent:      "#0071e3",
  save:        "#92400E",
  saveBg:      "#FEF3C7",
  saveBorder:  "#FDE68A",
  emerald:     "#065F46",
  emeraldBg:   "#ECFDF5",
  emeraldBorder: "#A7F3D0",
};

const REGIONS = [
  { id: "global",  flag: "🌐", name: "Global",  desc: "International pricing",                      preview: "$149 / year"    },
  { id: "africa",  flag: "🌍", name: "Africa",  desc: "USD pricing, optimised for African markets", preview: "$99 / year"     },
  { id: "nigeria", flag: "🇳🇬", name: "Nigeria", desc: "Pricing in Naira, for Nigerian DTC brands",  preview: "₦79,000 / year" },
];

function founderUrl(region: string | null) {
  const base = "/waitlist?plan=founder";
  return region ? `${base}&region=${region}` : base;
}

const PLANS = {
  nigeria: [
    { id: "free",       badge: "FREE ACCESS", price: "Free",   period: "",      desc: "Hold your place. Upgrade to Founder before launch.", note: "No credit card. No commitment.", cta: "Reserve free spot",   href: (_r: string) => "/waitlist",               featured: false, ghost: true,  features: ["Early access at launch","Eligible for Founder pricing","Priority onboarding queue"] },
    { id: "founder",    badge: "FOUNDER",     price: "₦79k",   period: "/year", strikePrice: "₦149k", savings: "Save ₦70k/yr", desc: "For DTC brands that need to know exactly what's driving revenue.", note: "Locked for life. No price increases.", cta: "Claim Founder Spot", href: founderUrl, featured: true,  ghost: false, features: ["Full revenue attribution system","WhatsApp & offline sale tracking","Revenue dashboard by source","Influencer + campaign link tracking","Unattributed revenue reconciliation","Refund-aware reporting","30-day refund, no questions asked"] },
    { id: "enterprise", badge: "ENTERPRISE",  price: "Custom", period: "",      desc: "For agencies and high-volume brands with complex attribution needs.", cta: "Talk to us", href: (_r: string) => "mailto:hello@proova.app", featured: false, ghost: false, features: ["Everything in Founder","Multi-store attribution","Custom channel integrations","Dedicated success manager","SLA + priority support"] },
  ],
  africa: [
    { id: "free",       badge: "FREE ACCESS", price: "Free",  period: "",      desc: "Hold your place. Upgrade to Founder before launch.", note: "No credit card. No commitment.", cta: "Reserve free spot",   href: (_r: string) => "/waitlist",               featured: false, ghost: true,  features: ["Early access at launch","Eligible for Founder pricing","Priority onboarding queue"] },
    { id: "founder",    badge: "FOUNDER",     price: "$99",   period: "/year", strikePrice: "$199", savings: "Save $100/yr", desc: "For DTC brands that need to know exactly what's driving revenue.", note: "Locked for life. No price increases.", cta: "Claim Founder Spot", href: founderUrl, featured: true,  ghost: false, features: ["Full revenue attribution system","WhatsApp & offline sale tracking","Revenue dashboard by source","Influencer + campaign link tracking","Unattributed revenue reconciliation","Refund-aware reporting","30-day refund, no questions asked"] },
    { id: "enterprise", badge: "ENTERPRISE",  price: "Custom", period: "",     desc: "For agencies and high-volume brands with complex attribution needs.", cta: "Talk to us", href: (_r: string) => "mailto:hello@proova.app", featured: false, ghost: false, features: ["Everything in Founder","Multi-store attribution","Custom channel integrations","Dedicated success manager","SLA + priority support"] },
  ],
  global: [
    { id: "free",       badge: "FREE ACCESS", price: "Free",  period: "",      desc: "Hold your place. Upgrade to Founder before launch.", note: "No credit card. No commitment.", cta: "Reserve free spot",   href: (_r: string) => "/waitlist",               featured: false, ghost: true,  features: ["Early access at launch","Eligible for Founder pricing","Priority onboarding queue"] },
    { id: "founder",    badge: "FOUNDER",     price: "$149",  period: "/year", strikePrice: "$299", savings: "Save $150/yr", desc: "For DTC brands that need to know exactly what's driving revenue.", note: "Locked for life. No price increases.", cta: "Claim Founder Spot", href: founderUrl, featured: true,  ghost: false, features: ["Full revenue attribution system","WhatsApp & offline sale tracking","Revenue dashboard by source","Influencer + campaign link tracking","Unattributed revenue reconciliation","Refund-aware reporting","30-day refund, no questions asked"] },
    { id: "enterprise", badge: "ENTERPRISE",  price: "Custom", period: "",     desc: "For agencies and high-volume brands with complex attribution needs.", cta: "Talk to us", href: (_r: string) => "mailto:hello@proova.app", featured: false, ghost: false, features: ["Everything in Founder","Multi-store attribution","Custom channel integrations","Dedicated success manager","SLA + priority support"] },
  ],
};

const FAQS = [
  { q: "What exactly is free access?",     a: "Free access reserves your place in the launch queue and keeps you eligible for Founder pricing. There is no permanent free tier — Proova is paid software. Free access is a bridge, not a product." },
  { q: "Will my price ever increase?",      a: "No. Your Founder rate is locked for the lifetime of your subscription. Every feature, every new channel connector, every attribution model we ship — yours automatically, at the same price." },
  { q: "Can I move between regions later?", a: "You can upgrade to a higher regional tier at any time. The rate you lock today stays locked — you cannot retroactively claim a lower tier after launch." },
  { q: "What is the refund policy?",        a: "30 days, no questions. If Proova doesn't do what we said, you get your money back. Cancel any time after that — no penalty, no friction." },
  { q: "What does Proova actually solve?",  a: "If you run influencer campaigns, WhatsApp-driven sales, or offline conversions, you likely can't trace which touchpoint produced which payment. Proova closes that gap — reconciling creator links, WhatsApp referrals, and offline events against real transaction data." },
];

// Comparison: Free vs Founder
const COMPARISON = [
  { feature: "Early access at launch",          free: true,  founder: true  },
  { feature: "Full attribution dashboard",       free: false, founder: true  },
  { feature: "WhatsApp & offline tracking",      free: false, founder: true  },
  { feature: "Influencer link attribution",      free: false, founder: true  },
  { feature: "Refund-aware reporting",           free: false, founder: true  },
  { feature: "Unattributed revenue reconciliation", free: false, founder: true },
  { feature: "Personal setup & onboarding call", free: false, founder: true  },
  { feature: "Direct roadmap influence",         free: false, founder: true  },
  { feature: "Price locked for life",            free: false, founder: true  },
];

function CheckIcon({ accent, on }: { accent?: boolean; on: boolean }) {
  if (!on) return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <path d="M4 4l6 6M10 4l-6 6" stroke={C.borderLight} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <path d="M2 7.5L5.5 11L12 3" stroke={accent ? C.accent : C.border} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SkeletonBar({ width = "100%", height = 12, style = {} }: { width?: string | number; height?: number; style?: React.CSSProperties }) {
  return <div style={{ width, height, borderRadius: 4, background: C.borderLight, ...style }} />;
}

function LockedPricingPreview() {
  return (
    <div style={{ position: "relative", marginTop: 8 }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: `linear-gradient(to bottom, transparent 0%, ${C.bg} 60%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.borderLight}`, borderRadius: 999, padding: "8px 18px", whiteSpace: "nowrap", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: C.muted }}>
          <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 12.5, fontWeight: 500, color: C.sub }}>Select your region above to unlock pricing</span>
      </div>
      <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.15fr 0.9fr", gap: 14, alignItems: "start", filter: "blur(3px)", opacity: 0.45, userSelect: "none", pointerEvents: "none" }}>
        <div style={{ background: C.surface, borderRadius: 20, border: `1px solid ${C.borderLight}`, padding: "28px 26px 24px" }}>
          <SkeletonBar width={60} height={10} style={{ marginBottom: 18 }} />
          <SkeletonBar width={80} height={42} style={{ marginBottom: 16, borderRadius: 6 }} />
          <SkeletonBar width="90%" height={10} style={{ marginBottom: 8 }} />
          <SkeletonBar width="70%" height={10} style={{ marginBottom: 24 }} />
          <SkeletonBar width="100%" height={40} style={{ borderRadius: 999, marginBottom: 20 }} />
          <div style={{ height: 1, background: C.borderLight, marginBottom: 18 }} />
          {[80, 65, 75].map((w, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}><SkeletonBar width={14} height={14} style={{ borderRadius: "50%", flexShrink: 0 }} /><SkeletonBar width={`${w}%`} height={10} /></div>)}
        </div>
        <div style={{ background: C.surface, borderRadius: 20, border: `1.5px solid ${C.accent}`, padding: "28px 26px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.accent, borderRadius: "20px 20px 0 0" }} />
          <SkeletonBar width={70} height={10} style={{ marginBottom: 24, background: "#d0e8fc" }} />
          <SkeletonBar width={100} height={52} style={{ marginBottom: 10, borderRadius: 6, background: "#e8f2fc" }} />
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}><SkeletonBar width={70} height={10} /><SkeletonBar width={60} height={18} style={{ borderRadius: 999 }} /></div>
          <SkeletonBar width="95%" height={10} style={{ marginBottom: 8 }} />
          <SkeletonBar width="75%" height={10} style={{ marginBottom: 20 }} />
          <SkeletonBar width="100%" height={46} style={{ borderRadius: 999, marginBottom: 20, background: "#b3d4f8" }} />
          <div style={{ height: 1, background: C.borderLight, marginBottom: 18 }} />
          {[90, 80, 85, 70, 88, 75, 95].map((w, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}><SkeletonBar width={14} height={14} style={{ borderRadius: "50%", flexShrink: 0, background: "#c8e4fc" }} /><SkeletonBar width={`${w}%`} height={10} style={{ background: "#e0f0fc" }} /></div>)}
        </div>
        <div style={{ background: C.surface, borderRadius: 20, border: `1px solid ${C.borderLight}`, padding: "28px 26px 24px" }}>
          <SkeletonBar width={80} height={10} style={{ marginBottom: 18 }} />
          <SkeletonBar width={90} height={42} style={{ marginBottom: 16, borderRadius: 6 }} />
          <SkeletonBar width="90%" height={10} style={{ marginBottom: 8 }} />
          <SkeletonBar width="65%" height={10} style={{ marginBottom: 24 }} />
          <SkeletonBar width="100%" height={46} style={{ borderRadius: 999, marginBottom: 20 }} />
          <div style={{ height: 1, background: C.borderLight, marginBottom: 18 }} />
          {[75, 85, 70, 80, 65].map((w, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}><SkeletonBar width={14} height={14} style={{ borderRadius: "50%", flexShrink: 0 }} /><SkeletonBar width={`${w}%`} height={10} /></div>)}
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.borderLight}` }}>
      <button onClick={() => setOpen(v => !v)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "17px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: C.text, lineHeight: 1.45 }}>{q}</span>
        <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", background: open ? C.text : C.borderLight, color: open ? C.surface : C.sub, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.18s, color 0.18s" }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && <p style={{ paddingBottom: 17, fontSize: 13.5, lineHeight: 1.85, color: C.sub, maxWidth: 540 }}>{a}</p>}
    </div>
  );
}

function PricingCard({ plan, index, region }: { plan: any; index: number; region: string | null }) {
  const [hovered, setHovered] = React.useState(false);
  const href = typeof plan.href === "function" ? plan.href(region) : plan.href;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.surface, borderRadius: 20,
        border: plan.featured ? `1.5px solid ${C.accent}` : `1px solid ${C.borderLight}`,
        display: "flex", flexDirection: "column", padding: "28px 26px 24px",
        transition: "transform 0.22s cubic-bezier(0.22,1,0.36,1), box-shadow 0.22s",
        transform: hovered ? (plan.featured ? "translateY(-6px)" : "translateY(-3px)") : "none",
        boxShadow: hovered
          ? (plan.featured ? `0 16px 48px rgba(0,113,227,0.12), 0 4px 16px rgba(0,0,0,0.06)` : `0 8px 32px rgba(0,0,0,0.08)`)
          : (plan.featured ? `0 4px 24px rgba(0,113,227,0.08)` : `0 1px 4px rgba(0,0,0,0.03)`),
        opacity: plan.ghost ? 0.72 : 1,
        position: "relative", overflow: "hidden",
        animation: `cardReveal 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms both`,
      }}
    >
      {plan.featured && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.accent, borderRadius: "20px 20px 0 0" }} />}
      <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: plan.featured ? C.accent : C.muted, marginBottom: plan.ghost ? 14 : 18, marginTop: plan.featured ? 6 : 0 }}>{plan.badge}</span>
      <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 6 }}>
        <span style={{ fontSize: plan.ghost ? 38 : plan.price === "Custom" ? 40 : 52, fontWeight: 700, letterSpacing: "-0.04em", color: plan.ghost ? C.sub : C.text, lineHeight: 1 }}>{plan.price}</span>
        {plan.period && <span style={{ fontSize: 14, color: C.sub }}>{plan.period}</span>}
      </div>
      {plan.strikePrice && (
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: C.muted, textDecoration: "line-through" }}>{plan.strikePrice}/yr at launch</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: C.save, background: C.saveBg, border: `1px solid ${C.saveBorder}`, borderRadius: 999, padding: "2px 9px" }}>{plan.savings}</span>
        </div>
      )}
      <p style={{ fontSize: 13, color: C.sub, lineHeight: 1.6, margin: 0, marginBottom: plan.note ? 6 : 16 }}>{plan.desc}</p>
      {plan.note && <p style={{ fontSize: 11.5, fontWeight: plan.featured ? 600 : 400, color: plan.featured ? C.accent : C.muted, marginBottom: 16 }}>{plan.note}</p>}
      <div style={{ flex: 1 }} />
      <Link
        href={href}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          height: plan.ghost ? 40 : 46, borderRadius: 980,
          fontSize: 13.5, fontWeight: 600, textDecoration: "none",
          margin: "16px 0", transition: "opacity 0.15s",
          background: plan.featured ? C.accent : plan.ghost ? "transparent" : C.text,
          color: plan.featured || !plan.ghost ? C.surface : C.sub,
          border: plan.ghost ? `1px solid ${C.border}` : "none",
          boxShadow: plan.featured ? `0 2px 12px rgba(0,113,227,0.3)` : "none",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.82"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
      >
        {plan.cta}
        {plan.featured && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 6 }}>
            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </Link>
      <div style={{ height: 1, background: C.borderLight, marginBottom: 18 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {plan.features.map((f: string) => (
          <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <CheckIcon accent={plan.featured} on={true} />
            <span style={{ fontSize: 13, color: plan.ghost ? C.muted : C.sub, lineHeight: 1.4 }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegionSelector({ selected, onSelect, compact = false }: { selected: string | null; onSelect: (id: string) => void; compact?: boolean }) {
  const [hovered, setHovered] = React.useState<string | null>(null);

  if (compact) {
    const current = REGIONS.find(r => r.id === selected);
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, padding: "20px 0 32px", animation: "fadeUp 0.3s ease both" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12.5, color: C.muted }}>Viewing pricing for</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 999, padding: "5px 13px 5px 11px", fontSize: 13, fontWeight: 600, color: C.text }}>
            <span style={{ fontSize: 16 }}>{current?.flag}</span>{current?.name}
          </span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {REGIONS.filter(r => r.id !== selected).map(r => (
            <button
              key={r.id}
              onClick={() => onSelect(r.id)}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === r.id ? C.borderLight : "transparent",
                border: `1px solid ${C.borderLight}`, borderRadius: 999, padding: "5px 12px",
                fontSize: 12, fontWeight: 500, color: hovered === r.id ? C.text : C.sub,
                cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5,
                transition: "background 0.15s, color 0.15s",
              }}
            >
              <span style={{ fontSize: 14 }}>{r.flag}</span>{r.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 36, paddingBottom: 32, animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.15s both" }}>
      <div className="region-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {REGIONS.map(r => {
          const isHov = hovered === r.id;
          return (
            <button
              key={r.id}
              onClick={() => onSelect(r.id)}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: isHov ? C.surface : "rgba(255,255,255,0.55)",
                border: isHov ? `1.5px solid ${C.text}` : `1px solid ${C.borderLight}`,
                borderRadius: 18, padding: "22px 20px 20px", cursor: "pointer", textAlign: "left",
                transition: "transform 0.2s cubic-bezier(0.22,1,0.36,1), border-color 0.15s, box-shadow 0.2s, background 0.15s",
                transform: isHov ? "translateY(-4px)" : "none",
                boxShadow: isHov ? "0 8px 28px rgba(0,0,0,0.09)" : "0 1px 4px rgba(0,0,0,0.03)",
                fontFamily: "inherit", width: "100%",
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 12, lineHeight: 1 }}>{r.flag}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text, letterSpacing: "-0.025em", marginBottom: 5 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: C.sub, lineHeight: 1.55, marginBottom: 12 }}>{r.desc}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: isHov ? C.accent : C.muted, transition: "color 0.15s" }}>
                <span>View pricing</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── WHY FOUNDER section components ──────────────────────────────────────────

function ReasonCard({ number, headline, body }: { number: string; headline: string; body: string }) {
  return (
    <div style={{ display: "flex", gap: 18, padding: "24px 0", borderBottom: `1px solid ${C.borderLight}` }}>
      <div style={{
        flexShrink: 0, width: 32, height: 32, borderRadius: "50%",
        background: C.dark, color: C.surface,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, fontWeight: 700, marginTop: 2,
      }}>
        {number}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 6, letterSpacing: "-0.01em" }}>{headline}</div>
        <div style={{ fontSize: 13, lineHeight: 1.8, color: C.sub }}>{body}</div>
      </div>
    </div>
  );
}

function ComparisonTable({ region }: { region: string | null }) {
  return (
    <div style={{ background: C.surface, borderRadius: 24, border: `1px solid ${C.borderLight}`, overflow: "hidden" }}>
      {/* Header row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 130px", borderBottom: `1px solid ${C.borderLight}` }}>
        <div style={{ padding: "16px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.muted, textTransform: "uppercase" }}>Feature</div>
        <div style={{ padding: "16px 0", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.muted, textTransform: "uppercase", textAlign: "center" }}>Free</div>
        <div style={{ padding: "16px 20px 16px 0", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.accent, textTransform: "uppercase", textAlign: "center", background: "rgba(0,113,227,0.04)" }}>Founder</div>
      </div>
      {COMPARISON.map((row, i) => (
        <div
          key={row.feature}
          style={{
            display: "grid", gridTemplateColumns: "1fr 100px 130px",
            borderBottom: i < COMPARISON.length - 1 ? `1px solid ${C.borderLight}` : "none",
            background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.01)",
          }}
        >
          <div style={{ padding: "13px 20px", fontSize: 13, color: C.text, fontWeight: 500 }}>{row.feature}</div>
          <div style={{ padding: "13px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckIcon on={row.free} />
          </div>
          <div style={{ padding: "13px 0", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,113,227,0.03)" }}>
            <CheckIcon accent on={row.founder} />
          </div>
        </div>
      ))}
      {/* CTA row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 130px", borderTop: `1px solid ${C.borderLight}`, background: "rgba(0,113,227,0.03)" }}>
        <div style={{ padding: "16px 20px" }} />
        <div style={{ padding: "16px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Link href="/waitlist" style={{ fontSize: 11, color: C.sub, fontWeight: 600, textDecoration: "underline", textDecorationColor: C.border }}>Join free</Link>
        </div>
        <div style={{ padding: "16px 20px 16px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Link
            href={founderUrl(region)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              background: C.accent, color: C.surface,
              borderRadius: 999, padding: "7px 16px",
              fontSize: 12, fontWeight: 700, textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.82"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            Claim spot
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [region, setRegion] = React.useState<string | null>(null);
  const [transitioning, setTransitioning] = React.useState(false);
  const plans = region ? (PLANS as Record<string, any[]>)[region] : null;

  const handleRegionSelect = (id: string) => {
    if (id === region) return;
    if (region) {
      setTransitioning(true);
      setTimeout(() => { setRegion(id); setTransitioning(false); }, 160);
    } else {
      setRegion(id);
      setTimeout(() => { document.getElementById("pricing-reveal")?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, overflowX: "hidden" }}>

      {/* ── SUBTLE RADIAL ORB ─────────────────────────────────────────── */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-5%", right: "-5%", width: "60vw", height: "60vw", maxWidth: 860, maxHeight: 860, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,113,227,0.07) 0%, transparent 68%)", filter: "blur(40px)" }} />
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", paddingTop: 80, paddingBottom: 0, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${C.border}`, borderRadius: 999, padding: "5px 18px", fontSize: 13.5, color: C.sub, fontWeight: 400, marginBottom: 28, letterSpacing: "0.005em", animation: "fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both" }}>
          Pricing
        </div>
        <h1 style={{ fontSize: "clamp(44px, 7vw, 80px)", lineHeight: 1.04, letterSpacing: "-0.042em", color: C.text, margin: "0 auto 22px", maxWidth: 760, animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.06s both" }}>
          <span style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", fontWeight: 700 }}>Founder </span>
          <em style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 700, letterSpacing: "-0.03em" }}>pricing</em>
        </h1>
        <p style={{ fontSize: "clamp(14px, 1.8vw, 17px)", color: C.sub, lineHeight: 1.65, margin: "0 auto", maxWidth: 400, fontWeight: 400, animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.12s both" }}>
          Locked for life at half the launch price.
          <br />
          Choose your market to see your rate.
        </p>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px 120px", position: "relative", zIndex: 1 }}>

        {/* Region selector + cards */}
        <div id="pricing">
          <RegionSelector selected={region} onSelect={handleRegionSelect} compact={!!region} />
          {!region ? (
            <LockedPricingPreview />
          ) : (
            <div
              id="pricing-reveal"
              key={region}
              className="cards-grid"
              style={{ display: "grid", gridTemplateColumns: "0.9fr 1.15fr 0.9fr", gap: 14, alignItems: "start", opacity: transitioning ? 0 : 1, transition: "opacity 0.16s ease" }}
            >
              {plans!.map((plan, i) => <PricingCard key={plan.id} plan={plan} index={i} region={region} />)}
            </div>
          )}
          {region && (
            <p style={{ textAlign: "center", fontSize: 11, color: C.muted, marginTop: 14 }}>
              All paid tiers include identical features and personal onboarding · Pricing reflects local market conditions
            </p>
          )}
        </div>

        {/* ── WHY FOUNDER — THE PERSUASION ENGINE ────────────────────── */}
        <div style={{ marginTop: 96 }} id="why-founder">

          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${C.borderLight}`, borderRadius: 999, padding: "5px 16px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.muted, textTransform: "uppercase", marginBottom: 20 }}>
              Why Founder, not Free
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.035em", color: C.text, margin: "0 auto 18px", maxWidth: 680, lineHeight: 1.1 }}>
              The waitlist is free.{" "}
              <em style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}>The cost of waiting</em>{" "}
              isn't.
            </h2>
            <p style={{ fontSize: 15, color: C.sub, lineHeight: 1.75, maxWidth: 520, margin: "0 auto" }}>
              Every month without attribution clarity means you're funding channels you can't evaluate — and starving the ones that actually work.
            </p>
          </div>

          {/* Row 1: Reasons + Comparison */}
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>

            {/* Left: 3 reasons */}
            <div style={{ background: C.surface, borderRadius: 24, padding: "32px 32px 20px", border: `1px solid ${C.borderLight}` }}>
              <p style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", color: C.muted, marginBottom: 4, textTransform: "uppercase" }}>The case for acting now</p>
              <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em", color: C.text, margin: "0 0 8px", lineHeight: 1.25 }}>
                Three reasons Founder beats free — every time.
              </h3>

              <div style={{ marginTop: 4 }}>
                <ReasonCard
                  number="01"
                  headline="Your attribution gap is costing you right now."
                  body="Every week you're running campaigns you can't evaluate. Money goes to influencers, WhatsApp follows up on leads, and bank transfers arrive with no reference. You have revenue — you just don't know what caused it."
                />
                <ReasonCard
                  number="02"
                  headline="This is the lowest price Proova will ever be."
                  body="Standard rates are 2× the Founder price. Post-launch pricing increases as features ship. Waiting doesn't save you anything — it costs you more, every year, permanently. Your Founder rate is locked from the moment you claim it."
                />
                <ReasonCard
                  number="03"
                  headline="Free access doesn't get you attribution. It gets you a queue position."
                  body="The free waitlist is a placeholder. It doesn't come with tracking, setup, a dashboard, or a direct line to the team. Founder does. If you need to measure ROI before your next campaign spend, you need Founder."
                />
              </div>

              <div style={{ marginTop: 24 }}>
                <Link
                  href={founderUrl(region)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: C.dark, color: C.surface,
                    borderRadius: 999, padding: "12px 24px",
                    fontSize: 13.5, fontWeight: 700, textDecoration: "none",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.82"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  Claim your Founder Spot
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: Comparison table + scarcity */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Comparison */}
              <div>
                <p style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", color: C.muted, textTransform: "uppercase", marginBottom: 12 }}>Free vs Founder</p>
                <ComparisonTable region={region} />
              </div>
            </div>
          </div>

          {/* Row 2: Scarcity + Onboarding + Attribution gap */}
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>

            {/* Scarcity — dark card */}
            <div style={{ background: C.dark, borderRadius: 24, padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 260 }}>
              <div>
                <p style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 14, textTransform: "uppercase" }}>Limited cohort</p>
                <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 12px", color: C.surface, lineHeight: 1.22 }}>Thirty spots.<br />Not three hundred.</h2>
                <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.42)", margin: "0 0 28px" }}>A cohort of thirty means we actually know your workflow. Every founding member gets personal setup attention, direct roadmap influence, and a direct line to the team — not a help desk ticket.</p>
              </div>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "8px 14px", marginBottom: 8 }}>
                  <div style={{ display: "flex" }}>
                    {["#C0A8BC", "#98B4C4", "#C4C0A0"].map((bg, i) => (
                      <div key={i} style={{ width: 20, height: 20, borderRadius: "50%", background: bg, border: "2px solid #111111", marginLeft: i > 0 ? -6 : 0 }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.38)" }}>12 DTC founders already secured a spot</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 16 }}>
                  {[{ val: "30", label: "Founder spots total" }, { val: "12", label: "Already claimed" }, { val: "18", label: "Spots remaining" }].map(s => (
                    <div key={s.label} style={{ textAlign: "center", background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "12px 8px" }}>
                      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.04em", color: C.surface }}>{s.val}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", lineHeight: 1.4, marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 12 }}>Spots close permanently on launch day.</p>
              </div>
            </div>

            {/* Onboarding + trust */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: C.surface, borderRadius: 24, padding: "28px", border: `1px solid ${C.borderLight}`, flex: 1 }}>
                <p style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", color: C.muted, marginBottom: 14, textTransform: "uppercase" }}>What Founder actually includes</p>
                <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
                  <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 10, background: C.bg, border: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                      <path d="M12.5 15.5v-1.333A2.667 2.667 0 009.833 11.5H4.167A2.667 2.667 0 001.5 14.167V15.5" stroke={C.text} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="7" cy="6.5" r="2.667" stroke={C.text} strokeWidth="1.6" />
                      <path d="M16.5 15.5v-1.333a2.667 2.667 0 00-2-2.58M11.833 3.587a2.667 2.667 0 010 5.173" stroke={C.text} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 5 }}>We set it up with you, personally.</div>
                    <div style={{ fontSize: 13, lineHeight: 1.75, color: C.sub }}>Store connection, tracking config, first reconciliation — done together. Not a doc link. A real person, around 3 hours. You leave the call seeing actual numbers.</div>
                  </div>
                </div>
                <div style={{ height: 1, background: C.borderLight, marginBottom: 20 }} />
                <div style={{ display: "grid", gap: 12 }}>
                  {[
                    { icon: "📊", title: "Revenue attribution from day one", desc: "Know exactly which influencer, campaign, or channel drove each sale — including WhatsApp and bank transfers." },
                    { icon: "🔒", title: "Your price, locked forever", desc: "Launch pricing is 2× higher. Your Founder rate stays fixed for as long as you're subscribed — no exceptions, no increases." },
                    { icon: "💬", title: "Direct founder channel", desc: "Slack or WhatsApp access to the team. Your feedback shapes what gets built. You're not a user number — you're a co-builder." },
                  ].map(item => (
                    <div key={item.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 18, lineHeight: 1, marginTop: 1 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 3 }}>{item.title}</div>
                        <div style={{ fontSize: 12.5, lineHeight: 1.65, color: C.sub }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Refund + trust pill */}
              <div style={{ background: C.surface, borderRadius: 20, padding: "18px 22px", border: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Lifetime price lock", "30-day refund", "Annual billing"].map(tag => (
                    <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: C.bg, border: `1px solid ${C.borderLight}`, borderRadius: 999, padding: "4px 12px", fontSize: 11.5, color: C.sub, fontWeight: 500 }}>
                      <svg width="9" height="10" viewBox="0 0 10 11" fill="none"><path d="M1.5 6L4 8.5L8.5 2.5" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={founderUrl(region)}
                  style={{ fontSize: 12, fontWeight: 700, color: C.accent, textDecoration: "none", whiteSpace: "nowrap" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  Claim spot →
                </Link>
              </div>
            </div>
          </div>

          {/* Row 3: Attribution explainer — the visceral "aha" */}
          <div style={{ background: C.surface, borderRadius: 24, padding: "40px", border: `1px solid ${C.borderLight}`, marginBottom: 14 }}>
            <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", color: C.muted, marginBottom: 14, textTransform: "uppercase" }}>The attribution gap</p>
                <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 16px", color: C.text, lineHeight: 1.25 }}>
                  Your influencer sent 400 people to your site last week. How many bought?
                </h2>
                <p style={{ fontSize: 13.5, lineHeight: 1.85, color: C.sub, marginBottom: 20 }}>
                  Not "how many clicked." Not "how many viewed." How many transferred money — and how much did that translate to in revenue you can see in your dashboard?
                </p>
                <p style={{ fontSize: 13.5, lineHeight: 1.85, color: C.sub, marginBottom: 24 }}>
                  If you can't answer that question with a number, you're running campaigns on faith. Proova closes the loop — from the first click to the confirmed bank transfer, even when the sale happened on WhatsApp, not your checkout page.
                </p>
                <Link
                  href={founderUrl(region)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: C.accent, color: C.surface,
                    borderRadius: 999, padding: "12px 24px",
                    fontSize: 13.5, fontWeight: 700, textDecoration: "none",
                    transition: "opacity 0.15s",
                    boxShadow: "0 4px 20px rgba(0,113,227,0.25)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.82"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  Get revenue clarity
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              {/* Visual: before/after comparison */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {/* Without Proova */}
                <div style={{ background: "#FFF5F5", border: "1px solid #FED7D7", borderRadius: 18, padding: "20px 22px" }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", color: "#C53030", marginBottom: 12, textTransform: "uppercase" }}>Without Proova</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      "Influencer sent 400 clicks — did it convert?",
                      "₦240,000 in transfers — which campaign drove them?",
                      "WhatsApp closed 12 sales — are they tracked?",
                      "Refunds skew totals — what's the real number?",
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                          <circle cx="7" cy="7" r="6.5" stroke="#FC8181" strokeWidth="1"/>
                          <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#FC8181" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                        <span style={{ fontSize: 12.5, color: "#744210", lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* With Proova */}
                <div style={{ background: C.emeraldBg, border: `1px solid ${C.emeraldBorder}`, borderRadius: 18, padding: "20px 22px" }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", color: "#065F46", marginBottom: 12, textTransform: "uppercase" }}>With Proova</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      "Influencer drove ₦87,000 in confirmed revenue.",
                      "Every transfer matched to a source or flagged.",
                      "WhatsApp referrals tracked, attributed, reportable.",
                      "Refund-aware: net revenue is the real number.",
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                          <path d="M2 7.5L5.5 11L12 3" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: 12.5, color: "#065F46", lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BENTO: FAQ + Final CTA ──────────────────────────────────── */}
        <div style={{ marginTop: 14 }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ background: C.surface, borderRadius: 24, padding: "28px 30px", border: `1px solid ${C.borderLight}` }}>
              <p style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", color: C.muted, marginBottom: 10, textTransform: "uppercase" }}>Questions</p>
              <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.025em", color: C.text, margin: "0 0 6px" }}>Common questions</h2>
              <div>{FAQS.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: C.dark, borderRadius: 24, padding: "32px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 7, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "4px 11px", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", marginBottom: 18 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#34C759", animation: "pulse 2s infinite" }} />
                    SPOTS CLOSE AT LAUNCH
                  </div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em", color: C.surface, margin: "0 0 12px", lineHeight: 1.25 }}>
                    If you can't explain where your revenue comes from,{" "}
                    <span style={{ color: "rgba(255,255,255,0.28)" }}>you're already making decisions in the dark.</span>
                  </h2>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: "0 0 28px", lineHeight: 1.8 }}>Select your region above. Lock your rate. The window is open now and closes when we launch.</p>
                </div>
                <div>
                  <Link
                    href={founderUrl(region)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", background: C.surface, color: C.text, borderRadius: 999, height: 46, fontSize: 13.5, fontWeight: 700, textDecoration: "none", transition: "opacity 0.15s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.86"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                  >
                    Claim your Founder Spot
                  </Link>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, flexWrap: "wrap", gap: 6 }}>
                    <a href="mailto:hello@proova.app" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textDecoration: "none" }}>hello@proova.app</a>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.16)" }}>Annual · 30-day refund</span>
                  </div>
                </div>
              </div>

              <div style={{ background: C.surface, borderRadius: 20, padding: "18px 22px", border: `1px solid ${C.borderLight}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, textAlign: "center" }}>
                  {[{ val: "30", label: "Founder spots total" }, { val: "12", label: "Already claimed" }, { val: "100%", label: "Feature parity" }].map(s => (
                    <div key={s.label}>
                      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.04em", color: C.text }}>{s.val}</div>
                      <div style={{ fontSize: 10.5, color: C.muted, lineHeight: 1.4, marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER CTA ─────────────────────────────────────────────── */}
        <div style={{ background: C.dark, borderRadius: 28, padding: "72px 56px", textAlign: "center", marginTop: 72 }}>
          <p style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.14em", color: "rgba(255,255,255,0.28)", marginBottom: 20, textTransform: "uppercase" }}>The practical next step</p>
          <h2 style={{ fontSize: "clamp(24px, 3.4vw, 40px)", fontWeight: 700, letterSpacing: "-0.035em", color: C.surface, margin: "0 auto 16px", lineHeight: 1.15, maxWidth: 600 }}>
            If you can't clearly explain where your revenue comes from,{" "}
            <span style={{ color: "rgba(255,255,255,0.32)" }}>you're already making decisions in the dark.</span>
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.32)", margin: "0 auto 40px", maxWidth: 440, lineHeight: 1.75 }}>Proova connects clicks, conversations, payments, and revenue reporting into one clear picture — before you scale the wrong channel.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
            {["Lifetime price lock", "30-day refund", "Early access advantage"].map(tag => (
              <span key={tag} style={{ display: "inline-block", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "5px 14px", fontSize: 11.5, color: "rgba(255,255,255,0.36)", fontWeight: 500 }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <Link
              href={founderUrl(region)}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.surface, color: C.text, borderRadius: 999, padding: "14px 34px", fontSize: 14, fontWeight: 700, textDecoration: "none", transition: "transform 0.18s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              Claim your Founder Spot
            </Link>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", margin: 0 }}>For founders who want revenue clarity before scaling blind.</p>
          </div>
        </div>
      </div>

      {/* ── GLOBAL STYLES ──────────────────────────────────────────────── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', -apple-system, 'Helvetica Neue', sans-serif; }

        @media (max-width: 840px) {
          .cards-grid  { grid-template-columns: 1fr !important; }
          .two-col     { grid-template-columns: 1fr !important; }
          .region-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 560px) and (max-width: 840px) {
          .cards-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .region-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .region-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}