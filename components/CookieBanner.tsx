"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent";

export function CookieBanner() {
  const [render, setRender] = useState(false);
  const [slideVisible, setSlideVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
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
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
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
          <div className="relative mt-2 h-px w-8 bg-[#c8a040]" />

          <p className="relative mt-4 max-w-xl font-sans text-[0.85rem] leading-[1.6] text-white/75">
            Ren Ji Tang gebruikt functionele cookies om de website goed te laten werken. Met uw
            toestemming plaatsen wij ook analytische cookies om het gebruik te meten. Wij delen geen
            gegevens met adverteerders.
          </p>

          <Link
            href="/cookiebeleid"
            className="relative mt-3 inline-block font-sans text-sm text-[#c8a040] underline-offset-2 hover:underline"
          >
            Lees ons cookiebeleid →
          </Link>

          <div className="relative mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-sm bg-[#c8a040] px-6 py-[0.6rem] font-sans text-sm font-medium text-black transition-opacity hover:opacity-90"
              onClick={() => choose("accepted")}
            >
              Accepteren
            </button>
            <button
              type="button"
              className="rounded-sm border border-solid border-[#c8a040] bg-transparent px-6 py-[0.6rem] font-sans text-sm font-medium text-[#c8a040] transition-opacity hover:opacity-90"
              onClick={() => choose("rejected")}
            >
              Alleen noodzakelijk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
