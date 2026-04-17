"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// ─── NAV SECTIONS ─────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "privacy-policy", label: "Privacy Policy" },
  { id: "data-collection", label: "Data We Collect" },
  { id: "data-use", label: "How We Use Data" },
  { id: "data-sharing", label: "Data Sharing" },
  { id: "your-rights", label: "Your Rights" },
  { id: "security", label: "Security" },
  { id: "cookies", label: "Cookies" },
  { id: "international", label: "International Transfers" },
  { id: "retention", label: "Data Retention" },
  { id: "compliance", label: "Compliance" },
  { id: "terms", label: "Terms of Service" },
  { id: "refund-policy", label: "Refund Policy" },
  { id: "contact", label: "Contact Us" },
];

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────

function SectionAnchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-32 lg:scroll-mt-28" />;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#F5F5F7] px-3 py-1 text-[11px] font-semibold tracking-wide text-[#6E6E73] uppercase">
      {children}
    </span>
  );
}

function Badge({ color, children }: { color: "green" | "blue" | "purple"; children: React.ReactNode }) {
  const map = {
    green: "bg-[#E8F5E9] text-[#1B5E20]",
    blue: "bg-[#E3F2FD] text-[#0D47A1]",
    purple: "bg-[#F3E8FF] text-[#5B21B6]",
  };
  return (
    <span className={cx("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold", map[color])}>
      {children}
    </span>
  );
}

function Divider() {
  return <hr className="border-t border-[#E5E5EA] my-8" />;
}

function PolicyH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 mb-4 text-[20px] sm:text-[22px] font-semibold tracking-tight text-[#1D1D1F]">
      {children}
    </h2>
  );
}

function PolicyH3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 mb-2 text-[15px] sm:text-[16px] font-semibold text-[#1D1D1F]">
      {children}
    </h3>
  );
}

function PolicyP({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-[1.8] text-[#3D3D3F] mb-4">
      {children}
    </p>
  );
}

function PolicyList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="mb-5 space-y-2 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[15px] leading-[1.7] text-[#3D3D3F]">
          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0A84FF]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CalloutBox({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7] p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[18px]">{icon}</span>
        <span className="text-[14px] font-semibold text-[#1D1D1F]">{title}</span>
      </div>
      <div className="text-[14px] leading-[1.75] text-[#3D3D3F]">{children}</div>
    </div>
  );
}

