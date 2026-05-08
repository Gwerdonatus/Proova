import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Tier = "nigeria" | "africa" | "global";

// ---------------- COUNTRY LOGIC ----------------

const AFRICA_ISO2 = new Set([
  "DZ","AO","BJ","BW","BF","BI","CM","CV","CF","TD","KM","CG","CD","DJ","EG","GQ","ER","SZ","ET","GA","GM","GH","GN","GW",
  "CI","KE","LS","LR","LY","MG","MW","ML","MR","MU","MA","MZ","NA","NE","NG","RW","ST","SN","SC","SL","SO","ZA","SS","SD",
  "TZ","TG","TN","UG","ZM","ZW",
]);

const AFRICAN_COUNTRY_NAMES = new Set([
  "Algeria","Angola","Benin","Botswana","Burkina Faso","Burundi","Cameroon","Cape Verde","Central African Republic","Chad",
  "Comoros","Congo","DR Congo","Djibouti","Egypt","Equatorial Guinea","Eritrea","Eswatini","Ethiopia","Gabon","Gambia","Ghana",
  "Guinea","Guinea-Bissau","Ivory Coast","Kenya","Lesotho","Liberia","Libya","Madagascar","Malawi","Mali","Mauritania","Mauritius",
  "Morocco","Mozambique","Namibia","Niger","Nigeria","Rwanda","Sao Tome and Principe","Senegal","Seychelles","Sierra Leone","Somalia",
  "South Africa","South Sudan","Sudan","Tanzania","Togo","Tunisia","Uganda","Zambia","Zimbabwe",
]);

function normalizeCountryInput(countryRaw: string) {
  const v = (countryRaw || "").trim();
  const upper = v.toUpperCase();
  const looksIso2 = /^[A-Z]{2}$/.test(upper);
  return { raw: v, upper, looksIso2 };
}

function computeTier(countryRaw: string): Tier {
  const { raw, upper, looksIso2 } = normalizeCountryInput(countryRaw);

  if (looksIso2) {
    if (upper === "NG") return "nigeria";
    if (AFRICA_ISO2.has(upper)) return "africa";
    return "global";
  }

  if (raw === "Nigeria") return "nigeria";
  if (AFRICAN_COUNTRY_NAMES.has(raw)) return "africa";
  return "global";
}

// ---------------- HELPERS ----------------

function getBaseUrl() {
  const base = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
  return (base || "").replace(/\/$/, "");
}

function getPaddleApiBase() {
  return process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox"
    ? "https://sandbox-api.paddle.com"
    : "https://api.paddle.com";
}

async function safeJson(res: Response) {
  const text = await res.text();
  try {
    return { ok: res.ok, status: res.status, json: JSON.parse(text), text };
  } catch {
    return { ok: res.ok, status: res.status, json: null as any, text };
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(t);
  }
}

// ---------------- PAYSTACK ----------------

async function paystackInitialize(payload: unknown, secret: string) {
  const url = "https://api.paystack.co/transaction/initialize";
  let lastErr: unknown = null;

  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetchWithTimeout(
        url,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${secret}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
        30_000
      );

      return await safeJson(res);
    } catch (e) {
      lastErr = e;
      await sleep(i === 0 ? 250 : i === 1 ? 600 : 1200);
    }
  }

  throw lastErr || new Error("Paystack initialize failed (network)");
}

// ---------------- MAIN ----------------

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body?.email || "").trim();
    const name  = String(body?.name  || "").trim();
    const whatsapp = String(body?.whatsapp || "").trim();
    const country  = String(body?.country  || "").trim();

    if (!email)   return NextResponse.json({ error: "Missing email"   }, { status: 400 });
    if (!country) return NextResponse.json({ error: "Missing country" }, { status: 400 });

    const tier = computeTier(country);

    // ================= PAYSTACK (Nigeria) =================
    if (tier === "nigeria") {
      const baseUrl = getBaseUrl();
      const secret  = process.env.PAYSTACK_SECRET_KEY;

      if (!baseUrl) return NextResponse.json({ error: "Missing APP_URL"            }, { status: 500 });
      if (!secret)  return NextResponse.json({ error: "Missing PAYSTACK_SECRET_KEY" }, { status: 500 });

      const amount    = 79_000 * 100; // kobo
      const reference = `proova_${Date.now()}_${Math.random().toString(16).slice(2)}`;
      const callback_url = `${baseUrl}/founder/success?provider=paystack&reference=${encodeURIComponent(reference)}`;

      const payload = {
        email,
        amount,
        currency: "NGN",
        reference,
        callback_url,
        metadata: {
          source: "proova_founder_checkout",
          tier,
          country,
          name,
          ...(whatsapp ? { whatsapp } : {}),
        },
      };

      try {
        const out = await paystackInitialize(payload, secret);

        if (!out.ok || !out.json?.status || !out.json?.data?.authorization_url) {
          console.error("Paystack init failed:", out.status, out.text);
          return NextResponse.json(
            { error: out.json?.message || "Paystack initialize failed" },
            { status: 400 }
          );
        }

        return NextResponse.json({
          provider: "paystack",
          url: out.json.data.authorization_url,
        });
      } catch (e: any) {
        console.error("Paystack network error:", e?.message);
        return NextResponse.json({ error: "Paystack request failed" }, { status: 502 });
      }
    }

    // ================= PADDLE (Africa ex-NG + Global) =================

    const paddleApiKey = process.env.PADDLE_API_KEY;
    const baseUrl      = getBaseUrl();

    if (!paddleApiKey) return NextResponse.json({ error: "Missing PADDLE_API_KEY" }, { status: 500 });
    if (!baseUrl)      return NextResponse.json({ error: "Missing APP_URL"        }, { status: 500 });

    const priceId =
      tier === "africa"
        ? process.env.PADDLE_PRICE_AFRICA_USD
        : process.env.PADDLE_PRICE_GLOBAL_USD;

    if (!priceId || !priceId.startsWith("pri_")) {
      return NextResponse.json({ error: "Invalid or missing Paddle price ID" }, { status: 500 });
    }

    const paddleRes = await fetchWithTimeout(
      `${getPaddleApiBase()}/transactions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${paddleApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [{ price_id: priceId, quantity: 1 }],
          collection_mode: "automatic",
          // ✅ No checkout.url here — successUrl is handled client-side by
          //    Paddle.Checkout.open({ settings: { successUrl } }) which works
          //    on localhost without any domain approval step.
          custom_data: {
            source: "proova_founder_checkout",
            tier,
            country,
            name,
            email,
            ...(whatsapp ? { whatsapp } : {}),
          },
        }),
      },
      30_000
    );

    const paddleOut = await safeJson(paddleRes);

    if (!paddleOut.ok || !paddleOut.json?.data?.id) {
      console.error("Paddle transaction creation failed:", paddleOut.status, paddleOut.text);
      return NextResponse.json(
        { error: paddleOut.json?.error?.detail || "Paddle transaction creation failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      provider: "paddle",
      transactionId: paddleOut.json.data.id,
    });

  } catch (e: any) {
    console.error("Checkout route error:", e);
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}