"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M10 15V5M10 5L6.5 8.5M10 5L13.5 8.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6 14L14 6M8 6H14V12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 4L16 16M12.5 4H16L7.5 13.8M4 16H7.5L16 6.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3.5 6.5L10 11.25L16.5 6.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3"
        y="5"
        width="14"
        height="10"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M10 3L15.5 5.2V9.7C15.5 13 13.2 15.4 10 17C6.8 15.4 4.5 13 4.5 9.7V5.2L10 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.7 10L9.2 11.5L12.7 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M10 2.8L11.5 7.1L15.8 8.6L11.5 10.1L10 14.4L8.5 10.1L4.2 8.6L8.5 7.1L10 2.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotIcon({ className }: { className?: string }) {
  return <span className={className} />;
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#737373]">
      {children}
    </div>
  );
}

function FooterTextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`text-sm text-[#111111] transition-colors duration-200 hover:text-[#8B5E3C] ${className}`}
    >
      {children}
    </Link>
  );
}

function FooterExternalLink({
  href,
  children,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  const isMail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={!isMail ? "_blank" : undefined}
      rel={!isMail ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2.5 text-sm text-[#111111] transition-colors duration-200 hover:text-[#8B5E3C]"
    >
      {icon ? (
        <span className="flex h-4 w-4 items-center justify-center text-[#8B5E3C]">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </a>
  );
}

function FooterChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/88 px-3 py-1.5 text-[11px] font-medium text-[#5b5b5b] shadow-[0_6px_16px_rgba(0,0,0,0.03)] backdrop-blur">
      {children}
    </div>
  );
}

function FooterRibbonBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.25)_18%,rgba(255,255,255,0.82)_52%,rgba(255,255,255,1)_78%)]" />

      <div className="absolute -left-[12%] top-10 h-20 w-[72%] rotate-[8deg] rounded-full bg-[linear-gradient(90deg,#7c3aed,#9f67ff,#d8b4fe)] opacity-90 blur-[18px] sm:top-12 sm:h-24 sm:w-[65%] lg:top-14 lg:h-28">
        <div className="h-full w-full animate-[footerRibbonFloat_16s_ease-in-out_infinite]" />
      </div>

      <div className="absolute right-[-14%] top-24 h-16 w-[64%] -rotate-[10deg] rounded-full bg-[linear-gradient(90deg,#4f46e5,#3b82f6,#93c5fd)] opacity-70 blur-[16px] sm:top-28 sm:h-20 sm:w-[58%] lg:top-32 lg:h-24">
        <div className="h-full w-full animate-[footerRibbonFloat_18s_ease-in-out_infinite]" />
      </div>

      <div className="absolute -left-[8%] top-36 h-20 w-[84%] rotate-[6deg] rounded-full bg-[linear-gradient(90deg,#ff5a3d,#ff8a00,#ffd15a)] opacity-95 blur-[18px] sm:top-40 sm:h-24 sm:w-[78%] lg:top-44 lg:h-28">
        <div className="h-full w-full animate-[footerRibbonFloat_20s_ease-in-out_infinite]" />
      </div>

      <div className="absolute right-[-6%] top-[7.5rem] h-14 w-[48%] -rotate-[34deg] rounded-full bg-[linear-gradient(90deg,#e9c8ba,#f1d8ca,#f7e9e1)] opacity-70 blur-[14px] sm:top-[8.5rem] sm:h-16 sm:w-[42%] lg:top-[9.5rem] lg:h-20">
        <div className="h-full w-full animate-[footerRibbonFloat_17s_ease-in-out_infinite]" />
      </div>

      <style jsx>{`
        @keyframes footerRibbonFloat {
          0% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(10px, -4px, 0);
          }
          50% {
            transform: translate3d(18px, -8px, 0);
          }
          75% {
            transform: translate3d(8px, -3px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}

function FooterMobileDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 w-[42%] sm:w-[34%] lg:hidden"
    >
      <div className="absolute right-[-10%] top-4 h-16 w-28 rotate-[24deg] rounded-full bg-[linear-gradient(90deg,#7c3aed,#c084fc)] opacity-75 blur-[16px]" />
      <div className="absolute right-[8%] top-14 h-12 w-24 -rotate-[16deg] rounded-full bg-[linear-gradient(90deg,#ff6b45,#ffb347)] opacity-80 blur-[14px]" />
      <div className="absolute right-[-4%] top-24 h-10 w-20 rotate-[30deg] rounded-full bg-[linear-gradient(90deg,#3b82f6,#93c5fd)] opacity-70 blur-[14px]" />
      <div className="absolute right-8 top-5 text-[#8B5E3C]/55">
        <SparkIcon className="h-4 w-4" />
      </div>
      <div className="absolute right-20 top-20 h-2.5 w-2.5 rounded-full bg-[#8B5E3C]/20" />
      <div className="absolute right-12 top-28 h-1.5 w-1.5 rounded-full bg-[#7c3aed]/30" />
    </div>
  );
}

export function SiteFooter() {
  const router = useRouter();
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const isDashboardLike =
    pathname?.startsWith("/app") ||
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/auth");

  if (isDashboardLike) return null;

  function goWaitlist() {
    router.push("/waitlist");
  }

  function goPricing() {
    router.push("/waitlist");
  }

  function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      className="relative mt-8 bg-white sm:mt-10 lg:mt-12"
      aria-label="Site footer"
    >
      <div className="relative overflow-hidden border-t border-black/6 bg-white">
        <FooterRibbonBackground />

        <div className="relative mx-auto max-w-[1280px] px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
          <div className="relative z-10 overflow-hidden rounded-t-[32px] border border-black/8 bg-white shadow-[0_-8px_28px_rgba(0,0,0,0.02),0_18px_50px_rgba(0,0,0,0.04)] sm:rounded-t-[42px] lg:rounded-t-[52px]">
            <div className="border-b border-black/8 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
              <div className="relative overflow-hidden rounded-[26px] border border-black/8 bg-[#fcfcfc] px-4 py-5 shadow-[0_10px_26px_rgba(0,0,0,0.035)] sm:px-5 sm:py-5 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-6">
                <FooterMobileDecor />

                <div className="relative z-10 max-w-2xl pr-16 sm:pr-20 lg:pr-0">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-[12px] border border-black/8 bg-white shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
                      <Image
                        src="/proova.png"
                        alt="Proova logo"
                        fill
                        className="object-contain p-1.5"
                        sizes="40px"
                        priority={false}
                      />
                    </div>

                    <div>
                      <div className="text-sm font-semibold tracking-tight text-[#111111]">
                        Proova
                      </div>
                      <div className="text-[12px] text-[#737373]">
                        Revenue proof for social commerce
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-4 text-[1.35rem] font-semibold tracking-tight text-[#111111] sm:text-[1.55rem] lg:text-[1.7rem]">
                    Know what actually brought the sale.
                  </h3>

                  <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[#525252] sm:text-[15px]">
                    Track revenue across influencers, campaigns, WhatsApp conversations,
                    transfers, and mixed payment flows without messy guesswork.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2.5 lg:hidden">
                    <FooterChip>
                      <ShieldIcon className="h-3.5 w-3.5 text-[#8B5E3C]" />
                      <span>Private by design</span>
                    </FooterChip>

                    <FooterChip>
                      <DotIcon className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>Fast setup</span>
                    </FooterChip>
                  </div>
                </div>

                <div className="relative z-10 mt-5 flex flex-wrap gap-2.5 lg:mt-0 lg:justify-end">
                  <button
                    type="button"
                    onClick={goWaitlist}
                    className="inline-flex items-center gap-2 rounded-full bg-[#8B5E3C] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#7A5135] hover:shadow-[0_10px_24px_rgba(139,94,60,0.18)]"
                  >
                    Join waitlist
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={goPricing}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#111111] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#8B5E3C]/25 hover:text-[#8B5E3C]"
                  >
                    View pricing
                  </button>
                </div>
              </div>
            </div>

            <div className="px-4 py-7 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:gap-10">
                <div className="max-w-sm">
                  <ColumnTitle>About</ColumnTitle>
                  <p className="mt-4 text-sm leading-relaxed text-[#525252]">
                    Proova helps commerce brands prove where revenue came from across
                    online and offline buying journeys, so teams can spend with more
                    confidence and less guesswork.
                  </p>

                  <div className="mt-5">
                    <FooterTextLink
                      href="/trust"
                      className="inline-flex items-center gap-2"
                    >
                      <ShieldIcon className="h-4 w-4 text-[#8B5E3C]" />
                      <span>Trust, privacy & compliance</span>
                    </FooterTextLink>
                  </div>
                </div>

                <div>
                  <ColumnTitle>Product</ColumnTitle>
                  <div className="mt-4 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={goPricing}
                      className="text-left text-sm text-[#111111] transition-colors duration-200 hover:text-[#8B5E3C]"
                    >
                      Pricing
                    </button>

                    <button
                      type="button"
                      onClick={goWaitlist}
                      className="text-left text-sm text-[#111111] transition-colors duration-200 hover:text-[#8B5E3C]"
                    >
                      Join waitlist
                    </button>

                    <FooterTextLink href="/tour">Product tour</FooterTextLink>
                    <FooterTextLink href="/trust">Trust</FooterTextLink>
                  </div>
                </div>

                <div>
                  <ColumnTitle>Resources</ColumnTitle>
                  <div className="mt-4 flex flex-col gap-3">
                    <FooterTextLink href="/trust">Privacy</FooterTextLink>
                    <FooterTextLink href="/trust">Compliance</FooterTextLink>
                    <FooterTextLink href="/trust">Terms</FooterTextLink>
                  </div>
                </div>

                <div>
                  <ColumnTitle>Contact</ColumnTitle>
                  <div className="mt-4 flex flex-col gap-3.5">
                    <FooterExternalLink
                      href="https://x.com/proverapp"
                      icon={<XIcon className="h-4 w-4" />}
                    >
                      @proverapp
                    </FooterExternalLink>

                    <FooterExternalLink
                      href="mailto:proverapp@outlook.com"
                      icon={<MailIcon className="h-4 w-4" />}
                    >
                      proverapp@outlook.com
                    </FooterExternalLink>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-black/8 pt-4 sm:mt-9 sm:pt-5">
                <div className="flex flex-col gap-3 text-[12px] text-[#737373] sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span>© {year} Proova. All rights reserved.</span>

                    <FooterTextLink
                      href="/trust"
                      className="text-[12px] text-[#737373]"
                    >
                      Privacy Policy
                    </FooterTextLink>

                    <FooterTextLink
                      href="/trust"
                      className="text-[12px] text-[#737373]"
                    >
                      Terms
                    </FooterTextLink>
                  </div>

                  <button
                    type="button"
                    onClick={goTop}
                    className="inline-flex items-center gap-1.5 self-start text-[12px] text-[#737373] transition-colors duration-200 hover:text-[#8B5E3C] sm:self-auto"
                  >
                    <ArrowUpIcon className="h-4 w-4" />
                    <span>Back to top</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}