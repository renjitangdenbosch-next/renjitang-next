"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

export function KlantenSearch({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(initialQuery);
  const [pending, startTransition] = useTransition();

  const apply = useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    const trimmed = q.trim();
    if (trimmed) params.set("q", trimmed);
    else params.delete("q");
    startTransition(() => {
      router.push(`/admin/klanten?${params.toString()}`);
    });
  }, [q, router, searchParams]);

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="min-w-[200px] flex-1">
        <label htmlFor="klanten-zoek" className="text-sm font-medium text-stone-700 dark:text-stone-300">
          Zoeken op naam of e-mail / 按姓名或邮箱搜索
        </label>
        <input
          id="klanten-zoek"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), apply())}
          placeholder="Zoek op naam of e-mail / 按姓名或邮箱搜索"
          className="mt-1 w-full rounded-lg border border-[#d4c5a0] px-3 py-2"
        />
      </div>
      <button
        type="button"
        onClick={apply}
        disabled={pending}
        className="rounded-full bg-stone-800 px-5 py-2 text-sm font-semibold text-white disabled:opacity-60 dark:bg-amber-800"
      >
        {pending ? "Zoeken…" : "Zoeken"}
      </button>
    </div>
  );
}
