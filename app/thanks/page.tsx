import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui";

function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-red-500/7 blur-3xl sm:h-[380px] sm:w-[380px]" />
      <div className="absolute right-[-100px] top-[40px] h-[240px] w-[240px] rounded-full bg-blue-500/6 blur-3xl sm:h-[320px] sm:w-[320px]" />
      <div className="absolute bottom-[-120px] left-[20%] h-[220px] w-[220px] rounded-full bg-sky-400/5 blur-3xl sm:h-[280px] sm:w-[280px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.97),rgba(255,255,255,0.99))]" />
    </div>
  );
}

function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <span
        className="
          inline-flex h-12 items-center justify-center rounded-2xl bg-[#111111] px-5 text-sm font-semibold text-white
          shadow-[0_12px_30px_rgba(17,17,17,0.16)] transition-all duration-200
          hover:bg-black hover:shadow-[0_18px_40px_rgba(17,17,17,0.20)] active:translate-y-[1px]
        "
      >
        {children}
      </span>
    </Link>
  );
}

function SecondaryLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <span
        className="
          inline-flex h-12 items-center justify-center rounded-2xl border border-black/10 bg-white px-5 text-sm font-semibold text-app-ink
          shadow-[0_8px_18px_rgba(16,24,40,0.04)] transition-all duration-200
          hover:border-black/15 hover:bg-[#fcfcfd] active:translate-y-[1px]
        "
      >
        {children}
      </span>
    </Link>
  );
}

function InfoCard({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-[0_10px_24px_rgba(16,24,40,0.04)]">
      <div className="text-xs font-semibold text-app-muted">{label}</div>
      <div className="mt-1 text-sm font-semibold text-app-ink">{title}</div>
      <div className="mt-2 text-sm leading-6 text-app-muted">{text}</div>
    </div>
  );
}

export default function ThanksPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fcfcfd]">
      <AmbientBackground />

      <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <Card className="overflow-hidden rounded-[32px] border border-black/8 bg-white shadow-[0_28px_70px_rgba(16,24,40,0.10)]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_24px_rgba(16,24,40,0.05)]">
                  <Image
                    src="/proova.png"
                    alt="Proova"
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>

                <div>
                  <div className="text-sm font-semibold tracking-tight text-app-ink">Proova</div>
                  <div className="text-xs text-app-muted">Waitlist confirmation</div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">✓</span>
                Spot saved
              </div>
            </div>

            <div className="mt-7 max-w-2xl">
              <div className="text-sm font-semibold text-app-muted">You’re in</div>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-app-ink sm:text-4xl">
                Thanks — we’ve saved your spot on the Proova waitlist.
              </h1>

              <p className="mt-3 text-sm leading-7 text-app-muted sm:text-base">
                We’ll reach out personally before beta opens. If you shared WhatsApp, we’ll message you there. Otherwise, we’ll use email.
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <InfoCard
                label="Status"
                title="Waitlist active"
                text="Your place is saved for the beta rollout."
              />
              <InfoCard
                label="Contact"
                title="Personal follow-up"
                text="We’ll reach out directly instead of sending bulk email blasts."
              />
              <InfoCard
                label="Best next step"
                title="Explore Founder access"
                text="Upgrade if you want priority onboarding and locked pricing."
              />
            </div>

            <section className="mt-7 rounded-[28px] border border-black/8 bg-[#fbfbfc] p-5 shadow-[0_12px_30px_rgba(16,24,40,0.04)] sm:p-6">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-app-ink">Want priority access?</div>
                <p className="mt-2 text-sm leading-7 text-app-muted">
                  Founder access is for businesses that want onboarding help, direct support, and locked founder pricing before public launch.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-black/8 bg-white p-4 shadow-[0_8px_20px_rgba(16,24,40,0.03)]">
                <div className="text-sm font-semibold text-app-ink">Why Founder access exists</div>

                <ul className="mt-3 grid gap-2 text-sm text-app-muted sm:grid-cols-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-500">•</span>
                    Priority onboarding and setup help
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-500">•</span>
                    Locked pricing before public launch
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-500">•</span>
                    Direct founder support
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-500">•</span>
                    Country-based pricing shown at checkout
                  </li>
                </ul>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <PrimaryLink href="/waitlist">View Founder access</PrimaryLink>
                <SecondaryLink href="/tour">See product tour</SecondaryLink>
              </div>
            </section>

            <section className="mt-5 rounded-[28px] border border-black/8 bg-white p-5 shadow-[0_12px_30px_rgba(16,24,40,0.04)] sm:p-6">
              <div className="text-sm font-semibold text-app-ink">Help shape the product</div>

              <p className="mt-2 text-sm leading-7 text-app-muted">
                Reply to our message with your biggest attribution pain — influencers, refunds, transfers, reconciliation, or proving ROI. The earliest users will directly shape what we build next.
              </p>

              <div className="mt-4 rounded-2xl border border-black/8 bg-[#fbfbfc] p-4 text-sm text-app-muted">
                The first cohort matters a lot. The clearer your use case, the better we can tailor onboarding and priorities.
              </div>
            </section>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link className="text-sm font-semibold text-app-ink hover:underline" href="/">
                ← Back to homepage
              </Link>

              <div className="text-xs text-app-muted">
                We’ll contact you before beta access opens.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}