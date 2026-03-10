"use client";

import * as React from "react";
import Link from "next/link";
import { FiShield, FiLock, FiFileText } from "react-icons/fi";
import { Section, FeaturePill } from "../tour-ui";

export function TrustSection() {
  return (
    <Section
      id="trust"
      icon={FiShield}
      eyebrow="Trust"
      title="Security, privacy, and compliance"
      desc="Before launch, we’re building bank linking and stronger attribution controls — and we’re keeping data handling clear and minimal."
      tone="tinted"
    >
      <div className="grid gap-3 md:grid-cols-3">
        <Link href="/trust" className="block">
          <FeaturePill
            mark="S"
            icon={FiShield}
            title="Security"
            desc="How we protect accounts, tokens, and stored data."
          />
        </Link>

        <Link href="/trust" className="block">
          <FeaturePill
            mark="P"
            icon={FiLock}
            title="Privacy"
            desc="What we collect, why we collect it, and how deletion works."
          />
        </Link>

        <Link href="/trust" className="block">
          <FeaturePill
            mark="C"
            icon={FiFileText}
            title="Compliance"
            desc="How we support GDPR/CCPA-style requirements for merchants."
          />
        </Link>
      </div>

      <div className="mt-6 rounded-3xl border border-app-border bg-white/70 p-5">
        <div className="text-sm font-semibold text-app-ink">Simple promise</div>
        <p className="mt-2 text-sm leading-6 text-app-muted">
          Proova is built for revenue attribution — not for selling data. We keep data minimal, provide export tools,
          and allow workspace deletion to clear stored history.
        </p>
      </div>
    </Section>
  );
}