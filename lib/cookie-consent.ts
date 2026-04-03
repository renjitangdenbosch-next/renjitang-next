/** localStorage key voor cookievoorkeur (analytics). */
export const COOKIE_CONSENT_STORAGE_KEY = "cookie-consent";

export type CookieConsentChoice = "accepted" | "rejected";

/** Na wijziging in de banner; luistert `GoogleAnalyticsWithConsent`. */
export const COOKIE_CONSENT_CHANGED_EVENT = "rjt-cookie-consent-changed";
