/** localStorage key voor cookievoorkeuren (JSON v2 of legacy string). */
export const COOKIE_CONSENT_STORAGE_KEY = "cookie-consent";

export type CookieConsentChoice = "accepted" | "rejected";

/** Na wijziging; luistert o.a. `GoogleAnalyticsWithConsent`. */
export const COOKIE_CONSENT_CHANGED_EVENT = "rjt-cookie-consent-changed";

const PREFS_VERSION = 2 as const;

export type StoredCookiePreferences = {
  v: typeof PREFS_VERSION;
  /** Strikt noodzakelijk — altijd true; voor leesbaarheid in storage. */
  necessary: true;
  /** Google Analytics / analytics_storage. */
  analytics: boolean;
};

function parseStoredValue(raw: string): StoredCookiePreferences | null {
  if (raw === "accepted") {
    return { v: PREFS_VERSION, necessary: true, analytics: true };
  }
  if (raw === "rejected") {
    return { v: PREFS_VERSION, necessary: true, analytics: false };
  }
  try {
    const j = JSON.parse(raw) as Partial<StoredCookiePreferences>;
    if (j.v === PREFS_VERSION && j.necessary === true && typeof j.analytics === "boolean") {
      return j as StoredCookiePreferences;
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

export function persistCookiePreferences(analytics: boolean): void {
  const payload: StoredCookiePreferences = {
    v: PREFS_VERSION,
    necessary: true,
    analytics,
  };
  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

/**
 * Google Consent Mode v2 — update na gebruikerskeuze (client only).
 * Noodzakelijk → functionality + security granted; analytisch → analytics_storage.
 */
export function pushGoogleConsentModeUpdate(prefs: { analytics: boolean }): void {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: prefs.analytics ? "granted" : "denied",
    functionality_storage: "granted",
    personalization_storage: "denied",
    security_storage: "granted",
  });
}
