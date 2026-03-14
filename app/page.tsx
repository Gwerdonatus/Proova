"use client";

import * as React from "react";

import { BackgroundDecor } from "@/components/landing/BackgroundDecor";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { OffsiteProofSection } from "@/components/landing/OffsiteProofSection";
import { MobileStickyCTA } from "@/components/landing/MobileStickyCTA";

export default function LandingPage() {
  function goWaitlist() {
    window.location.href = "/waitlist";
  }

  function goTour() {
    window.location.href = "/tour";
  }

  return (
    <main id="top" className="relative min-h-screen bg-app-bg text-app-ink">
      <BackgroundDecor />

      <SiteHeader onWatchDemo={goTour} onJoinWaitlist={goWaitlist} />

      <HeroSection
        onJoinWaitlist={goWaitlist}
        onWatchDemo={goTour}
        onViewPricing={goWaitlist}
      />

      {/* How Proova Works */}
      <HowItWorksSection />

      {/* Existing Q&A / reasoning section */}
      <OffsiteProofSection />

      <div className="h-24 md:hidden" />
      <MobileStickyCTA onJoinWaitlist={goWaitlist} onWatchDemo={goTour} />
    </main>
  );
}