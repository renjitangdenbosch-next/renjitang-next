"use client";

import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  isMarketingGranted,
} from "@/lib/cookie-consent";
import { GOOGLE_ADS_ID } from "@/lib/google-ads";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Laadt gtag.js voor Google Ads alleen na marketingtoestemming.
 * Deelt `window.dataLayer` / `gtag` met het consent-stubscript en Google Analytics.
 */
export function GoogleAdsTag() {
  const [loadAds, setLoadAds] = useState(false);

  const sync = useCallback(() => {
    setLoadAds(isMarketingGranted());
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, sync);
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, sync);
  }, [sync]);

  if (!GOOGLE_ADS_ID || !loadAds) return null;

  return (
    <Script
      id="google-ads-gtag"
      src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      strategy="afterInteractive"
      onLoad={() => {
        const gtag = window.gtag;
        if (!gtag) return;
        gtag("js", new Date());
        gtag("config", GOOGLE_ADS_ID);
      }}
    />
  );
}
