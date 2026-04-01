import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cupping",
  description:
    "Cupping (拔罐) bij Ren Ji Tang: traditionele Chinese therapie voor doorbloeding, spanning en herstel.",
  alternates: { canonical: "/cupping" },
};

export default function CuppingPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-2 font-serif text-4xl text-rjt-dark dark:text-rjt-cream">Cupping</h1>
      <p className="mb-8 text-sm text-stone-400">拔罐</p>

      <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
        <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Wat is Cupping?</h2>
        <p className="leading-relaxed text-stone-600 dark:text-stone-300">
          Cupping (拔罐, báguàn) is een traditionele Chinese therapie waarbij glazen of plastic cups op de huid
          worden geplaatst. Door het creëren van een vacuüm wordt de huid naar boven gezogen. Dit stimuleert de
          bloedcirculatie, lost verklevingen op en voert afvalstoffen af.
        </p>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
        <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Voordelen</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            "Verbetert de bloedcirculatie",
            "Lost spierspanning en verklevingen op",
            "Voert afvalstoffen af",
            "Verlicht rug- en nekpijn",
            "Vermindert stress en spanning",
            "Ondersteunt het immuunsysteem",
            "Helpt bij verkoudheid en griep",
            "Verbetert de Qi-doorstroming",
          ].map((v, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="font-bold text-rjt-gold">✓</span>
              <span className="text-stone-600 dark:text-stone-300">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
        <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Voor welke klachten?</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            "Rug- en schouderklachten",
            "Nekpijn en hoofdpijn",
            "Spierpijn en stijfheid",
            "Stress en vermoeidheid",
            "Verkoudheid en hoest",
            "Longproblemen",
            "Slechte doorbloeding",
            "Huidproblemen",
          ].map((k, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-rjt-red">◆</span>
              <span className="text-stone-600 dark:text-stone-300">{k}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
        <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Wat kunt u verwachten?</h2>
        <p className="mb-4 leading-relaxed text-stone-600 dark:text-stone-300">
          Een cuppingbehandeling duurt ongeveer 30 minuten. Na de behandeling kunnen rode cirkels op de huid
          zichtbaar zijn — dit is normaal en verdwijnt binnen enkele dagen. Dit zijn geen blauwe plekken maar
          gestagneerd bloed dat is losgemaakt.
        </p>
        <p className="leading-relaxed text-stone-600 dark:text-stone-300">
          Cupping wordt vaak gecombineerd met acupunctuur of tuina massage voor optimaal resultaat.
        </p>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
        <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Tarief</h2>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-rjt-beige p-4 dark:bg-stone-800/80">
          <div>
            <p className="font-semibold text-rjt-dark dark:text-rjt-cream">Cupping Behandeling</p>
            <p className="text-sm text-stone-500 dark:text-stone-400">30 minuten · 拔罐</p>
          </div>
          <span className="text-2xl font-bold text-rjt-red">€40</span>
        </div>
      </div>

      <div className="rounded-2xl bg-rjt-red p-8 text-center text-white">
        <h3 className="mb-3 font-serif text-2xl">Cupping behandeling boeken</h3>
        <p className="mb-6 text-white/80">Ervaar de heilzame werking van cupping</p>
        <Link
          href="/bookings"
          className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-rjt-red transition-colors hover:bg-rjt-beige"
        >
          Maak een afspraak
        </Link>
      </div>
    </div>
  );
}
