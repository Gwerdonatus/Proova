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
      className={`text-sm text-[#111111] transition duration-200 hover:text-[#8B5E3C] ${className}`}
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
      className="inline-flex items-center gap-2.5 text-sm text-[#111111] transition duration-200 hover:text-[#8B5E3C]"
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

function FooterHeroRibbonBackground() {
  const ribbonSets = [
    {
      id: "purple",
      glow: "url(#footerGlowPurple)",
      fill: "url(#footerRibbonPurple)",
      delay: "0s",
      duration: "16s",
      opacity: 1,
      d: `
        M 1080 70
        C 1170 52, 1270 58, 1360 96
        C 1450 134, 1525 180, 1605 238
        C 1680 294, 1760 342, 1885 390
      `,
    },
    {
      id: "sand",
      glow: "url(#footerGlowSand)",
      fill: "url(#footerRibbonSand)",
      delay: "-3s",
      duration: "19s",
      opacity: 0.92,
      d: `
        M 1120 164
        C 1215 150, 1320 156, 1418 186
        C 1512 214, 1598 252, 1688 294
        C 1778 336, 1860 374, 1968 420
      `,
    },
    {
      id: "gold",
      glow: "url(#footerGlowGold)",
      fill: "url(#footerRibbonGold)",
      delay: "-6s",
      duration: "18s",
      opacity: 1,
      d: `
        M 1010 286
        C 1135 270, 1262 272, 1382 308
        C 1496 342, 1606 394, 1704 448
        C 1804 504, 1898 548, 2026 600
      `,
    },
    {
      id: "blueCross",
      glow: "url(#footerGlowBlue)",
      fill: "url(#footerRibbonBlue)",
      delay: "-2s",
      duration: "17s",
      opacity: 0.78,
      d: `
        M 1502 118
        C 1452 170, 1410 224, 1374 278
        C 1332 340, 1290 398, 1232 452
        C 1186 494, 1128 530, 1058 566
      `,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-x-[-10%] bottom-[-18px] top-[8%] sm:inset-x-[-8%] lg:top-[2%]">
        <svg
          viewBox="0 0 1920 760"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="footerRibbonPurple" x1="1080" y1="70" x2="1885" y2="390" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6D3DF5" />
              <stop offset="55%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>

            <linearGradient id="footerRibbonSand" x1="1120" y1="164" x2="1968" y2="420" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F2D4C7" />
              <stop offset="55%" stopColor="#E8C7B7" />
              <stop offset="100%" stopColor="#D9B9AA" />
            </linearGradient>

            <linearGradient id="footerRibbonGold" x1="1010" y1="286" x2="2026" y2="600" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF4D38" />
              <stop offset="32%" stopColor="#FF7A00" />
              <stop offset="70%" stopColor="#FFA400" />
              <stop offset="100%" stopColor="#FFD24A" />
            </linearGradient>

            <linearGradient id="footerRibbonBlue" x1="1502" y1="118" x2="1058" y2="566" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4C7DFF" />
              <stop offset="45%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8EC5FF" />
            </linearGradient>

            <filter id="footerGlowPurple" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="14" />
            </filter>

            <filter id="footerGlowSand" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="12" />
            </filter>

            <filter id="footerGlowGold" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="16" />
            </filter>

            <filter id="footerGlowBlue" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="12" />
            </filter>

            <linearGradient id="footerRibbonMaskTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="38%" stopColor="white" stopOpacity="0.96" />
              <stop offset="65%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {ribbonSets.map((ribbon) => (
            <g
              key={ribbon.id}
              className="footer-hero-ribbon"
              style={{
                animationDuration: ribbon.duration,
                animationDelay: ribbon.delay,
                opacity: ribbon.opacity,
              }}
            >
              <path
                d={ribbon.d}
                fill="none"
                stroke={ribbon.fill}
                strokeWidth="36"
                strokeLinecap="round"
                filter={ribbon.glow}
                opacity="0.38"
              />
              <path
                d={ribbon.d}
                fill="none"
                stroke={ribbon.fill}
                strokeWidth="26"
                strokeLinecap="round"
              />
              <path
                d={ribbon.d}
                fill="none"
                stroke={ribbon.fill}
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.95"
              />
            </g>
          ))}

          <rect x="0" y="0" width="1920" height="760" fill="url(#footerRibbonMaskTop)" />
        </svg>
      </div>

      <style jsx>{`
        .footer-hero-ribbon {
          transform-origin: center center;
          animation-name: footerRibbonFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        @keyframes footerRibbonFloat {
          0% {
            transform: translate3d(0px, 0px, 0px);
          }
          25% {
            transform: translate3d(6px, -3px, 0px);
          }
          50% {
            transform: translate3d(15px, -8px, 0px);
          }
          75% {
            transform: translate3d(7px, -4px, 0px);
          }
          100% {
            transform: translate3d(0px, 0px, 0px);
          }
        }
      `}</style>
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
    <footer className="relative mt-12 bg-transparent sm:mt-14 lg:mt-16" aria-label="Site footer">
      <div className="absolute inset-x-0 bottom-0 top-0 bg-white" />

      <div className="relative mx-auto max-w-[1320px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <FooterHeroRibbonBackground />

        <div className="relative z-10 pt-10 sm:pt-12 lg:pt-14">
          <div
            className="
              overflow-hidden
              rounded-t-[36px]
              border border-black/8
              bg-white
              shadow-[0_-8px_24px_rgba(0,0,0,0.03),0_18px_60px_rgba(0,0,0,0.05)]
              sm:rounded-t-[50px]
              lg:rounded-t-[64px]
            "
          >
            <div className="border-b border-black/8 px-5 py-6 sm:px-7 sm:py-7 lg:px-10 lg:py-8">
              <div className="rounded-[28px] border border-black/8 bg-[#FCFCFC] px-5 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:px-6 sm:py-6 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-7">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-[12px] border border-black/8 bg-white shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
                      <Image
                        src="/proova.png"
                        alt="Proova logo"
                        fill
                        className="object-contain p-1.5"
                        sizes="40px"
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

                  <h3 className="mt-5 text-[1.45rem] font-semibold tracking-tight text-[#111111] sm:text-[1.7rem]">
                    Know what actually brought the sale.
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#525252] sm:text-[15px]">
                    Track revenue across influencers, campaigns, WhatsApp conversations,
                    transfers, and mixed payment flows without messy guesswork.
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2.5 lg:mt-0 lg:justify-end">
                  <button
                    type="button"
                    onClick={goWaitlist}
                    className="inline-flex items-center gap-2 rounded-full bg-[#8B5E3C] px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-[1px] hover:bg-[#7A5135] hover:shadow-[0_10px_24px_rgba(139,94,60,0.18)]"
                  >
                    Join waitlist
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={goPricing}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#111111] transition duration-200 hover:-translate-y-[1px] hover:border-[#8B5E3C]/25 hover:text-[#8B5E3C]"
                  >
                    View pricing
                  </button>
                </div>
              </div>
            </div>

            <div className="px-5 py-8 sm:px-7 sm:py-9 lg:px-10 lg:py-10">
              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:gap-12">
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
                      className="text-left text-sm text-[#111111] transition duration-200 hover:text-[#8B5E3C]"
                    >
                      Pricing
                    </button>

                    <button
                      type="button"
                      onClick={goWaitlist}
                      className="text-left text-sm text-[#111111] transition duration-200 hover:text-[#8B5E3C]"
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

              <div className="mt-8 border-t border-black/8 pt-4 sm:mt-10 sm:pt-5">
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
                    className="inline-flex items-center gap-1.5 self-start text-[12px] text-[#737373] transition duration-200 hover:text-[#8B5E3C] sm:self-auto"
                  >
                    <ArrowUpIcon className="h-4 w-4" />
                    <span>Back to top</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-[1] h-16 bg-white sm:h-20 lg:h-24" />
      </div>
    </footer>
  );
}