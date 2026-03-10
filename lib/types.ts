export type Region = "global" | "africa";
export type Plan = "waitlist" | "founder_annual";

export type Tier = "global" | "africa" | "nigeria";
export type Provider = "paddle" | "paystack";

export type WaitlistLead = {
  name: string;
  email: string;
  business?: string;
  whatsapp?: string;
  country?: string;
  region: Region;
  monthlyOrders?: "0-50" | "50-200" | "200+";
  payments?: "transfer" | "cards" | "both";
  channel?: "whatsapp" | "dms" | "email" | "mixed";
  biggestPain?: "no_roi" | "influencer_claims" | "unattributed_transfers" | "refund_confusion" | "other";
  notes?: string;
  tier?: Tier;
  provider?: Provider;
  plan?: Plan;
};