"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "rjt-announcement-dismissed";

function readDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  const hiddenByEnv = process.env.NEXT_PUBLIC_ANNOUNCEMENT_BAR === "false";
  const message =
    process.env.NEXT_PUBLIC_ANNOUNCEMENT_TEXT?.trim() ||
    "Gesloten wegens vakantie · 6 t/m 27 april";

  useEffect(() => {
    setMounted(true);
    setDismissed(readDismissed());
  }, []);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setDismissed(true);
  }, []);

  if (hiddenByEnv) return null;
  if (!mounted || dismissed) return null;

  return (
    <div
      className="flex min-h-9 w-full shrink-0 items-center justify-center gap-2 border-b border-white/10 px-3 py-1 text-center text-white sm:px-6"
      style={{ backgroundColor: "var(--vermilion)" }}
      role="alert"
      aria-live="polite"
    >
      <p className="min-w-0 flex-1 px-1 font-lato text-sm font-normal leading-snug">{message}</p>
      <button
        type="button"
        className="shrink-0 rounded p-1 text-lg leading-none text-white/90 outline-none ring-offset-2 transition hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Sluit melding"
        onClick={dismiss}
      >
        ×
      </button>
    </div>
  );
}
