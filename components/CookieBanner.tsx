"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedLine } from "@/components/AnimatedLine";
import { useCallback, useEffect, useState } from "react";
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
} from "@/lib/cookie-consent";

export function CookieBanner() {
  const [render, setRender] = useState(false);
  const [slideVisible, setSlideVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
      if (v === "accepted" || v === "rejected") return;
    } catch {
      return;
    }
    setRender(true);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setSlideVisible(true));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const choose = useCallback((value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGED_EVENT));
    }
    setSlideVisible(false);
  }, []);

  const onBannerTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== "transform") return;
      if (slideVisible) return;
      setRender(false);
    },
    [slideVisible]
  );

  if (!render) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookievoorkeuren"
      className="fixed bottom-0 left-0 right-0 z-[90] w-full overflow-hidden shadow-[0_-4px_24px_rgba(0,0,0,0.25)]"
      style={{
        transform: slideVisible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.4s ease-out",
      }}
      onTransitionEnd={onBannerTransitionEnd}
    >
      <div className="grid w-full grid-cols-1 md:grid-cols-[40%_60%]">
        <div className="relative h-40 min-h-0 w-full md:h-auto md:min-h-[12rem]">
          <Image
            src="/images/cookie-acupunctuur.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority
          />
        </div>

        <div className="relative bg-[#1a0f08] p-8">
          <span
            className="pointer-events-none absolute right-4 top-4 select-none font-serif text-[5rem] leading-none text-[#c8a040]/15"
            aria-hidden
          >
            隐
          </span>

          <h2 className="relative font-serif text-[1.1rem] font-normal text-[#c8a040]">
            Wij gebruiken cookies
          </h2>
          <AnimatedLine width={100} className="relative mt-2" noMargin />

          <p className="relative mt-4 max-w-xl font-sans text-[0.85rem] leading-[1.6] text-white/75">
            Ren Ji Tang gebruikt strikt noodzakelijke technieken om de website te laten werken. Met uw
            toestemming laden wij Google Analytics om bezoekstatistieken te meten. U kunt dit weigeren;
            de site blijft dan gewoon bruikbaar.
          </p>

          <Link
            href="/cookiebeleid"
            className="relative mt-3 inline-block font-sans text-sm text-[#c8a040] underline-offset-2 hover:underline"
          >
            Lees ons cookiebeleid →
          </Link>

          <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="rounded-sm bg-[#c8a040] px-6 py-3 font-sans text-sm font-semibold text-black transition-opacity hover:opacity-90"
              onClick={() => choose("accepted")}
            >
              Accepteren
            </button>
            <button
              type="button"
              className="rounded-sm border-2 border-[#c8a040] bg-[#2a1810] px-6 py-3 font-sans text-sm font-semibold text-[#f5e6c8] transition-opacity hover:bg-[#3d2418]"
              onClick={() => choose("rejected")}
            >
              Weigeren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
