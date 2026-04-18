import { isMarketingGranted } from "@/lib/cookie-consent";

/**
 * Google Ads measurement ID. Leeg zetten via `NEXT_PUBLIC_GOOGLE_ADS_ID=""` om uit te schakelen.
 * Standaard: productie-tag uit de opdracht.
 */
export const GOOGLE_ADS_ID: string | null =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID === ""
    ? null
    : (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "AW-16748441910");

/** `true` als er een Ads-tag geconfigureerd is (voor consent-bootstrap in de layout). */
export function isGoogleAdsConfigured(): boolean {
  return GOOGLE_ADS_ID != null && GOOGLE_ADS_ID.length > 0;
}

/** Conversie-actie in Google Ads (account + label). */
export const GOOGLE_ADS_CONVERSION_SEND_TO =
  "AW-16748441910/gkyrCN_RhZ4cELbio7I-" as const;

/**
 * Conversie-event (Google Ads). Alleen aanroepen na geslaagde actie (bijv. boeking).
 * Stuurt niets als marketing niet is geaccepteerd of `gtag` ontbreekt.
 *
 * @param value Optionele orderwaarde in EUR (bijv. behandelingsprijs); anders 70.
 */
export function trackConversion(value?: number): void {
  if (typeof window === "undefined" || !GOOGLE_ADS_ID) return;
  if (!isMarketingGranted()) return;
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag !== "function") return;
  w.gtag("event", "conversion", {
    send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
    value: value ?? 70,
    currency: "EUR",
  });
}
