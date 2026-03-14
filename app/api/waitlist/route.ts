// app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { notifyWaitlistSignup } from "@/lib/notify-waitlist";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lead, intent } = body ?? {};

    if (!lead?.name || !lead?.email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const safeLead = {
      name: String(lead.name || "").trim(),
      email: String(lead.email || "").trim(),
      business: lead.business ? String(lead.business).trim() : undefined,
      whatsapp: lead.whatsapp ? String(lead.whatsapp).trim() : undefined,
      country: lead.country ? String(lead.country).trim() : undefined,
      region: lead.region || undefined,
      tier: lead.tier || undefined,
      provider: lead.provider || undefined,
      plan: lead.plan || undefined,
      monthlyOrders: lead.monthlyOrders || undefined,
      payments: lead.payments || undefined,
      channel: lead.channel || undefined,
      biggestPain: lead.biggestPain || undefined,
      notes: lead.notes ? String(lead.notes).trim() : undefined,
    };

    console.log("New waitlist lead:", {
      intent,
      ...safeLead,
      receivedAt: new Date().toISOString(),
      hasResendKey: !!process.env.RESEND_API_KEY,
      notifyEmail: process.env.WAITLIST_NOTIFY_EMAIL || null,
      fromEmail: process.env.WAITLIST_FROM_EMAIL || null,
    });

    const mailResult = await notifyWaitlistSignup({
      name: safeLead.name,
      email: safeLead.email,
      business: safeLead.business,
      whatsapp: safeLead.whatsapp,
      country: safeLead.country,
      region: safeLead.region,
      tier: safeLead.tier,
      provider: safeLead.provider,
      plan: safeLead.plan,
      monthlyOrders: safeLead.monthlyOrders,
      payments: safeLead.payments,
      channel: safeLead.channel,
      biggestPain: safeLead.biggestPain,
      notes: safeLead.notes,
    });

    console.log("Waitlist notification sent:", {
      id: mailResult?.data?.id || null,
      error: mailResult?.error || null,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Waitlist route error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to submit waitlist form." },
      { status: 500 }
    );
  }
}