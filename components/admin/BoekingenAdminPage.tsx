"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { formatBookingDatumAdminRijNl } from "@/lib/booking-datums";
import { adminBookingStatusLabel } from "@/lib/admin-i18n";

type BookingRow = {
  id: string;
  naam: string;
  email: string;
  telefoon: string;
  opmerking: string | null;
  behandeling: string;
  duur: number;
  prijs: string;
  datum: string;
  tijdslot: string;
  status: string;
  bron: string;
  createdAt: string;
};

const TABS = [
  { key: "alle", label: "Alle", statusParam: "" },
  { key: "pending", label: "In afwachting / 待确认", statusParam: "pending" },
  { key: "bevestigd", label: "Bevestigd / 已确认", statusParam: "bevestigd" },
  {
    key: "geannuleerd",
    label: "Geannuleerd / 已取消",
    statusParam: "geannuleerd",
  },
] as const;

function statusBadgeClass(s: string) {
  switch (s) {
    case "pending":
      return "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100";
    case "bevestigd":
      return "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100";
    case "geannuleerd":
      return "bg-stone-200 text-stone-800 dark:bg-stone-700 dark:text-stone-100";
    case "voltooid":
      return "bg-sky-100 text-sky-900 dark:bg-sky-900/40 dark:text-sky-100";
    default:
      return "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200";
  }
}

export function BoekingenAdminPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("alle");
  const [searchInput, setSearchInput] = useState("");
  const [searchApplied, setSearchApplied] = useState("");
  const [datumFilter, setDatumFilter] = useState("");
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);

  const tabStatus = TABS.find((t) => t.key === tab)?.statusParam ?? "";

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const u = new URL("/api/admin/boekingen", window.location.origin);
      if (tabStatus) u.searchParams.set("status", tabStatus);
      if (searchApplied.trim()) u.searchParams.set("search", searchApplied.trim());
      if (datumFilter) u.searchParams.set("datum", datumFilter);
      const res = await fetch(u.toString());
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Laden mislukt");
      setBookings(data.bookings);
      setCounts(data.counts || {});
    } catch (e) {
      console.error(e);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [tabStatus, searchApplied, datumFilter]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const h = window.location.hash.replace("#", "");
    if (h) setDetailId(h);
  }, []);

  const tabBadges = useMemo(() => {
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    return {
      alle: total,
      pending: counts.pending ?? 0,
      bevestigd: counts.bevestigd ?? 0,
      geannuleerd: counts.geannuleerd ?? 0,
    };
  }, [counts]);

  async function patchStatus(id: string, status: "bevestigd" | "geannuleerd") {
    setBusyId(id);
    try {
      let reden: string | undefined;
      if (status === "geannuleerd") {
        reden = window.prompt("Reden annulering (optioneel):") ?? "";
        if (!reden.trim()) reden = undefined;
      }
      const res = await fetch(`/api/admin/boekingen/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, reden }),
      });
      if (!res.ok) throw new Error(await res.text());
      await load();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100">
          Boekingen
        </h1>
        <p className="text-stone-400 text-sm">预约</p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3 dark:border-stone-700">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={
              tab === t.key
                ? "rounded-full bg-rjt-red px-4 py-2 text-sm font-semibold text-white"
                : "rounded-full border border-stone-300 px-4 py-2 text-sm dark:border-stone-600"
            }
          >
            {t.label}
            <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {tabBadges[t.key as keyof typeof tabBadges] ?? 0}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="block flex-1 text-sm">
          <span className="text-stone-600 dark:text-stone-400">Zoeken (naam/e-mail)</span>
          <input
            className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 dark:border-stone-600 dark:bg-stone-950"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Zoek…"
          />
        </label>
        <label className="block text-sm">
          <span className="text-stone-600 dark:text-stone-400">Datum</span>
          <input
            type="date"
            className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 dark:border-stone-600 dark:bg-stone-950"
            value={datumFilter}
            onChange={(e) => setDatumFilter(e.target.value)}
          />
        </label>
        <button
          type="button"
          onClick={() => {
            setSearchApplied(searchInput.trim());
          }}
          className="rounded-xl bg-stone-800 px-4 py-2 text-sm font-medium text-white dark:bg-amber-800"
        >
          Zoek
        </button>
      </div>

      {loading && (
        <p className="text-sm text-stone-500">Laden…</p>
      )}

      <div className="space-y-4">
        {bookings.map((b) => {
          const open = detailId === b.id;
          return (
            <article
              key={b.id}
              id={b.id}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900/60"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">
                    {b.naam}
                  </p>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    {b.behandeling} · {b.tijdslot} ·{" "}
                    {formatBookingDatumAdminRijNl(new Date(b.datum))}
                  </p>
                  <p className="text-xs text-stone-500">{b.email}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadgeClass(b.status)}`}
                >
                  {adminBookingStatusLabel(b.status)}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {b.status === "pending" && (
                  <button
                    type="button"
                    disabled={busyId === b.id}
                    onClick={() => patchStatus(b.id, "bevestigd")}
                    className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                  >
                    Bevestig ✓
                  </button>
                )}
                {b.status !== "geannuleerd" && (
                  <button
                    type="button"
                    disabled={busyId === b.id}
                    onClick={() => patchStatus(b.id, "geannuleerd")}
                    className="rounded-lg bg-stone-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                  >
                    Annuleer ✗
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setDetailId(open ? null : b.id)}
                  className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-medium dark:border-stone-600"
                >
                  {open ? "Details ▲" : "Details ▼"}
                </button>
              </div>
              {open && (
                <dl className="mt-4 grid gap-2 border-t border-stone-100 pt-4 text-sm dark:border-stone-800">
                  <div>
                    <dt className="text-stone-500">Telefoon</dt>
                    <dd>{b.telefoon}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Duur / prijs</dt>
                    <dd>
                      {b.duur} min · €{b.prijs}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Bron</dt>
                    <dd>{b.bron}</dd>
                  </div>
                  {b.opmerking && (
                    <div>
                      <dt className="text-stone-500">Opmerking</dt>
                      <dd className="whitespace-pre-wrap">{b.opmerking}</dd>
                    </div>
                  )}
                </dl>
              )}
            </article>
          );
        })}
      </div>

      {!loading && bookings.length === 0 && (
        <p className="text-sm text-stone-500">Geen boekingen gevonden.</p>
      )}
    </div>
  );
}
