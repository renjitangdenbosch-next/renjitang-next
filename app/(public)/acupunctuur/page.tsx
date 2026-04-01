import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acupunctuur in Den Bosch",
  description:
    "Acupunctuur bij Ren Ji Tang in 's-Hertogenbosch: pijnverlichting, vergoeding en ervaring.",
  alternates: { canonical: "/acupunctuur" },
};

const klachten = [
  "Stress en Burn-out",
  "Hoofdpijn en Migraine",
  "Slaapproblemen",
  "Spierpijn en Spierspanning",
  "Rugpijn",
  "Vermoeidheid",
  "Allergieën",
  "Menstruatieproblemen",
  "Opvliegers / Menopauze",
  "Angst en Depressie",
  "Nek- en Schouderpijn",
  "Artrose en Gewrichtspijn",
  "Fertiliteitsproblemen",
  "Huidproblemen",
  "Zenuwpijn",
  "Spijsverteringsproblemen",
  "Astma en Ademhaling",
  "Sportblessures",
  "Verhoogde Immuniteit",
  "Borst- en Maagklachten",
];

export default function AcupunctuurPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 font-serif text-4xl text-rjt-dark dark:text-rjt-cream">
        Acupunctuur in Den Bosch
      </h1>

      <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
        <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
          Snelle Pijnverlichting bij Ren Ji Tang
        </h2>
        <p className="leading-relaxed text-stone-600 dark:text-stone-300">
          Lijdt u aan chronische pijn of zoekt u naar een effectieve en natuurlijke behandeling? Bij Ren Ji
          Tang in &apos;s-Hertogenbosch bieden wij acupunctuur behandelingen die gericht zijn op snelle
          pijnverlichting en het bevorderen van uw welzijn.
        </p>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
        <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
          Wat is Acupunctuur?
        </h2>
        <p className="leading-relaxed text-stone-600 dark:text-stone-300">
          Acupunctuur is een eeuwenoude behandelmethode uit de traditionele Chinese geneeskunde. Door het
          plaatsen van fijne naalden op specifieke punten van het lichaam, worden blokkades opgeheven en
          wordt de energiestroom (Qi) hersteld. Dit stimuleert het zelfherstellend vermogen van het lichaam.
        </p>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
        <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
          20 Meestvoorkomende Klachten
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {klachten.map((klacht, i) => (
            <div key={klacht} className="flex items-center gap-3 text-stone-700 dark:text-stone-200">
              <span className="font-bold text-rjt-gold">{i + 1}.</span>
              {klacht}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-stone-900/90">
        <h2 className="mb-4 font-serif text-2xl text-rjt-dark dark:text-rjt-cream">
          Vergoeding Zorgverzekering
        </h2>
        <div className="space-y-3 text-stone-600 dark:text-stone-300">
          <p>
            Acupunctuur wordt vergoed vanuit de <strong>aanvullende zorgverzekering</strong>. De
            basisverzekering vergoedt acupunctuur niet.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-green-50 p-4 dark:bg-green-950/40">
              <h3 className="mb-2 font-semibold text-green-800 dark:text-green-300">✓ Wordt vergoed</h3>
              <ul className="space-y-1 text-sm text-green-700 dark:text-green-200/90">
                <li>Acupunctuur via aanvullende verzekering</li>
                <li>Tuina massage (sommige verzekeraars)</li>
                <li>Behandelingen door ZHONG-therapeut</li>
              </ul>
            </div>
            <div className="rounded-xl bg-red-50 p-4 dark:bg-red-950/30">
              <h3 className="mb-2 font-semibold text-red-800 dark:text-red-300">✗ Niet vergoed</h3>
              <ul className="space-y-1 text-sm text-red-700 dark:text-red-200/90">
                <li>Basisverzekering</li>
                <li>Cupping en Guasha</li>
                <li>Kruidengeneeskunde</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-stone-500 dark:text-stone-400">
            Verzekeraars die acupunctuur vergoeden: OHRA, CZ, De Friesland, a.s.r, Univé en Zilveren Kruis.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-rjt-red p-8 text-center text-white">
        <h3 className="mb-3 font-serif text-2xl">Maak vandaag nog een afspraak</h3>
        <p className="mb-6 text-white/80">Ervaar zelf de heilzame werking van acupunctuur</p>
        <a
          href="https://renjitang.nl/index.php/book-appointment/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-rjt-red transition-colors hover:bg-rjt-beige"
        >
          Boek een behandeling
        </a>
      </div>
    </div>
  );
}
