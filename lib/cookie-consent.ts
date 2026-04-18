/** localStorage key voor cookievoorkeuren (JSON v3 of legacy). */
export const COOKIE_CONSENT_STORAGE_KEY = "cookie-consent";

export type CookieConsentChoice = "accepted" | "rejected";

/** Na wijziging; luistert o.a. `GoogleAnalyticsWithConsent` en `GoogleAdsTag`. */
export const COOKIE_CONSENT_CHANGED_EVENT = "rjt-cookie-consent-changed";

const PREFS_VERSION = 3 as const;
const PREFS_VERSION_LEGACY = 2 as const;

export type StoredCookiePreferences = {
  v: typeof PREFS_VERSION;
  /** Strikt noodzakelijk — altijd true; voor leesbaarheid in storage. */
  necessary: true;
  /** Google Analytics / analytics_storage. */
  analytics: boolean;
  /** Google Ads (remarketing, conversies) / ad_storage, ad_user_data, ad_personalization. */
  marketing: boolean;
};

function parseStoredValue(raw: string): StoredCookiePreferences | null {
  if (raw === "accepted") {
    return { v: PREFS_VERSION, necessary: true, analytics: true, marketing: false };
  }
  if (raw === "rejected") {
    return { v: PREFS_VERSION, necessary: true, analytics: false, marketing: false };
  }
  try {
    const j = JSON.parse(raw) as Record<string, unknown>;
    if (j.necessary !== true || typeof j.analytics !== "boolean") return null;

    if (j.v === PREFS_VERSION && typeof j.marketing === "boolean") {
      return j as StoredCookiePreferences;
    }

    if (j.v === PREFS_VERSION_LEGACY) {
      return {
        v: PREFS_VERSION,
        necessary: true,
        analytics: j.analytics as boolean,
        marketing: false,
      };
    }
  } catch {
    /* ignore */
  }
  return null;
}

/** `null` = nog geen keuze (banner tonen). */
export function readCookiePreferences(): StoredCookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    return parseStoredValue(raw);
  } catch {
    return null;
  }
}

export function hasCookieChoiceBeenMade(): boolean {
  return readCookiePreferences() !== null;
}

export function isAnalyticsGranted(): boolean {
  return readCookiePreferences()?.analytics === true;
}

export function isMarketingGranted(): boolean {
  return readCookiePreferences()?.marketing === true;
}

export function persistCookiePreferences(prefs: {
  analytics: boolean;
  marketing: boolean;
}): void {
  const payload: StoredCookiePreferences = {
    v: PREFS_VERSION,
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
  };
  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

/**
 * Google Consent Mode v2 — update na gebruikerskeuze (client only).
 * Analytisch → analytics_storage; marketing → ad_storage, ad_user_data, ad_personalization.
 */
export function pushGoogleConsentModeUpdate(prefs: {
  analytics: boolean;
  marketing: boolean;
}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;

  const adState = prefs.marketing ? "granted" : "denied";

  gtag("consent", "update", {
    ad_storage: adState,
    ad_user_data: adState,
    ad_personalization: adState,
    analytics_storage: prefs.analytics ? "granted" : "denied",
    functionality_storage: "granted",
    personalization_storage: "denied",
    security_storage: "granted",
  });
}
