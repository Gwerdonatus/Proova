/**
 * notifyWaitlistSignup.ts — Premium email templates
 *
 * ─── REQUIRED .env vars ──────────────────────────────────────────────────────
 * RESEND_API_KEY=re_...
 * WAITLIST_FROM_EMAIL=Proova <hello@proova.app>
 * WAITLIST_NOTIFY_EMAIL=donatusgwer@gmail.com
 *
 * NEXT_PUBLIC_APP_URL=https://proova.app
 * EMAIL_LOGO_URL=https://proova.app/proova.png
 * NEXT_PUBLIC_FOUNDER_WHATSAPP_URL=https://wa.me/2348116276212?text=...
 * NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/donatusgwer/30min
 * FOUNDER_NAME=Donatus, Founder of Proova
 * COMPANY_ADDRESS=Lagos, Nigeria
 * UNSUBSCRIBE_URL=https://proova.app/unsubscribe
 *
 * ─── DNS checklist ───────────────────────────────────────────────────────────
 * 1. SPF   → TXT proova.app "v=spf1 include:amazonses.com ~all"
 * 2. DKIM  → CNAME from Resend Domains tab
 * 3. DMARC → TXT _dmarc.proova.app "v=DMARC1; p=quarantine; rua=mailto:hello@proova.app"
 */

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

// ─── Brand — pulled from the Proova logo ─────────────────────────────────────
// Purple #7B1FD4 · Blue #2B6FED · Coral #E8264A · Gold #F5C323
const BRAND_BAR = `linear-gradient(90deg,#7B1FD4 0%,#2B6FED 38%,#E8264A 68%,#F5C323 100%)`;
const PURPLE    = "#7B1FD4";
const BLUE      = "#2B6FED";
const CORAL     = "#E8264A";

