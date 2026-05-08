import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui";

type SearchParams = {
  provider?: string;
  reference?: string;
  transaction_id?: string;
  session_id?: string;
};

/* ─── Animation keyframes injected once ─────────────────────────────────── */
function AnimationStyles() {
  return (
    <style>{`
      @keyframes orb-float-a {
        0%,100% { transform: translate(0px, 0px) scale(1); }
        30%      { transform: translate(18px, -22px) scale(1.06); }
        70%      { transform: translate(-12px, 14px) scale(0.96); }
      }
      @keyframes orb-float-b {
        0%,100% { transform: translate(0px, 0px) scale(1); }
        40%      { transform: translate(-20px, 18px) scale(1.04); }
        75%      { transform: translate(14px, -10px) scale(0.97); }
      }
      @keyframes orb-float-c {
        0%,100% { transform: translate(0px, 0px) scale(1); }
        50%      { transform: translate(10px, -16px) scale(1.05); }
      }
      @keyframes particle-rise {
        0%   { opacity: 0;   transform: translateY(0)   translateX(0)   scale(0.6); }
        15%  { opacity: 0.55; }
        85%  { opacity: 0.2; }
        100% { opacity: 0;   transform: translateY(-90px) translateX(8px) scale(0.3); }
      }
      @keyframes fade-up {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes pop-badge {
        0%   { opacity: 0; transform: scale(0.65); }
        65%  { transform: scale(1.06); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes shimmer-dot {
        0%,100% { opacity: 0.35; transform: scale(1); }
        50%     { opacity: 0.8;  transform: scale(1.3); }
      }

      .orb-a { animation: orb-float-a 11s ease-in-out infinite; }
      .orb-b { animation: orb-float-b 14s ease-in-out infinite; }
      .orb-c { animation: orb-float-c 9s  ease-in-out infinite; }

      .card-enter {
        animation: fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both;
        animation-delay: 0.05s;
      }
      .badge-enter {
        animation: pop-badge 0.55s cubic-bezier(0.34,1.56,0.64,1) both;
        animation-delay: 0.45s;
      }
      .hero-enter {
        animation: fade-up 0.65s cubic-bezier(0.16,1,0.3,1) both;
        animation-delay: 0.2s;
      }
      .section-enter-1 {
        animation: fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both;
        animation-delay: 0.32s;
      }
      .section-enter-2 {
        animation: fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both;
        animation-delay: 0.44s;
      }
      .section-enter-3 {
        animation: fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both;
        animation-delay: 0.56s;
      }

      .particle {
        position: absolute;
        border-radius: 50%;
        background: rgba(239,68,68,0.28);
        animation: particle-rise linear infinite;
        pointer-events: none;
      }
      .dot-shimmer { animation: shimmer-dot 3.2s ease-in-out infinite; }
    `}</style>
  );
}

/* ─── Ambient lofi background ────────────────────────────────────────────── */
function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Slow-drifting colour orbs */}
      <div className="orb-a absolute left-[-140px] top-[-130px] h-[340px] w-[340px] rounded-full bg-red-500/[0.07] blur-3xl sm:h-[440px] sm:w-[440px]" />
      <div className="orb-b absolute right-[-120px] top-[30px] h-[260px] w-[260px] rounded-full bg-blue-500/[0.06] blur-3xl sm:h-[360px] sm:w-[360px]" />
      <div className="orb-c absolute bottom-[-130px] left-[18%] h-[240px] w-[240px] rounded-full bg-sky-400/[0.05] blur-3xl sm:h-[300px] sm:w-[300px]" />
      <div className="orb-a absolute right-[8%] bottom-[10%] h-[180px] w-[180px] rounded-full bg-rose-300/[0.05] blur-3xl" style={{ animationDelay: "-4s" }} />

      {/* Floating particles — lofi steam feel */}
      <span className="particle" style={{ left:"12%",  bottom:"18%", width:5, height:5, animationDuration:"7s",  animationDelay:"0s" }} />
      <span className="particle" style={{ left:"28%",  bottom:"12%", width:4, height:4, animationDuration:"9s",  animationDelay:"1.8s" }} />
      <span className="particle" style={{ left:"62%",  bottom:"22%", width:3, height:3, animationDuration:"6.5s",animationDelay:"3.2s" }} />
      <span className="particle" style={{ left:"78%",  bottom:"8%",  width:5, height:5, animationDuration:"8s",  animationDelay:"0.9s" }} />
      <span className="particle" style={{ left:"44%",  bottom:"5%",  width:3, height:3, animationDuration:"10s", animationDelay:"5s" }} />
      <span className="particle" style={{ left:"88%",  bottom:"30%", width:4, height:4, animationDuration:"7.5s",animationDelay:"2.4s" }} />

      {/* Soft shimmer dots */}
      <span className="dot-shimmer absolute left-[20%] top-[15%] h-1.5 w-1.5 rounded-full bg-red-400/30" />
      <span className="dot-shimmer absolute right-[22%] top-[25%] h-1 w-1 rounded-full bg-blue-400/25" style={{ animationDelay:"1.1s" }} />
      <span className="dot-shimmer absolute left-[70%] top-[10%] h-1.5 w-1.5 rounded-full bg-amber-400/20" style={{ animationDelay:"2.3s" }} />

      {/* Final white wash to keep legibility */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.96),rgba(255,255,255,0.98))]" />
    </div>
  );
}

