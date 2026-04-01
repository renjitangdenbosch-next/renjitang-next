"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { TopBar } from "./TopBar";
import { cn } from "@/lib/cn";
import { BEHANDELING_SUBNAV, PRIMARY_NAV } from "@/lib/navigation";
import { SITE } from "@/lib/site";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-3.5 w-3.5 shrink-0 opacity-70", className)}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  const closeMobile = () => setIsMenuOpen(false);

  const mobileNavWithoutBooking = PRIMARY_NAV.filter((item) => item.href !== SITE.bookingUrl);

  return (
    <>
      <TopBar />
      <AnnouncementBanner />
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center" onClick={closeMobile}>
            <Image
              src="/images/cropped-logorenjitang.png"
              alt="Ren Ji Tang"
              width={80}
              height={40}
              priority
              sizes="80px"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop */}
          <nav
            className="hidden items-center gap-1 font-medium md:flex lg:gap-1.5"
            aria-label="Hoofdmenu"
          >
            <Link
              href="/"
              className="group relative rounded-xl px-2 py-2 text-center transition-all duration-200 hover:bg-rjt-red lg:px-2.5"
            >
              <span className="block text-xs font-medium text-stone-800 transition-colors group-hover:text-white lg:text-sm">
                Home
              </span>
              <span className="block text-[10px] text-stone-500 transition-colors group-hover:text-white/80">
                首页
              </span>
            </Link>

            <div className="group relative">
              <div
                className="flex cursor-default items-center gap-0.5 rounded-xl px-2 py-2 text-center transition-all duration-200 group-hover:bg-rjt-red lg:px-2.5"
                role="button"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded="false"
                aria-label="Behandelingen menu"
              >
                <div>
                  <span className="block text-xs font-medium text-stone-800 transition-colors group-hover:text-white lg:text-sm">
                    Behandelingen
                  </span>
                  <span className="block text-[10px] text-stone-500 transition-colors group-hover:text-white/80">
                    治疗项目
                  </span>
                </div>
                <ChevronDown className="text-stone-600 group-hover:text-white" />
              </div>
              <div
                className="invisible absolute left-1/2 top-full z-[60] min-w-[220px] -translate-x-1/2 pt-1 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100"
                role="menu"
              >
                <div className="rounded-xl border border-stone-200 bg-white py-2 shadow-xl dark:border-stone-600 dark:bg-stone-900">
                  {BEHANDELING_SUBNAV.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className="group block px-4 py-2.5 text-left text-xs transition-colors hover:bg-rjt-red dark:text-stone-200 lg:text-sm"
                    >
                      <span className="font-medium text-stone-800 group-hover:text-white">{item.label}</span>
                      <span className="mt-0.5 block text-[10px] text-stone-500 group-hover:text-white/80">
                        {item.labelZh}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="group relative rounded-xl px-2 py-2 text-center transition-all duration-200 hover:bg-rjt-red lg:px-2.5"
            >
              <span className="block text-xs font-medium text-stone-800 transition-colors group-hover:text-white lg:text-sm">
                Contact
              </span>
              <span className="block text-[10px] text-stone-500 transition-colors group-hover:text-white/80">
                联系我们
              </span>
            </Link>

            <Link
              href={SITE.bookingUrl}
              className="shrink-0 rounded-xl bg-rjt-red px-2.5 py-2 text-center text-white transition-all duration-200 hover:bg-red-900 lg:px-3"
            >
              <span className="block text-xs font-medium text-white lg:text-sm">Boek een afspraak</span>
              <span className="block text-[10px] text-white/80">预约挂号</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 text-stone-800 md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={isMenuOpen ? "Menu sluiten" : "Menu openen"}
            onClick={() => setIsMenuOpen((o) => !o)}
          >
            {isMenuOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Buiten <header>: fixed overlay werkt betrouwbaar over de hele viewport */}
      {isMenuOpen ? (
        <div className="fixed inset-0 z-[200] md:hidden" id="mobile-nav-panel">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Menu sluiten"
            onClick={closeMobile}
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,22rem)] flex-col border-l border-stone-200 bg-white shadow-xl">
            <div className="flex shrink-0 items-center justify-between border-b border-stone-200 px-4 py-3">
              <span className="font-serif text-lg text-stone-900">Menu</span>
              <button
                type="button"
                className="rounded-lg p-2 text-stone-600 hover:bg-stone-100"
                aria-label="Sluiten"
                onClick={closeMobile}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto py-4" aria-label="Mobiel menu">
              {mobileNavWithoutBooking.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className="border-b border-stone-100 px-6 py-3 transition-colors hover:bg-stone-50"
                >
                  <span className="block font-medium text-stone-800">{item.label}</span>
                  <span className="block text-xs text-stone-400">{item.labelZh}</span>
                </Link>
              ))}
              <Link
                href={SITE.bookingUrl}
                onClick={closeMobile}
                className="mx-6 mt-4 rounded-full bg-rjt-red py-3 text-center font-semibold text-white transition-colors hover:bg-red-900"
              >
                Boek een afspraak
                <span className="block text-xs text-white/70">预约挂号</span>
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
