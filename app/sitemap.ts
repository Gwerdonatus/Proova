// app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://proova.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // ── Core pages (highest importance) ────────────────────────────────
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ── Conversion pages (VERY important for SEO + product growth) ─────
    {
      url: `${BASE_URL}/tour`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/waitlist`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // ── Trust / Legal (important but lower priority) ───────────────────
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },

    // ── Future expansion (keep this pattern) ───────────────────────────
    // {
    //   url: `${BASE_URL}/pricing`,
    //   lastModified: now,
    //   changeFrequency: "weekly",
    //   priority: 0.8,
    // },
    // {
    //   url: `${BASE_URL}/blog`,
    //   lastModified: now,
    //   changeFrequency: "daily",
    //   priority: 0.7,
    // },
  ];
}