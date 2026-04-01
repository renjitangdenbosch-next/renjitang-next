"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/site";

type Stap = 1 | 2 | 3 | 4;

export default function BookingsPage() {
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

  // Genereer kalender voor huidige + volgende maand
  const vandaag = new Date();
  const [maand, setMaand] = useState(vandaag.getMonth());
  const [jaar, setJaar] = useState(vandaag.getFullYear());

  const maandNamen = [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december",
  ];
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

  function isDagBeschikbaar(d: Date): boolean {
    const nu = new Date();
    nu.setHours(0, 0, 0, 0);
    if (d < nu) return false;
    if (d.getDay() === 1) return false; // maandag
    return true;
  }

  async function kiesDatum(d: Date) {
    const iso = d.toISOString().split("T")[0];
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
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          {progressBar}

          {/* STAP 1: Behandeling */}
          {stap === 1 && (
            <div>
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
            <div>
              <h2 className="font-serif text-xl mb-6">
                Kies datum en tijd
              </h2>

              {/* Kalender navigatie */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => {
                    if (maand === 0) {
                      setMaand(11);
                      setJaar((j) => j - 1);
                    } else setMaand((m) => m - 1);
                  }}
                  className="p-2 hover:bg-stone-100 rounded-lg"
                >
                  ←
                </button>
                <span className="font-semibold capitalize">
                  {maandNamen[maand]} {jaar}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (maand === 11) {
                      setMaand(0);
                      setJaar((j) => j + 1);
                    } else setMaand((m) => m + 1);
                  }}
                  className="p-2 hover:bg-stone-100 rounded-lg"
                >
                  →
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
                  const iso = d.toISOString().split("T")[0];
                  const beschikbaar = isDagBeschikbaar(d);
                  const geselecteerdDag = datum === iso;
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
                      {slots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setTijdslot(slot)}
                          className={`px-4 py-2 rounded-full text-sm 
                            font-medium border transition-all
                            ${
                              tijdslot === slot
                                ? "bg-rjt-red text-white border-rjt-red"
                                : "border-stone-200 hover:border-rjt-red"
                            }`}
                        >
                          {slot}
                        </button>
                      ))}
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
            <div>
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
                    {new Date(datum).toLocaleDateString("nl-NL", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
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
                  className="w-full border border-stone-200 rounded-xl 
                    px-4 py-3 focus:outline-none focus:border-rjt-red"
                />
                <input
                  type="email"
                  placeholder="E-mailadres *"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full border border-stone-200 rounded-xl 
                    px-4 py-3 focus:outline-none focus:border-rjt-red"
                />
                <input
                  type="tel"
                  placeholder="Telefoonnummer *"
                  value={form.telefoon}
                  onChange={(e) =>
                    setForm({ ...form, telefoon: e.target.value })
                  }
                  className="w-full border border-stone-200 rounded-xl 
                    px-4 py-3 focus:outline-none focus:border-rjt-red"
                />
                <textarea
                  placeholder="Opmerkingen (optioneel)"
                  value={form.opmerking}
                  onChange={(e) =>
                    setForm({ ...form, opmerking: e.target.value })
                  }
                  rows={3}
                  className="w-full border border-stone-200 rounded-xl 
                    px-4 py-3 focus:outline-none focus:border-rjt-red 
                    resize-none"
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
            </div>
          )}

          {/* STAP 4: Bevestiging */}
          {stap === 4 && (
            <div className="text-center py-8">
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
                    {new Date(datum).toLocaleDateString("nl-NL", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
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
