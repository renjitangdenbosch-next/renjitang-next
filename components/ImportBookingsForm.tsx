"use client";

import { useState } from "react";

type Row = {
  naam: string;
  email: string;
  telefoon?: string;
  behandeling: string;
  datum: string;
  tijdslot?: string;
  duur?: number;
  opmerking?: string;
};

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(";").map((h) => h.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const cells = line.split(";");
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = cells[i]?.trim() ?? "";
    });
    return row;
  });
}

function normalizeRow(r: Record<string, string>): Row | null {
  const naam = r.naam || r.name || "";
  const email = r.email || r["e-mail"] || "";
  const behandeling = r.behandeling || r.service || r.dienst || "";
  const datum = r.datum || r.date || "";
  if (!naam || !email || !behandeling || !datum) return null;
  return {
    naam,
    email,
    telefoon: r.telefoon || r.phone || undefined,
    behandeling,
    datum,
    tijdslot: r.tijdslot || r.tijd || r.time || undefined,
    duur: r.duur || r.duration
      ? parseInt(r.duur || r.duration, 10)
      : undefined,
    opmerking: r.opmerking || r.notes || r.opmerkingen || undefined,
  };
}

export function ImportBookingsForm() {
  const [raw, setRaw] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function onPreview() {
    setMsg(null);
    const t = raw.trim();
    if (!t) {
      setRows([]);
      return;
    }
    let parsed: Record<string, string>[] = [];
    if (t.startsWith("[")) {
      try {
        parsed = JSON.parse(t) as Record<string, string>[];
      } catch {
        setMsg("Ongeldige JSON.");
        return;
      }
    } else {
      parsed = parseCsv(t);
    }
    const out = parsed.map(normalizeRow).filter(Boolean) as Row[];
    setRows(out);
    if (out.length === 0)
      setMsg(
        "Geen geldige rijen gevonden (naam, email, behandeling, datum vereist)."
      );
  }

  async function onImport() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import mislukt");
      setMsg(
        `Geïmporteerd: ${data.imported}. Overgeslagen: ${data.skipped?.length ?? 0}.`
      );
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-stone-600 dark:text-stone-400">
        Plak CSV (kolommen gescheiden door <code>;</code>) of JSON-array. Kolommen:
        naam, email, behandeling, datum (yyyy-MM-dd of ISO), optioneel tijdslot,
        telefoon, duur, opmerking.
      </p>
      <textarea
        className="min-h-[200px] w-full rounded-xl border border-[#d4c5a0] p-3 font-mono text-sm"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        placeholder={`naam;email;behandeling;datum;tijdslot\nJan;jan@x.nl;Acupunctuur;2026-04-15;10:00`}
      />
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onPreview}
          className="admin-btn-outline-dark rounded-full px-4 py-2 text-sm font-medium"
        >
          Voorvertoning
        </button>
        <button
          type="button"
          disabled={loading || rows.length === 0}
          onClick={onImport}
          className="rounded-full bg-stone-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 dark:bg-amber-800"
        >
          {loading ? "Importeren…" : "Importeren"}
        </button>
      </div>
      {msg && <p className="text-sm text-amber-900 dark:text-amber-200">{msg}</p>}
      {rows.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-700">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-100 dark:bg-stone-800">
                <th className="p-2">Naam</th>
                <th className="p-2">E-mail</th>
                <th className="p-2">Behandeling</th>
                <th className="p-2">Datum</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 50).map((r, i) => (
                <tr key={i} className="border-t border-stone-200 dark:border-stone-700">
                  <td className="p-2">{r.naam}</td>
                  <td className="p-2">{r.email}</td>
                  <td className="p-2">{r.behandeling}</td>
                  <td className="p-2">{r.datum}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length > 50 && (
            <p className="p-2 text-xs text-stone-500">… en {rows.length - 50} extra rijen</p>
          )}
        </div>
      )}
    </div>
  );
}
