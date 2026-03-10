import { NextResponse } from "next/server";

async function readJsonSafely(res: Response) {
  const raw = await res.text();
  try {
    return { raw, json: JSON.parse(raw) };
  } catch {
    return { raw, json: null as any };
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const reference = url.searchParams.get("reference") || "";

  if (!reference) return NextResponse.json({ error: "Missing reference" }, { status: 400 });

  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return NextResponse.json({ error: "Missing PAYSTACK_SECRET_KEY" }, { status: 500 });

  const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret}` },
  });

  const { raw, json } = await readJsonSafely(res);

  if (!res.ok || !json?.status) {
    console.log("Paystack verify failed:", res.status, raw);
    return NextResponse.json({ error: json?.message || raw || "Verify failed" }, { status: 400 });
  }

  const data = json.data;
  const paid = data?.status === "success";

  return NextResponse.json({
    paid,
    status: data?.status,
    amount: data?.amount, // kobo
    currency: data?.currency,
    reference: data?.reference,
    customer: data?.customer?.email,
    metadata: data?.metadata,
  });
}