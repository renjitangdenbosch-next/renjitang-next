"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { TopBar } from "./TopBar";
import { cn } from "@/lib/cn";
import { BEHANDELING_SUBNAV } from "@/lib/navigation";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

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
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
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

        {/* Mobile slide-over */}
        {mobileOpen ? (
          <div className="fixed inset-0 z-[100] md:hidden" id="mobile-nav-panel">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              aria-label="Menu sluiten"
              onClick={closeMobile}
            />
            <div className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-stone-200 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3">
                <span className="font-serif text-lg text-rjt-dark">Menu</span>
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
              <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobiel menu">
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/"
                      onClick={closeMobile}
                      className="block rounded-xl px-3 py-3 text-stone-800 hover:bg-stone-100"
                    >
                      <span className="block text-sm font-medium">Home</span>
                      <span className="text-xs text-stone-500">首页</span>
                    </Link>
                  </li>
                  <li className="pt-2">
                    <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-stone-400">
                      Behandelingen
                    </p>
                    <ul className="space-y-0.5 border-l-2 border-rjt-gold/40 pl-3">
                      {BEHANDELING_SUBNAV.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={closeMobile}
                            className="block rounded-lg px-2 py-2 text-stone-800 hover:bg-stone-100"
                          >
                            <span className="block text-sm font-medium">{item.label}</span>
                            <span className="text-xs text-stone-500">{item.labelZh}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      onClick={closeMobile}
                      className="mt-2 block rounded-xl px-3 py-3 text-stone-800 hover:bg-stone-100"
                    >
                      <span className="block text-sm font-medium">Contact</span>
                      <span className="text-xs text-stone-500">联系我们</span>
                    </Link>
                  </li>
                  <li className="pt-2">
                    <Link
                      href={SITE.bookingUrl}
                      onClick={closeMobile}
                      className="block rounded-xl bg-rjt-red px-4 py-3 text-center text-white hover:bg-red-900"
                    >
                      <span className="block text-sm font-semibold">Boek een afspraak</span>
                      <span className="text-xs text-white/80">预约挂号</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}
