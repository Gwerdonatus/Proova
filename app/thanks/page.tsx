import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui";

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
        background: rgba(239,68,68,0.25);
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
      <div className="orb-b absolute right-[6%] bottom-[12%] h-[180px] w-[180px] rounded-full bg-emerald-300/[0.05] blur-3xl" style={{ animationDelay: "-5s" }} />

      {/* Floating particles */}
      <span className="particle" style={{ left:"10%",  bottom:"20%", width:5, height:5, animationDuration:"7s",   animationDelay:"0s" }} />
      <span className="particle" style={{ left:"30%",  bottom:"10%", width:4, height:4, animationDuration:"9.5s", animationDelay:"2s" }} />
      <span className="particle" style={{ left:"58%",  bottom:"18%", width:3, height:3, animationDuration:"6s",   animationDelay:"3.5s" }} />
      <span className="particle" style={{ left:"75%",  bottom:"8%",  width:5, height:5, animationDuration:"8.5s", animationDelay:"1s" }} />
      <span className="particle" style={{ left:"48%",  bottom:"4%",  width:3, height:3, animationDuration:"11s",  animationDelay:"5.5s" }} />
      <span className="particle" style={{ left:"90%",  bottom:"28%", width:4, height:4, animationDuration:"7s",   animationDelay:"2.8s" }} />

      {/* Shimmer dots */}
      <span className="dot-shimmer absolute left-[18%] top-[14%] h-1.5 w-1.5 rounded-full bg-red-400/30" />
      <span className="dot-shimmer absolute right-[24%] top-[22%] h-1 w-1 rounded-full bg-blue-400/25" style={{ animationDelay:"1.3s" }} />
      <span className="dot-shimmer absolute left-[68%] top-[9%] h-1.5 w-1.5 rounded-full bg-emerald-400/20" style={{ animationDelay:"2.6s" }} />

      {/* White wash */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.96),rgba(255,255,255,0.98))]" />
    </div>
  );
}

/* ─── Compact spam notice ────────────────────────────────────────────────── */
function SpamNotice() {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2.5 rounded-2xl border border-amber-200/70 bg-gradient-to-r from-amber-50 to-orange-50/60 px-4 py-3">
      <span className="text-base leading-none">📬</span>
      <p className="text-sm text-amber-800">
        <span className="font-semibold text-amber-900">Confirmation sent — check Spam if missing.</span>{" "}
        From{" "}
        <span className="inline-block rounded-md bg-amber-100 px-1.5 py-0.5 font-mono text-[11px] font-medium text-amber-900">
          hello@proova.app
        </span>
      </p>
    </div>
  );
}

/* ─── Buttons ─────────────────────────────────────────────────────────────── */
function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="w-full sm:w-auto">
      <span className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#111111] px-5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(17,17,17,0.16)] transition-all duration-200 hover:bg-black hover:shadow-[0_18px_40px_rgba(17,17,17,0.20)] active:translate-y-[1px] sm:min-w-[200px]">
        {children}
      </span>
    </Link>
  );
}

function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="w-full sm:w-auto">
      <span className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-black/10 bg-white px-5 text-sm font-semibold text-app-ink shadow-[0_8px_18px_rgba(16,24,40,0.04)] transition-all duration-200 hover:border-black/15 hover:bg-[#fcfcfd] active:translate-y-[1px] sm:min-w-[200px]">
        {children}
      </span>
    </Link>
  );
}

