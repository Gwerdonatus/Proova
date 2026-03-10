"use client";

import * as React from "react";
import { THEME, cx } from "./TourTheme";
import { useInView } from "./useInView";

export function Chip({
  children,
  tone = "soft",
}: {
  children: React.ReactNode;
  tone?: "soft" | "solid";
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        "border-app-border",
        tone === "solid" ? "bg-white text-app-ink shadow-soft" : "bg-white/60 text-app-muted"
      )}
    >
      {children}
    </span>
  );
}

export function Section({
  eyebrow,
  title,
  desc,
  children,
  tone = "plain",
  icon: Icon,
  id,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  desc?: string;
  children?: React.ReactNode;
  tone?: "plain" | "tinted";
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <section
      id={id}
      className={cx(
        "scroll-mt-24 mt-12",
        tone === "tinted"
          ? "rounded-[32px] border border-app-border bg-white/60 p-5 shadow-soft backdrop-blur sm:p-7"
          : ""
      )}
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          {eyebrow ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-app-border bg-white px-3 py-1 text-xs font-semibold text-app-muted">
              {Icon ? <Icon className="h-3.5 w-3.5 text-app-ink" /> : null}
              {eyebrow}
            </div>
          ) : null}

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-app-ink md:text-3xl">
            {title}
          </h2>

          {desc ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-app-muted md:text-base">{desc}</p>
          ) : null}
        </div>
      </div>

      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}

export function FlowConnector() {
  const uid = React.useId();
  const g = `g-${uid}`;
  return (
    <div className="relative my-10 h-10">
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={g} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(148,111,77,0.08)" />
            <stop offset="0.5" stopColor="rgba(148,111,77,0.22)" />
            <stop offset="1" stopColor="rgba(148,111,77,0.08)" />
          </linearGradient>
        </defs>
        <path
          d="M0 5 C 18 1, 35 9, 52 5 S 82 9, 100 5"
          fill="none"
          stroke={`url(#${g})`}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cx(
        "transition-all duration-700 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function IconBadge({
  icon: Icon,
  tone = "light",
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <div
      aria-hidden="true"
      className={cx("grid h-10 w-10 shrink-0 place-items-center rounded-2xl border", isDark ? "" : "shadow-soft")}
      style={{
        background: isDark ? "rgba(255,255,255,0.08)" : "white",
        borderColor: isDark ? THEME.darkBorder : "var(--app-border, rgba(0,0,0,0.10))",
        boxShadow: isDark ? "none" : "0 10px 30px rgba(0,0,0,.06)",
      }}
    >
      <Icon className={cx("h-[18px] w-[18px]", isDark ? "text-white" : "text-app-ink")} />
    </div>
  );
}

export function BrownSurface({
  children,
  className,
  sticky = false,
}: {
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
}) {
  return (
    <div
      className={cx("rounded-[32px] border p-6 shadow-soft", sticky ? "lg:sticky lg:top-24" : "", className)}
      style={{
        background: `linear-gradient(180deg, ${THEME.dark} 0%, ${THEME.dark2} 100%)`,
        borderColor: "rgba(255,255,255,0.12)",
        boxShadow: "0 18px 45px rgba(36,20,14,0.22)",
      }}
    >
      {children}
    </div>
  );
}

export function DividerLine() {
  return (
    <div
      aria-hidden="true"
      className="my-4 h-px w-full"
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.14), rgba(255,255,255,0))",
      }}
    />
  );
}

export function IconMark({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-app-border bg-white shadow-soft"
      style={{ boxShadow: "0 10px 30px rgba(0,0,0,.06)" }}
    >
      <span className="text-xs font-bold text-app-ink">{label}</span>
    </div>
  );
}

export function FeaturePill({
  title,
  desc,
  mark,
  icon: Icon,
}: {
  title: string;
  desc: string;
  mark: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-3xl border border-app-border bg-white p-5 shadow-soft h-full">
      <div className="flex items-start gap-3">
        {Icon ? <IconBadge icon={Icon} /> : <IconMark label={mark} />}
        <div className="min-w-0">
          <div className="text-sm font-semibold text-app-ink">{title}</div>
          <div className="mt-1 text-sm leading-6 text-app-muted">{desc}</div>
        </div>
      </div>
    </div>
  );
}

export function PremiumShotFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-app-border bg-white/70 shadow-soft">
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.7)" }}
      />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[520px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(148,111,77,0.14), transparent 60%)" }}
      />
      <div className="relative p-3 sm:p-4">{children}</div>
    </div>
  );
}