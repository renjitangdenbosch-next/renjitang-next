"use client";

import { useEffect, useRef, useState } from "react";
import {
  formatYyyyMmDdSummaryNl,
  localCalendarDateToYyyyMmDd,
} from "@/lib/booking-datums";
import { SERVICES } from "@/lib/site";

const STAP_ANKERS = [
  "stap-behandeling",
  "stap-datum",
  "stap-gegevens",
  "stap-bevestiging",
] as const;

type Stap = 1 | 2 | 3 | 4;

export default function BookingsPage() {
  const skipStapScroll = useRef(true);
  const [stap, setStap] = useState<Stap>(1);
  const [geselecteerd, setGeselecteerd] = useState<string>("");
  const [datum, setDatum] = useState<string>("");
  const [tijdslot, setTijdslot] = useState<string>("");
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    naam: "",
    email: "",
    telefoon: "",
    opmerking: "",
    privacy: false,
  });

  const service = SERVICES.find((s) => s.id === geselecteerd);

  useEffect(() => {
    if (skipStapScroll.current) {
      skipStapScroll.current = false;
      return;
    }
    const id = STAP_ANKERS[stap - 1];
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [stap]);

  // Genereer kalender voor huidige + volgende maand
  const vandaag = new Date();
  const [maand, setMaand] = useState(vandaag.getMonth());
  const [jaar, setJaar] = useState(vandaag.getFullYear());

  const huidigeMaand = new Date(jaar, maand, 15);
  const maandNaamNl = new Intl.DateTimeFormat("nl-NL", {
    month: "long",
    year: "numeric",
    timeZone: "Europe/Amsterdam",
  }).format(huidigeMaand);

  const minJaar = vandaag.getFullYear();
  const minMaand = vandaag.getMonth();
  const vorigeMaandDisabled =
    jaar < minJaar || (jaar === minJaar && maand <= minMaand);

  const kalenderNavBtnStyle: React.CSSProperties = {
    background: "transparent",
    color: "#c8a040",
    fontSize: "1.2rem",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    border: "none",
  };

  function vorigeMaand() {
    if (vorigeMaandDisabled) return;
    if (maand === 0) {
      setMaand(11);
      setJaar((j) => j - 1);
    } else setMaand((m) => m - 1);
  }

  function volgendeMaand() {
    if (maand === 11) {
      setMaand(0);
      setJaar((j) => j + 1);
    } else setMaand((m) => m + 1);
  }

  const dagNamen = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];

  function getDagenInMaand(): (Date | null)[] {
    const eerste = new Date(jaar, maand, 1);
    const startDag = eerste.getDay();
    const aantalDagen = new Date(jaar, maand + 1, 0).getDate();
    const dagen: (Date | null)[] = [];

    for (let i = 0; i < startDag; i++) dagen.push(null);
    for (let d = 1; d <= aantalDagen; d++) {
      dagen.push(new Date(jaar, maand, d));
    }
    return dagen;
  }

  function isVakantieperiode(d: Date): boolean {
    if (d.getFullYear() !== 2026 || d.getMonth() !== 3) return false;
    const day = d.getDate();
    return day >= 6 && day <= 27;
  }

  function isDagBeschikbaar(d: Date): boolean {
    if (isVakantieperiode(d)) return false;
    const nu = new Date();
    nu.setHours(0, 0, 0, 0);
    if (d < nu) return false;
    if (d.getDay() === 1) return false; // maandag
    return true;
  }

  async function kiesDatum(d: Date) {
    const iso = localCalendarDateToYyyyMmDd(d);
    setDatum(iso);
    setTijdslot("");
    setLoadingSlots(true);

    const res = await fetch(
      `/api/bookings/beschikbare-slots?datum=${iso}&behandelingId=${geselecteerd}`
    );
    const data = await res.json();
    setSlots(data.slots || []);
    setLoadingSlots(false);
  }

  async function verstuur() {
    if (!form.naam || !form.email || !form.telefoon) {
      setError("Vul alle verplichte velden in");
      return;
    }
    if (!form.privacy) {
      setError("Accepteer de privacyverklaring");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        behandelingId: geselecteerd,
        datum,
        tijdslot,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Er ging iets mis");
      setLoading(false);
      return;
    }

    setStap(4);
    setLoading(false);
  }

  // Progress bar
  const progressBar = (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {["Behandeling", "Datum & tijd", "Uw gegevens", "Bevestiging"].map(
          (label, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center 
              justify-center text-sm font-bold mb-1 
              ${
                stap > i + 1
                  ? "bg-rjt-gold text-white"
                  : stap === i + 1
                    ? "bg-rjt-red text-white"
                    : "bg-stone-200 text-stone-400"
              }`}
              >
                {stap > i + 1 ? "✓" : i + 1}
              </div>
              <span
                className={`text-xs hidden sm:block
              ${
                stap === i + 1
                  ? "text-rjt-red font-medium"
                  : "text-stone-400"
              }`}
              >
                {label}
              </span>
            </div>
          )
        )}
      </div>
      <div className="h-1 bg-stone-200 rounded-full">
        <div
          className="h-1 bg-rjt-red rounded-full transition-all"
          style={{ width: `${((stap - 1) / 3) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-rjt-beige py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p
            className="text-rjt-gold text-xs tracking-widest 
            uppercase mb-2"
          >
            Ren Ji Tang
          </p>
          <h1 className="font-serif text-3xl text-rjt-dark">
            Afspraak maken
          </h1>
          <p className="text-sm text-stone-400">预约挂号</p>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          {progressBar}

          {/* STAP 1: Behandeling */}
          {stap === 1 && (
            <div id="stap-behandeling">
              <h2 className="font-serif text-xl mb-6">
                Kies een behandeling
              </h2>
              <div className="space-y-3">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setGeselecteerd(s.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 
                      transition-all ${
                        geselecteerd === s.id
                          ? "border-rjt-red bg-red-50"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-rjt-dark">{s.naam}</p>
                        {s.naamCN && (
                          <p className="text-sm text-stone-400">{s.naamCN}</p>
                        )}
                        <p className="text-sm text-stone-500">
                          {s.duur} minuten
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-rjt-red">
                          €{s.prijs}
                        </span>
                        {geselecteerd === s.id && (
                          <span className="text-rjt-red">✓</span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => geselecteerd && setStap(2)}
                disabled={!geselecteerd}
                className="w-full mt-6 py-3 bg-rjt-red text-white 
                  rounded-full font-semibold disabled:opacity-40 
                  hover:bg-red-900 transition-colors"
              >
                Volgende: Datum & tijd →
              </button>
            </div>
          )}

          {/* STAP 2: Datum & Tijd */}
          {stap === 2 && (
            <div id="stap-datum">
              <h2 className="font-serif text-xl mb-6">
                Kies datum en tijd
              </h2>

              <div
                className="mb-4 text-center text-sm font-lato"
                style={{ color: "#c8a040" }}
              >
                🌴 Gesloten van 6 t/m 27 april wegens vakantie
              </div>

              {/* Kalender navigatie: ‹ maand jaar › */}
              <div
                className="mb-4 flex w-full items-center justify-between gap-2"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <button
                  type="button"
                  onClick={vorigeMaand}
                  disabled={vorigeMaandDisabled}
                  aria-label="Vorige maand"
                  style={{
                    ...kalenderNavBtnStyle,
                    cursor: vorigeMaandDisabled ? "not-allowed" : "pointer",
                    opacity: vorigeMaandDisabled ? 0.3 : 1,
                  }}
                  className={
                    vorigeMaandDisabled
                      ? "shrink-0"
                      : "shrink-0 transition-opacity hover:opacity-70"
                  }
                >
                  ‹
                </button>
                <span
                  className="min-h-[1.5rem] flex-1 px-2 text-center font-semibold 
                    capitalize text-rjt-dark"
                >
                  {maandNaamNl}
                </span>
                <button
                  type="button"
                  onClick={volgendeMaand}
                  aria-label="Volgende maand"
                  style={kalenderNavBtnStyle}
                  className="shrink-0 transition-opacity hover:opacity-70"
                >
                  ›
                </button>
              </div>

              {/* Dag namen */}
              <div className="grid grid-cols-7 mb-2">
                {dagNamen.map((d) => (
                  <div
                    key={d}
                    className="text-center text-xs 
                    text-stone-400 font-medium py-1"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Dagen */}
              <div className="grid grid-cols-7 gap-1 mb-6">
                {getDagenInMaand().map((d, i) => {
                  if (!d) return <div key={i} />;
                  const iso = localCalendarDateToYyyyMmDd(d);
                  const vakantie = isVakantieperiode(d);
                  const beschikbaar = isDagBeschikbaar(d);
                  const geselecteerdDag = datum === iso;

                  if (vakantie) {
                    return (
                      <div
                        key={i}
                        title="Gesloten wegens vakantie"
                        className="aspect-square rounded-lg flex flex-col items-center 
                          justify-center gap-0.5 cursor-not-allowed select-none
                          bg-[rgba(192,57,43,0.08)]"
                      >
                        <span
                          className="text-sm font-medium text-[#c0392b]"
                          style={{ opacity: 0.6 }}
                        >
                          {d.getDate()}
                        </span>
                        <span
                          className="text-[10px] leading-none"
                          aria-hidden
                        >
                          🌴
                        </span>
                      </div>
                    );
                  }

                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => beschikbaar && kiesDatum(d)}
                      disabled={!beschikbaar}
                      className={`aspect-square rounded-lg text-sm 
                        font-medium transition-all
                        ${
                          geselecteerdDag
                            ? "bg-rjt-red text-white"
                            : beschikbaar
                              ? "hover:bg-rjt-beige text-rjt-dark"
                              : "text-stone-300 cursor-not-allowed"
                        }`}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>

              {/* Tijdsloten */}
              {datum && (
                <div>
                  <p className="text-sm font-medium text-stone-600 mb-3">
                    Beschikbare tijden:
                  </p>
                  {loadingSlots ? (
                    <p className="text-stone-400 text-sm">Laden...</p>
                  ) : slots.length === 0 ? (
                    <p className="text-stone-400 text-sm">
                      Geen tijden beschikbaar op deze dag.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {slots.map((slot) => {
                        const selected = tijdslot === slot;
                        return (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => setTijdslot(slot)}
                            className={
                              selected
                                ? "rounded-full border border-[#c8a040] bg-[#c8a040] px-4 py-2 text-sm font-medium text-white transition-colors"
                                : "rounded-full border border-[#d4c5a0] bg-white px-4 py-2 text-sm font-medium text-[#1a0f08] transition-colors hover:border-[#c8a040] hover:bg-[#f5f0e8] hover:text-[#1a0f08]"
                            }
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStap(1)}
                  className="flex-1 py-3 border border-stone-200 
                    rounded-full text-stone-600 hover:bg-stone-50"
                >
                  ← Terug
                </button>
                <button
                  type="button"
                  onClick={() => datum && tijdslot && setStap(3)}
                  disabled={!datum || !tijdslot}
                  className="flex-1 py-3 bg-rjt-red text-white 
                    rounded-full font-semibold disabled:opacity-40 
                    hover:bg-red-900 transition-colors"
                >
                  Volgende: Gegevens →
                </button>
              </div>
            </div>
          )}

          {/* STAP 3: Gegevens */}
          {stap === 3 && (
            <div id="stap-gegevens">
              <h2 className="font-serif text-xl mb-6">Uw gegevens</h2>

              {/* Samenvatting */}
              {service && (
                <div
                  className="bg-rjt-beige rounded-xl p-4 mb-6 
                  text-sm text-stone-600"
                >
                  <p>
                    <strong>Behandeling:</strong> {service.naam}
                  </p>
                  <p>
                    <strong>Datum:</strong>{" "}
                    {formatYyyyMmDdSummaryNl(datum)}
                  </p>
                  <p>
                    <strong>Tijd:</strong> {tijdslot}
                  </p>
                  <p>
                    <strong>Prijs:</strong> €{service.prijs}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Uw naam *"
                  value={form.naam}
                  onChange={(e) =>
                    setForm({ ...form, naam: e.target.value })
                  }
                  style={{ color: "#1a0f08", background: "white" }}
                  className="w-full rounded-xl border border-stone-200 px-4 py-3
                    placeholder:text-[#9ca3af] focus:border-rjt-red focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="E-mailadres *"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  style={{ color: "#1a0f08", background: "white" }}
                  className="w-full rounded-xl border border-stone-200 px-4 py-3
                    placeholder:text-[#9ca3af] focus:border-rjt-red focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Telefoonnummer *"
                  value={form.telefoon}
                  onChange={(e) =>
                    setForm({ ...form, telefoon: e.target.value })
                  }
                  style={{ color: "#1a0f08", background: "white" }}
                  className="w-full rounded-xl border border-stone-200 px-4 py-3
                    placeholder:text-[#9ca3af] focus:border-rjt-red focus:outline-none"
                />
                <textarea
                  placeholder="Opmerkingen (optioneel)"
                  value={form.opmerking}
                  onChange={(e) =>
                    setForm({ ...form, opmerking: e.target.value })
                  }
                  rows={3}
                  style={{ color: "#1a0f08", background: "white" }}
                  className="w-full resize-none rounded-xl border border-stone-200 
                    px-4 py-3 placeholder:text-[#9ca3af] focus:border-rjt-red 
                    focus:outline-none"
                />
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.privacy}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        privacy: e.target.checked,
                      })
                    }
                    className="mt-1 accent-rjt-red"
                  />
                  <span className="text-sm text-stone-500">
                    Ik ga akkoord met de{" "}
                    <a
                      href="/privacy"
                      className="text-rjt-red underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      privacyverklaring
                    </a>
                  </span>
                </label>
              </div>

              {error && (
                <p className="mt-4 text-red-600 text-sm">{error}</p>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStap(2)}
                  className="flex-1 py-3 border border-stone-200 
                    rounded-full text-stone-600 hover:bg-stone-50"
                >
                  ← Terug
                </button>
                <button
                  type="button"
                  onClick={verstuur}
                  disabled={loading}
                  className="flex-1 py-3 bg-rjt-red text-white 
                    rounded-full font-semibold disabled:opacity-60 
                    hover:bg-red-900 transition-colors"
                >
                  {loading ? "Versturen..." : "Aanvraag versturen →"}
                </button>
              </div>

              <div className="mt-4 space-y-1.5 text-sm text-stone-500">
                <p>
                  Door dit formulier te verzenden ga je akkoord met onze{" "}
                  <a
                    href="/privacy"
                    className="text-rjt-red underline underline-offset-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    privacyverklaring
                  </a>
                  .
                </p>
                <p lang="zh-Hans">
                  提交此表单即表示您同意我们的
                  <a
                    href="/privacy"
                    className="text-rjt-red underline underline-offset-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    隐私声明
                  </a>
                  。
                </p>
              </div>
            </div>
          )}

          {/* STAP 4: Bevestiging */}
          {stap === 4 && (
            <div id="stap-bevestiging" className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="font-serif text-2xl text-rjt-dark mb-3">
                Aanvraag ontvangen!
              </h2>
              <p className="text-stone-600 mb-6">
                Wij nemen zo spoedig mogelijk contact met u op ter
                bevestiging. U ontvangt ook een bevestigingsmail.
              </p>
              {service && (
                <div
                  className="bg-rjt-beige rounded-xl p-4 
                  text-sm text-stone-600 text-left mb-8"
                >
                  <p>
                    <strong>Behandeling:</strong> {service.naam}
                  </p>
                  <p>
                    <strong>Datum:</strong>{" "}
                    {formatYyyyMmDdSummaryNl(datum)}
                  </p>
                  <p>
                    <strong>Tijd:</strong> {tijdslot}
                  </p>
                  <p>
                    <strong>Prijs:</strong> €{service.prijs}
                  </p>
                </div>
              )}

              <a
                href="/"
                className="inline-block bg-rjt-red text-white 
                  px-8 py-3 rounded-full font-semibold 
                  hover:bg-red-900 transition-colors"
              >
                Terug naar home
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
