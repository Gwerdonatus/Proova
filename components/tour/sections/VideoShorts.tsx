"use client";

import * as React from "react";
import { FiPlay } from "react-icons/fi";

type Clip = {
  title: string;
  desc: string;
  youtube: string;
};

function getYouTubeEmbedUrl(input: string) {
  const value = input.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) {
    return `https://www.youtube-nocookie.com/embed/${value}?rel=0&modestbranding=1&playsinline=1`;
  }

  if (value.includes("youtu.be/")) {
    const id = value.split("youtu.be/")[1]?.split(/[?&]/)[0];
    if (id) {
      return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;
    }
  }

  if (value.includes("youtube.com/watch")) {
    try {
      const url = new URL(value);
      const id = url.searchParams.get("v");
      if (id) {
        return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;
      }
    } catch {}
  }

  if (value.includes("/embed/")) return value;

  return "";
}

const CLIPS: Clip[] = [
  {
    title: "How attribution works",
    desc: "See how Proova ties confirmed revenue back to the click, campaign, and influencer that started the journey.",
    youtube: "https://youtu.be/Z50vL8LBXbU?si=a03CNiM4d5jWge89",
  },
  {
    title: "Sources, campaigns, and influencers",
    desc: "Understand how Proova structures tracking so reporting stays organized, readable, and useful.",
    youtube: "https://youtu.be/4pZP6rMecrc?si=Y6T5BpYXpkunO5hZ",
  },
  {
    title: "Offline reconciliation",
    desc: "Learn how Proova handles transfers, delayed payments, and off-site buying flows with honest reporting.",
    youtube: "https://youtu.be/pxWLXJku0GE?si=CVaHQ1Z48sQnkpI3",
  },
];

function VideoItem({ clip }: { clip: Clip }) {
  const embedUrl = getYouTubeEmbedUrl(clip.youtube);

  return (
    <div className="py-5 first:pt-0 last:pb-0 lg:rounded-[28px] lg:border lg:border-app-border lg:bg-white lg:p-4 lg:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[16px] font-semibold leading-5 text-app-ink lg:text-[15px]">
            {clip.title}
          </h3>
          <p className="mt-1.5 text-[14px] leading-6 text-app-muted lg:text-sm">
            {clip.desc}
          </p>
        </div>

        <div className="shrink-0 rounded-full bg-[#F6F1E8] px-3 py-1 text-[11px] font-semibold text-app-muted lg:border lg:border-app-border">
          Explainer
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-[20px] bg-[#0D0D0D] shadow-[0_14px_40px_rgba(0,0,0,0.10)] lg:rounded-[24px]">
        <div className="border-b border-white/10 bg-white/[0.05] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <div className="ml-2 truncate text-[11px] font-medium tracking-wide text-white/70">
              Proova explainer
            </div>
          </div>
        </div>

        <div className="relative aspect-[16/10] w-full sm:aspect-video">
          {embedUrl ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={embedUrl}
              title={clip.title}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-white/70">
              Invalid YouTube link
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function VideoShorts() {
  return (
    <section className="rounded-[24px] border border-app-border bg-white p-4 shadow-soft sm:p-5 lg:rounded-[32px] lg:bg-white/65 lg:p-7 lg:backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-app-border bg-[#FAF7F2]">
          <FiPlay className="h-4 w-4 text-app-ink" />
        </div>

        <div className="min-w-0">
          <div className="text-[20px] font-semibold leading-tight text-app-ink sm:text-[18px] lg:text-[15px]">
            Short explainer videos
          </div>
          <div className="mt-1.5 max-w-2xl text-[14px] leading-6 text-app-muted sm:text-[13px] lg:text-[13px]">
            Quick answers to the most important parts of the product.
          </div>
        </div>
      </div>

      <div className="mt-5 divide-y divide-app-border lg:mt-6 lg:grid lg:grid-cols-3 lg:gap-4 lg:divide-y-0">
        {CLIPS.map((clip) => (
          <VideoItem key={clip.title} clip={clip} />
        ))}
      </div>
    </section>
  );
}