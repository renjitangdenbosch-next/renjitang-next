"use client";

import { useState } from "react";

export function BookingPressImportSection() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0] ?? null;
    setFile(picked);
    setResult(null);
    setError(null);
  }

  async function onImport() {
    if (!file) return;

    setBusy(true);
    setResult(null);
    setError(null);

    try {
      const text = await file.text();
      JSON.parse(text);

      const res = await fetch("/api/admin/import-bookingpress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: text,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import mislukt");

      setResult(
        `${data.klanten} klanten, ${data.boekingen} WP-boekingen. ` +
          `Site-model (Booking): ${data.siteBoekingen?.upserted ?? 0} upserts.`
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kon bestand niet verwerken"
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900/60">
      <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">
        BookingPress-export (.txt / JSON)
      </h2>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
        Upload het exportbestand van BookingPress (JSON in .txt). Bestaande
        records met dezelfde <code className="text-xs">wpId</code> worden
        bijgewerkt (upsert).
      </p>

      <div className="mt-4 space-y-3">
        <label className="flex w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-stone-300 bg-stone-50 px-4 py-4 dark:border-stone-600 dark:bg-stone-800/50">
          <input
            type="file"
            accept=".txt,.json,text/plain,application/json"
            className="sr-only"
            disabled={busy}
            onChange={onFilePick}
          />
          <span className="text-sm font-medium text-stone-800 dark:text-stone-200">
            Kies exportbestand
          </span>
        </label>

        <p
          className="text-sm text-stone-800 dark:text-stone-200"
          aria-live="polite"
        >
          {file ? (
            <>
              <span className="font-medium">Geselecteerd:</span>{" "}
              <span className="break-all">{file.name}</span>
            </>
          ) : (
            <span className="text-stone-500 dark:text-stone-400">
              Nog geen bestand geselecteerd.
            </span>
          )}
        </p>

        <button
          type="button"
          onClick={onImport}
          disabled={!file || busy}
          className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-green-700 dark:hover:bg-green-600 sm:w-auto sm:min-w-[160px]"
        >
          {busy ? "Importeren…" : "Importeren"}
        </button>
      </div>

      {busy && (
        <div
          className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700"
          role="progressbar"
          aria-busy="true"
          aria-label="Import bezig"
        >
          <div className="h-full w-1/3 animate-pulse rounded-full bg-green-600 dark:bg-green-500" />
        </div>
      )}

      {result && (
        <p className="mt-4 text-sm font-medium text-green-800 dark:text-green-300">
          {result}
        </p>
      )}
      {error && (
        <p className="mt-4 text-sm text-red-700 dark:text-red-300" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
