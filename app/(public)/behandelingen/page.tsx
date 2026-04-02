import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BEHANDELING_HOME_CARDS } from "@/lib/behandelingen-data";
import { SERVICES, SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Onze behandelingen",
  description:
    "Acupunctuur, Tuina massage, cupping, guasha, moxibustie en kruidengeneeskunde bij Ren Ji Tang in Den Bosch.",
  alternates: { canonical: "/behandelingen" },
};

export default function BehandelingenPage() {
  return (
    <div className="bg-paper py-20 text-ink">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Behandelingen"
          title="Wat wij voor u doen"
          subtitle="Klik voor meer informatie per behandeling. Onderaan vindt u indicatieve tijden en tarieven."
          align="center"
          className="mb-16"
        />

        <ul className="grid list-none grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BEHANDELING_HOME_CARDS.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/behandelingen/${b.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-stone-200/90 bg-white shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={b.image}
                    alt={`${b.naam} bij Ren Ji Tang`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-cormorant text-[1.35rem] text-ink">{b.naam}</h2>
                  <p className="mt-2 line-clamp-2 font-lato text-sm text-muted">{b.beschrijving}</p>
                  <span className="mt-auto pt-4 font-lato text-sm font-medium text-jade">
                    Meer informatie →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-24 border-t border-gold/20 pt-16" aria-labelledby="tarieven-heading">
          <h2 id="tarieven-heading" className="font-cormorant text-3xl text-ink">
            Tijden en tarieven
          </h2>
          <p className="mt-3 font-lato text-sm text-muted">
            Actuele prijzen en beschikbaarheid bij het boeken van uw afspraak.
          </p>
          <ul className="mt-10 space-y-4">
            {SERVICES.map((s) => (
              <li
                key={s.id}
                className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-200/80 py-4 font-lato text-sm"
              >
                <span className="text-ink">{s.naam}</span>
                <span className="text-muted">
                  {s.duur} min · €{s.prijs}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="primary" href={SITE.bookingUrl}>
              Maak een afspraak
            </Button>
            <Link
              href={SITE.bookingWizardUrl}
              className="inline-block rounded-sm border border-ink px-8 py-3 font-lato text-[0.8rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-vermilion hover:text-vermilion"
            >
              Online agenda
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
