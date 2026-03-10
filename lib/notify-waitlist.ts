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
      <h2 style="margin: 0 0 16px;">${subject}</h2>
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

  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    replyTo: input.email,
  });

  if (error) {
    throw new Error(error.message || "Failed to send notification email");
  }
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