"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { signOut } from "next-auth/react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", labelCn: "控制台" },
  { href: "/admin/agenda", label: "Agenda", labelCn: "日程" },
  { href: "/admin/boekingen", label: "Boekingen", labelCn: "预约" },
  { href: "/admin/historie", label: "Historie", labelCn: "历史记录" },
  { href: "/admin/tijdsloten", label: "Tijdsloten", labelCn: "时间段" },
  { href: "/admin/klanten", label: "Klanten", labelCn: "客户" },
  { href: "/admin/import", label: "Import", labelCn: "导入" },
] as const;

export function AdminChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="admin min-h-screen bg-stone-warm dark:bg-stone-950">
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
                <span className="text-xs text-stone-400 block dark:text-stone-500">
                  {l.labelCn}
                </span>
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
