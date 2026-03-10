"use client";

import * as React from "react";
import { FiPlay } from "react-icons/fi";

export function VideoLongDemo() {
  // Replace with your real YouTube video id later
  const youtubeId = "dQw4w9WgXcQ";

  return (
    <div className="rounded-[32px] border border-app-border bg-white p-4 shadow-soft sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-start gap-2">
          <FiPlay className="mt-[2px] h-4 w-4 text-app-ink" />
          <div>
            <div className="text-sm font-semibold text-app-ink">Demo</div>
            <div className="mt-1 text-xs text-app-muted">Watch the full end-to-end walkthrough.</div>
          </div>
        </div>
        <div className="hidden sm:block rounded-full border border-app-border bg-white px-3 py-1 text-xs font-semibold text-app-ink">
          Walkthrough
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-3xl border border-app-border bg-black/5">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="Proova demo video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}