import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui";

type SearchParams = {
  provider?: string;
  reference?: string;
  transaction_id?: string;
  session_id?: string;
};

function PrimaryAction({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
      <button
        className="
          inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-2xl
          bg-[#111111] px-6 text-sm font-semibold text-white
          shadow-[0_12px_30px_rgba(17,17,17,0.16)] transition-all duration-200
          hover:bg-black hover:shadow-[0_18px_40px_rgba(17,17,17,0.20)]
          active:translate-y-[1px]
          sm:min-w-[220px]
        "
      >
        {children}
      </button>
    </a>
  );
}

function SecondaryAction({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
      <button
        className="
          inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-2xl
          border border-black/10 bg-white px-6 text-sm font-semibold text-app-ink
          shadow-[0_8px_18px_rgba(16,24,40,0.04)] transition-all duration-200
          hover:border-black/15 hover:bg-[#fcfcfd] active:translate-y-[1px]
          sm:min-w-[220px]
        "
      >
        {children}
      </button>
    </a>
  );
}

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

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-[0_10px_24px_rgba(16,24,40,0.04)]">
      <div className="text-xs font-semibold text-app-muted">{label}</div>
      <div className="mt-1 break-words text-sm font-semibold leading-6 text-app-ink">
        {value}
      </div>
    </div>
  );
}

function getProviderLabel(provider?: string) {
  if (provider === "paystack") return "Paystack";
  if (provider === "paddle") return "Paddle";
  return "Secure checkout";
}

function getReferenceValue(searchParams: SearchParams) {
  if (searchParams.provider === "paystack" && searchParams.reference) {
    return searchParams.reference;
  }

  if (searchParams.provider === "paddle" && searchParams.transaction_id) {
    return searchParams.transaction_id;
  }

  if (searchParams.session_id) {
    return searchParams.session_id;
  }

  return "";
}

export default async function FounderSuccessPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = (await searchParams) || {};

  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL || "#";
  const whatsapp = process.env.NEXT_PUBLIC_FOUNDER_WHATSAPP_URL || "#";

  const providerLabel = getProviderLabel(params.provider);
  const referenceValue = getReferenceValue(params);

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
                  <div className="text-sm font-semibold tracking-tight text-app-ink">
                    Proova
                  </div>
                  <div className="text-xs text-app-muted">
                    Founder confirmation
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                  ✓
                </span>
                Payment received
              </div>
            </div>

            <div className="mt-7 max-w-2xl">
              <h1 className="text-3xl font-semibold tracking-tight text-app-ink sm:text-4xl">
                Welcome — you’re now a Proova Founder.
              </h1>

              <p className="mt-3 text-sm leading-7 text-app-muted sm:text-base">
                Your Founder spot is now locked in. You’ll get early access,
                priority onboarding, and direct support as we roll out the
                private beta.
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <StatCard label="Status" value="Founder Access Received" />
              <StatCard label="Payment method" value={providerLabel} />
              <StatCard label="Recommended next step" value="Book onboarding call" />
            </div>

            <div className="mt-4 rounded-2xl border border-black/8 bg-[#fbfbfc] p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-app-muted">
                Payment reference
              </div>
              <div className="mt-1 text-xs text-app-muted">
                Save this in case you need support.
              </div>

              {referenceValue ? (
                <div className="mt-3 rounded-xl border border-black/6 bg-white px-3 py-2 font-mono text-[12px] leading-5 text-app-ink break-all sm:text-[13px]">
                  {referenceValue}
                </div>
              ) : (
                <div className="mt-3 text-sm text-app-muted">
                  Your payment details have been recorded.
                </div>
              )}
            </div>

            <section className="mt-7 rounded-[28px] border border-black/8 bg-[#fbfbfc] p-5 shadow-[0_12px_30px_rgba(16,24,40,0.04)] sm:p-6">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-app-ink">
                  Your next step
                </div>
                <p className="mt-2 text-sm leading-7 text-app-muted">
                  Book a quick onboarding call so we can map your sales flow —
                  website, WhatsApp, transfers, or checkout — and make sure your
                  attribution setup is correct from day one.
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <PrimaryAction href={calendly}>Book onboarding call</PrimaryAction>
                <SecondaryAction href={whatsapp}>WhatsApp the Founder</SecondaryAction>
              </div>

              <div className="mt-5 rounded-2xl border border-black/8 bg-white p-4 shadow-[0_8px_20px_rgba(16,24,40,0.03)]">
                <div className="text-sm font-semibold text-app-ink">
                  What we’ll do on the call
                </div>

                <ul className="mt-3 grid gap-2 text-sm text-app-muted sm:grid-cols-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-500">•</span>
                    Confirm your sources, campaigns, and influencers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-500">•</span>
                    Set up your WhatsApp and transfer tracking flow
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-500">•</span>
                    Validate your Attributed vs Unattributed logic
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-500">•</span>
                    Make sure refunds reconcile correctly
                  </li>
                </ul>
              </div>
            </section>

            <section className="mt-5 rounded-[28px] border border-black/8 bg-white p-5 shadow-[0_12px_30px_rgba(16,24,40,0.04)] sm:p-6">
              <div className="text-sm font-semibold text-app-ink">
                What happens next
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-black/8 bg-[#fbfbfc] p-4">
                  <div className="text-xs font-semibold text-app-muted">
                    Next step
                  </div>
                  <div className="mt-1 text-sm font-semibold text-app-ink">
                    Founder welcome message
                  </div>
                  <div className="mt-1 text-sm text-app-muted">
                    You’ll get onboarding details and setup instructions
                  </div>
                </div>

                <div className="rounded-2xl border border-black/8 bg-[#fbfbfc] p-4">
                  <div className="text-xs font-semibold text-app-muted">
                    Private beta
                  </div>
                  <div className="mt-1 text-sm font-semibold text-app-ink">
                    Cohort-based rollout
                  </div>
                  <div className="mt-1 text-sm text-app-muted">
                    You’ll be part of the first group
                  </div>
                </div>

                <div className="rounded-2xl border border-black/8 bg-[#fbfbfc] p-4">
                  <div className="text-xs font-semibold text-app-muted">
                    Protection
                  </div>
                  <div className="mt-1 text-sm font-semibold text-app-ink">
                    30-day refund coverage
                  </div>
                  <div className="mt-1 text-sm text-app-muted">
                    Covered under the Founder refund promise
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-black/8 bg-[#fbfbfc] p-4 text-sm text-app-muted">
                Need help right now? Message us on WhatsApp and include your
                business name plus{" "}
                <span className="font-semibold text-app-ink">“Founder”</span>.
              </div>
            </section>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                className="text-sm font-semibold text-app-ink hover:underline"
                href="/"
              >
                ← Back to homepage
              </Link>

              <div className="text-xs text-app-muted">
                Save this page for your records.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}