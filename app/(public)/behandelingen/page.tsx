import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ParallaxHeroBackground } from "@/components/ParallaxHeroBackground";
import { BEHANDELING_HOME_CARDS } from "@/lib/behandelingen-data";
import { SERVICES, SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Onze behandelingen",
  description:
    "Acupunctuur, Tuina massage, cupping, guasha, moxibustie en kruidengeneeskunde bij Ren Ji Tang in Den Bosch.",
  alternates: { canonical: "/behandelingen" },
};

export default function BehandelingenPage() {
  return (
    <>
      <ParallaxHeroBackground
        className="relative h-[50vh] min-h-[380px] overflow-hidden -mt-[80px]"
        src="/images/hero_cupping_real.jpg"
        alt="Behandelingen Ren Ji Tang"
        priority
        sizes="100vw"
        imageClassName="object-cover object-[30%_center]"
      >
        <div
          className="absolute inset-0 z-10"
          style={{ background: "rgba(0,0,0,0.5)" }}
          aria-hidden
        />
        <div className="pointer-events-none absolute right-6 top-1/2 z-10 -translate-y-1/2 font-cormorant text-[140px] leading-none text-white/15 select-none">
          療
        </div>
        <div className="absolute bottom-10 left-6 z-20 lg:left-16">
          <span className="mb-3 block font-lato text-[11px] uppercase tracking-[0.25em] text-[#4A9E4A]">
            Ren Ji Tang
          </span>
          <h1 className="mb-6 font-cormorant text-5xl font-normal text-white lg:text-6xl">
            Onze behandelingen
          </h1>
          <Link
            href={SITE.bookingUrl}
            className="inline-flex items-center gap-2 rounded-sm bg-[#C0392B] px-6 py-3 font-lato text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#A93226]"
          >
            Maak afspraak →
          </Link>
        </div>
      </ParallaxHeroBackground>

      <div className="bg-paper py-20 text-ink">
        <div className="mx-auto max-w-6xl px-6">
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
    </>
  );
}