function Card({ icon, title, desc, items }: { icon: string; title: string; desc: string; items?: string[] }) {
  return (
    <div className="rounded-2xl border border-[#E5E5EA] bg-white p-4 sm:p-5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-shadow duration-300">
      <div className="text-[22px] sm:text-[24px] mb-3">{icon}</div>
      <div className="text-[15px] font-semibold text-[#1D1D1F] mb-1">{title}</div>
      <div className="text-[13px] leading-[1.7] text-[#6E6E73]">{desc}</div>
      {items && (
        <ul className="mt-3 space-y-1.5">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-[1.6] text-[#3D3D3F]">
              <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-[#0A84FF]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── SCROLLABLE TABLE WRAPPER ──────────────────────────────────────────────────

function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 overflow-x-auto rounded-2xl border border-[#E5E5EA] -mx-4 sm:mx-0">
      <div className="min-w-[480px]">
        {children}
      </div>
    </div>
  );
}

// ─── MOBILE NAV PILL ──────────────────────────────────────────────────────────

function MobileNav({ active }: { active: string }) {
  const [open, setOpen] = React.useState(false);
  const activeLabel = NAV_SECTIONS.find((s) => s.id === active)?.label ?? "Navigate";

  return (
    <div className="lg:hidden sticky top-[57px] z-30 bg-white/90 backdrop-blur-xl border-b border-[#E5E5EA] px-4 py-2">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-[#E5E5EA] bg-[#F5F5F7] px-4 py-2.5 text-[13px] font-medium text-[#1D1D1F]"
      >
        <span className="flex items-center gap-2">
          <span className="text-[#0A84FF]">§</span>
          {activeLabel}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={cx("transition-transform duration-200", open ? "rotate-180" : "")}
        >
          <path d="M2 4L6 8L10 4" stroke="#6E6E73" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="mt-1 rounded-xl border border-[#E5E5EA] bg-white shadow-lg overflow-hidden">
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className={cx(
                "block px-4 py-2.5 text-[13px] font-medium border-b border-[#F5F5F7] last:border-0 transition-colors",
                active === s.id
                  ? "bg-[#F0F7FF] text-[#0A84FF]"
                  : "text-[#3D3D3F] hover:bg-[#F5F5F7]"
              )}
            >
              {s.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SIDEBAR NAV ──────────────────────────────────────────────────────────────

function SidebarNav({ active }: { active: string }) {
  return (
    <nav className="sticky top-28 hidden lg:block">
      <div className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] mb-3 px-3">
        On this page
      </div>
      <ul className="space-y-0.5">
        {NAV_SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={cx(
                "block rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors duration-150",
                active === s.id
                  ? "bg-[#F5F5F7] text-[#0A84FF]"
                  : "text-[#6E6E73] hover:text-[#1D1D1F]"
              )}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function TrustPageClient() {
  const [activeSection, setActiveSection] = React.useState("overview");

  React.useEffect(() => {
    const ids = NAV_SECTIONS.map((s) => s.id);
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <main className="min-h-screen bg-white font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Segoe_UI',sans-serif] text-[#1D1D1F]">

      {/* ── TOP NAV ── */}
      <header className="sticky top-0 z-40 border-b border-[#E5E5EA] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-5 py-3 sm:py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center overflow-hidden rounded-[10px] border border-[#E5E5EA] bg-white shadow-sm">
              <Image src="/proova.png" alt="Proova" width={32} height={32} className="h-full w-full object-contain" priority />
            </div>
            <span className="text-[15px] font-semibold text-[#1D1D1F]">Proova</span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Badge color="green">GDPR Ready</Badge>
            <Badge color="blue">SOC 2 Aligned</Badge>
          </div>
        </div>
      </header>

      {/* ── MOBILE SECTION NAV ── */}
      <MobileNav active={activeSection} />

      <div className="mx-auto max-w-7xl px-4 sm:px-5">
        <div className="flex gap-8 lg:gap-12 py-8 lg:py-10">

          {/* ── SIDEBAR ── */}
          <aside className="w-48 shrink-0 hidden lg:block">
            <SidebarNav active={activeSection} />
          </aside>

          {/* ── MAIN CONTENT ── */}
          <div className="min-w-0 flex-1">

            {/* ════ HERO ════ */}
            <SectionAnchor id="overview" />
            <div className="mb-10 sm:mb-12">
              <Tag>Trust & Privacy</Tag>
              <h1 className="mt-4 text-[32px] sm:text-[42px] font-semibold tracking-tight leading-[1.1] text-[#1D1D1F]">
                Privacy. Security.<br />
                <span className="text-[#0A84FF]">Built-in.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] sm:text-[17px] leading-[1.7] text-[#6E6E73]">
                Proova is a revenue attribution platform. We earn trust by handling your data responsibly,
                maintaining strong security practices, and being transparent about everything we do with your information.
              </p>

              {/* Section pill links */}
              <div className="mt-6 hidden sm:flex flex-wrap gap-2">
                {NAV_SECTIONS.slice(1).map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="inline-flex items-center rounded-full border border-[#E5E5EA] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* ── TRUST PILLARS ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12">
              {[
                { icon: "🔒", title: "Data Minimization", desc: "We collect only what's necessary to deliver attribution. Nothing more." },
                { icon: "🛡️", title: "No Data Selling", desc: "Your data is never sold, rented, or traded to third parties — ever." },
                { icon: "⚙️", title: "You're in Control", desc: "Export, update, or delete your data at any time, no questions asked." },
              ].map((p) => (
                <div key={p.title} className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7] p-4 sm:p-5 flex sm:block gap-4 items-start">
                  <div className="text-[26px] sm:text-[28px] sm:mb-3 shrink-0">{p.icon}</div>
                  <div>
                    <div className="text-[15px] font-semibold mb-1">{p.title}</div>
                    <div className="text-[13px] leading-[1.7] text-[#6E6E73]">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Divider />

            {/* ════ PRIVACY POLICY ════ */}
            <SectionAnchor id="privacy-policy" />
            <div className="mb-2">
              <Tag>Legal</Tag>
              <h2 className="mt-3 text-[26px] sm:text-[32px] font-semibold tracking-tight text-[#1D1D1F]">Privacy Policy</h2>
              <p className="mt-2 text-[14px] text-[#6E6E73]">
                Proova, Inc. · Effective Date: April 2026 · Version 1.0
              </p>
            </div>

            <CalloutBox icon="ℹ️" title="Who this applies to">
              This Privacy Policy applies to all users of the Proova platform globally — visitors, registered customers, and end users whose data is processed through the platform. If you are in the EEA or UK, additional rights described in the International Transfers section apply to you.
            </CalloutBox>

            <PolicyP>
              Proova, Inc. ("Proova", "we", "our", or "us") operates a revenue attribution and analytics platform that helps businesses track and measure marketing performance across online and offline channels. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our platform, website, and related services (the "Services").
            </PolicyP>
            <PolicyP>
              By accessing or using our Services, you acknowledge that you have read and agree to this Privacy Policy. If you do not agree, please discontinue use immediately.
            </PolicyP>

            <PolicyH2>1. Who We Are</PolicyH2>
            <PolicyP>
              Proova, Inc. is the data controller responsible for personal data processed through our Services. For any privacy-related questions, contact us at <a href="mailto:privacy@proova.app" className="text-[#0A84FF] hover:underline">privacy@proova.app</a>.
            </PolicyP>

            <Divider />

            {/* ════ DATA COLLECTION ════ */}
            <SectionAnchor id="data-collection" />
            <Tag>Transparency</Tag>
            <PolicyH2>2. Information We Collect</PolicyH2>
            <PolicyP>
              We collect only the information necessary to operate our Services. Data falls into the following categories:
            </PolicyP>

            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 my-6">
              <Card
                icon="👤"
                title="Account & Registration"
                desc="Information needed to create and manage your Proova account."
                items={[
                  "Full name and professional title",
                  "Business email address",
                  "Company name and size",
                  "Password (stored in hashed form — never readable)",
                  "Billing contact information",
                ]}
              />
              <Card
                icon="📊"
                title="Platform & Usage Data"
                desc="Data generated as you interact with the platform."
                items={[
                  "Click IDs, session tokens, referral parameters",
                  "Timestamps of attribution events",
                  "IP address (fraud prevention & analytics)",
                  "Browser type, OS, device identifiers",
                  "Features used and navigation patterns",
                ]}
              />
              <Card
                icon="💰"
                title="Revenue & Transaction Data"
                desc="Data required for attribution and reconciliation."
                items={[
                  "Order IDs, amounts, currency, status",
                  "Product SKUs and categories (if provided)",
                  "Offline and online conversion events",
                  "CSV imports and webhook data you submit",
                ]}
              />
              <Card
                icon="💳"
                title="Billing & Payment"
                desc="Handled via PCI-DSS-compliant providers. We store only:"
                items={[
                  "Last four digits of card (reference only)",
                  "Billing address and postal code",
                  "Transaction IDs and payment status",
                  "Subscription tier and renewal history",
                ]}
              />
            </div>

            <CalloutBox icon="🔒" title="What we never collect">
              We do not store raw credit card numbers, CVV codes, online banking passwords, or banking credentials. Payment data is handled exclusively by PCI-DSS-compliant processors (Stripe). We do not use invasive fingerprinting as a default approach.
            </CalloutBox>

            <Divider />

            {/* ════ DATA USE ════ */}
            <SectionAnchor id="data-use" />
            <Tag>Purpose</Tag>
            <PolicyH2>3. How We Use Your Information</PolicyH2>

            <PolicyH3>3.1 Service Delivery</PolicyH3>
            <PolicyList items={[
              "Authenticate and maintain your account",
              "Provide attribution tracking, analytics dashboards, and reporting",
              "Process transactions and manage subscriptions",
              "Integrate with third-party platforms you authorize",
            ]} />

            <PolicyH3>3.2 Platform Improvement</PolicyH3>
            <PolicyList items={[
              "Analyze usage patterns to identify and fix bugs",
              "Develop new features and improve existing functionality",
              "Fraud detection and abuse prevention (using aggregated, anonymized data)",
            ]} />

            <PolicyH3>3.3 Communication</PolicyH3>
            <PolicyList items={[
              "Transactional emails: invoices, password resets, security alerts",
              "Product updates, release notes, and service announcements",
              "Responding to support and sales inquiries",
              "Marketing communications with your consent (opt-out available at any time)",
            ]} />

            <PolicyH3>3.4 Legal & Security Obligations</PolicyH3>
            <PolicyList items={[
              "Detect, investigate, and prevent fraud and unauthorized access",
              "Comply with applicable laws, regulations, and legal processes",
              "Enforce our Terms of Service",
              "Protect rights, property, and safety of Proova, users, and the public",
            ]} />

            <PolicyH2>4. Legal Bases for Processing (GDPR / UK GDPR)</PolicyH2>
            <PolicyP>For users in the EEA or United Kingdom, we process data under the following legal bases:</PolicyP>

            <TableWrapper>
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[#E5E5EA] bg-[#F5F5F7]">
                    <th className="text-left px-4 sm:px-5 py-3 font-semibold text-[#1D1D1F] whitespace-nowrap">Legal Basis</th>
                    <th className="text-left px-4 sm:px-5 py-3 font-semibold text-[#1D1D1F]">When We Apply It</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Performance of Contract", "Delivering the Services you subscribed to"],
                    ["Legitimate Interests", "Analytics, fraud prevention, product improvement, direct marketing to existing customers"],
                    ["Consent", "Marketing communications, non-essential cookies (withdrawal possible at any time)"],
                    ["Legal Obligation", "Compliance with applicable laws, tax regulations, and court orders"],
                  ].map(([basis, when], i) => (
                    <tr key={i} className={cx("border-b border-[#E5E5EA] last:border-0", i % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white")}>
                      <td className="px-4 sm:px-5 py-3 font-medium text-[#1D1D1F] align-top whitespace-nowrap">{basis}</td>
                      <td className="px-4 sm:px-5 py-3 text-[#3D3D3F]">{when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrapper>

            <Divider />

            {/* ════ DATA SHARING ════ */}
            <SectionAnchor id="data-sharing" />
            <Tag>Third Parties</Tag>
            <PolicyH2>5. Data Sharing & Disclosure</PolicyH2>
            <PolicyP>
              <strong>We do not sell, rent, or trade your personal data.</strong> We share data only in the following circumstances:
            </PolicyP>

            <PolicyH3>5.1 Service Providers (Sub-processors)</PolicyH3>
            <PolicyP>
              We work with trusted sub-processors who access data only as needed to perform their contracted functions. All sub-processors are bound by Data Processing Agreements (DPAs) and must maintain adequate security standards.
            </PolicyP>

            <TableWrapper>
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[#E5E5EA] bg-[#F5F5F7]">
                    <th className="text-left px-4 sm:px-5 py-3 font-semibold text-[#1D1D1F]">Category</th>
                    <th className="text-left px-4 sm:px-5 py-3 font-semibold text-[#1D1D1F]">Examples</th>
                    <th className="text-left px-4 sm:px-5 py-3 font-semibold text-[#1D1D1F]">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Cloud Infrastructure", "AWS, Google Cloud", "Hosting and data storage"],
                    ["Payment Processing", "Stripe", "Subscription billing"],
                    ["Customer Support", "Intercom, Zendesk", "Support ticket management"],
                    ["Error Monitoring", "Sentry, Datadog", "Platform reliability"],
                    ["Email Delivery", "SendGrid, Postmark", "Transactional emails"],
                  ].map(([cat, ex, pur], i) => (
                    <tr key={i} className={cx("border-b border-[#E5E5EA] last:border-0", i % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white")}>
                      <td className="px-4 sm:px-5 py-3 font-medium text-[#1D1D1F] align-top whitespace-nowrap">{cat}</td>
                      <td className="px-4 sm:px-5 py-3 text-[#6E6E73] whitespace-nowrap">{ex}</td>
                      <td className="px-4 sm:px-5 py-3 text-[#3D3D3F]">{pur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrapper>

            <PolicyP>A current list of sub-processors is available upon request at <a href="mailto:privacy@proova.app" className="text-[#0A84FF] hover:underline">privacy@proova.app</a>.</PolicyP>

            <PolicyH3>5.2 Business Transfers</PolicyH3>
            <PolicyP>
              If Proova undergoes a merger, acquisition, or sale of assets, your information may be transferred to the successor entity. We will notify you via email with at least 30 days' advance notice.
            </PolicyP>

            <PolicyH3>5.3 Legal Disclosures</PolicyH3>
            <PolicyP>
              We may disclose data when required by law, subpoena, or court order, or to protect the rights and safety of Proova, our users, or the public. We will notify you of such requests where legally permitted.
            </PolicyP>

            <PolicyH3>5.4 Aggregated Data</PolicyH3>
            <PolicyP>
              We may share aggregated, anonymized data (from which individuals cannot be identified) for research, industry reports, or with partners. This is not personal data.
            </PolicyP>

            <Divider />

            {/* ════ YOUR RIGHTS ════ */}
            <SectionAnchor id="your-rights" />
            <Tag>Your Rights</Tag>
            <PolicyH2>6. Your Privacy Rights</PolicyH2>
            <PolicyP>
              Depending on your location, you have the following rights. To exercise any of them, email <a href="mailto:privacy@proova.app" className="text-[#0A84FF] hover:underline">privacy@proova.app</a> with subject "Privacy Rights Request". We respond within 30 days.
            </PolicyP>

            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 my-6">
              {[
                { icon: "👁️", right: "Right of Access", desc: "Obtain a copy of the personal data we hold about you." },
                { icon: "✏️", right: "Right to Rectification", desc: "Request correction of inaccurate or incomplete data." },
                { icon: "🗑️", right: "Right to Erasure", desc: "Request deletion of your data (subject to legal obligations)." },
                { icon: "⏸️", right: "Right to Restriction", desc: "Request we limit processing in certain circumstances." },
                { icon: "📦", right: "Right to Portability", desc: "Receive your data in a structured, machine-readable format." },
                { icon: "🚫", right: "Right to Object", desc: "Object to processing based on legitimate interests, including direct marketing." },
                { icon: "↩️", right: "Withdraw Consent", desc: "Where processing is consent-based, withdraw at any time without affecting past processing." },
                { icon: "🏛️", right: "Lodge a Complaint", desc: "File a complaint with your local data protection authority at any time." },
              ].map((r) => (
                <div key={r.right} className="flex gap-3 rounded-2xl border border-[#E5E5EA] bg-white p-4">
                  <span className="text-[20px] mt-0.5 shrink-0">{r.icon}</span>
                  <div>
                    <div className="text-[13px] font-semibold text-[#1D1D1F] mb-0.5">{r.right}</div>
                    <div className="text-[12px] leading-[1.6] text-[#6E6E73]">{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Divider />

            {/* ════ SECURITY ════ */}
            <SectionAnchor id="security" />
            <Tag>Security</Tag>
            <PolicyH2>7. Security Measures</PolicyH2>
            <PolicyP>
              We implement industry-standard technical and organizational safeguards to protect your data:
            </PolicyP>

            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 my-5">
              {[
                { icon: "🔐", title: "Encryption in Transit", desc: "All data transmitted to and from Proova is encrypted using TLS 1.2 or higher." },
                { icon: "🗄️", title: "Encryption at Rest", desc: "Sensitive data is encrypted at rest using AES-256." },
                { icon: "👥", title: "Access Controls", desc: "Role-based access controls (RBAC) restrict data access to authorized personnel only." },
                { icon: "🔑", title: "Multi-Factor Auth", desc: "MFA is enforced on all internal Proova systems and production access." },
                { icon: "🔍", title: "Security Audits", desc: "Regular vulnerability assessments and security reviews are performed." },
                { icon: "🚨", title: "Incident Response", desc: "We maintain documented breach notification processes aligned with GDPR timelines." },
              ].map((s) => (
                <div key={s.title} className="flex gap-3 rounded-2xl border border-[#E5E5EA] bg-white p-4">
                  <span className="text-[22px] shrink-0">{s.icon}</span>
                  <div>
                    <div className="text-[13px] font-semibold text-[#1D1D1F] mb-0.5">{s.title}</div>
                    <div className="text-[12px] leading-[1.6] text-[#6E6E73]">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <CalloutBox icon="⚠️" title="Important note">
              While we take data security seriously, no system can guarantee absolute security. In the event of a data breach affecting your rights and freedoms, we will notify you and relevant supervisory authorities as required by applicable law (within 72 hours under GDPR).
            </CalloutBox>

            <PolicyH2>8. Payments Security</PolicyH2>
            <PolicyP>
              Payments are processed exclusively by <strong>Stripe, Inc.</strong>, a PCI-DSS Level 1 certified payment processor. Proova does not collect, store, or transmit raw credit card numbers, CVV codes, or banking credentials. We retain only the last four digits of your card for reference, billing address, and transaction metadata.
            </PolicyP>

            <Divider />

            {/* ════ COOKIES ════ */}
            <SectionAnchor id="cookies" />
            <Tag>Cookies</Tag>
            <PolicyH2>9. Cookies & Tracking Technologies</PolicyH2>
            <PolicyP>
              We use cookies and similar technologies. You can manage preferences through our Cookie Settings panel (in the platform footer) or your browser settings. Disabling certain cookies may affect platform functionality.
            </PolicyP>

            <TableWrapper>
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[#E5E5EA] bg-[#F5F5F7]">
                    <th className="text-left px-4 sm:px-5 py-3 font-semibold text-[#1D1D1F]">Cookie Type</th>
                    <th className="text-left px-4 sm:px-5 py-3 font-semibold text-[#1D1D1F]">Purpose</th>
                    <th className="text-left px-4 sm:px-5 py-3 font-semibold text-[#1D1D1F] whitespace-nowrap">Can Opt Out?</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Strictly Necessary", "Authentication, security, core platform functionality", "No — required"],
                    ["Functional", "Language preferences, session state, UI settings", "Limited"],
                    ["Analytics", "Aggregate usage patterns (e.g., Google Analytics)", "Yes — via cookie banner"],
                    ["Marketing", "Ad retargeting and campaign measurement", "Yes — consent required"],
                  ].map(([type, purpose, opt], i) => (
                    <tr key={i} className={cx("border-b border-[#E5E5EA] last:border-0", i % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white")}>
                      <td className="px-4 sm:px-5 py-3 font-medium text-[#1D1D1F] align-top whitespace-nowrap">{type}</td>
                      <td className="px-4 sm:px-5 py-3 text-[#3D3D3F]">{purpose}</td>
                      <td className="px-4 sm:px-5 py-3 whitespace-nowrap">
                        <span className={cx(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                          opt.startsWith("No") ? "bg-[#FEE2E2] text-[#991B1B]" :
                          opt.startsWith("Yes") ? "bg-[#E8F5E9] text-[#1B5E20]" :
                          "bg-[#FEF9C3] text-[#92400E]"
                        )}>
                          {opt}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrapper>

            <Divider />

            {/* ════ INTERNATIONAL ════ */}
            <SectionAnchor id="international" />
            <Tag>Global</Tag>
            <PolicyH2>10. International Data Transfers</PolicyH2>
            <PolicyP>
              Proova may transfer personal data outside your country of residence. When transferring from the EEA, UK, or Switzerland to countries not deemed to provide adequate data protection, we rely on:
            </PolicyP>
            <PolicyList items={[
              "Standard Contractual Clauses (SCCs) approved by the European Commission",
              "UK International Data Transfer Agreements (IDTAs) where applicable",
              "Other lawful transfer mechanisms as required by applicable law",
            ]} />
            <PolicyP>
              Details of applicable transfer mechanisms are in our Data Processing Agreement (DPA), available on request at <a href="mailto:privacy@proova.app" className="text-[#0A84FF] hover:underline">privacy@proova.app</a>.
            </PolicyP>

            <PolicyH2>11. Children's Privacy</PolicyH2>
            <PolicyP>
              Our Services are not directed to individuals under the age of 16 (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect personal data from children. If we become aware we have inadvertently done so, we will delete it promptly. Contact <a href="mailto:privacy@proova.app" className="text-[#0A84FF] hover:underline">privacy@proova.app</a> if you believe a child has submitted data.
            </PolicyP>

            <Divider />

            {/* ════ RETENTION ════ */}
            <SectionAnchor id="retention" />
            <Tag>Retention</Tag>
            <PolicyH2>12. Data Retention</PolicyH2>
            <PolicyP>
              We retain personal data only as long as necessary to fulfill the purposes described in this policy, or as required by law.
            </PolicyP>

            <TableWrapper>
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[#E5E5EA] bg-[#F5F5F7]">
                    <th className="text-left px-4 sm:px-5 py-3 font-semibold text-[#1D1D1F]">Data Type</th>
                    <th className="text-left px-4 sm:px-5 py-3 font-semibold text-[#1D1D1F]">Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Account data", "Duration of subscription + 90 days after closure"],
                    ["Transaction & billing data", "7 years (tax and financial reporting obligations)"],
                    ["Usage logs & analytics", "24 months identifiable, then anonymized"],
                    ["Support communications", "3 years from date of last contact"],
                    ["Deleted data in backups", "Up to 30 days before permanent deletion"],
                  ].map(([type, period], i) => (
                    <tr key={i} className={cx("border-b border-[#E5E5EA] last:border-0", i % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white")}>
                      <td className="px-4 sm:px-5 py-3 font-medium text-[#1D1D1F] whitespace-nowrap">{type}</td>
                      <td className="px-4 sm:px-5 py-3 text-[#3D3D3F]">{period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrapper>

            <PolicyH2>13. Your Data Control</PolicyH2>
            <PolicyP>You may request deletion of your data at any time. Contact <a href="mailto:privacy@proova.app" className="text-[#0A84FF] hover:underline">privacy@proova.app</a>. Note that some data may be retained to fulfill legal obligations even after deletion requests.</PolicyP>

            <PolicyH2>14. Changes to This Policy</PolicyH2>
            <PolicyP>
              We may update this Privacy Policy from time to time. When material changes occur, we will:
            </PolicyP>
            <PolicyList items={[
              "Post the updated policy with a new Effective Date",
              "Notify you via email at the address associated with your account",
              "Request re-consent where required by applicable law",
            ]} />
            <PolicyP>
              Your continued use of the Services after the effective date constitutes acceptance.
            </PolicyP>

            <Divider />

            {/* ════ COMPLIANCE ════ */}
            <SectionAnchor id="compliance" />
            <Tag>Compliance</Tag>
            <PolicyH2>15. Compliance Posture</PolicyH2>
            <PolicyP>
              Proova is designed for global businesses. We take a proactive approach to privacy and compliance as we grow.
            </PolicyP>

            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 my-6">
              <Card
                icon="🇪🇺"
                title="GDPR / UK GDPR"
                desc="We process EEA and UK data in compliance with GDPR and UK GDPR, including lawful basis documentation, data subject rights, and DPA agreements."
                items={[
                  "Standard Contractual Clauses for transfers",
                  "Data Processing Agreements available on request",
                  "72-hour breach notification process",
                  "Privacy by design principles applied",
                ]}
              />
              <Card
                icon="🇺🇸"
                title="CCPA / US Privacy"
                desc="For California residents, we honor all rights under the CCPA including right to know, right to delete, and right to opt-out."
                items={[
                  "No sale of personal information",
                  "Right to know what data is collected",
                  "Right to request deletion",
                  "Non-discrimination for exercising rights",
                ]}
              />
              {/* ── UPDATED: added Refund Policy bullet ── */}
              <Card
                icon="💳"
                title="Paddle Merchant Compliance"
                desc="Proova uses Paddle as a Merchant of Record for subscription billing. Paddle handles VAT, tax compliance, and payment regulation globally."
                items={[
                  "Paddle manages tax collection and remittance",
                  "Payment data governed by Paddle's PCI-DSS compliance",
                  "Subscription terms disclosed at checkout",
                  "Refunds processed via original payment method",
                  "Refund Policy: 30-day post-launch refund window for Founder Spot purchases",
                ]}
              />
              <Card
                icon="🌍"
                title="Global Merchant Support"
                desc="Proova supports merchants worldwide including UK, US, EU, and Africa."
                items={[
                  "Region-appropriate bank linking via Open Banking / aggregators",
                  "CSV import fallback for all regions",
                  "DPA available for enterprise customers",
                  "Security questionnaires fulfilled on request",
                ]}
              />
            </div>

            <CalloutBox icon="📋" title="Procurement or compliance review?">
              If your team needs a security questionnaire response, DPA, or vendor documentation, email <a href="mailto:hello@proova.app" className="text-[#0A84FF] hover:underline font-semibold">hello@proova.app</a> and we'll respond within 2 business days.
            </CalloutBox>

            <Divider />

            {/* ════ TERMS OF SERVICE ════ */}
            <SectionAnchor id="terms" />
            <div className="mb-2">
              <Tag>Legal</Tag>
              <h2 className="mt-3 text-[26px] sm:text-[32px] font-semibold tracking-tight text-[#1D1D1F]">Terms of Service</h2>
              <p className="mt-2 text-[14px] text-[#6E6E73]">
                Proova, Inc. · Effective Date: April 2026 · Version 1.0
              </p>
            </div>

            <CalloutBox icon="📄" title="Agreement to these Terms">
              By accessing or using Proova's services, you agree to be bound by these Terms of Service. If you do not agree to these Terms, please discontinue use of our platform and services immediately.
            </CalloutBox>

            <PolicyH2>1. Description of Service</PolicyH2>
            <PolicyP>
              Proova is a revenue attribution and analytics platform. We provide tracking, reconciliation, and reporting tools for commerce businesses, enabling brands to understand which channels, campaigns, conversations, and transfers drove paid orders across online and offline journeys.
            </PolicyP>

            <PolicyH2>2. Founder Access</PolicyH2>
            <PolicyP>
              Founder Spot purchases grant the following benefits:
            </PolicyP>
            <PolicyList items={[
              "Early access to the Proova platform upon launch",
              "Assisted onboarding — we help you connect your store, set up tracking and reconciliation",
              "A permanently locked annual subscription rate at your Founder price",
              "Full access to all future features of Proova",
            ]} />
            <CalloutBox icon="🔒" title="About your locked rate">
              The locked Founder rate applies for as long as your subscription remains active and in good standing. It is non-transferable and cannot be applied retroactively to other accounts or tiers. If a subscription lapses and is restarted, the locked rate may no longer apply.
            </CalloutBox>

            <PolicyH2>3. Accounts</PolicyH2>
            <PolicyP>
              You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at <a href="mailto:hello@proova.app" className="text-[#0A84FF] hover:underline">hello@proova.app</a> if you suspect any unauthorized access to or use of your account.
            </PolicyP>

            <PolicyH2>4. Acceptable Use</PolicyH2>
            <PolicyP>
              You agree not to use Proova to:
            </PolicyP>
            <PolicyList items={[
              "Violate any applicable laws or regulations",
              "Infringe the intellectual property or other rights of any third party",
              "Transmit harmful code, malware, or disruptive content",
              "Attempt to reverse-engineer, decompile, or extract source code from the platform",
              "Resell, sublicense, or otherwise provide access to the platform to third parties without prior written permission from Proova",
            ]} />

            <PolicyH2>5. Intellectual Property</PolicyH2>
            <PolicyP>
              All platform content, trademarks, technology, software, and branding are the exclusive property of Proova, Inc. and are protected by applicable intellectual property laws. You retain full ownership of your own business data submitted to or processed through the platform.
            </PolicyP>

            <PolicyH2>6. Limitation of Liability</PolicyH2>
            <PolicyP>
              To the maximum extent permitted by applicable law, Proova's total liability arising out of or in connection with these Terms or the Services is limited to the total amount you paid to Proova in the twelve (12) months immediately preceding the claim. Proova shall not be liable for indirect, incidental, consequential, or punitive damages of any kind.
            </PolicyP>

            <PolicyH2>7. Governing Law</PolicyH2>
            <PolicyP>
              These Terms are governed by and construed in accordance with the laws of England and Wales, without regard to conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </PolicyP>

            <PolicyH2>8. Changes to Terms</PolicyH2>
            <PolicyP>
              We may update these Terms from time to time. Material changes will be communicated to you via email to the address associated with your account, with at least 14 days' notice before the changes take effect. Your continued use of the Services after the effective date of updated Terms constitutes your acceptance.
            </PolicyP>

            <PolicyH2>9. Contact for Legal Questions</PolicyH2>
            <PolicyP>
              For questions about these Terms, email <a href="mailto:hello@proova.app" className="text-[#0A84FF] hover:underline">hello@proova.app</a>.
            </PolicyP>

            <Divider />

            {/* ════ REFUND POLICY ════ */}
            <SectionAnchor id="refund-policy" />
            <div className="mb-2">
              <Tag>Billing</Tag>
              <h2 className="mt-3 text-[26px] sm:text-[32px] font-semibold tracking-tight text-[#1D1D1F]">Refund Policy</h2>
              <p className="mt-2 text-[14px] text-[#6E6E73]">
                Proova, Inc. · Effective Date: April 2026
              </p>
            </div>

            <CalloutBox icon="💡" title="Founder Spot purchases — how refunds work">
              Because you are purchasing early access before the product is live, the refund window starts from the date the product officially launches — not the date of your purchase. This gives you a full 30 days to evaluate Proova once you can actually use it.
            </CalloutBox>

            <PolicyH2>1. Founder Spot Purchases</PolicyH2>
            <PolicyP>
              All Founder Spot purchases come with a <strong>30-day refund window starting from the date the Proova product is officially launched</strong> — not the date of purchase. This is because Founder Spots grant early access to a pre-launch product; the evaluation period does not begin until the platform is live and accessible.
            </PolicyP>

            <PolicyH2>2. How to Request a Refund</PolicyH2>
            <PolicyList items={[
              <>Email <a href="mailto:support@proova.app" className="text-[#0A84FF] hover:underline">support@proova.app</a> with the subject line "Refund Request"</>,
              "Include your order details: order ID, email address used at checkout, and the reason for your request",
              "We will acknowledge your request within 2 business days and process it within 5 business days",
            ]} />

            <PolicyH2>3. Eligibility</PolicyH2>
            <PolicyList items={[
              "Refunds apply to Founder Spot annual subscription purchases",
              "Refund requests must be submitted within the 30-day post-launch window",
              "Refunds are not available after the 30-day post-launch window has passed",
            ]} />

            <PolicyH2>4. Subscription Renewals</PolicyH2>
            <PolicyP>
              Annual subscription renewals may be cancelled within <strong>7 days of the renewal charge</strong> for a full refund. After 7 days from the renewal date, the subscription remains active until the end of the current term, with no partial refunds for unused time.
            </PolicyP>

            <PolicyH2>5. Processing</PolicyH2>
            <PolicyP>
              Approved refunds are returned to the original payment method used at checkout. Processing time depends on your bank or card issuer and typically takes 5–10 business days to appear on your statement. Proova does not charge any fees to process refunds.
            </PolicyP>

            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 my-6">
              {[
                {
                  icon: "📅",
                  title: "30-Day Post-Launch Window",
                  desc: "Founder Spot refunds are available for 30 days after the product officially launches, not from the purchase date.",
                },
                {
                  icon: "🔄",
                  title: "7-Day Renewal Window",
                  desc: "Annual renewals can be refunded within 7 days of the renewal charge. After that, the subscription runs to end of term.",
                },
                {
                  icon: "💳",
                  title: "Original Payment Method",
                  desc: "Refunds go back to the card or payment method used at purchase. Allow 5–10 business days for processing.",
                },
                {
                  icon: "✉️",
                  title: "Contact for Refunds",
                  desc: "Email support@proova.app with subject 'Refund Request' and your order details. We respond within 2 business days.",
                },
              ].map((r) => (
                <div key={r.title} className="flex gap-3 rounded-2xl border border-[#E5E5EA] bg-white p-4">
                  <span className="text-[20px] mt-0.5 shrink-0">{r.icon}</span>
                  <div>
                    <div className="text-[13px] font-semibold text-[#1D1D1F] mb-0.5">{r.title}</div>
                    <div className="text-[12px] leading-[1.6] text-[#6E6E73]">{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Divider />

            {/* ════ CONTACT ════ */}
            <SectionAnchor id="contact" />
            <Tag>Contact</Tag>
            <PolicyH2>16. Contact Us</PolicyH2>
            <PolicyP>
              If you have questions, requests, or concerns about this Privacy Policy or our data practices, please reach out through any of the following channels:
            </PolicyP>

            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3 my-6">
              {[
                {
                  icon: "🔐",
                  title: "Privacy Requests",
                  desc: "Data access, deletion, portability, and all privacy rights requests.",
                  email: "privacy@proova.app",
                  tag: "Privacy",
                },
                {
                  icon: "💬",
                  title: "General Inquiries",
                  desc: "Questions about Proova, compliance, or vendor onboarding.",
                  email: "hello@proova.app",
                  tag: "General",
                },
                {
                  icon: "🛠️",
                  title: "Support & Billing",
                  desc: "Platform support, refund requests, and billing inquiries.",
                  email: "support@proova.app",
                  tag: "Support",
                },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-[#E5E5EA] bg-white p-4 sm:p-5">
                  <div className="text-[22px] sm:text-[24px] mb-3">{c.icon}</div>
                  <div className="text-[14px] font-semibold text-[#1D1D1F] mb-1">{c.title}</div>
                  <div className="text-[12px] leading-[1.7] text-[#6E6E73] mb-4">{c.desc}</div>
                  <a
                    href={`mailto:${c.email}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F5F7] px-3 py-1.5 text-[12px] font-semibold text-[#1D1D1F] hover:bg-[#E5E5EA] transition-colors break-all"
                  >
                    <span>✉️</span>
                    {c.email}
                  </a>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7] p-4 sm:p-5 text-[13px] text-[#6E6E73] leading-[1.7]">
              <strong className="text-[#1D1D1F]">Response commitment:</strong> We aim to acknowledge all privacy requests within <strong className="text-[#1D1D1F]">2 business days</strong> and fully resolve them within <strong className="text-[#1D1D1F]">30 days</strong>. For complex requests requiring additional time, we will inform you within the initial response.
            </div>

            {/* ── FOOTER ── */}
            <div className="mt-12 sm:mt-16 pb-10 border-t border-[#E5E5EA] pt-6 sm:pt-8 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-7 w-7 place-items-center overflow-hidden rounded-[8px] border border-[#E5E5EA] bg-white">
                  <Image src="/proova.png" alt="Proova" width={28} height={28} className="h-full w-full object-contain" />
                </div>
                <span className="text-[13px] font-semibold text-[#1D1D1F]">Proova</span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#6E6E73]">
                <span>© {new Date().getFullYear()} Proova, Inc. All rights reserved.</span>
                <span>Privacy Policy v1.0</span>
                <span>Last updated: April 2026</span>
              </div>

              <div className="flex gap-3 text-[12px]">
                <a href="mailto:privacy@proova.app" className="text-[#0A84FF] hover:underline">privacy@proova.app</a>
                <span className="text-[#E5E5EA]">|</span>
                <Link href="/" className="text-[#6E6E73] hover:text-[#1D1D1F]">Home</Link>
              </div>
            </div>

          </div>{/* end main content */}
        </div>
      </div>
    </main>
  );
}