import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/landing/SiteFooter";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ─── Constants ────────────────────────────────────────────────────────────────
const BASE_URL = "https://proova.app";
const SITE_NAME = "Proova";
const TAGLINE = "Know What Actually Brought the Sale";
const DESCRIPTION =
  "Proova is the revenue attribution platform for social commerce. Track which influencer, campaign, or ad brought confirmed money — across DMs, WhatsApp, bank transfers, and online stores.";

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: `${SITE_NAME} — ${TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },

  description: DESCRIPTION,

  keywords: [
    "revenue attribution",
    "influencer marketing attribution",
    "social commerce analytics",
    "affiliate tracking software",
    "marketing attribution platform",
    "WhatsApp commerce tracking",
    "offline revenue attribution",
    "influencer ROI tracking",
    "click attribution software",
    "multi-channel attribution",
    "ecommerce attribution tool",
    "campaign tracking platform",
  ],

  authors: [{ name: SITE_NAME, url: BASE_URL }],
  creator: SITE_NAME,
  publisher: `${SITE_NAME}, Inc.`,
  category: "Technology",

  alternates: {
    canonical: BASE_URL,
    languages: { "en-US": BASE_URL },
  },

  // ── Icons ──────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon/favicon-256x256.png", sizes: "256x256", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon/favicon.ico" }],
    apple: [
      { url: "/favicon/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/favicon/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/favicon/apple-touch-icon-167x167.png", sizes: "167x167", type: "image/png" },
      { url: "/favicon/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [{ rel: "mask-icon", url: "/favicon/safari-pinned-tab.svg" }],
  },

  // ── Open Graph ─────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Revenue Attribution for Social Commerce`,
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@proova_app",
    creator: "@proova_app",
    title: `${SITE_NAME} — ${TAGLINE}`,
    description:
      "Know which influencer or campaign brought confirmed revenue — even when payment happens in DMs, WhatsApp, and bank transfers.",
    images: [
      {
        url: "/twitter-card.png",
        width: 1200,
        height: 600,
        alt: `${SITE_NAME} — Revenue Attribution`,
      },
    ],
  },

  // ── Robots ─────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  manifest: "/site.webmanifest",

  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },

  // Uncomment and fill in when you verify in Google Search Console:
  // verification: {
  //   google: "your-token-here",
  // },
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
// Tells Google exactly what Proova is — unlocks rich results, knowledge panel,
// and better rankings for branded + category searches.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/favicon/android-chrome-512x512.png`,
        width: 512,
        height: 512,
      },
      description: DESCRIPTION,
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@proova.app",
        contactType: "customer support",
        availableLanguage: "English",
      },
      // Add social profiles as you create them:
      sameAs: [
        // "https://twitter.com/proova_app",
        // "https://linkedin.com/company/proova",
        // "https://instagram.com/proova_app",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${BASE_URL}/#software`,
      name: SITE_NAME,
      url: BASE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: DESCRIPTION,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Join the waitlist — free early access",
      },
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: `${SITE_NAME} — ${TAGLINE}`,
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      description: DESCRIPTION,
      inLanguage: "en-US",
      potentialAction: {
        "@type": "JoinAction",
        name: "Join the waitlist",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/#waitlist`,
        },
      },
    },
  ],
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Windows tile config */}
        <meta name="msapplication-TileColor" content="#080808" />
        <meta name="msapplication-TileImage" content="/favicon/mstile-150x150.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Google Fonts preconnect — reduces font load time */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD — structured data for rich search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-app-bg text-app-ink`}>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}