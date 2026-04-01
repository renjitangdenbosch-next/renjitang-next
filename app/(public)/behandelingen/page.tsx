import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onze behandelingen",
  description:
    "Prijzen en tijden voor acupunctuur, cupping, Tuina en ontspanningsmassage bij Ren Ji Tang.",
  alternates: { canonical: "/behandelingen" },
};

const BOOKING_HREF = "https://renjitang.nl/index.php/book-appointment/";

const treatments = [
  {
    name: "Acupunctuur intake",
    duration: "90 min",
    price: 85,
    description:
      "Uitgebreid eerste consult: anamnese, TCG-diagnose en eerste acupunctuurbehandeling, afgestemd op uw klacht en doelen.",
  },
  {
    name: "Acupunctuur vervolgbehandeling",
    duration: "60 min",
    price: 65,
    description:
      "Vervolgafspraak met naaldzetting en evaluatie van uw traject voor blijvende balans en pijnverlichting.",
  },
  {
    name: "Cupping",
    duration: "45 min",
    price: 55,
    description:
      "Therapeutische cups ter ondersteuning van doorstroming en ontspanning van weefsel en energie.",
  },
  {
    name: "Tuina-massage",
    duration: "60 min",
    price: 65,
    description:
      "Gerichte Chinese therapeutische massage op spieren en meridiaanbanen voor herstel en meer ruimte in het lichaam.",
  },
  {
    name: "Ontspanningsmassage",
    duration: "60 min",
    price: 60,
    description:
      "Rustige, zachte massage om spanning los te laten en het zenuwstelsel tot rust te brengen.",
  },
];

export default function BehandelingenPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-3 font-serif text-4xl text-rjt-dark dark:text-rjt-cream">Onze behandelingen</h1>
      <p className="mb-10 text-lg text-stone-600 dark:text-stone-400">
        Traditionele Chinese geneeskunde voor lichaam en geest — heldere tijden en tarieven.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {treatments.map((t) => (
          <article
            key={t.name}
            className="flex flex-col rounded-2xl border border-stone-100 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900/90"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-serif text-xl text-rjt-dark dark:text-rjt-cream">{t.name}</h2>
              <span className="rounded-full bg-rjt-gold/15 px-3 py-1 text-sm font-semibold text-rjt-dark dark:text-rjt-gold">
                €{t.price}
              </span>
            </div>
            <p className="mb-4 text-sm font-medium text-stone-500 dark:text-stone-400">{t.duration}</p>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              {t.description}
            </p>
            <a
              href={BOOKING_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-rjt-red py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-red-900"
            >
              Boek nu
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
