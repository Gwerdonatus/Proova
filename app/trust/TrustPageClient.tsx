"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiShield,
  FiLock,
  FiDatabase,
  FiCheckCircle,
  FiGlobe,
  FiFileText,
  FiAlertTriangle,
  FiTrash2,
  FiKey,
  FiServer,
  FiHelpCircle,
  FiExternalLink,
  FiClock,
} from "react-icons/fi";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Brand edge gradients:
 * - White base
 * - Multi-tone blues + purples + warm accents
 * - Only subtle color around the edges + light hero glow
 */
const BRAND = {
  blueA: "rgba(37, 99, 235, 0.16)",
  blueB: "rgba(59, 130, 246, 0.14)",
  blueC: "rgba(96, 165, 250, 0.12)",

  purpleA: "rgba(124, 58, 237, 0.16)",
  purpleB: "rgba(139, 92, 246, 0.14)",
  purpleC: "rgba(167, 139, 250, 0.12)",

  pinkA: "rgba(236, 72, 153, 0.12)",
  orangeA: "rgba(249, 115, 22, 0.12)",
  yellowA: "rgba(245, 158, 11, 0.10)",
};

function Chip({
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
        tone === "solid"
          ? "bg-white text-app-ink shadow-soft"
          : "bg-white/60 text-app-muted"
      )}
    >
      {children}
    </span>
  );
}

