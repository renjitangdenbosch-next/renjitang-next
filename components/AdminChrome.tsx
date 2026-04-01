"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { signOut } from "next-auth/react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/agenda", label: "Agenda" },
  { href: "/admin/boekingen", label: "Boekingen" },
  { href: "/admin/tijdsloten", label: "Tijdsloten" },
  { href: "/admin/klanten", label: "Klanten" },
  { href: "/admin/import", label: "Import" },
];

export function AdminChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-stone-warm dark:bg-stone-950">
      <div className="flex flex-col md:flex-row">
        <aside className="border-b border-stone-200 bg-white px-4 py-4 dark:border-stone-700 dark:bg-stone-900 md:w-56 md:border-b-0 md:border-r">
          <p className="font-serif text-lg text-stone-900 dark:text-stone-100">
            Beheer
          </p>
          <nav className="mt-4 flex flex-wrap gap-2 md:flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  pathname === l.href
                    ? "rounded-lg bg-stone-200 px-3 py-2 text-sm font-medium dark:bg-stone-800"
                    : "rounded-lg px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                }
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-6 text-left text-sm text-red-700 hover:underline dark:text-red-400"
          >
            Uitloggen
          </button>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
