"use client";

import * as React from "react";

const LINKS = [
  { id: "overview", label: "Overview" },
  { id: "how", label: "How it works" },
  { id: "proof", label: "Proof & reporting" },
  { id: "status", label: "Status & roadmap" },
  { id: "trust", label: "Security & privacy" },
] as const;

export function TourTopNav() {
  return (
    <nav className="mt-6 border-b border-app-border pb-3">
      {/* Mobile: single-line horizontal scroll (no wrapping)
          Desktop: normal layout */}
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          className={[
            "flex items-center gap-5 text-sm",
            "overflow-x-auto whitespace-nowrap",
            "scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]",
            "[&::-webkit-scrollbar]:hidden",
            "py-1",
          ].join(" ")}
        >
          {LINKS.map((x) => (
            <a
              key={x.id}
              href={`#${x.id}`}
              className="shrink-0 font-semibold text-app-muted hover:text-app-ink"
            >
              {x.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}