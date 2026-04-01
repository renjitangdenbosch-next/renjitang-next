import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guasha",
  description:
    "Guasha (刮痧) bij Ren Ji Tang: traditionele Chinese therapie voor doorbloeding en herstel.",
  alternates: { canonical: "/guasha" },
};

export default function GuashaPage() {
  return (
    <div className="bg-rjt-beige dark:bg-[#141210]">
      <div className="relative -mt-20 mb-12 min-h-[300px] h-[45vh] overflow-hidden md:-mt-24">
        <Image
          src="/images/guasha.jpg"
          alt="Guasha Behandeling"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-4xl flex-col items-start justify-end px-6 pb-12">
          <p className="mb-2 text-xs uppercase tracking-widest text-white/60">Ren Ji Tang</p>
          <h1 className="mb-2 font-serif text-4xl text-white md:text-6xl">Guasha Behandeling</h1>
          <p className="text-sm text-white/60">刮痧</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
        <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Wat is Guasha?</h2>
        <p className="leading-relaxed text-stone-600 dark:text-stone-300">
          Guasha (刮痧, guāshā) is een traditionele Chinese therapie waarbij de huid wordt geschraapt met een
          glad instrument van jade, bot of kunststof. Het woord betekent letterlijk &apos;schrabben van
          sha&apos; — sha verwijst naar de rode vlekjes die zichtbaar worden en stagnatie in het bloed
          aangeven.
        </p>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
        <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Voordelen</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            "Stimuleert de bloedcirculatie",
            "Verlicht chronische pijn",
            "Vermindert ontstekingen",
            "Ontgift het lichaam",
            "Verbetert de Qi-doorstroming",
            "Verlichting bij migraine",
            "Ondersteunt het immuunsysteem",
            "Vermindert stijfheid",
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
            "Nek- en schouderklachten",
            "Chronische rugpijn",
            "Migraine en hoofdpijn",
            "Spierpijn en stijfheid",
            "Vermoeidheid",
            "Huidproblemen",
            "Gewrichtspijn",
            "Stress en spanning",
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
          Een guasha behandeling duurt ongeveer 30 minuten. Na de behandeling zijn rode strepen zichtbaar op de
          huid — dit is normaal en verdwijnt binnen 3-5 dagen. Dit geeft aan dat stagnatie is opgeheven.
        </p>
        <p className="leading-relaxed text-stone-600 dark:text-stone-300">
          Guasha wordt vaak gecombineerd met acupunctuur voor een diepgaandere behandeling.
        </p>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
        <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">Tarief</h2>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-rjt-beige p-4 dark:bg-stone-800/80">
          <div>
            <p className="font-semibold text-rjt-dark dark:text-rjt-cream">Guasha Massage</p>
            <p className="text-sm text-stone-500 dark:text-stone-400">30 minuten · 刮痧</p>
          </div>
          <span className="text-2xl font-bold text-rjt-red">€40</span>
        </div>
      </div>

      <div className="rounded-2xl bg-rjt-red p-8 text-center text-white">
        <h3 className="mb-3 font-serif text-2xl">Guasha behandeling boeken</h3>
        <p className="mb-6 text-white/80">Ontdek de kracht van Guasha</p>
        <Link
          href="/bookings"
          className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-rjt-red transition-colors hover:bg-rjt-beige"
        >
          Maak een afspraak
        </Link>
      </div>
      </div>
    </div>
  );
}
