"use client";

import * as React from "react";
import { Button } from "@/components/ui";

export function MobileStickyCTA({
  onJoinWaitlist,
  onWatchDemo, // now: "See how it works"
}: {
  onJoinWaitlist: () => void;
  onWatchDemo: () => void;
}) {
  return (
    <div className="fixed bottom-3 left-0 right-0 z-30 mx-auto flex max-w-md justify-center px-4 md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="flex w-full gap-2 rounded-2xl border border-app-border bg-white p-2 shadow-soft">
        <Button className="flex-1 h-11" onClick={onJoinWaitlist}>
          Join waitlist
        </Button>
        <Button className="flex-1 h-11" variant="secondary" onClick={onWatchDemo}>
          See how it works
        </Button>
      </div>
    </div>
  );
}