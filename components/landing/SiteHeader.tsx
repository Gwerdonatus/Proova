"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui";

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

export function SiteHeader({
  onWatchDemo, // now: "See how it works"
  onJoinWaitlist,
}: {
  onWatchDemo: () => void;
  onJoinWaitlist: () => void;
}) {
  const scrolled = useScrolled(10);

  return (
    <header
      className={[
        "sticky top-0 z-30 transition-all duration-200",
        // Flows with hero at top
        scrolled
          ? "bg-app-bg/85 backdrop-blur border-b border-app-border shadow-soft"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-2xl border border-app-border bg-white shadow-soft">
            <Image
              src="/proova.png"
              alt="Proova"
              width={56}
              height={56}
              className="h-full w-full object-contain"
              priority
            />
          </div>

          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight text-app-ink">Proova</div>
            <div className="text-xs text-app-muted">Revenue proof for social commerce</div>
          </div>
        </div>

        {/* Desktop actions only */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="secondary" onClick={onWatchDemo}>
            See how it works
          </Button>
          <Button onClick={onJoinWaitlist}>Join waitlist</Button>
        </div>
      </div>
    </header>
  );
}