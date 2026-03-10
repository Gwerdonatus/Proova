"use client";

import * as React from "react";
import { FiHelpCircle, FiUsers, FiShield, FiClock } from "react-icons/fi";
import { THEME } from "../TourTheme";

export function FAQ() {
  const faqs = [
    {
      q: "Is this just Google Analytics?",
      a: "No. Analytics tools focus on sessions and onsite events. Proova focuses on confirmed revenue and ties it back to the source that produced payment — online or off-site.",
      icon: FiHelpCircle,
      tone: "brown" as const,
    },
    {
      q: "Does it only work for WhatsApp?",
      a: "No. It works for any off-site flow: Instagram, TikTok, WhatsApp, calls, agents — anywhere a buyer leaves your site and pays later.",
      icon: FiUsers,
      tone: "light" as const,
    },
    {
      q: "How do you keep it honest?",
      a: "Proova separates attributed vs unattributed revenue. Anything unclear stays unattributed, and refunds are tracked so totals remain accurate.",
      icon: FiShield,
      tone: "light" as const,
    },
    {
      q: "What’s coming later?",
      a: "Deep influencer analytics, paid ads attribution (UTMs + cost + ROAS), forecasting insights, team roles, and multi-store support.",
      icon: FiClock,
      tone: "light" as const,
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold tracking-tight text-app-ink md:text-3xl">FAQ</h2>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {faqs.map((f) => {
          const Icon = f.icon;
          const isBrown = f.tone === "brown";

          return (
            <div
              key={f.q}
              className="rounded-3xl border p-5 shadow-soft"
              style={{
                background: isBrown
                  ? `linear-gradient(180deg, ${THEME.dark} 0%, ${THEME.dark2} 100%)`
                  : "white",
                borderColor: isBrown ? "rgba(255,255,255,0.12)" : "var(--app-border, rgba(0,0,0,0.10))",
                boxShadow: isBrown ? "0 18px 45px rgba(36,20,14,0.18)" : undefined,
              }}
            >
              <div
                className="rounded-2xl p-4"
                style={{
                  background: isBrown ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="mt-0.5 grid h-9 w-9 place-items-center rounded-2xl border"
                    style={{
                      background: isBrown ? "rgba(255,255,255,0.08)" : "white",
                      borderColor: isBrown ? THEME.darkBorder : "var(--app-border, rgba(0,0,0,0.10))",
                    }}
                  >
                    <Icon
                      className="h-[18px] w-[18px]"
                      style={{ color: isBrown ? THEME.darkText : "var(--app-ink, #111)" }}
                    />
                  </div>

                  <div className="min-w-0">
                    <div
                      className="text-sm font-semibold"
                      style={{ color: isBrown ? THEME.darkText : "var(--app-ink, #111)" }}
                    >
                      {f.q}
                    </div>

                    <div
                      className="mt-2 text-sm leading-6"
                      style={{ color: isBrown ? THEME.darkMuted : "var(--app-muted, rgba(0,0,0,0.65))" }}
                    >
                      {f.a}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}