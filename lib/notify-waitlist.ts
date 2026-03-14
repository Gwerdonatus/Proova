import { resend } from "@/lib/resend";

type NotifyWaitlistInput = {
  name: string;
  email: string;
  business?: string;
  whatsapp?: string;
  country?: string;
  region?: string;
  tier?: string;
  provider?: string;
  plan?: string;
  monthlyOrders?: string;
  payments?: string;
  channel?: string;
  biggestPain?: string;
  notes?: string;
};

export async function notifyWaitlistSignup(input: NotifyWaitlistInput) {
  const to = process.env.WAITLIST_NOTIFY_EMAIL;
  const from = process.env.WAITLIST_FROM_EMAIL;

  if (!to || !from) {
    throw new Error("Missing WAITLIST_NOTIFY_EMAIL or WAITLIST_FROM_EMAIL");
  }

  const subject =
    input.plan === "founder_annual"
      ? `New Proova Founder signup: ${input.name}`
      : `New Proova waitlist signup: ${input.name}`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">${escapeHtml(subject)}</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
        <tbody>
          ${row("Name", input.name)}
          ${row("Email", input.email)}
          ${row("Business", input.business)}
          ${row("WhatsApp", input.whatsapp)}
          ${row("Country", input.country)}
          ${row("Region", input.region)}
          ${row("Plan", input.plan)}
          ${row("Tier", input.tier)}
          ${row("Provider", input.provider)}
          ${row("Monthly orders", input.monthlyOrders)}
          ${row("Payments", input.payments)}
          ${row("Channel", input.channel)}
          ${row("Biggest pain", input.biggestPain)}
          ${row("Notes", input.notes)}
        </tbody>
      </table>
    </div>
  `;

  const text = [
    subject,
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.business ? `Business: ${input.business}` : "",
    input.whatsapp ? `WhatsApp: ${input.whatsapp}` : "",
    input.country ? `Country: ${input.country}` : "",
    input.region ? `Region: ${input.region}` : "",
    input.plan ? `Plan: ${input.plan}` : "",
    input.tier ? `Tier: ${input.tier}` : "",
    input.provider ? `Provider: ${input.provider}` : "",
    input.monthlyOrders ? `Monthly orders: ${input.monthlyOrders}` : "",
    input.payments ? `Payments: ${input.payments}` : "",
    input.channel ? `Channel: ${input.channel}` : "",
    input.biggestPain ? `Biggest pain: ${input.biggestPain}` : "",
    input.notes ? `Notes: ${input.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const result = await resend.emails.send({
    from,
    to: [to],
    subject,
    html,
    text,
    replyTo: input.email,
  });

  console.log("WAITLIST EMAIL RESULT:", JSON.stringify(result, null, 2));

  if (result.error) {
    console.error("WAITLIST EMAIL ERROR:", result.error);
    throw new Error(result.error.message || "Failed to send notification email");
  }

  console.log("WAITLIST EMAIL SENT ID:", result.data?.id);

  return result;
}

function row(label: string, value?: string) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding: 8px 12px; border: 1px solid #e5e7eb; width: 180px; font-weight: 600;">${escapeHtml(label)}</td>
      <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}