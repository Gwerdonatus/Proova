# Proova Waitlist (Premium)

A Next.js (App Router) landing page for Proova with:

- Premium marketing sections (Hero → Demo → How it works → Pricing → Waitlist)
- Two signup intents:
  - **Waitlist** → stores the lead and redirects to `/thanks`
  - **Founding member** → stores the lead, then opens checkout (**Paystack for Africa**, **Stripe for Global**)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment variables

Copy `.env.example` → `.env.local` and fill what you need.

### Waitlist lead capture

`WAITLIST_WEBHOOK_URL` (optional)

If set, the app will POST every lead (waitlist + founder) to your webhook endpoint.
If not set, leads are logged to the server console (Vercel logs work too).

### Stripe (Global checkout)

- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_GLOBAL`
- `STRIPE_PRICE_AFRICA` (optional if you also want Africa to use Stripe)

This project creates a **Stripe Checkout subscription session** at:
`POST /api/stripe/checkout`

### Paystack (Africa checkout)

- `PAYSTACK_SECRET_KEY`
- `PAYSTACK_AMOUNT_KOBO` (default `7900000` = ₦79,000.00)

This project initializes Paystack at:
`POST /api/paystack/initialize`

> You can swap amount / currency / metadata however you like — the route is intentionally simple.

## Deploy (Vercel)

- Push to GitHub
- Import to Vercel
- Add env vars in Vercel project settings