// ─────────────────────────────────────────────────────────────────────────────
export async function notifyWaitlistSignup(input: NotifyWaitlistInput) {
  const notifyTo    = process.env.WAITLIST_NOTIFY_EMAIL;
  const from        = process.env.WAITLIST_FROM_EMAIL;
  const appUrl      = process.env.NEXT_PUBLIC_APP_URL              ?? "https://proova.app";
  const logoUrl     = process.env.EMAIL_LOGO_URL                   ?? "https://proova.app/proova.png";
  const waUrl       = process.env.NEXT_PUBLIC_FOUNDER_WHATSAPP_URL ?? "https://wa.me/2348116276212";
  const calUrl      = process.env.NEXT_PUBLIC_CALENDLY_URL         ?? "https://calendly.com/donatusgwer/30min";
  const founderName = process.env.FOUNDER_NAME                     ?? "Donatus, Founder of Proova";
  const address     = process.env.COMPANY_ADDRESS                  ?? "Lagos, Nigeria";
  const unsubUrl    = process.env.UNSUBSCRIBE_URL                  ?? `${appUrl}/unsubscribe`;

  if (!notifyTo || !from) throw new Error("Missing WAITLIST_NOTIFY_EMAIL or WAITLIST_FROM_EMAIL.");

  const isFounder = input.plan === "founder_annual";
  const firstName = input.name.split(" ")[0] || input.name;

  // 1. Internal
  const internalSubject = isFounder ? `🚀 New Founder signup: ${input.name}` : `📋 New waitlist signup: ${input.name}`;
  const internalResult = await resend.emails.send({
    from, to: [notifyTo], subject: internalSubject,
    html: buildInternalHtml(input, isFounder),
    text: buildInternalText(input, internalSubject),
    replyTo: input.email,
  });
  if (internalResult.error) throw new Error(internalResult.error.message ?? "Failed to send internal notification.");

  // 2. Welcome
  const ctx = { firstName, email: input.email, appUrl, logoUrl, waUrl, calUrl, founderName, address, unsubUrl };
  const welcomeSubject = isFounder ? `You're a Proova Founder, ${firstName}.` : `You're on the list, ${firstName}.`;
  const preheader      = isFounder
    ? `Your Founder rate is locked. Here's exactly what happens next.`
    : `We'll reach out personally when your spot opens. Here's what to expect.`;

  const welcomeResult = await resend.emails.send({
    from, to: [input.email], subject: welcomeSubject,
    html: isFounder ? buildFounderHtml(ctx, preheader) : buildWaitlistHtml(ctx, preheader),
    text: isFounder ? founderPlainText(ctx)            : waitlistPlainText(ctx),
    headers: {
      "List-Unsubscribe":      `<${unsubUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      "X-Entity-Ref-ID":       `proova-${isFounder ? "founder" : "waitlist"}-${Date.now()}`,
    },
  });

  if (welcomeResult.error) console.error("❌ WELCOME EMAIL ERROR:", JSON.stringify(welcomeResult.error, null, 2));
  else                      console.log("✅ Welcome email sent:", welcomeResult.data?.id);

  return { internalResult, welcomeResult };
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

function pre(text: string) {
  return `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;color:transparent;">${esc(text)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>`;
}

function logoRow(logoUrl: string, badgeHtml: string, dark: boolean) {
  const border = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";
  const color  = dark ? "#ffffff" : "#111111";
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td valign="middle">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="padding-right:11px;">
          <img src="${logoUrl}" width="40" height="40" alt="Proova"
               style="display:block;border-radius:10px;border:1px solid ${border};"
               onerror="this.style.display='none'"/>
        </td>
        <td valign="middle">
          <span style="font-size:17px;font-weight:800;letter-spacing:-0.03em;color:${color};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Proova</span>
        </td>
      </tr></table>
    </td>
    <td align="right" valign="middle">${badgeHtml}</td>
  </tr></table>`;
}

function hr(dark: boolean) {
  return `<tr><td style="padding:24px 36px 0;"><div style="height:1px;background:${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"};font-size:0;line-height:0;"> </div></td></tr>`;
}

function step(n: number, color: string, title: string, body: string, dark: boolean) {
  const tc = dark ? "#ffffff" : "#111111";
  const bc = dark ? "rgba(255,255,255,0.44)" : "rgba(0,0,0,0.46)";
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;"><tr>
    <td valign="top" width="34">
      <div style="width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;font-size:12px;font-weight:800;color:#fff;background:${color};font-family:Arial,sans-serif;">${n}</div>
    </td>
    <td style="padding-left:14px;">
      <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:${tc};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">${title}</p>
      <p style="margin:0;font-size:13px;line-height:1.7;color:${bc};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">${body}</p>
    </td>
  </tr></table>`;
}

function emailFooter(dark: boolean, address: string, appUrl: string, unsubUrl: string, reason: string) {
  const bg   = dark ? "rgba(0,0,0,0.40)"      : "#f7f7f8";
  const text = dark ? "rgba(255,255,255,0.20)" : "rgba(0,0,0,0.30)";
  const link = dark ? "rgba(255,255,255,0.34)" : "rgba(0,0,0,0.42)";
  return `<tr><td style="padding:16px 36px 20px;background:${bg};">
    <p style="margin:0;font-size:11px;line-height:1.75;color:${text};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;text-align:center;">
      Proova &middot; ${esc(address)} &middot; <a href="${appUrl}" style="color:${link};text-decoration:none;">proova.app</a><br/>
      ${reason}&nbsp; <a href="${unsubUrl}" style="color:${link};text-decoration:underline;">Unsubscribe</a>
    </p>
  </td></tr>`;
}

type EmailCtx = {
  firstName: string; email: string; appUrl: string;
  logoUrl: string; waUrl: string; calUrl: string;
  founderName: string; address: string; unsubUrl: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// FOUNDER EMAIL
// ─────────────────────────────────────────────────────────────────────────────
function buildFounderHtml(ctx: EmailCtx, preheader: string) {
  const { firstName, email, logoUrl, waUrl, calUrl, founderName, address, appUrl, unsubUrl } = ctx;
  const badge = `<span style="display:inline-block;padding:5px 13px;background:rgba(123,31,212,0.18);border:1px solid rgba(123,31,212,0.36);border-radius:100px;font-size:10px;font-weight:800;letter-spacing:0.11em;color:#C084FC;text-transform:uppercase;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Founder</span>`;

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="x-apple-disable-message-reformatting"/>
  <title>You're a Proova Founder</title>
  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
  <style>*{-webkit-font-smoothing:antialiased;}a{color:inherit;}
  @media only screen and (max-width:600px){.ei{padding:22px 20px !important;}h1{font-size:26px !important;}}
  </style>
</head>
<body style="margin:0;padding:0;background:#0c0c0c;">
${pre(preheader)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0c0c0c;">
<tr><td align="center" style="padding:44px 16px 60px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
       style="max-width:580px;background:#141414;border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">

  <!-- Top bar -->
  <tr><td height="4" style="background:${BRAND_BAR};font-size:0;line-height:0;"> </td></tr>

  <!-- Logo -->
  <tr><td class="ei" style="padding:28px 36px 0;">${logoRow(logoUrl, badge, true)}</td></tr>

  <!-- Hero -->
  <tr><td style="padding:26px 36px 0;">
    <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.22);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">First cohort</p>
    <h1 style="margin:0;font-size:31px;font-weight:800;line-height:1.2;color:#ffffff;letter-spacing:-0.03em;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
      You're a Proova<br/>Founder, ${esc(firstName)}.
    </h1>
    <p style="margin:16px 0 0;font-size:15px;line-height:1.8;color:rgba(255,255,255,0.50);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
      Your Founder rate is permanently locked. You committed before the public launch — and that pricing reflects it for life.
    </p>
  </td></tr>

  ${hr(true)}

  <!-- What happens next -->
  <tr><td style="padding:26px 36px 0;">
    <p style="margin:0 0 18px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.22);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">What happens next</p>
    ${step(1, PURPLE, "Book your onboarding call", "I'll personally set up your tracking and attribution flow. 30 minutes, no slides.", true)}
    ${step(2, BLUE,   "Create your first tracking link", "Share it in an ad, with an influencer, or on WhatsApp. Every click maps to a real payment.", true)}
    ${step(3, CORAL,  "See exactly what made you money", "Not clicks. Not views. Actual revenue tied to actual sources — transfers and checkouts both.", true)}
  </td></tr>

  ${hr(true)}

  <!-- CTAs -->
  <tr><td style="padding:26px 36px 0;">
    <p style="margin:0 0 18px;font-size:14px;line-height:1.8;color:rgba(255,255,255,0.44);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
      The fastest path to value is one properly set-up flow. Book 30 minutes and we'll get it live.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
      <tr><td style="border-radius:11px;background:#ffffff;">
        <a href="${calUrl}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;color:#000000;text-decoration:none;border-radius:11px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Book onboarding call &rarr;</a>
      </td></tr>
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr><td style="border-radius:11px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.10);">
        <a href="${waUrl}" style="display:inline-block;padding:12px 22px;font-size:13px;font-weight:600;color:rgba(255,255,255,0.70);text-decoration:none;border-radius:11px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">&#128172;&nbsp; Message me on WhatsApp</a>
      </td></tr>
    </table>
  </td></tr>

  ${hr(true)}

  <!-- Signature -->
  <tr><td style="padding:24px 36px 34px;">
    <p style="margin:0 0 16px;font-size:14px;line-height:1.8;color:rgba(255,255,255,0.38);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
      Most people wait. You didn't. That's the decision that compounds.<br/>
      Reply any time — I read every message personally.
    </p>
    <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.28);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">&mdash;&nbsp;${esc(founderName)}</p>
    <p style="margin:4px 0 0;font-size:11px;color:rgba(255,255,255,0.14);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Sent to ${esc(email)}</p>
  </td></tr>

  <tr><td height="4" style="background:${BRAND_BAR};font-size:0;line-height:0;"> </td></tr>
  ${emailFooter(true, address, appUrl, unsubUrl, "You received this because you signed up as a Proova Founder.")}

</table>
</td></tr>
</table>
</body>
</html>`;
}

function founderPlainText(ctx: EmailCtx) {
  const { firstName, waUrl, calUrl, founderName, address, appUrl, unsubUrl } = ctx;
  return `You're a Proova Founder, ${firstName}.

Your Founder rate is permanently locked.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT HAPPENS NEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Book your onboarding call → ${calUrl}
   30 minutes, set up personally. No slides.

2. Create your first tracking link.
   Ads, influencers, WhatsApp — every click maps to a real payment.

3. See exactly what made you money.
   Revenue tied to actual sources. Transfers and checkouts both.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WhatsApp me: ${waUrl}

Most people wait. You didn't. Reply any time.

— ${founderName}

────────────────────────────────
Proova · ${address} · ${appUrl}
You received this because you signed up as a Proova Founder.
Unsubscribe: ${unsubUrl}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// WAITLIST EMAIL — welcoming + Founder upgrade pitch
// ─────────────────────────────────────────────────────────────────────────────
function buildWaitlistHtml(ctx: EmailCtx, preheader: string) {
  const { firstName, email, logoUrl, waUrl, appUrl, founderName, address, unsubUrl } = ctx;
  const badge = `<span style="display:inline-block;padding:5px 13px;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:100px;font-size:10px;font-weight:800;letter-spacing:0.11em;color:#4b5563;text-transform:uppercase;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Waitlist</span>`;

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="x-apple-disable-message-reformatting"/>
  <title>You're on the Proova waitlist</title>
  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
  <style>*{-webkit-font-smoothing:antialiased;}a{color:inherit;}
  @media only screen and (max-width:600px){.ei{padding:22px 20px !important;}h1{font-size:26px !important;}}
  </style>
</head>
<body style="margin:0;padding:0;background:#ebebeb;">
${pre(preheader)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ebebeb;">
<tr><td align="center" style="padding:44px 16px 60px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
       style="max-width:580px;background:#ffffff;border-radius:22px;overflow:hidden;border:1px solid rgba(0,0,0,0.07);box-shadow:0 20px 56px rgba(0,0,0,0.07);">

  <!-- Top bar -->
  <tr><td height="4" style="background:${BRAND_BAR};font-size:0;line-height:0;"> </td></tr>

  <!-- Logo -->
  <tr><td class="ei" style="padding:28px 36px 0;">${logoRow(logoUrl, badge, false)}</td></tr>

  <!-- Hero -->
  <tr><td style="padding:26px 36px 0;">
    <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(0,0,0,0.24);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">You're in</p>
    <h1 style="margin:0;font-size:31px;font-weight:800;line-height:1.2;color:#111111;letter-spacing:-0.03em;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
      Good to have you,<br/>${esc(firstName)}.
    </h1>
    <p style="margin:16px 0 0;font-size:15px;line-height:1.8;color:rgba(0,0,0,0.50);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
      You're on the Proova early-access list. We onboard in small batches — when your spot opens, you'll get real setup help, not just a login link.
    </p>
  </td></tr>

  ${hr(false)}

  <!-- Value cards -->
  <tr><td style="padding:26px 36px 0;">
    <p style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(0,0,0,0.24);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Why you joined</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
      <tr><td style="padding:17px 20px;background:#fafafa;border:1px solid #efefef;border-left:3px solid ${CORAL};border-radius:0 13px 13px 0;">
        <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#111111;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Orders are in — but you can't trace where they came from.</p>
        <p style="margin:0;font-size:13px;line-height:1.7;color:rgba(0,0,0,0.48);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Influencer, ad, WhatsApp — the data doesn't connect clicks to payments. So you're guessing what works and what to cut.</p>
      </td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:17px 20px;background:#fafafa;border:1px solid #efefef;border-left:3px solid ${BLUE};border-radius:0 13px 13px 0;">
        <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#111111;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Proova closes the gap.</p>
        <p style="margin:0;font-size:13px;line-height:1.7;color:rgba(0,0,0,0.48);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Track every link &rarr; match clicks to real payments &rarr; know exactly what to scale. Transfers and checkouts both.</p>
      </td></tr>
    </table>
  </td></tr>

  ${hr(false)}

  <!-- What happens next -->
  <tr><td style="padding:26px 36px 0;">
    <p style="margin:0 0 16px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(0,0,0,0.24);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">What happens next</p>
    ${step(1, BLUE,  "We open your batch", "You'll get an email when it's your turn. Founders go first, then the list — in order.", false)}
    ${step(2, CORAL, "Onboarding call included", "We don't hand you a login and disappear. You get a real setup so the data works from day one.", false)}
  </td></tr>

  ${hr(false)}

  <!-- ── FOUNDER UPGRADE PITCH ─────────────────────────────────────────── -->
  <tr><td style="padding:26px 36px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:26px 28px;background:#111111;border-radius:18px;">

        <!-- mini bar accent at top -->
        <div style="height:3px;background:${BRAND_BAR};border-radius:2px;margin-bottom:20px;font-size:0;line-height:0;"> </div>

        <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:rgba(255,255,255,0.26);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Want to move faster?</p>
        <p style="margin:0 0 12px;font-size:19px;font-weight:800;line-height:1.3;color:#ffffff;letter-spacing:-0.025em;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          Skip the queue. Lock your rate. Get set up first.
        </p>
        <p style="margin:0 0 20px;font-size:13px;line-height:1.75;color:rgba(255,255,255,0.42);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          Founder access puts you at the front of onboarding and locks your annual rate before launch pricing goes live.
          Every feature we build is yours automatically — at the same price, forever.
        </p>

        <!-- 3 benefit tiles -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:22px;">
          <tr>
            <td width="33%" style="padding-right:8px;">
              <div style="padding:12px 14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.09);border-radius:12px;">
                <div style="font-size:16px;margin-bottom:5px;">&#9889;</div>
                <div style="font-size:12px;font-weight:600;color:#ffffff;line-height:1.35;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Priority onboarding</div>
              </div>
            </td>
            <td width="33%" style="padding-right:8px;">
              <div style="padding:12px 14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.09);border-radius:12px;">
                <div style="font-size:16px;margin-bottom:5px;">&#128274;</div>
                <div style="font-size:12px;font-weight:600;color:#ffffff;line-height:1.35;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Rate locked for life</div>
              </div>
            </td>
            <td width="33%">
              <div style="padding:12px 14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.09);border-radius:12px;">
                <div style="font-size:16px;margin-bottom:5px;">&#10003;</div>
                <div style="font-size:12px;font-weight:600;color:#ffffff;line-height:1.35;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">30-day refund</div>
              </div>
            </td>
          </tr>
        </table>

        <!-- Gradient-bordered CTA -->
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="border-radius:11px;background:${BRAND_BAR};padding:1px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr><td style="border-radius:10px;background:#111111;">
                  <a href="${appUrl}/pricing"
                     style="display:inline-block;padding:13px 24px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
                    See Founder pricing &rarr;
                  </a>
                </td></tr>
              </table>
            </td>
          </tr>
        </table>
        <p style="margin:11px 0 0;font-size:11px;color:rgba(255,255,255,0.20);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Starting from $99/yr &middot; Limited spots &middot; No risk</p>

      </td></tr>
    </table>
  </td></tr>
  <!-- ── END FOUNDER PITCH ──────────────────────────────────────────────── -->

  ${hr(false)}

  <!-- Signature -->
  <tr><td style="padding:24px 36px 34px;">
    <p style="margin:0 0 16px;font-size:14px;line-height:1.8;color:rgba(0,0,0,0.44);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
      Any questions? Just reply — I'm the one reading it.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr><td style="border-radius:11px;background:#f4f4f5;border:1px solid #e4e4e7;">
        <a href="${waUrl}" style="display:inline-block;padding:12px 20px;font-size:13px;font-weight:600;color:#111111;text-decoration:none;border-radius:11px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">&#128172;&nbsp; Message me on WhatsApp</a>
      </td></tr>
    </table>
    <p style="margin:0;font-size:14px;color:rgba(0,0,0,0.28);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">&mdash;&nbsp;${esc(founderName)}</p>
    <p style="margin:4px 0 0;font-size:11px;color:rgba(0,0,0,0.18);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Sent to ${esc(email)}</p>
  </td></tr>

  <tr><td height="4" style="background:${BRAND_BAR};font-size:0;line-height:0;"> </td></tr>
  ${emailFooter(false, address, appUrl, unsubUrl, "You received this because you joined the Proova waitlist.")}

</table>
</td></tr>
</table>
</body>
</html>`;
}

function waitlistPlainText(ctx: EmailCtx) {
  const { firstName, waUrl, appUrl, founderName, address, unsubUrl } = ctx;
  return `Good to have you, ${firstName}.

You're on the Proova early-access list. Spot saved.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHY YOU JOINED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Orders are in — but you can't trace where they came from.
Proova maps every link to real payments — transfers and checkouts.
So you know exactly what to scale and what to cut.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT HAPPENS NEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. We open your batch — email when it's your turn.
   Founders go first, then the list, in order.

2. Onboarding included — real setup, not just a login link.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WANT TO MOVE FASTER?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Founder access → priority onboarding, rate locked for life, 30-day refund.
Half the standard price. Limited spots.

See Founder pricing: ${appUrl}/pricing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Questions? Reply or WhatsApp: ${waUrl}

— ${founderName}

────────────────────────────────
Proova · ${address} · ${appUrl}
You received this because you joined the Proova waitlist.
Unsubscribe: ${unsubUrl}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL
// ─────────────────────────────────────────────────────────────────────────────
function buildInternalHtml(input: NotifyWaitlistInput, isFounder: boolean) {
  const accent = isFounder ? "#7B1FD4" : "#2563EB";
  const badge  = isFounder ? "FOUNDER 🚀" : "WAITLIST 📋";
  const rows = ([
    ["Name",           input.name],
    ["Email",          input.email],
    ["Business",       input.business],
    ["WhatsApp",       input.whatsapp],
    ["Country",        input.country],
    ["Region",         input.region],
    ["Plan",           input.plan],
    ["Tier",           input.tier],
    ["Provider",       input.provider],
    ["Monthly orders", input.monthlyOrders],
    ["Payments",       input.payments],
    ["Channel",        input.channel],
    ["Biggest pain",   input.biggestPain],
    ["Notes",          input.notes],
  ] as [string, string | undefined][]).filter(([, v]) => v).map(([l, v]) => `
    <tr>
      <td style="padding:9px 12px;border:1px solid #e5e7eb;width:148px;font-size:13px;font-weight:600;color:#374151;background:#f9fafb;white-space:nowrap;">${esc(l)}</td>
      <td style="padding:9px 12px;border:1px solid #e5e7eb;font-size:13px;color:#111827;">${esc(v ?? "")}</td>
    </tr>`).join("");

  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:#f0f0f2;padding:32px 16px;">
  <div style="max-width:580px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${accent};">
      <tr>
        <td style="padding:16px 24px;font-size:15px;font-weight:700;color:#fff;">New signup: ${esc(input.name)}</td>
        <td align="right" style="padding:16px 24px;"><span style="background:rgba(255,255,255,0.22);border-radius:100px;padding:4px 12px;font-size:11px;font-weight:700;color:#fff;letter-spacing:0.06em;">${badge}</span></td>
      </tr>
    </table>
    <div style="padding:24px;"><table style="border-collapse:collapse;width:100%;"><tbody>${rows}</tbody></table></div>
    <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:14px 24px;">
      <p style="margin:0;font-size:11px;color:#9ca3af;">Proova internal &middot; Reply-To: ${esc(input.email)}</p>
    </div>
  </div>
</div>`;
}

function buildInternalText(input: NotifyWaitlistInput, subject: string) {
  return [
    subject, "",
    `Name: ${input.name}`, `Email: ${input.email}`,
    input.business      ? `Business: ${input.business}`            : "",
    input.whatsapp      ? `WhatsApp: ${input.whatsapp}`            : "",
    input.country       ? `Country: ${input.country}`              : "",
    input.region        ? `Region: ${input.region}`                : "",
    input.plan          ? `Plan: ${input.plan}`                    : "",
    input.tier          ? `Tier: ${input.tier}`                    : "",
    input.provider      ? `Provider: ${input.provider}`            : "",
    input.monthlyOrders ? `Monthly orders: ${input.monthlyOrders}` : "",
    input.payments      ? `Payments: ${input.payments}`            : "",
    input.channel       ? `Channel: ${input.channel}`              : "",
    input.biggestPain   ? `Biggest pain: ${input.biggestPain}`     : "",
    input.notes         ? `Notes: ${input.notes}`                  : "",
  ].filter(Boolean).join("\n");
}

// ─────────────────────────────────────────────────────────────────────────────
function esc(value?: string): string {
  if (!value) return "";
  return value
    .replaceAll("&",  "&amp;").replaceAll("<",  "&lt;")
    .replaceAll(">",  "&gt;").replaceAll('"',  "&quot;")
    .replaceAll("'",  "&#039;");
}