/* ─── Compact spam notice ────────────────────────────────────────────────── */
function FounderSpamNotice() {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2.5 rounded-2xl border border-amber-200/70 bg-gradient-to-r from-amber-50 to-orange-50/60 px-4 py-3">
      <span className="text-base leading-none">📬</span>
      <p className="text-sm text-amber-800">
        <span className="font-semibold text-amber-900">Check your Spam folder.</span>{" "}
        Your welcome email is from{" "}
        <span className="inline-block rounded-md bg-amber-100 px-1.5 py-0.5 font-mono text-[11px] font-medium text-amber-900">
          hello@proova.app
        </span>
      </p>
    </div>
  );
}

/* ─── Buttons ─────────────────────────────────────────────────────────────── */
function PrimaryAction({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
      <button className="inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-2xl bg-[#111111] px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(17,17,17,0.16)] transition-all duration-200 hover:bg-black hover:shadow-[0_18px_40px_rgba(17,17,17,0.20)] active:translate-y-[1px] sm:min-w-[200px]">
        {children}
      </button>
    </a>
  );
}

function SecondaryAction({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
      <button className="inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-2xl border border-black/10 bg-white px-6 text-sm font-semibold text-app-ink shadow-[0_8px_18px_rgba(16,24,40,0.04)] transition-all duration-200 hover:border-black/15 hover:bg-[#fcfcfd] active:translate-y-[1px] sm:min-w-[200px]">
        {children}
      </button>
    </a>
  );
}

/* ─── Stat card ───────────────────────────────────────────────────────────── */
function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-[0_10px_24px_rgba(16,24,40,0.04)]">
      <div className="text-xs font-semibold text-app-muted">{label}</div>
      <div className="mt-1 break-words text-sm font-semibold leading-6 text-app-ink">{value}</div>
    </div>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function getProviderLabel(provider?: string) {
  if (provider === "paystack") return "Paystack";
  if (provider === "paddle")   return "Paddle";
  return "Secure checkout";
}

