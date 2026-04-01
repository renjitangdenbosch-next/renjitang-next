"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    setDark(isDark);
    root.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "rounded-full border border-stone-300/80 bg-white/80 px-3 py-1.5 text-xs font-medium text-stone-700 shadow-sm transition hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-900/80 dark:text-stone-200 dark:hover:bg-stone-800",
        className,
      )}
      aria-label={dark ? "Schakel naar licht thema" : "Schakel naar donker thema"}
    >
      {dark ? "☀️ Licht" : "🌙 Donker"}
    </button>
  );
}
