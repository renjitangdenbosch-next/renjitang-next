"use client";

import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
} from "@/lib/cookie-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readAccepted(): boolean {
  try {
    return localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}

export function GoogleAnalyticsWithConsent({ measurementId }: { measurementId: string }) {
  const [loadGa, setLoadGa] = useState(false);

  const sync = useCallback(() => {
    setLoadGa(readAccepted());
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, sync);
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, sync);
  }, [sync]);

  if (!loadGa) return null;

  return (
    <Script
      id="google-analytics-consented"
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="afterInteractive"
      onLoad={() => {
        const gtag = window.gtag;
        if (!gtag) return;
        gtag("consent", "update", {
          analytics_storage: "granted",
        });
        gtag("js", new Date());
        gtag("config", measurementId, {
          anonymize_ip: true,
        });
      }}
    />
  );
}
