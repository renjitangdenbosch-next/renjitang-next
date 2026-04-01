"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { nl } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";
import { SERVICES } from "@/lib/site";
import { cn } from "@/lib/cn";

const TZ = "Europe/Amsterdam";

const STEPS = [
  "Behandeling",
  "Datum & tijd",
  "Uw gegevens",
  "Bevestiging",
] as const;

type ApiSlot = { label: string; iso: string };

export function BookingWizard() {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [viewMonth, setViewMonth] = useState(() => new Date());
  const [dateStr, setDateStr] = useState<string | null>(null);
  const [tijdslot, setTijdslot] = useState<string | null>(null);
  const [slots, setSlots] = useState<ApiSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [opmerking, setOpmerking] = useState("");
  const [privacyOk, setPrivacyOk] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [doneId, setDoneId] = useState<string | null>(null);

  const service = useMemo(
    () => SERVICES.find((s) => s.id === serviceId) ?? null,
    [serviceId]
  );

  const loadSlots = useCallback(
    async (d: string, sid: string) => {
      setSlotsLoading(true);
      setTijdslot(null);
      try {
        const u = new URL("/api/bookings/beschikbare-slots", window.location.origin);
        u.searchParams.set("datum", d);
        u.searchParams.set("behandelingId", sid);
        const res = await fetch(u.toString());
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Kon tijden niet laden");
        setSlots(data.slots || []);
      } catch (e) {
        setSlots([]);
        console.error(e);
      } finally {
        setSlotsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (step === 1 && dateStr && serviceId) {
      loadSlots(dateStr, serviceId);
    }
  }, [step, dateStr, serviceId, loadSlots]);

  function isMondayAm(d: Date) {
    return toZonedTime(d, TZ).getDay() === 1;
  }

  function isPastDayAm(d: Date) {
    const today = startOfDay(toZonedTime(new Date(), TZ));
    const dd = startOfDay(toZonedTime(d, TZ));
    return isBefore(dd, today);
  }

  function dayKeyAm(d: Date) {
    return format(toZonedTime(d, TZ), "yyyy-MM-dd");
  }

  const monthDays = useMemo(() => {
    const start = startOfMonth(viewMonth);
    const end = endOfMonth(viewMonth);
    return eachDayOfInterval({ start, end });
  }, [viewMonth]);

  const leadingEmpty = useMemo(() => {
    const start = startOfMonth(viewMonth);
    const dow = getDay(start);
    const mondayFirst = (dow + 6) % 7;
    return mondayFirst;
  }, [viewMonth]);

  async function onSubmit() {
    if (!service || !dateStr || !tijdslot) return;
    setSubmitError(null);
    if (!emailValid(email)) {
      setSubmitError("Vul een geldig e-mailadres in.");
      return;
    }
    if (!privacyOk) {
      setSubmitError("Ga akkoord met de privacyverklaring om door te gaan.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          naam,
          email,
          telefoon,
          opmerking: opmerking || undefined,
          behandelingId: service.id,
          datum: dateStr,
          tijdslot,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Versturen mislukt");
      setDoneId(data.bookingId);
      setStep(3);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Er ging iets mis.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <nav aria-label="Voortgang" className="space-y-3">
            <div className="flex justify-between gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
          {STEPS.map((label, i) => (
            <span
              key={label}
              className={cn(
                "flex-1 text-center",
                step === 3 && "text-rjt-gold",
                step !== 3 && i === step && "font-semibold text-rjt-red",
                step !== 3 && i < step && "text-rjt-gold"
              )}
            >
              {i + 1}. {label}
            </span>
          ))}
        </div>
        <div className="flex gap-1">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                step === 3 && "bg-rjt-gold",
                step !== 3 && i < step && "bg-rjt-gold",
                step !== 3 && i === step && "bg-rjt-red",
                step !== 3 && i > step && "bg-stone-200 dark:bg-stone-700"
              )}
            />
          ))}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="s0"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Kies de behandeling die bij u past.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {SERVICES.map((s) => {
                const selected = serviceId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setServiceId(s.id)}
                    className={cn(
                      "group relative rounded-2xl border-2 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-stone-900/80",
                      selected
                        ? "border-rjt-red ring-2 ring-rjt-red/20"
                        : "border-stone-200 dark:border-stone-700"
                    )}
                  >
                    {selected && (
                      <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-rjt-red text-sm font-bold text-white">
                        ✓
                      </span>
                    )}
                    <p className="font-serif text-lg text-stone-900 dark:text-stone-100">
                      {s.naam}
                    </p>
                    <p className="mt-1 text-sm text-rjt-red">
                      €{s.prijs} · {s.duur} min
                    </p>
                    <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                      {s.beschrijving}
                    </p>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                disabled={!serviceId}
                onClick={() => setStep(1)}
                className="rounded-full bg-rjt-red px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a02f40] disabled:opacity-40"
              >
                Verder
              </button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setViewMonth(subMonths(viewMonth, 1))}
                className="rounded-lg border border-stone-200 px-3 py-1.5 text-sm dark:border-stone-600"
              >
                ←
              </button>
              <p className="font-serif text-lg capitalize text-stone-900 dark:text-stone-100">
                {format(viewMonth, "MMMM yyyy", { locale: nl })}
              </p>
              <button
                type="button"
                onClick={() => setViewMonth(addMonths(viewMonth, 1))}
                className="rounded-lg border border-stone-200 px-3 py-1.5 text-sm dark:border-stone-600"
              >
                →
              </button>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Maandag is gesloten. Beschikbare dagen zijn klikbaar.
            </p>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-stone-500">
              {["ma", "di", "wo", "do", "vr", "za", "zo"].map((d) => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: leadingEmpty }).map((_, i) => (
                <div key={`e-${i}`} />
              ))}
              {monthDays.map((day) => {
                const key = dayKeyAm(day);
                const mon = isMondayAm(day);
                const past = isPastDayAm(day);
                const sel = dateStr === key;
                const disabled = mon || past;
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      setDateStr(key);
                    }}
                    className={cn(
                      "aspect-square rounded-xl text-sm font-medium transition",
                      disabled &&
                        "cursor-not-allowed bg-stone-100 text-stone-300 dark:bg-stone-800 dark:text-stone-600",
                      !disabled &&
                        !sel &&
                        "bg-stone-50 hover:bg-stone-100 dark:bg-stone-800/80 dark:hover:bg-stone-800",
                      sel && "bg-rjt-red text-white shadow-md"
                    )}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-stone-800 dark:text-stone-200">
                Tijd
              </p>
              {!dateStr && (
                <p className="text-sm text-stone-500">Kies eerst een datum.</p>
              )}
              {dateStr && slotsLoading && (
                <p className="text-sm text-stone-500">Tijden laden…</p>
              )}
              {dateStr && !slotsLoading && slots.length === 0 && (
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Geen tijdsloten op deze dag. Kies een andere datum.
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {slots.map((sl) => (
                  <button
                    key={sl.label}
                    type="button"
                    onClick={() => setTijdslot(sl.label)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition",
                      tijdslot === sl.label
                        ? "border-rjt-red bg-rjt-red text-white"
                        : "border-stone-300 bg-white hover:border-rjt-gold dark:border-stone-600 dark:bg-stone-900"
                    )}
                  >
                    {sl.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="rounded-full border border-stone-300 px-5 py-2 text-sm dark:border-stone-600"
              >
                Terug
              </button>
              <button
                type="button"
                disabled={!dateStr || !tijdslot}
                onClick={() => setStep(2)}
                className="rounded-full bg-rjt-red px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
              >
                Verder
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-5"
          >
            <div className="rounded-xl border border-rjt-gold/30 bg-rjt-cream/40 p-4 text-sm dark:border-rjt-gold/20 dark:bg-stone-800/40">
              <p className="font-medium text-stone-800 dark:text-stone-100">
                Samenvatting
              </p>
              <ul className="mt-2 space-y-1 text-stone-600 dark:text-stone-400">
                <li>
                  <strong>Behandeling:</strong> {service?.naam}
                </li>
                <li>
                  <strong>Datum:</strong> {dateStr}
                </li>
                <li>
                  <strong>Tijd:</strong> {tijdslot}
                </li>
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  Naam *
                </span>
                <input
                  required
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 dark:border-stone-600 dark:bg-stone-950"
                  value={naam}
                  onChange={(e) => setNaam(e.target.value)}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  E-mail *
                </span>
                <input
                  required
                  type="email"
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 dark:border-stone-600 dark:bg-stone-950"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  Telefoon *
                </span>
                <input
                  required
                  type="tel"
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 dark:border-stone-600 dark:bg-stone-950"
                  value={telefoon}
                  onChange={(e) => setTelefoon(e.target.value)}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  Opmerking (optioneel)
                </span>
                <textarea
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 dark:border-stone-600 dark:bg-stone-950"
                  value={opmerking}
                  onChange={(e) => setOpmerking(e.target.value)}
                />
              </label>
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-stone-600 dark:text-stone-400">
              <input
                type="checkbox"
                checked={privacyOk}
                onChange={(e) => setPrivacyOk(e.target.checked)}
                className="mt-1"
              />
              <span>
                Ik ga akkoord met de verwerking van mijn gegevens zoals beschreven
                in de{" "}
                <Link href="/privacy" className="text-rjt-red underline">
                  privacyverklaring
                </Link>
                .
              </span>
            </label>

            {submitError && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {submitError}
              </p>
            )}

            <div className="flex flex-wrap justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-full border border-stone-300 px-5 py-2 text-sm dark:border-stone-600"
              >
                Terug
              </button>
              <button
                type="button"
                disabled={
                  submitting || !naam.trim() || !email.trim() || !telefoon.trim()
                }
                onClick={() => onSubmit()}
                className="rounded-full bg-rjt-red px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
              >
                {submitting ? "Verzenden…" : "Aanvraag versturen"}
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-center"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 text-4xl text-white shadow-lg">
              ✓
            </div>
            <div>
              <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-50">
                Uw aanvraag is ontvangen!
              </h2>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                Referentie: <span className="font-mono text-xs">{doneId}</span>
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-left text-sm dark:border-stone-700 dark:bg-stone-900/60">
              <p className="font-medium text-stone-800 dark:text-stone-100">
                {service?.naam}
              </p>
              <p className="mt-1 text-stone-600 dark:text-stone-400">
                {dateStr} om {tijdslot}
              </p>
              <p className="mt-1 text-stone-600 dark:text-stone-400">
                €{service?.prijs} · {service?.duur} min
              </p>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              U ontvangt een bevestiging per e-mail. De praktijk bevestigt uw
              afspraak zo spoedig mogelijk.
            </p>
            <Link
              href="/"
              className="inline-flex rounded-full bg-rjt-gold px-8 py-3 text-sm font-semibold text-stone-900 transition hover:opacity-90"
            >
              Terug naar home
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function emailValid(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}
