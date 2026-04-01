"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AgendaCalendar,
  type AgendaEvent,
} from "@/components/AgendaCalendar";

export type SerializedAgendaEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  resource?: AgendaEvent["resource"];
};

export function AdminAgendaView({
  events: raw,
}: {
  events: SerializedAgendaEvent[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<AgendaEvent | null>(null);
  const [blokBusy, setBlokBusy] = useState(false);

  const events = useMemo(
    () =>
      raw.map((e) => ({
        id: e.id,
        title: e.title,
        start: new Date(e.start),
        end: new Date(e.end),
        allDay: e.allDay,
        resource: e.resource,
      })),
    [raw]
  );

  async function onBlokSubmit(formData: FormData) {
    const datum = String(formData.get("datum") || "");
    const tijdRaw = String(formData.get("tijd") || "").trim();
    const reden = String(formData.get("reden") || "").trim();
    if (!datum) return;
    setBlokBusy(true);
    try {
      const res = await fetch("/api/admin/blokkeringen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          datum,
          tijdslot: tijdRaw === "" ? null : tijdRaw,
          reden: reden || null,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Blokkering opslaan mislukt.");
    } finally {
      setBlokBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-700 dark:bg-stone-900/60">
        <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100">
          Blokkering toevoegen
        </h2>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          Leeg tijdveld = hele dag geblokkeerd (bijv. vakantie).
        </p>
        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end"
          onSubmit={async (e) => {
            e.preventDefault();
            await onBlokSubmit(new FormData(e.currentTarget));
          }}
        >
          <label className="text-sm">
            <span className="text-stone-600 dark:text-stone-400">Datum</span>
            <input
              required
              name="datum"
              type="date"
              className="mt-1 block rounded-xl border border-stone-300 bg-white px-3 py-2 dark:border-stone-600 dark:bg-stone-950"
            />
          </label>
          <label className="text-sm">
            <span className="text-stone-600 dark:text-stone-400">Tijd (optioneel)</span>
            <input
              name="tijd"
              type="time"
              className="mt-1 block rounded-xl border border-stone-300 bg-white px-3 py-2 dark:border-stone-600 dark:bg-stone-950"
            />
          </label>
          <label className="min-w-[200px] flex-1 text-sm">
            <span className="text-stone-600 dark:text-stone-400">Reden</span>
            <input
              name="reden"
              className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 dark:border-stone-600 dark:bg-stone-950"
              placeholder="Vakantie / onderhoud…"
            />
          </label>
          <button
            type="submit"
            disabled={blokBusy}
            className="rounded-xl bg-stone-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 dark:bg-amber-800"
          >
            {blokBusy ? "Opslaan…" : "Blokkeren"}
          </button>
        </form>
      </section>

      <AgendaCalendar
        events={events}
        eventPropGetter={(ev) => {
          if (ev.resource?.type === "block") {
            return {
              style: {
                backgroundColor: "#57534e",
                borderColor: "#44403c",
                opacity: 0.92,
              },
            };
          }
          const st = ev.resource?.status;
          if (st === "bevestigd") {
            return { style: { backgroundColor: "#15803d", borderColor: "#166534" } };
          }
          if (st === "pending") {
            return { style: { backgroundColor: "#b45309", borderColor: "#92400e" } };
          }
          if (st === "geannuleerd") {
            return {
              style: {
                backgroundColor: "#78716c",
                borderColor: "#57534e",
                opacity: 0.65,
              },
            };
          }
          return { style: { backgroundColor: "#0369a1", borderColor: "#075985" } };
        }}
        onSelectEvent={(ev) => {
          if (ev.resource?.type === "block") return;
          setSelected(ev);
        }}
      />

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal
        >
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-stone-900">
            <h3 className="font-serif text-xl text-stone-900 dark:text-stone-50">
              {selected.resource?.behandeling || selected.title}
            </h3>
            <dl className="mt-4 space-y-2 text-sm text-stone-700 dark:text-stone-300">
              <div>
                <dt className="text-stone-500">Naam</dt>
                <dd>{selected.resource?.naam}</dd>
              </div>
              <div>
                <dt className="text-stone-500">E-mail</dt>
                <dd>{selected.resource?.email}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Telefoon</dt>
                <dd>{selected.resource?.telefoon}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Tijd</dt>
                <dd>{selected.resource?.tijdslot}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Status</dt>
                <dd className="capitalize">{selected.resource?.status}</dd>
              </div>
              {selected.resource?.opmerking && (
                <div>
                  <dt className="text-stone-500">Opmerking</dt>
                  <dd className="whitespace-pre-wrap">{selected.resource.opmerking}</dd>
                </div>
              )}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/admin/boekingen#${selected.resource?.bookingId}`}
                className="rounded-full bg-rjt-red px-4 py-2 text-sm font-semibold text-white"
              >
                Open in boekingen
              </Link>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full border border-stone-300 px-4 py-2 text-sm dark:border-stone-600"
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
