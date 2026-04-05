"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  hasCookieChoiceBeenMade,
  persistCookiePreferences,
  pushGoogleConsentModeUpdate,
} from "@/lib/cookie-consent";

function dispatchConsentChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGED_EVENT));
  }
}

function applyChoice(analytics: boolean, onDone: () => void) {
  persistCookiePreferences(analytics);
  pushGoogleConsentModeUpdate({ analytics });
  dispatchConsentChanged();
  onDone();
}

export function CookieBanner() {
  const titleId = useId();
  const modalTitleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [render, setRender] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [analyticsDraft, setAnalyticsDraft] = useState(false);

  useEffect(() => {
    if (hasCookieChoiceBeenMade()) return;
    setRender(true);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const closeBanner = useCallback(() => {
    setVisible(false);
  }, []);

  const onBannerTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== "transform" && e.propertyName !== "opacity") return;
      if (visible) return;
      setRender(false);
    },
    [visible]
  );

  const openPreferences = useCallback(() => {
    setAnalyticsDraft(false);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("button, [href], input")?.focus();
    }, 0);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [modalOpen, closeModal]);

  if (!render) return null;

  return (
    <>
      <div
        role="dialog"
        aria-labelledby={titleId}
        aria-modal={false}
        className="fixed bottom-0 left-0 right-0 z-[90] border-t border-[#c8a040]/25 bg-[#F4FAF0]/98 shadow-[0_-8px_32px_rgba(0,0,0,0.35)] backdrop-blur-sm"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.35s ease-out, opacity 0.35s ease-out",
        }}
        onTransitionEnd={onBannerTransitionEnd}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6 md:py-3">
          <div className="min-w-0 flex-1">
            <p id={titleId} className="font-serif text-base font-normal text-[#c8a040] md:text-[1.05rem]">
              Cookies &amp; privacy
            </p>
            <p className="mt-1 font-sans text-sm leading-relaxed text-[#1A2E1A]/80">
              Wij gebruiken noodzakelijke cookies en — met uw toestemming — Google Analytics.
            </p>
            <Link
              href="/cookiebeleid"
              className="mt-2 inline-block font-sans text-xs text-[#c8a040] underline-offset-2 hover:underline"
            >
              Cookiebeleid →
            </Link>
          </div>

          <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              className="rounded-sm bg-[#C0392B] px-4 py-2.5 font-sans text-sm font-semibold text-white transition-opacity hover:opacity-90"
              onClick={() => applyChoice(true, closeBanner)}
            >
              Alles accepteren
            </button>
            <button
              type="button"
              className="rounded-sm border-2 border-[#1A2E1A] bg-transparent px-4 py-2.5 font-sans text-sm font-semibold text-[#1A2E1A] transition-colors hover:bg-[#1A2E1A]/10"
              onClick={() => applyChoice(false, closeBanner)}
            >
              Alles weigeren
            </button>
            <button
              type="button"
              className="rounded-sm border border-[#1A2E1A]/20 bg-[#1A2E1A]/5 px-4 py-2.5 font-sans text-sm font-medium text-[#1A2E1A] transition-colors hover:bg-[#1A2E1A]/10"
              onClick={openPreferences}
            >
              Voorkeuren instellen
            </button>
          </div>
        </div>
      </div>

      {modalOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="absolute inset-0 bg-black/55" aria-hidden />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            className="relative z-10 w-full max-w-lg rounded-2xl border border-[#c8a040]/25 bg-[#F4FAF0] p-6 shadow-2xl sm:p-8"
          >
            <h2 id={modalTitleId} className="pr-10 font-serif text-xl font-normal text-[#c8a040] sm:text-2xl">
              Cookievoorkeuren
            </h2>
            <p className="mt-2 font-sans text-sm text-[#1A2E1A]/70">Kies per categorie.</p>

            <ul className="mt-6 space-y-4">
              <li className="rounded-xl border border-[#1A2E1A]/10 bg-[#1A2E1A]/5 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-sans text-sm font-medium text-[#1A2E1A]">Noodzakelijk</p>
                    <p className="mt-1 font-sans text-xs text-[#1A2E1A]/70">
                      Altijd actief voor beveiliging en werking van de site.
                    </p>
                  </div>
                  <div
                    className="relative h-8 w-14 shrink-0 rounded-full bg-[#c8a040]/35 opacity-60"
                    aria-hidden
                  >
                    <span className="absolute left-1 top-1 h-6 w-6 rounded-full bg-[#c8a040]" />
                  </div>
                </div>
                <p className="mt-2 font-sans text-[0.65rem] uppercase tracking-wider text-[#1A2E1A]/60">
                  Altijd aan
                </p>
              </li>

              <li className="rounded-xl border border-[#1A2E1A]/10 bg-[#1A2E1A]/5 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-sans text-sm font-medium text-[#1A2E1A]">Analytisch</p>
                    <p className="mt-1 font-sans text-xs text-[#1A2E1A]/70">
                      Google Analytics — gebruik van de website meten.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={analyticsDraft}
                    onClick={() => setAnalyticsDraft((v) => !v)}
                    className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${
                      analyticsDraft ? "bg-[#c8a040]" : "bg-stone-400"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                        analyticsDraft ? "left-7" : "left-1"
                      }`}
                    />
                    <span className="sr-only">Analytische cookies {analyticsDraft ? "aan" : "uit"}</span>
                  </button>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-sm border border-[#1A2E1A]/20 px-5 py-2.5 font-sans text-sm text-[#1A2E1A]/90 hover:bg-[#1A2E1A]/5"
                onClick={closeModal}
              >
                Annuleren
              </button>
              <button
                type="button"
                className="rounded-sm bg-[#C0392B] px-5 py-2.5 font-sans text-sm font-semibold text-white hover:opacity-90"
                onClick={() => {
                  applyChoice(analyticsDraft, () => {
                    setModalOpen(false);
                    closeBanner();
                  });
                }}
              >
                Voorkeuren opslaan
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
