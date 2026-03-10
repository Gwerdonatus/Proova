import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return NextResponse.json({ error: "Missing PAYSTACK_SECRET_KEY" }, { status: 500 });

  const signature = req.headers.get("x-paystack-signature") || "";
  const body = await req.text();

  const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");
  if (hash !== signature) return NextResponse.json({ error: "Invalid signature" }, { status: 400 });

  const event = JSON.parse(body);
  console.log("Paystack webhook event:", event?.event);

  // If event.event === "charge.success", you can mark founder paid in DB later.
  return NextResponse.json({ received: true });
}