function getReferenceValue(params: SearchParams) {
  if (params.provider === "paystack" && params.reference)       return params.reference;
  if (params.provider === "paddle"   && params.transaction_id)  return params.transaction_id;
  if (params.session_id)                                         return params.session_id;
  return "";
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default async function FounderSuccessPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params        = (await searchParams) || {};
  const calendly      = process.env.NEXT_PUBLIC_CALENDLY_URL       || "#";
  const whatsapp      = process.env.NEXT_PUBLIC_FOUNDER_WHATSAPP_URL || "#";
  const providerLabel = getProviderLabel(params.provider);
  const referenceValue= getReferenceValue(params);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fcfcfd]">
      <AnimationStyles />
      <AmbientBackground />

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="card-enter">
          <Card className="overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_28px_70px_rgba(16,24,40,0.10)] sm:rounded-[32px]">
            <div className="p-5 sm:p-8 lg:p-10">

              {/* ── Header row ── */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 flex-shrink-0 place-items-center overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_8px_20px_rgba(16,24,40,0.06)] sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Image src="/proova.png" alt="Proova" width={56} height={56} className="h-full w-full object-contain" priority />
                  </div>
                  <div>
                    <div className="text-sm font-semibold tracking-tight text-app-ink">Proova</div>
                    <div className="text-xs text-app-muted">Founder confirmation</div>
                  </div>
                </div>

                <div className="badge-enter inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">✓</span>
                  Payment received
                </div>
              </div>

              {/* ── Hero ── */}
              <div className="hero-enter mt-6 max-w-2xl sm:mt-7">
                <h1 className="text-[1.65rem] font-semibold leading-tight tracking-tight text-app-ink sm:text-4xl">
                  Welcome — you&rsquo;re now a Proova&nbsp;Founder.
                </h1>
                <p className="mt-3 text-sm leading-7 text-app-muted sm:text-base">
                  Your Founder spot is locked in. You&rsquo;ll get early access,
                  priority onboarding, and direct support as we roll out the private&nbsp;beta.
                </p>
              </div>

              {/* ── Compact spam notice ── */}
              <div className="section-enter-1">
                <FounderSpamNotice />
              </div>

              {/* ── Stat cards ── */}
              <div className="section-enter-1 mt-4 grid gap-3 sm:grid-cols-3">
                <StatCard label="Status"             value="Founder Access Received" />
                <StatCard label="Payment method"     value={providerLabel}            />
                <StatCard label="Recommended action" value="Book onboarding call"     />
              </div>

              {/* ── Payment reference ── */}
              <div className="section-enter-2 mt-4 rounded-2xl border border-black/8 bg-[#fbfbfc] p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-app-muted">
                  Payment reference
                </div>
                <div className="mt-0.5 text-xs text-app-muted">Save this in case you need support.</div>
                {referenceValue ? (
                  <div className="mt-3 break-all rounded-xl border border-black/6 bg-white px-3 py-2 font-mono text-[12px] leading-5 text-app-ink sm:text-[13px]">
                    {referenceValue}
                  </div>
                ) : (
                  <div className="mt-3 text-sm text-app-muted">Your payment details have been recorded.</div>
                )}
              </div>

              {/* ── Onboarding CTA ── */}
              <section className="section-enter-2 mt-6 rounded-[24px] border border-black/8 bg-[#fbfbfc] p-5 shadow-[0_12px_30px_rgba(16,24,40,0.04)] sm:rounded-[28px] sm:p-6">
                <div className="max-w-2xl">
                  <div className="text-sm font-semibold text-app-ink">Your next step</div>
                  <p className="mt-2 text-sm leading-7 text-app-muted">
                    Book a quick onboarding call so we can map your sales flow —
                    website, WhatsApp, transfers, or checkout — and make sure your
                    attribution setup is correct from day&nbsp;one.
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <PrimaryAction href={calendly}>Book onboarding call</PrimaryAction>
                  <SecondaryAction href={whatsapp}>WhatsApp the Founder</SecondaryAction>
                </div>

                <div className="mt-5 rounded-2xl border border-black/8 bg-white p-4 shadow-[0_8px_20px_rgba(16,24,40,0.03)]">
                  <div className="text-sm font-semibold text-app-ink">What we&rsquo;ll do on the call</div>
                  <ul className="mt-3 grid gap-2 text-sm text-app-muted sm:grid-cols-2">
                    {[
                      "Confirm your sources, campaigns, and influencers",
                      "Set up your WhatsApp and transfer tracking flow",
                      "Validate your Attributed vs Unattributed logic",
                      "Make sure refunds reconcile correctly",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0 text-red-500">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* ── What happens next ── */}
              <section className="section-enter-3 mt-4 rounded-[24px] border border-black/8 bg-white p-5 shadow-[0_12px_30px_rgba(16,24,40,0.04)] sm:rounded-[28px] sm:p-6">
                <div className="text-sm font-semibold text-app-ink">What happens next</div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Next step",    title: "Founder welcome message", body: "Onboarding details and setup instructions via email" },
                    { label: "Private beta", title: "Cohort-based rollout",    body: "You'll be in the very first group" },
                    { label: "Protection",   title: "30-day refund coverage",  body: "Covered under the Founder refund promise" },
                  ].map(({ label, title, body }) => (
                    <div key={label} className="rounded-2xl border border-black/8 bg-[#fbfbfc] p-4">
                      <div className="text-xs font-semibold text-app-muted">{label}</div>
                      <div className="mt-1 text-sm font-semibold text-app-ink">{title}</div>
                      <div className="mt-1 text-sm text-app-muted">{body}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-black/8 bg-[#fbfbfc] p-4 text-sm text-app-muted">
                  Need help right now? Message us on WhatsApp and include your business name plus{" "}
                  <span className="font-semibold text-app-ink">&ldquo;Founder&rdquo;</span>.
                </div>
              </section>

              {/* ── Footer ── */}
              <div className="section-enter-3 mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link className="text-sm font-semibold text-app-ink hover:underline" href="/">
                  ← Back to homepage
                </Link>
                <div className="text-xs text-app-muted">Save this page for your records.</div>
              </div>

            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}