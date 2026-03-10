"use client";
import * as React from "react";

export function BackgroundDecor() {
  return (
    // ✅ z-0 makes it visible (not behind the page background)
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {/* Right-side ribbon zone */}
      <div className="absolute right-[-240px] top-[-140px] h-[920px] w-[920px] opacity-95 sm:opacity-100">
        {/* Soft ambient base (NOT glow on ribbons) */}
        <div className="absolute inset-0 rounded-full bg-white/12 blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {/* Bright logo palette */}
            <linearGradient id="homeA" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF2D2D" />
              <stop offset="28%" stopColor="#FFB000" />
              <stop offset="62%" stopColor="#2F7BFF" />
              <stop offset="100%" stopColor="#8A2BFF" />
            </linearGradient>
            <linearGradient id="homeB" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#2F7BFF" />
              <stop offset="55%" stopColor="#8A2BFF" />
              <stop offset="100%" stopColor="#FFB000" />
            </linearGradient>
            {/* Faded ribbon gradient */}
            <linearGradient id="homeC" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF2D2D" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#FFB000" stopOpacity="0.40" />
              <stop offset="70%" stopColor="#2F7BFF" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#8A2BFF" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          {/* RIBBON A */}
          <path fill="none" stroke="url(#homeA)" strokeWidth="56" strokeLinecap="round" opacity="0.98">
            <animate
              attributeName="d"
              dur="11s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              values="
                M220,720 C 420,610 520,760 700,630 C 870,510 880,360 1030,300 C 1120,260 1160,220 1220,180;
                M220,710 C 440,630 510,740 700,620 C 890,500 870,380 1030,310 C 1125,270 1160,235 1220,190;
                M220,720 C 420,610 520,760 700,630 C 870,510 880,360 1030,300 C 1120,260 1160,220 1220,180
              "
            />
          </path>
          {/* Shiny edge highlight */}
          <path fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="6" strokeLinecap="round" opacity="0.18">
            <animate
              attributeName="d"
              dur="11s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              values="
                M220,708 C 420,596 520,744 700,616 C 870,496 880,346 1030,286 C 1120,246 1160,208 1220,168;
                M220,700 C 440,612 510,728 700,606 C 890,486 870,364 1030,296 C 1125,256 1160,222 1220,178;
                M220,708 C 420,596 520,744 700,616 C 870,496 880,346 1030,286 C 1120,246 1160,208 1220,168
              "
            />
          </path>
          {/* RIBBON B */}
          <path fill="none" stroke="url(#homeB)" strokeWidth="46" strokeLinecap="round" opacity="0.96">
            <animate
              attributeName="d"
              dur="13s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              values="
                M260,360 C 420,430 540,300 700,360 C 860,420 930,520 1060,470 C 1140,440 1180,470 1220,485;
                M260,350 C 430,440 530,312 700,350 C 870,410 920,532 1060,478 C 1145,448 1180,476 1220,490;
                M260,360 C 420,430 540,300 700,360 C 860,420 930,520 1060,470 C 1140,440 1180,470 1220,485
              "
            />
          </path>
          {/* Shiny edge highlight */}
          <path fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="5" strokeLinecap="round" opacity="0.14">
            <animate
              attributeName="d"
              dur="13s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              values="
                M260,350 C 420,420 540,290 700,350 C 860,410 930,510 1060,460 C 1140,430 1180,460 1220,475;
                M260,342 C 430,430 530,302 700,342 C 870,402 920,522 1060,468 C 1145,438 1180,466 1220,482;
                M260,350 C 420,420 540,290 700,350 C 860,410 930,510 1060,460 C 1140,430 1180,460 1220,475
              "
            />
          </path>
          {/* RIBBON C */}
          <path fill="none" stroke="url(#homeC)" strokeWidth="28" strokeLinecap="round" opacity="0.38">
            <animate
              attributeName="d"
              dur="15s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              values="
                M180,560 C 390,520 520,650 710,560 C 900,470 970,400 1100,380 C 1160,372 1190,360 1220,350;
                M180,552 C 402,530 510,640 710,552 C 912,480 960,410 1100,388 C 1168,380 1192,368 1220,356;
                M180,560 C 390,520 520,650 710,560 C 900,470 970,400 1100,380 C 1160,372 1190,360 1220,350
              "
            />
          </path>
          {/* Reduced motion support */}
          <style>{`
            @media (prefers-reduced-motion: reduce) {
              animate { display: none !important; }
            }
          `}</style>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/0" />
      </div>
      {/* Mobile: fade ribbons a bit so text stays clean */}
      <div className="absolute inset-0 sm:hidden bg-gradient-to-b from-white/0 via-white/0 to-white/10" />
    </div>
  );
}