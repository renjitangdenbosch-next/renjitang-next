import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ParallaxHeroBackground } from "@/components/ParallaxHeroBackground";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aanvullende zorgverzekering & vergoeding — Ren Ji Tang",
  description:
    "Informatie over vergoeding van TCM en acupunctuur via uw aanvullende zorgverzekering. Wat u kunt controleren en hoe Ren Ji Tang aangesloten is bij Zhong, KAB en SCAG.",
  alternates: { canonical: "/zorgverzekering" },
};

export default function ZorgverzekeringPage() {
  return (
    <div className="min-h-screen bg-[#F4FAF0]">
      <ParallaxHeroBackground
        className="relative h-[42vh] min-h-[300px] w-full overflow-hidden"
        src="/images/hero_acupunctuur_handen.jpg"
        alt="Acupunctuurbehandeling bij Ren Ji Tang"
        priority
        sizes="100vw"
        imageClassName="object-cover object-[50%_45%]"
      >
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.5) 42%, rgba(0,0,0,0.22) 100%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 z-20 flex items-end pb-12">
          <div className="mx-auto w-full max-w-3xl px-6">
            <span className="mb-4 block font-lato text-xs uppercase tracking-[0.2em] text-white/85">
              Zorgverzekering
            </span>
            <h1 className="mb-4 font-cormorant text-4xl text-white drop-shadow-sm sm:text-5xl">
              Aanvullende zorgverzekering &amp; vergoeding
            </h1>
            <p className="max-w-2xl font-lato text-lg text-white/95 drop-shadow-sm">
              Traditionele Chinese Geneeskunde valt meestal buiten de basisverzekering. Via een aanvullend pakket is
              vaak (deels) vergoeding mogelijk — afhankelijk van uw polis.
            </p>
          </div>
        </div>
      </ParallaxHeroBackground>

      <div className="mx-auto max-w-3xl px-6 py-12 text-ink dark:text-ink">
        <div className="prose prose-neutral max-w-none">
          <p className="font-lato text-lg leading-relaxed text-[#1A2E1A]/90">
            Veel klanten vragen of acupunctuur, massage of andere TCM-behandelingen worden vergoed. Het korte antwoord:
            de <strong className="font-semibold text-[#1A2E1A]">basisverzekering</strong> dekt dit doorgaans niet, maar
            een <strong className="font-semibold text-[#1A2E1A]">aanvullende zorgverzekering</strong> kan wel een
            vergoeding bieden — soms tot een jaarplafond of een vast aantal behandelingen per jaar.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-stone-200/80 shadow-sm">
            <Image
              src="/images/acupunctuur-2.jpg"
              alt="Acupunctuur in de praktijk"
              fill
              className="object-cover"
              sizes="(max-width:640px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-stone-200/80 shadow-sm">
            <Image
              src="/images/hero-massage-new.jpg"
              alt="Tuina massage"
              fill
              className="object-cover"
              sizes="(max-width:640px) 100vw, 50vw"
            />
          </div>
        </div>

        <section className="mt-14 space-y-4">
          <h2 className="font-cormorant text-3xl text-[#1A2E1A]">Wat is een aanvullende zorgverzekering?</h2>
          <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
            Naast de verplichte basisverzekering kunt u vrijwillig een aanvullende verzekering afsluiten. Daarin zitten
            vaak rubrieken als alternatieve geneeswijzen, fysiotherapie buiten het basispakket, of een combinatie van
            paramedische zorg. De voorwaarden — welke therapieën, welk percentage, welk maximum — verschillen sterk per
            maatschappij en pakket.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="font-cormorant text-3xl text-[#1A2E1A]">Waarom vergoeding bij Ren Ji Tang?</h2>
          <p className="font-lato leading-relaxed text-[#1A2E1A]/88">
            Ren Ji Tang is aangesloten bij <strong className="font-semibold">Zhong</strong>, de{" "}
            <strong className="font-semibold">KAB Koepel</strong> en valt onder de{" "}
            <strong className="font-semibold">SCAG</strong>-klachtenregeling. Verzekeraars koppelen vergoedingen vaak
            aan dergelijke beroeps- en kwaliteitskaders. Dat vergroot de kans dat uw polis TCM-behandelingen erkent —
            mits uw pakket dat expliciet dekt.
          </p>
        </section>

        <section className="mt-10 space-y-4 rounded-sm border border-stone-200/80 bg-white p-6 shadow-sm">
          <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Praktische checklist</h2>
          <ul className="list-inside list-disc space-y-2 font-lato text-sm leading-relaxed text-[#3D5C3D]">
            <li>Open uw polis of app van de zorgverzekeraar en zoek op “alternatieve geneeswijzen”, “acupunctuur” of “TCM”.</li>
            <li>Let op jaarplafonds, eigen risico buiten de basis (meestal niet van toepassing op aanvullend) en of een verwijzing nodig is.</li>
            <li>Vraag of er een erkende beroepsorganisatie vereist is — wij voldoen via Zhong / KAB waar van toepassing.</li>
            <li>Bewaar uw factuur of declaratieoverzicht voor uw administratie.</li>
          </ul>
          <p className="mt-4 font-lato text-xs italic leading-relaxed text-[#6B8C6B]">
            Wij kunnen geen garantie geven over vergoeding: uitsluitend uw zorgverzekeraar bepaalt aan de hand van uw
            polisvoorwaarden of en hoeveel wordt vergoed.
          </p>
        </section>

        <PartnerLogos />

        <div className="mt-12 rounded-sm bg-[#EDE8DC] p-8 text-center">
          <h2 className="font-cormorant text-2xl text-[#1A2E1A]">Meer informatie?</h2>
          <p className="mx-auto mt-3 max-w-lg font-lato text-sm leading-relaxed text-[#3D5C3D]">
            Heeft u vragen over behandelingen, facturatie of wat u bij uw verzekeraar het beste kunt navragen? Neem gerust
            contact met ons op — we denken graag met u mee.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href={SITE.contactFormUrl} className="btn-primary inline-block">
              Naar contact &amp; info →
            </Link>
            <a
              href={`mailto:${SITE.email}?subject=Vraag%20over%20zorgverzekering%20%2F%20vergoeding`}
              className="font-lato text-sm font-semibold text-[#2D6A2D] underline-offset-4 hover:underline"
            >
              {SITE.email}
            </a>
          </div>
          <p className="mt-6 font-lato text-xs text-[#6B8C6B]">
            Zie ook onze{" "}
            <Link href="/tarieven" className="font-semibold text-[#2D6A2D] underline-offset-2 hover:underline">
              tarievenpagina
            </Link>{" "}
            voor actuele prijzen.
          </p>
        </div>
      </div>
    </div>
  );
}