/* ─── Info card ───────────────────────────────────────────────────────────── */
function InfoCard({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-[0_10px_24px_rgba(16,24,40,0.04)]">
      <div className="text-xs font-semibold text-app-muted">{label}</div>
      <div className="mt-1 text-sm font-semibold text-app-ink">{title}</div>
      <div className="mt-2 text-sm leading-6 text-app-muted">{text}</div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function ThanksPage() {
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
                    <div className="text-xs text-app-muted">Waitlist confirmation</div>
                  </div>
                </div>

                <div className="badge-enter inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">✓</span>
                  Spot saved
                </div>
              </div>

              {/* ── Hero ── */}
              <div className="hero-enter mt-6 max-w-2xl sm:mt-7">
                <div className="text-sm font-semibold text-app-muted">You&rsquo;re in</div>
                <h1 className="mt-2 text-[1.65rem] font-semibold leading-tight tracking-tight text-app-ink sm:text-4xl">
                  Thanks — we&rsquo;ve saved your spot on the Proova&nbsp;waitlist.
                </h1>
                <p className="mt-3 text-sm leading-7 text-app-muted sm:text-base">
                  We&rsquo;ll reach out personally before beta opens. If you shared
                  WhatsApp, we&rsquo;ll message you there. Otherwise, we&rsquo;ll use email.
                </p>
              </div>

              {/* ── Compact spam notice ── */}
              <div className="section-enter-1">
                <SpamNotice />
              </div>

              {/* ── Info cards ── */}
              <div className="section-enter-1 mt-4 grid gap-3 sm:grid-cols-3">
                <InfoCard
                  label="Status"
                  title="Waitlist active"
                  text="Your place is saved for the beta rollout."
                />
                <InfoCard
                  label="Contact"
                  title="Personal follow-up"
                  text="We'll reach out directly instead of sending bulk email blasts."
                />
                <InfoCard
                  label="Best next step"
                  title="Explore Founder access"
                  text="Upgrade if you want priority onboarding and locked pricing."
                />
              </div>

              {/* ── Founder upgrade ── */}
              <section className="section-enter-2 mt-6 rounded-[24px] border border-black/8 bg-[#fbfbfc] p-5 shadow-[0_12px_30px_rgba(16,24,40,0.04)] sm:rounded-[28px] sm:p-6">
                <div className="max-w-2xl">
                  <div className="text-sm font-semibold text-app-ink">Want priority access?</div>
                  <p className="mt-2 text-sm leading-7 text-app-muted">
                    Founder access is for businesses that want onboarding help, direct support,
                    and locked founder pricing before public launch.
                  </p>
                </div>

                <div className="mt-5 rounded-2xl border border-black/8 bg-white p-4 shadow-[0_8px_20px_rgba(16,24,40,0.03)]">
                  <div className="text-sm font-semibold text-app-ink">Why Founder access exists</div>
                  <ul className="mt-3 grid gap-2 text-sm text-app-muted sm:grid-cols-2">
                    {[
                      "Priority onboarding and setup help",
                      "Locked pricing before public launch",
                      "Direct founder support",
                      "Country-based pricing shown at checkout",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0 text-red-500">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <PrimaryLink href="/waitlist">View Founder access</PrimaryLink>
                  <SecondaryLink href="/tour">See product tour</SecondaryLink>
                </div>
              </section>

              {/* ── Shape the product ── */}
              <section className="section-enter-3 mt-4 rounded-[24px] border border-black/8 bg-white p-5 shadow-[0_12px_30px_rgba(16,24,40,0.04)] sm:rounded-[28px] sm:p-6">
                <div className="text-sm font-semibold text-app-ink">Help shape the product</div>
                <p className="mt-2 text-sm leading-7 text-app-muted">
                  Reply to our message with your biggest attribution pain — influencers,
                  refunds, transfers, reconciliation, or proving ROI. The earliest users
                  directly shape what we build next.
                </p>
                <div className="mt-4 rounded-2xl border border-black/8 bg-[#fbfbfc] p-4 text-sm text-app-muted">
                  The first cohort matters a lot. The clearer your use case, the better
                  we can tailor onboarding and priorities.
                </div>
              </section>

              {/* ── Footer ── */}
              <div className="section-enter-3 mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link className="text-sm font-semibold text-app-ink hover:underline" href="/">
                  ← Back to homepage
                </Link>
                <div className="text-xs text-app-muted">We&rsquo;ll contact you before beta access opens.</div>
              </div>

            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}