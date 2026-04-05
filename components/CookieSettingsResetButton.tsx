"use client";

import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookie-consent";

export function CookieSettingsResetButton() {
  return (
    <button
      type="button"
      className="rounded-sm border border-[#B8860B] bg-transparent px-6 py-3 font-lato text-sm font-medium text-[#4A9E4A] transition-colors hover:bg-[#4A9E4A]/10"
      onClick={() => {
        try {
          localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
        } catch {
          /* ignore */
        }
        window.location.reload();
      }}
    >
      Cookie-instellingen wijzigen
    </button>
  );
}
