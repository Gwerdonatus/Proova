"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHome, FiActivity, FiLink2, FiPlay, FiClock } from "react-icons/fi";

import { THEME } from "@/components/tour/TourTheme";
import { Section } from "@/components/tour/tour-ui";
import { TrustSection } from "@/components/tour/sections/TrustSection";
import { IntegrationsAndStatus } from "@/components/tour/sections/IntegrationsAndStatus";
import { WhatProovaDoes } from "@/components/tour/sections/WhatProovaDoes";
import { HowItWorks } from "@/components/tour/sections/HowItWorks";
import { VideoLongDemo } from "@/components/tour/sections/VideoLongDemo";
import { VideoShorts } from "@/components/tour/sections/VideoShorts";
import { ScreenshotSection } from "@/components/tour/sections/ScreenshotSection";
import { FAQ } from "@/components/tour/sections/FAQ";
import { TourHero } from "@/components/tour/sections/TourHero";

const TOP_NAV = [
  { id: "overview", label: "Overview" },
  { id: "how", label: "How it works" },
  { id: "proof", label: "Proof & reporting" },
  { id: "status", label: "Status & roadmap" },
  { id: "trust", label: "Security & privacy" },
] as const;

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-14">
      {children}
    </div>
  );
}

function ContentBand({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`w-full max-w-full ${className}`}>{children}</div>;
}

function TopNav() {
  return (
    <nav className="mt-6 pb-1">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm sm:text-[15px]">
        {TOP_NAV.map((x) => (
          <a
            key={x.id}
            href={`#${x.id}`}
            className="font-semibold text-app-muted transition-colors hover:text-app-ink"
          >
            {x.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default function TourPage() {
  return (
    <main className="relative isolate min-h-screen w-full max-w-full overflow-x-hidden bg-app-bg text-app-ink">
      {/* Background polish */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-48 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${THEME.warm}, transparent 60%)`,
          }}
        />
        <div
          className="absolute -bottom-56 right-[-160px] h-[740px] w-[740px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(36,20,14,0.10), transparent 62%)`,
          }}
        />
      </div>

      <PageShell>
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 pt-5 sm:pt-6">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-2xl border border-app-border bg-white shadow-soft">
              <Image
                src="/proova.png"
                alt="Proova"
                width={56}
                height={56}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-semibold tracking-tight text-app-ink">
                Proova
              </div>
              <div className="text-xs text-app-muted">Tour</div>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-app-border bg-white px-4 py-2 text-xs font-semibold text-app-ink shadow-soft transition hover:bg-white/80"
          >
            <FiHome className="h-4 w-4 text-app-ink" />
            Home
          </Link>
        </div>

        <TopNav />
      </PageShell>

      {/* Overview */}
      <section id="overview" className="scroll-mt-24 pt-6 sm:pt-8 lg:pt-10">
        <PageShell>
          <ContentBand>
            <TourHero />
          </ContentBand>
        </PageShell>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-24 pt-12 sm:pt-14 lg:pt-18">
        <PageShell>
          <ContentBand>
            <Section
              icon={FiActivity}
              eyebrow="How Proova works"
              title="Proova measures revenue — across the real buying journey."
              desc="Whether customers pay on checkout or pay later off-site, Proova ties confirmed money back to where it came from."
              tone="tinted"
            >
              <div className="space-y-10 sm:space-y-12 lg:space-y-14">
                <WhatProovaDoes />
                <Section
                  icon={FiLink2}
                  title="A simple loop: capture → confirm → report."
                  desc="No noise. No fake conversions. Clean evidence."
                >
                  <HowItWorks />
                </Section>
              </div>
            </Section>
          </ContentBand>
        </PageShell>
      </section>

      {/* Proof */}
      <section id="proof" className="scroll-mt-24 pt-12 sm:pt-14 lg:pt-18">
        <PageShell>
          <ContentBand>
            <Section
              icon={FiPlay}
              eyebrow="Proof & reporting"
              title="See the workflow and how merchants use it"
              desc="Watch the demo, then browse short clips and screenshots that explain each screen."
              tone="tinted"
            >
              <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                <VideoLongDemo />
                <VideoShorts />
              </div>
            </Section>
          </ContentBand>
        </PageShell>
      </section>

      {/* Full-width screenshot area */}
      <section className="pt-12 sm:pt-14 lg:pt-18">
        <div className="w-full max-w-full overflow-x-hidden">
          <ScreenshotSection />
        </div>
      </section>

      {/* Status */}
      <section id="status" className="scroll-mt-24 pt-12 sm:pt-14 lg:pt-18">
        <PageShell>
          <ContentBand>
            <Section
              icon={FiClock}
              eyebrow="Product status"
              title="What’s live now vs what’s included at launch."
              desc="Live today: revenue proof + reconciliation. Included at launch: bank linking, chargebacks, and serious attribution controls."
              tone="tinted"
            >
              <IntegrationsAndStatus />
            </Section>
          </ContentBand>
        </PageShell>
      </section>

      {/* Trust */}
      <section id="trust" className="scroll-mt-24 pt-12 sm:pt-14 lg:pt-18">
        <PageShell>
          <ContentBand>
            <TrustSection />
          </ContentBand>
        </PageShell>
      </section>

      <section className="pt-12 sm:pt-14 lg:pt-18">
        <div className="w-full max-w-full overflow-x-hidden">
          <FAQ />
        </div>
      </section>
    </main>
  );
}