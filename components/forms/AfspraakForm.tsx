"use client";

import { useState } from "react";
import { AFSPRAAK_BEHANDEL_OPTIES } from "@/lib/behandelingen-data";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function AfspraakForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const payload = {
      formType: "afspraak" as const,
      naam: fd.get("naam"),
      email: fd.get("email"),
      telefoon: fd.get("telefoon"),
      behandeling: fd.get("behandeling"),
      voorkeursdatum: fd.get("voorkeursdatum"),
      voorkeurstijd: fd.get("voorkeurstijd"),
      bericht: fd.get("bericht"),
    };
    try {
      const res = await fetch("/api/site-aanvraag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("err");
        setMsg(data.error || "Er ging iets mis. Probeer het later opnieuw of bel ons.");
        return;
      }
      setStatus("ok");
      setMsg(
        "Bedankt! We hebben uw aanvraag ontvangen en nemen zo snel mogelijk contact met u op."
      );
      e.currentTarget.reset();
    } catch {
      setStatus("err");
      setMsg("Verbinding mislukt. Probeer het later opnieuw.");
    }
  }

  if (status === "ok") {
    return (
      <p className="rounded-sm border border-jade/30 bg-paper p-6 font-lato text-ink" role="status">
        {msg}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 font-lato">
      <div>
        <label htmlFor="afspraak-naam" className="mb-1 block text-sm font-medium text-ink">
          Naam *
        </label>
        <input
          id="afspraak-naam"
          name="naam"
          required
          autoComplete="name"
          className="w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 text-ink outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion"
        />
      </div>
      <div>
        <label htmlFor="afspraak-email" className="mb-1 block text-sm font-medium text-ink">
          E-mail *
        </label>
        <input
          id="afspraak-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 text-ink outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion"
        />
      </div>
      <div>
        <label htmlFor="afspraak-tel" className="mb-1 block text-sm font-medium text-ink">
          Telefoon *
        </label>
        <input
          id="afspraak-tel"
          name="telefoon"
          type="tel"
          required
          autoComplete="tel"
          className="w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 text-ink outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion"
        />
      </div>
      <div>
        <label htmlFor="afspraak-beh" className="mb-1 block text-sm font-medium text-ink">
          Gewenste behandeling
        </label>
        <select
          id="afspraak-beh"
          name="behandeling"
          className="w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 text-ink outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion"
        >
          <option value="">Maak een keuze</option>
          {AFSPRAAK_BEHANDEL_OPTIES.map((o) => (
            <option key={o.value} value={o.label}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="afspraak-datum" className="mb-1 block text-sm font-medium text-ink">
            Voorkeursdatum
          </label>
          <input
            id="afspraak-datum"
            name="voorkeursdatum"
            type="date"
            className="w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 text-ink outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion"
          />
        </div>
        <div>
          <label htmlFor="afspraak-tijd" className="mb-1 block text-sm font-medium text-ink">
            Voorkeurstijdstip
          </label>
          <input
            id="afspraak-tijd"
            name="voorkeurstijd"
            type="time"
            className="w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 text-ink outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion"
          />
        </div>
      </div>
      <div>
        <label htmlFor="afspraak-bericht" className="mb-1 block text-sm font-medium text-ink">
          Bericht (optioneel)
        </label>
        <textarea
          id="afspraak-bericht"
          name="bericht"
          rows={4}
          className="w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 text-ink outline-none focus:border-vermilion focus:ring-1 focus:ring-vermilion"
        />
      </div>
      {status === "err" ? (
        <p className="text-sm text-vermilion" role="alert">
          {msg}
        </p>
      ) : null}
      <Button type="submit" variant="primary" disabled={status === "loading"}>
        {status === "loading" ? "Verzenden…" : "Verstuur aanvraag"}
      </Button>
      <p className="text-xs text-muted">
        Liever direct een tijdslot kiezen?{" "}
        <a href={SITE.bookingUrl} className="text-jade underline-offset-2 hover:underline">
          Online agenda
        </a>
      </p>
    </form>
  );
}
