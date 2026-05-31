"use client";

import { useCallback, useEffect, useState } from "react";
import { getActivePublicAnnouncement } from "@/lib/schedule-closures";

const STORAGE_KEY = "rjt-announcement-dismissed-course-2026-06";

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

  const message =
    getActivePublicAnnouncement() ||
    process.env.NEXT_PUBLIC_ANNOUNCEMENT_TEXT?.trim() ||
    null;

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

  if (!message || !mounted || dismissed) return null;

  return (
    <div
      className="flex min-h-10 w-full shrink-0 items-center justify-center gap-2 border-b border-[#c8a040]/40 bg-[#3B6D11] px-3 py-2 text-center text-white shadow-sm sm:px-6"
      role="alert"
      aria-live="polite"
    >
      <p className="min-w-0 flex-1 px-1 font-lato text-sm font-medium leading-snug sm:text-[0.95rem]">
        <span className="mr-1.5 inline-block" aria-hidden>
          📚
        </span>
        {message}
      </p>
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
