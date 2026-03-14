"use client";

import * as React from "react";
import { FiPlay, FiArrowUpRight } from "react-icons/fi";

type Clip = {
  title: string;
  desc: string;
  youtube: string;
  channel?: string;
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

function getYouTubeWatchUrl(input: string) {
  const value = input.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) {
    return `https://www.youtube.com/watch?v=${value}`;
  }

  if (value.includes("youtu.be/")) {
    const id = value.split("youtu.be/")[1]?.split(/[?&]/)[0];
    if (id) return `https://www.youtube.com/watch?v=${id}`;
  }

  if (value.includes("youtube.com/watch")) {
    return value;
  }

  if (value.includes("/embed/")) {
    const id = value.split("/embed/")[1]?.split(/[?&]/)[0];
    if (id) return `https://www.youtube.com/watch?v=${id}`;
  }

  return input;
}

const CLIPS: Clip[] = [
  {
    title: "How attribution works",
    desc: "See how Proova ties confirmed revenue back to the click, campaign, and influencer that started the journey.",
    youtube: "https://youtu.be/Z50vL8LBXbU?si=a03CNiM4d5jWge89",
    channel: "Proova on YouTube",
  },
  {
    title: "Sources, campaigns, and influencers",
    desc: "Understand how Proova structures tracking so reporting stays organized, readable, and useful.",
    youtube: "https://youtu.be/4pZP6rMecrc?si=Y6T5BpYXpkunO5hZ",
    channel: "Proova on YouTube",
  },
  {
    title: "Offline reconciliation",
    desc: "Learn how Proova handles transfers, delayed payments, and off-site buying flows with honest reporting.",
    youtube: "https://youtu.be/pxWLXJku0GE?si=CVaHQ1Z48sQnkpI3",
    channel: "Proova on YouTube",
  },
];

function VideoItem({ clip }: { clip: Clip }) {
  const embedUrl = getYouTubeEmbedUrl(clip.youtube);
  const watchUrl = getYouTubeWatchUrl(clip.youtube);

  return (
    <article className="py-6 first:pt-0 last:pb-0 lg:rounded-[28px] lg:border lg:border-app-border lg:bg-white lg:p-4 lg:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[16px] font-semibold leading-5 text-app-ink lg:text-[15px]">
            {clip.title}
          </h3>

          <p className="mt-1.5 text-[14px] leading-6 text-app-muted lg:text-sm">
            {clip.desc}
          </p>

          <a
            href={watchUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold text-app-muted transition hover:text-app-ink"
          >
            <span>{clip.channel || "Watch on YouTube"}</span>
            <FiArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="shrink-0 rounded-full bg-[#F6F1E8] px-3 py-1 text-[11px] font-semibold text-app-muted lg:border lg:border-app-border">
          Explainer
        </div>
      </div>

      <div className="mt-4 -mx-4 sm:-mx-5 lg:mx-0">
        <div className="overflow-hidden rounded-none bg-[#0D0D0D] shadow-none sm:rounded-[24px] sm:shadow-[0_14px_40px_rgba(0,0,0,0.10)] lg:rounded-[24px]">
          <div className="relative aspect-[16/11] w-full bg-black sm:aspect-video">
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
    </article>
  );
}

export function VideoShorts() {
  return (
    <section className="bg-transparent px-0 py-0 lg:rounded-[32px] lg:border lg:border-app-border lg:bg-white/65 lg:p-7 lg:shadow-soft lg:backdrop-blur">
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

      <div className="mt-6 divide-y divide-app-border/70 lg:mt-6 lg:grid lg:grid-cols-3 lg:gap-4 lg:divide-y-0">
        {CLIPS.map((clip) => (
          <VideoItem key={clip.title} clip={clip} />
        ))}
      </div>
    </section>
  );
}