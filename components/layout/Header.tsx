"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { AnnouncementBar } from "./AnnouncementBar";
import { cn } from "@/lib/cn";
import { BEHANDELING_NAV_ITEMS, HEADER_LINKS } from "@/lib/navigation";
import { SITE } from "@/lib/site";

const LOGO = "/images/logo-transparent.png";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const solid = !isHome || scrolled;
  const navMuted = solid ? "text-ink/80 hover:text-ink" : "text-white/90 hover:text-white";

  const closeMobile = () => setMenuOpen(false);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[60] flex flex-col shadow-sm">
        <AnnouncementBar />
        <header
          className={cn(
            "w-full border-b transition-[background-color,box-shadow,border-color] duration-300",
            solid
              ? "border-stone-200/80 bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md"
              : "border-transparent bg-transparent"
          )}
        >
          <div className="mx-auto flex min-h-[85px] max-w-6xl items-center justify-between gap-4 px-4 py-1 sm:px-6">
            <Link
              href="/"
              className="flex shrink-0 items-center bg-transparent outline-none ring-0"
              onClick={closeMobile}
            >
              <Image
                src={LOGO}
                alt="Ren Ji Tang"
                width={260}
                height={85}
                priority
                className={cn(
                  "h-[85px] w-auto bg-transparent object-contain transition-[filter] duration-300",
                  solid
                    ? "filter-none"
                    : "[filter:drop-shadow(0_0_8px_rgba(255,255,255,0.12))_brightness(0)_invert(1)_opacity(0.9)]"
                )}
              />
            </Link>

            <nav
              className="hidden items-center gap-1 md:flex md:gap-2 lg:gap-4"
              aria-label="Hoofdmenu"
            >
              <div className="group relative">
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1 rounded-sm px-3 py-2 font-lato text-sm font-medium transition-colors",
                    navMuted
                  )}
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  Behandelingen
                  <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
                </button>
                <div
                  className="invisible absolute left-0 top-full z-[70] min-w-[240px] pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100"
                  role="menu"
                >
                  <div className="rounded-sm border border-stone-200 bg-white py-2 shadow-xl">
                    <Link
                      href="/behandelingen"
                      role="menuitem"
                      className="block px-4 py-2.5 font-lato text-sm text-ink hover:bg-paper"
                    >
                      Alle behandelingen
                    </Link>
                    <Link
                      href="/tarieven"
                      role="menuitem"
                      className="block px-4 py-2.5 font-lato text-sm text-ink hover:bg-paper"
                    >
                      Tarieven
                    </Link>
                    {BEHANDELING_NAV_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        className="block px-4 py-2.5 font-lato text-sm text-ink hover:bg-paper"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {HEADER_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-sm px-3 py-2 font-lato text-sm font-medium transition-colors",
                    navMuted
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href={SITE.bookingUrl}
                className="btn-primary ml-2 !py-3 !text-[0.7rem]"
              >
                Maak afspraak
              </Link>
            </nav>

            <button
              type="button"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-sm border md:hidden",
                solid
                  ? "border-stone-300 text-ink"
                  : "border-ink/40 text-ink"
              )}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? (
                <span className="text-xl leading-none">×</span>
              ) : (
                <span className="flex flex-col gap-1.5" aria-hidden>
                  <span className="block h-0.5 w-5 bg-current" />
                  <span className="block h-0.5 w-5 bg-current" />
                  <span className="block h-0.5 w-5 bg-current" />
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-[200] md:hidden" id="mobile-drawer">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Menu sluiten"
            onClick={closeMobile}
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,22rem)] flex-col bg-[#F4FAF0]/95 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between border-b border-[#1A2E1A]/10 px-4 py-4">
              <span className="font-lato text-lg font-medium text-[#1A2E1A]">Menu</span>
              <button
                type="button"
                className="rounded-sm p-2 text-[#1A2E1A]/90 hover:bg-[#1A2E1A]/10"
                aria-label="Sluiten"
                onClick={closeMobile}
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>
            <nav className="flex flex-1 flex-col overflow-y-auto py-4" aria-label="Mobiel menu">
              <Link
                href="/behandelingen"
                onClick={closeMobile}
                className="border-b border-[#1A2E1A]/10 px-6 py-3 font-lato text-[#1A2E1A]"
              >
                Behandelingen
              </Link>
              {BEHANDELING_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className="border-b border-[#1A2E1A]/10 pl-10 pr-6 py-2.5 font-lato text-sm text-[#1A2E1A]/80"
                >
                  {item.label}
                </Link>
              ))}
              {HEADER_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className="border-b border-[#1A2E1A]/10 px-6 py-3 font-lato text-[#1A2E1A]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={SITE.bookingUrl}
                onClick={closeMobile}
                className="btn-primary mx-6 mt-6 text-center"
              >
                Maak afspraak
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
