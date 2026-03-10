// app/api/paddle/webhook/route.ts
import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

export const runtime = "nodejs";

function parsePaddleSignature(header: string) {
  const parts = header.split(";").map((part) => part.trim());
  const parsed: Record<string, string[]> = {};

  for (const part of parts) {
    const [key, value] = part.split("=");
    if (!key || !value) continue;

    if (!parsed[key]) parsed[key] = [];
    parsed[key].push(value);
  }

  return {
    ts: parsed.ts?.[0],
    h1: parsed.h1 || [],
  };
}

function verifyPaddleWebhook(rawBody: string, signatureHeader: string, secret: string) {
  const { ts, h1 } = parsePaddleSignature(signatureHeader);

  if (!ts || !h1.length) {
    return false;
  }

  const now = Math.floor(Date.now() / 1000);
  const toleranceInSeconds = 300;

  if (Math.abs(now - Number(ts)) > toleranceInSeconds) {
    return false;
  }

  const signedPayload = `${ts}:${rawBody}`;
  const expectedSignature = createHmac("sha256", secret)
    .update(signedPayload, "utf8")
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature, "utf8");

  return h1.some((sig) => {
    const sigBuffer = Buffer.from(sig, "utf8");
    if (sigBuffer.length !== expectedBuffer.length) return false;
    return timingSafeEqual(sigBuffer, expectedBuffer);
  });
}

export async function POST(req: Request) {
  try {
    const secret = process.env.PADDLE_WEBHOOK_SECRET;

    if (!secret) {
      return NextResponse.json(
        { error: "Paddle webhook is not configured yet." },
        { status: 503 }
      );
    }

    const signature = req.headers.get("paddle-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing Paddle-Signature header" }, { status: 400 });
    }

    const rawBody = await req.text();

    const isValid = verifyPaddleWebhook(rawBody, signature, secret);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    let event: any;
    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const eventType = event?.event_type || event?.eventType || event?.type || "";
    const data = event?.data;

    switch (eventType) {
      case "transaction.completed": {
        console.log("Paddle transaction.completed", {
          transactionId: data?.id,
          status: data?.status,
          customData: data?.custom_data,
        });

        // TODO:
        // 1. mark payment as paid in your DB
        // 2. create/activate founder account
        // 3. send founder welcome email
        break;
      }

      case "transaction.payment_failed": {
        console.log("Paddle transaction.payment_failed", {
          transactionId: data?.id,
          status: data?.status,
        });
        break;
      }

      case "adjustment.created":
      case "adjustment.updated": {
        console.log("Paddle adjustment event", {
          adjustmentId: data?.id,
          action: data?.action,
          status: data?.status,
          transactionId: data?.transaction_id,
        });

        // TODO:
        // if approved refund/credit, update your internal status
        break;
      }

      default: {
        console.log("Unhandled Paddle event", eventType);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Paddle webhook handling failed:", error);
    return NextResponse.json(
      { error: error?.message || "Webhook handling failed" },
      { status: 500 }
    );
  }
}