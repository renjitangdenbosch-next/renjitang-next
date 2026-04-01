"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { PRIMARY_NAV } from "@/lib/navigation";
import { SITE } from "@/lib/site";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-stone-200/80 bg-white/95 backdrop-blur-sm dark:border-stone-700/80">
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
          <span className="hidden text-xs text-stone-400 md:block">仁济堂</span>
        </Link>
        <nav
          className="hidden items-center gap-8 text-sm font-medium md:flex lg:gap-10"
          aria-label="Hoofdmenu"
        >
          {PRIMARY_NAV.map((item) => {
            const isBooking = item.href === SITE.bookingUrl;
            if (isBooking) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="shrink-0 rounded-sm border border-transparent bg-rjt-red px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#a02f40]"
                >
                  <span className="block">{item.label}</span>
                  <span className="block text-xs text-white/80">{item.labelZh}</span>
                </Link>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-center text-stone-900 transition hover:text-rjt-red dark:text-stone-900 dark:hover:text-rjt-red"
              >
                <span className="block">{item.label}</span>
                <span className="block text-xs text-stone-400">{item.labelZh}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <nav
        className="flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-stone-200/60 px-4 py-2 text-xs font-medium text-stone-900 md:hidden dark:border-stone-700"
        aria-label="Mobiel menu"
      >
        {PRIMARY_NAV.map((item) => {
          const isBooking = item.href === SITE.bookingUrl;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-2 py-1 text-center transition-colors hover:bg-stone-200/60 dark:hover:bg-stone-800",
                isBooking && "border border-rjt-red bg-rjt-red text-white hover:bg-[#a02f40]",
              )}
            >
              <span className="block leading-tight">{item.label}</span>
              <span
                className={cn(
                  "block text-[10px] leading-tight",
                  isBooking ? "text-white/80" : "text-stone-500",
                )}
              >
                {item.labelZh}
              </span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
