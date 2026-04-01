"use client";

import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

const DAGEN = [
  { v: 0, l: "Zondag" },
  { v: 1, l: "Maandag" },
  { v: 2, l: "Dinsdag" },
  { v: 3, l: "Woensdag" },
  { v: 4, l: "Donderdag" },
  { v: 5, l: "Vrijdag" },
  { v: 6, l: "Zaterdag" },
];

type TRow = {
  id: string;
  dag: number;
  startTijd: string;
  eindTijd: string;
  actief: boolean;
};

type Blok = {
  id: string;
  datum: string;
  tijdslot: string | null;
  reden: string | null;
};

export function TijdslotenAdminPage() {
  const [tijdsloten, setTijdsloten] = useState<TRow[]>([]);
  const [blokkeringen, setBlokkeringen] = useState<Blok[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [tRes, bRes] = await Promise.all([
        fetch("/api/admin/tijdsloten"),
        fetch("/api/admin/blokkeringen"),
      ]);
      const tData = await tRes.json();
      const bData = await bRes.json();
      if (tRes.ok) setTijdsloten(tData.tijdsloten || []);
      if (bRes.ok) setBlokkeringen(bData.blokkeringen || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function addTijdslot(fd: FormData) {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/tijdsloten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dag: parseInt(String(fd.get("dag")), 10),
          startTijd: String(fd.get("startTijd")),
          eindTijd: String(fd.get("eindTijd")),
          actief: true,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      await load();
    } catch (e) {
      console.error(e);
      alert("Opslaan mislukt.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteTijdslot(id: string) {
    if (!confirm("Dit tijdslot verwijderen?")) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/tijdsloten?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function deleteBlok(id: string) {
    if (!confirm("Blokkering verwijderen?")) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/blokkeringen?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      await load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100">
          Tijdsloten & uitzonderingen
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-stone-600 dark:text-stone-400">
          Zonder regels hier gelden de standaardtijden: dinsdag t/m vrijdag
          09:00–20:00, zaterdag en zondag 09:00–17:00, maandag gesloten. Zodra u
          hier rijen toevoegt voor een dag, gelden alleen die vensters (pauzes =
          meerdere rijen met gaten).
        </p>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900/60">
        <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">
          Openingstijden per weekdag
        </h2>
        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end"
          onSubmit={async (e) => {
            e.preventDefault();
            await addTijdslot(new FormData(e.currentTarget));
            e.currentTarget.reset();
          }}
        >
          <label className="text-sm">
            <span className="text-stone-600 dark:text-stone-400">Dag</span>
            <select
              name="dag"
              required
              className="mt-1 block rounded-xl border border-stone-300 bg-white px-3 py-2 dark:border-stone-600 dark:bg-stone-950"
            >
              {DAGEN.map((d) => (
                <option key={d.v} value={d.v}>
                  {d.l}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="text-stone-600 dark:text-stone-400">Start</span>
            <input
              name="startTijd"
              type="time"
              required
              className="mt-1 block rounded-xl border border-stone-300 bg-white px-3 py-2 dark:border-stone-600 dark:bg-stone-950"
            />
          </label>
          <label className="text-sm">
            <span className="text-stone-600 dark:text-stone-400">Einde</span>
            <input
              name="eindTijd"
              type="time"
              required
              className="mt-1 block rounded-xl border border-stone-300 bg-white px-3 py-2 dark:border-stone-600 dark:bg-stone-950"
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-stone-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 dark:bg-amber-800"
          >
            Toevoegen
          </button>
        </form>

        {loading && <p className="mt-4 text-sm text-stone-500">Laden…</p>}
        <ul className="mt-6 space-y-2">
          {tijdsloten.map((t) => (
            <li
              key={t.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-stone-100 px-4 py-3 text-sm dark:border-stone-800"
            >
              <span>
                {DAGEN.find((d) => d.v === t.dag)?.l} · {t.startTijd} –{" "}
                {t.eindTijd}
                {!t.actief && (
                  <span className="ml-2 text-amber-700">(inactief)</span>
                )}
              </span>
              <button
                type="button"
                onClick={() => deleteTijdslot(t.id)}
                className="text-xs text-red-700 underline dark:text-red-400"
              >
                Verwijderen
              </button>
            </li>
          ))}
        </ul>
        {tijdsloten.length === 0 && !loading && (
          <p className="mt-4 text-sm text-stone-500">
            Geen aangepaste vensters — standaard rooster actief.
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900/60">
        <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100">
          Geplande blokkeringen
        </h2>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          Beheer ook via Agenda → formulier “Blokkering toevoegen”.
        </p>
        <ul className="mt-4 space-y-2">
          {blokkeringen.map((b) => (
            <li
              key={b.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-stone-100 px-4 py-3 text-sm dark:border-stone-800"
            >
              <span>
                {format(new Date(b.datum), "PPP", { locale: nl })}{" "}
                {b.tijdslot ? `· ${b.tijdslot}` : "(hele dag)"}{" "}
                {b.reden ? `— ${b.reden}` : ""}
              </span>
              <button
                type="button"
                onClick={() => deleteBlok(b.id)}
                className="text-xs text-red-700 underline dark:text-red-400"
              >
                Verwijderen
              </button>
            </li>
          ))}
        </ul>
        {blokkeringen.length === 0 && !loading && (
          <p className="mt-4 text-sm text-stone-500">Geen blokkeringen.</p>
        )}
      </section>
    </div>
  );
}
