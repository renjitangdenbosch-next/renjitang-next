import type { Metadata } from "next";
import { SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Onze behandelingen",
  description:
    "Prijzen en tijden voor acupunctuur, cupping, Tuina en ontspanningsmassage bij Ren Ji Tang.",
  alternates: { canonical: "/behandelingen" },
};

export default function BehandelingenPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-3 font-serif text-4xl text-rjt-dark dark:text-rjt-cream">Onze behandelingen</h1>
      <p className="mb-10 text-lg text-stone-600 dark:text-stone-400">
        Traditionele Chinese geneeskunde voor lichaam en geest — heldere tijden en tarieven.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <div key={service.id} className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="mb-2 flex items-start justify-between">
              <h2 className="font-serif text-2xl text-rjt-dark">{service.naam}</h2>
              <span className="rounded-full bg-rjt-beige px-3 py-1 font-semibold text-rjt-dark">
                €{service.prijs}
              </span>
            </div>
            <p className="mb-3 text-sm text-stone-500">{service.duur} min</p>
            <p className="mb-6 leading-relaxed text-stone-600">{service.beschrijving}</p>

            <a
              href="https://renjitang.nl/index.php/book-appointment/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-rjt-red py-3 text-center font-semibold text-white transition-colors hover:bg-red-900"
            >
              Boek nu
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
