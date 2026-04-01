"use client";

import Image from "next/image";
import Link from "next/link";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { cn } from "@/lib/cn";
import { PRIMARY_NAV } from "@/lib/navigation";
import { SITE } from "@/lib/site";

export function Header() {
  return (
    <>
      <AnnouncementBanner />
      <header className="fixed left-0 right-0 top-11 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <Link href="/" className="flex shrink-0 flex-col items-start">
            <Image
              src="/images/cropped-logorenjitang.png"
              alt="Ren Ji Tang"
              width={80}
              height={40}
              priority
              sizes="80px"
              className="h-10 w-auto object-contain"
            />
            <span className="hidden text-xs text-stone-500 md:block">仁济堂</span>
          </Link>
          <nav
            className="hidden items-center gap-2 text-sm font-medium md:flex lg:gap-3"
            aria-label="Hoofdmenu"
          >
            {PRIMARY_NAV.map((item) => {
              const isBooking = item.href === SITE.bookingUrl;
              if (isBooking) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="shrink-0 rounded-xl bg-rjt-red px-3 py-2 text-center text-white transition-all duration-200 hover:bg-red-900"
                  >
                    <span className="block text-sm font-medium text-white">{item.label}</span>
                    <span className="block text-xs text-white/80">{item.labelZh}</span>
                  </Link>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative rounded-xl px-3 py-2 text-center transition-all duration-200 hover:bg-rjt-red"
                >
                  <span className="block text-sm font-medium text-stone-800 transition-colors group-hover:text-white">
                    {item.label}
                  </span>
                  <span className="block text-xs text-stone-500 transition-colors group-hover:text-white/80">
                    {item.labelZh}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
        <nav
          className="flex flex-wrap justify-center gap-x-2 gap-y-2 border-t border-stone-200 bg-white/95 px-4 py-2 text-xs font-medium backdrop-blur-sm md:hidden"
          aria-label="Mobiel menu"
        >
          {PRIMARY_NAV.map((item) => {
            const isBooking = item.href === SITE.bookingUrl;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group rounded-xl px-3 py-2 text-center transition-all duration-200",
                  isBooking
                    ? "bg-rjt-red text-white hover:bg-red-900"
                    : "hover:bg-rjt-red",
                )}
              >
                <span
                  className={cn(
                    "block text-xs font-medium leading-tight transition-colors",
                    isBooking ? "text-white" : "text-stone-800 group-hover:text-white",
                  )}
                >
                  {item.label}
                </span>
                <span
                  className={cn(
                    "block text-[10px] leading-tight transition-colors",
                    isBooking
                      ? "text-white/80"
                      : "text-stone-500 group-hover:text-white/80",
                  )}
                >
                  {item.labelZh}
                </span>
              </Link>
            );
          })}
        </nav>
      </header>
    </>
  );
}
