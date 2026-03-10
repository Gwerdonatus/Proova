import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui";

function PrimaryAction({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <button
        className="
          inline-flex h-12 items-center justify-center rounded-2xl bg-[#111111] px-5 text-sm font-semibold text-white
          shadow-[0_12px_30px_rgba(17,17,17,0.16)] transition-all duration-200
          hover:bg-black hover:shadow-[0_18px_40px_rgba(17,17,17,0.20)] active:translate-y-[1px]
        "
      >
        {children}
      </button>
    </Link>
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
    <a href={href} target="_blank" rel="noreferrer">
      <button
        className="
          inline-flex h-12 items-center justify-center rounded-2xl border border-black/10 bg-white px-5 text-sm font-semibold text-app-ink
          shadow-[0_8px_18px_rgba(16,24,40,0.04)] transition-all duration-200
          hover:border-black/15 hover:bg-[#fcfcfd] active:translate-y-[1px]
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

export default function FounderPaymentFailedPage() {
  const whatsapp = process.env.NEXT_PUBLIC_FOUNDER_WHATSAPP_URL || "#";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fcfcfd]">
      <AmbientBackground />

      <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
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
                  <div className="text-xs text-app-muted">Founder checkout</div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-100">!</span>
                Payment not completed
              </div>
            </div>

            <div className="mt-7 max-w-2xl">
              <h1 className="text-3xl font-semibold tracking-tight text-app-ink sm:text-4xl">
                Your Founder payment didn’t complete.
              </h1>

              <p className="mt-3 text-sm leading-7 text-app-muted sm:text-base">
                No problem — your checkout was interrupted or not confirmed. You can try again now and continue securing your
                Founder access.
              </p>
            </div>

            <section className="mt-7 rounded-[28px] border border-black/8 bg-[#fbfbfc] p-5 shadow-[0_12px_30px_rgba(16,24,40,0.04)] sm:p-6">
              <div className="text-sm font-semibold text-app-ink">What this usually means</div>

              <ul className="mt-3 grid gap-2 text-sm text-app-muted">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-500">•</span>
                  The payment window was closed before completion
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-500">•</span>
                  The card or bank payment was declined
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-500">•</span>
                  The payment provider timed out before confirmation
                </li>
              </ul>
            </section>

            <section className="mt-5 rounded-[28px] border border-black/8 bg-white p-5 shadow-[0_12px_30px_rgba(16,24,40,0.04)] sm:p-6">
              <div className="text-sm font-semibold text-app-ink">Your next step</div>
              <p className="mt-2 text-sm leading-7 text-app-muted">
                Try checkout again. If the issue continues, message us directly and we’ll help you complete it quickly.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <PrimaryAction href="/waitlist">Try payment again</PrimaryAction>
                <SecondaryAction href={whatsapp}>WhatsApp the Founder</SecondaryAction>
              </div>

              <div className="mt-4 rounded-2xl border border-black/8 bg-[#fbfbfc] p-4 text-sm text-app-muted">
                If you message us, include your business name and the word{" "}
                <span className="font-semibold text-app-ink">“Founder”</span> so we can help faster.
              </div>
            </section>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link className="text-sm font-semibold text-app-ink hover:underline" href="/">
                ← Back to homepage
              </Link>

              <div className="text-xs text-app-muted">
                Your Founder checkout can be retried at any time.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}