function Section({
  id,
  eyebrow,
  title,
  desc,
  icon: Icon,
  children,
  tone = "plain",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  desc?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
  tone?: "plain" | "tinted";
}) {
  return (
    <section
      id={id}
      className={cx(
        "mt-12 scroll-mt-24",
        tone === "tinted"
          ? "rounded-[28px] border border-app-border bg-white/70 p-5 shadow-soft backdrop-blur sm:p-7"
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
            <p className="mt-2 max-w-3xl text-sm leading-6 text-app-muted md:text-base">
              {desc}
            </p>
          ) : null}
        </div>
      </div>

      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}

function InfoCard({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-app-border bg-white p-5 shadow-soft">
      <div className="flex items-start gap-3">
        <div
          className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-app-border bg-white shadow-soft"
          aria-hidden="true"
        >
          <Icon className="h-[18px] w-[18px] text-app-ink" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-app-ink">{title}</div>
          <div className="mt-1 text-sm leading-6 text-app-muted">{desc}</div>
          {children ? <div className="mt-3">{children}</div> : null}
        </div>
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-6 text-app-muted">
      {items.map((x) => (
        <li key={x} className="flex gap-2">
          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-black/20" />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

function AnchorNav() {
  const items = [
    ["Security controls", "#security"],
    ["Data & privacy", "#privacy"],
    ["Compliance posture", "#compliance"],
    ["Bank linking approach", "#bank-linking"],
    ["Deletion & exports", "#deletion"],
  ] as const;

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {items.map(([label, href]) => (
        <a
          key={href}
          href={href}
          className="inline-flex items-center rounded-full border border-app-border bg-white px-4 py-2 text-xs font-semibold text-app-ink shadow-soft hover:bg-white/80"
        >
          {label}
        </a>
      ))}
    </div>
  );
}

export default function TrustPageClient() {
  return (
    <main className="relative min-h-screen bg-white text-app-ink">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(900px 540px at 10% 12%, ${BRAND.purpleA}, transparent 60%),
              radial-gradient(760px 520px at 90% 10%, ${BRAND.blueA}, transparent 62%),
              radial-gradient(860px 560px at 92% 86%, ${BRAND.purpleB}, transparent 64%),
              radial-gradient(760px 520px at 10% 92%, ${BRAND.blueB}, transparent 64%),
              radial-gradient(520px 420px at 55% 92%, ${BRAND.orangeA}, transparent 68%),
              radial-gradient(520px 420px at 55% 8%, ${BRAND.pinkA}, transparent 70%)
            `,
          }}
        />

        <div
          className="absolute -top-56 left-[-220px] h-[640px] w-[640px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${BRAND.purpleC}, transparent 65%)`,
          }}
        />
        <div
          className="absolute -top-56 right-[-220px] h-[640px] w-[640px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${BRAND.blueC}, transparent 65%)`,
          }}
        />
        <div
          className="absolute -bottom-64 left-[-260px] h-[700px] w-[700px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${BRAND.blueA}, transparent 68%)`,
          }}
        />
        <div
          className="absolute -bottom-64 right-[-260px] h-[700px] w-[700px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${BRAND.purpleA}, transparent 68%)`,
          }}
        />
        <div
          className="absolute -bottom-72 left-1/2 h-[740px] w-[740px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${BRAND.yellowA}, transparent 68%)`,
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-2xl border border-app-border bg-white shadow-soft">
              <Image
                src="/proova.png"
                alt="Proova"
                width={56}
                height={56}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-app-ink">
                Proova
              </div>
              <div className="text-xs text-app-muted">
                Security • Privacy • Compliance
              </div>
            </div>
          </Link>

          <div className="h-10 w-10" aria-hidden="true" />
        </div>

        <section className="mt-10">
          <div className="relative overflow-hidden rounded-[28px] border border-app-border bg-white/75 p-6 shadow-soft backdrop-blur sm:p-8">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div
                className="absolute -top-24 left-[12%] h-[340px] w-[340px] rounded-full blur-3xl"
                style={{
                  background: `radial-gradient(circle, ${BRAND.blueB}, transparent 70%)`,
                }}
              />
              <div
                className="absolute -top-20 right-[10%] h-[360px] w-[360px] rounded-full blur-3xl"
                style={{
                  background: `radial-gradient(circle, ${BRAND.purpleB}, transparent 72%)`,
                }}
              />
              <div
                className="absolute -bottom-28 left-[42%] h-[360px] w-[360px] rounded-full blur-3xl"
                style={{
                  background: `radial-gradient(circle, ${BRAND.orangeA}, transparent 72%)`,
                }}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Chip tone="solid">Trust</Chip>
              <Chip>Security</Chip>
              <Chip>Privacy</Chip>
              <Chip>Compliance posture</Chip>
            </div>

            <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Built to earn trust — not ask for it.
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-app-muted sm:text-base">
              Proova helps you prove where revenue came from. That only works if merchants are
              confident about security and data handling. This page describes our approach, the
              controls we use, and how we think about compliance as we scale globally.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <div className="rounded-3xl border border-app-border bg-white/70 p-4 shadow-soft">
                <div className="flex items-center gap-2">
                  <FiShield className="h-4 w-4 text-app-ink" />
                  <div className="text-sm font-semibold text-app-ink">Minimize data</div>
                </div>
                <div className="mt-1 text-sm leading-6 text-app-muted">
                  We focus on attribution proof and reduce sensitive exposure where possible.
                </div>
              </div>

              <div className="rounded-3xl border border-app-border bg-white/70 p-4 shadow-soft">
                <div className="flex items-center gap-2">
                  <FiLock className="h-4 w-4 text-app-ink" />
                  <div className="text-sm font-semibold text-app-ink">Protect access</div>
                </div>
                <div className="mt-1 text-sm leading-6 text-app-muted">
                  Secrets and integrations are treated as sensitive and handled carefully.
                </div>
              </div>

              <div className="rounded-3xl border border-app-border bg-white/70 p-4 shadow-soft">
                <div className="flex items-center gap-2">
                  <FiTrash2 className="h-4 w-4 text-app-ink" />
                  <div className="text-sm font-semibold text-app-ink">Control</div>
                </div>
                <div className="mt-1 text-sm leading-6 text-app-muted">
                  Export data and request deletion of your workspace when needed.
                </div>
              </div>
            </div>

            <AnchorNav />
          </div>
        </section>

        <Section
          id="security"
          icon={FiLock}
          eyebrow="Security controls"
          title="How we protect accounts and data"
          desc="Practical safeguards designed for everyday merchant workflows."
          tone="tinted"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={FiKey}
              title="Secrets and integrations"
              desc="API keys and credentials are handled as sensitive configuration."
            >
              <BulletList
                items={[
                  "Restrict internal access to production systems where possible.",
                  "Avoid exposing full secrets in the UI after setup.",
                  "Prefer scoped permissions when connecting external services.",
                ]}
              />
            </InfoCard>

            <InfoCard
              icon={FiServer}
              title="Operational safety"
              desc="Systems are designed for reliability and safe failure modes."
            >
              <BulletList
                items={[
                  "Server-side click capture before redirect to reduce attribution loss.",
                  "Basic abuse protection on public endpoints (rate limiting where applicable).",
                  "Monitoring and logging for suspicious patterns and system health.",
                ]}
              />
            </InfoCard>

            <InfoCard
              icon={FiShield}
              title="Subscription payments"
              desc="Billing is handled by established payment providers."
            >
              <BulletList
                items={[
                  "We do not store your card details on Proova servers.",
                  "Refunds for subscriptions can be processed through the payment provider where applicable.",
                ]}
              />
            </InfoCard>

            <InfoCard
              icon={FiAlertTriangle}
              title="Security reporting"
              desc="If you believe you found an issue, we want to hear about it."
            >
              <div className="rounded-2xl border border-app-border bg-white/70 p-4 text-sm leading-6 text-app-muted">
                Contact:{" "}
                <span className="font-semibold text-app-ink">proovaapp@outlook.com</span>
              </div>
            </InfoCard>
          </div>

          <div className="mt-6 rounded-3xl border border-app-border bg-white/70 p-5">
            <div className="flex items-center gap-2">
              <FiClock className="h-4 w-4 text-app-ink" />
              <div className="text-sm font-semibold text-app-ink">
                Certifications and audits
              </div>
            </div>
            <p className="mt-2 text-sm leading-6 text-app-muted">
              As Proova scales, we expect to pursue additional formal security reviews.
              Until then, we focus on strong foundations, clear documentation, and merchant
              control over data.
            </p>
          </div>
        </Section>

        <Section
          id="privacy"
          icon={FiDatabase}
          eyebrow="Data & privacy"
          title="What Proova collects (and what it avoids)"
          desc="Attribution is built around proof — not surveillance."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={FiFileText}
              title="Data we commonly store"
              desc="Information needed to connect revenue back to sources, campaigns, and influencers."
            >
              <BulletList
                items={[
                  "Tracking data: click IDs, timestamps, referrer, basic device/browser metadata.",
                  "Structure: sources, campaigns, influencers, tracking links, reference codes.",
                  "Revenue metadata: order IDs, amounts, currency, status (confirmed/refunded/chargeback when supported).",
                  "Reconciliation imports you upload (e.g., CSV statements) to match payments to proof.",
                ]}
              />
            </InfoCard>

            <InfoCard
              icon={FiShield}
              title="Data we avoid by default"
              desc="We minimize exposure unless it’s required for the workflow."
            >
              <BulletList
                items={[
                  "We do not need online banking passwords.",
                  "We do not use invasive fingerprinting as a default approach.",
                  "We do not sell merchant data.",
                ]}
              />
            </InfoCard>
          </div>

          <div className="mt-6 rounded-3xl border border-app-border bg-white/70 p-5">
            <div className="flex items-center gap-2">
              <FiGlobe className="h-4 w-4 text-app-ink" />
              <div className="text-sm font-semibold text-app-ink">Global usage</div>
            </div>
            <p className="mt-2 text-sm leading-6 text-app-muted">
              Proova is designed for global merchants. If your organization requires specific
              contractual terms (e.g., DPA) or region-based data handling, we support that as part
              of onboarding where possible.
            </p>
          </div>
        </Section>

        <Section
          id="compliance"
          icon={FiCheckCircle}
          eyebrow="Compliance posture"
          title="GDPR / UK GDPR / CCPA — how we approach compliance"
          desc="We take privacy seriously and design to reduce risk for merchants."
          tone="tinted"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={FiFileText}
              title="Vendor paperwork"
              desc="We can support common vendor requests (security questionnaire, DPA) during onboarding."
            />
            <InfoCard
              icon={FiHelpCircle}
              title="Influencer disclosure compliance"
              desc="Proova can store campaign evidence, but disclosure requirements remain the merchant’s responsibility (FTC/ASA/platform rules)."
            />
          </div>

          <div className="mt-6 rounded-3xl border border-app-border bg-white/70 p-5">
            <div className="flex items-center gap-2">
              <FiAlertTriangle className="h-4 w-4 text-app-ink" />
              <div className="text-sm font-semibold text-app-ink">Tax reporting note</div>
            </div>
            <p className="mt-2 text-sm leading-6 text-app-muted">
              Revenue reporting can be configured to match how your store treats tax (e.g., VAT-inclusive vs net).
              When available through integrations, Proova can separate tax amounts from net revenue for reporting.
            </p>
          </div>
        </Section>

        <Section
          id="bank-linking"
          icon={FiGlobe}
          eyebrow="Bank linking"
          title="How bank linking will work (UK / US / Africa)"
          desc="Bank linking must be done through established providers — not scraping."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={FiShield}
              title="Provider-based bank linking"
              desc="Bank connections should be implemented through region-appropriate aggregators."
            >
              <BulletList
                items={[
                  "UK/EU: Open Banking providers (regulated access).",
                  "US/Canada: providers covering major banks (e.g., Chase, Bank of America, Wells Fargo).",
                  "Africa: aggregator coverage varies by country and bank.",
                ]}
              />
            </InfoCard>

            <InfoCard
              icon={FiLock}
              title="What we won’t do"
              desc="High-risk approaches that create legal and security problems."
            >
              <BulletList
                items={[
                  "No online banking passwords.",
                  "No screen-scraping bank websites.",
                  "No storing raw bank login credentials.",
                ]}
              />
            </InfoCard>
          </div>

          <div className="mt-6 rounded-3xl border border-app-border bg-white/70 p-5">
            <div className="text-sm font-semibold text-app-ink">Reliable fallback</div>
            <p className="mt-2 text-sm leading-6 text-app-muted">
              Because bank coverage differs by region, Proova supports CSV imports as a dependable fallback
              so reconciliation still works even without a live bank connection.
            </p>
          </div>
        </Section>

        <Section
          id="deletion"
          icon={FiTrash2}
          eyebrow="Control"
          title="Exports, retention, and deletion"
          desc="You shouldn’t feel trapped if you cancel."
          tone="tinted"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={FiDatabase}
              title="Export your data"
              desc="Export workspace data for records or migration."
            />
            <InfoCard
              icon={FiTrash2}
              title="Delete your workspace"
              desc="Request deletion of your workspace and associated data."
            />
          </div>

          <div className="mt-6 rounded-3xl border border-app-border bg-white/70 p-5">
            <div className="text-sm font-semibold text-app-ink">Retention approach</div>
            <p className="mt-2 text-sm leading-6 text-app-muted">
              Data is retained only as long as needed to provide the service and meet legitimate operational needs
              (for example, billing records). Retention requirements can be discussed during onboarding where needed.
            </p>
          </div>
        </Section>

        <section className="mt-10 pb-14">
          <div className="rounded-[28px] border border-app-border bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="solid">Questions?</Chip>
              <Chip>Security questionnaire</Chip>
              <Chip>DPA</Chip>
            </div>

            <div className="mt-4 text-lg font-semibold tracking-tight text-app-ink">
              Procurement or compliance review?
            </div>
            <p className="mt-2 text-sm leading-6 text-app-muted">
              If your team needs a security questionnaire response or vendor documentation,
              reach us here:
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <a
                href="mailto:proovaapp@outlook.com"
                className="inline-flex items-center gap-2 rounded-full border border-app-border bg-white px-4 py-2 text-xs font-semibold text-app-ink shadow-soft hover:bg-white/80"
              >
                proovaapp@outlook.com
                <FiExternalLink className="h-4 w-4" />
              </a>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-app-border bg-white px-4 py-2 text-xs font-semibold text-app-ink shadow-soft hover:bg-white/80"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}