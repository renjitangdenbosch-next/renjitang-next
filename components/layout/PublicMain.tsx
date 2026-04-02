"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

/**
 * Ruimte onder vaste header (en optionele announcement).
 * Homepage: hero vult het scherm; overige routes krijgen top-padding.
 */
export function PublicMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main
      id="main-content"
      className={cn(
        "min-w-0",
        isHome ? "" : "pt-[7rem]"
      )}
    >
      {children}
    </main>
  );
}
